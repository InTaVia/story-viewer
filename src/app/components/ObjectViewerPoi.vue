<template>
	<div @click.prevent.stop="openFullscreen" ref="renderContainer" class="objViewer"
		:class="{ objViewer_fullscreen: isFullscreen }">
		<div ref="threeJSWrapper" class="objViewer__threeJSWrapper"></div>

		<button v-if="isFullscreen" class="fullscreen-bttn" @click.prevent.stop="closeFullscreen()">
			<img src="/assets/object-viewer/svg/CloseFullscreen.svg" alt="Close fullscreen icon" />
		</button>
		<button v-else class="fullscreen-bttn">
			<img src="/assets/object-viewer/svg/OpenFullscreen.svg" alt="Open fullscreen icon" />
		</button>

		<div v-if="isFullscreen && !touched" class="center-button">
			<img class="shake" src="/assets/object-viewer/svg/MovingHand.svg" alt="Moving hand animation" />
		</div>


		<div ref="poiWrapper" class="poi-wrapper" :class="{
			'active': activePOIIndex === index,
			'hidden': !isFullscreen
		}" v-for="(poi, index) in allPois" :key="index" @click="handlePOIClick($event, index)" :data-poiid="poi.id">
			<slot name="poi" :poi="poi" :isActive="(activePOIIndex === index)">
				<div class="objViewer_poi" :data-poiid="poi.id"></div>
				<div class="objViewer_poi-label" :data-poiid="poi.id">{{ poi.title }}</div>
			</slot>
		</div>

		<div v-if="isFullscreen && activePOIData" class="info_overlay">
			<slot name="infoOverlay" :activePOIData="activePOIData">
				<h1>{{ activePOIData.title }}</h1>
				{{ activePOIData.app_content }}
			</slot>
		</div>
	</div>
</template>


<script>
import * as THREE from 'three';

import {
	Object3D,
	GridHelper,
	Vector3,
} from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

import { RGBELoader } from 'three/examples/jsm/loaders//RGBELoader.js';
import TWEEN from 'three/examples/jsm/libs/tween.module.js';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import filter from 'lodash/filter';

export default {
	components: {
	},
	props: {
		path: {
			type: String,
			required: true,
		},
		file: {
			type: String,
			required: true,
		},
		getPoiPosition: {
			type: Boolean,
			default: true,
		},
		backgroundLight: {
			type: Boolean,
			default: true,
		},
		directLight: {
			type: Boolean,
			default: true,
		},
		backgroundImage: {
			type: Boolean,
			default: false,
		},
		allPois: {
			type: Array,
			default: () => []
		},
		activePoiId: {
			type: Number,
			default: null
		},
		isFullscreen: {
			 type: Boolean, 
			default: false
		}
	},
	data() {
		return {
			activePoi: false,
			orbitControls: null,
			model: null,
			rotateLeftActive: false,
			rotateRightActive: false,
			loading: true,
			zoomFactor: 0.4,
			autoRotate: false,
			minZoom: 0,
			maxZoom: 10,
			zoomLevel: 0,
			touched: false,
			activePOIIndex: null,
			loadingError: false
		};
	},
	watch: {
		activePoiId(newVal, oldVal) {
			
			let index = this.allPois.findIndex((item) => { return item.id == newVal.toString() });
			let indexOld = this.allPois.findIndex((item) => { return item.id == oldVal.toString() });
			
			console.log(index, indexOld);

			if (index == -1 ) {
				if(indexOld >= 0){
					const newPos = {
						x: this.camera.position.x + this.allPois[indexOld].app_position.face.normal.x * 0.5,
						y: this.camera.position.y + this.allPois[indexOld].app_position.face.normal.y * 0.5,
						z: this.camera.position.z + this.allPois[indexOld].app_position.face.normal.z * 0.5
					};
					this.flyToPoi(newPos, new Vector3(0, 0.5, 0));
					this.activePOIIndex = null;
				}
				return;
			}

			this.handlePOIClick(undefined, parseInt(index));
		}
	},
	computed: {
		activePOIData() {
			if (this.activePOIIndex === null) {
				return null;
			}

			if (!this.allPois || this.allPois.length < this.activePOIIndex) {
				console.warn(`POI not found in dataset. (${this.activePOIIndex})`);
				return null;
			}

			return this.allPois[this.activePOIIndex];
		}
	},
	emits: [
		'poiPositionUpdate'
	],
	mounted() {
		if (!this.path || !this.file) {
			console.warn(`Error: path or file prop in object viewer component missing.`);
			return false;
		}
		this.initViewer();
		this.update();

		const options = {
			root: null, // Use the viewport as the root
			threshold: 0.0, // Trigger the callback when fully visible
		};

		// Create the Intersection Observer
		const observer = new IntersectionObserver(this.intersectionCallback, options);
		observer.observe(this.$refs.renderContainer);
	},
	unmounted() {
		if (this.controls) this.controls.dispose();
		this.renderer.dispose();
		window.removeEventListener('pointermove', this.onPointerMove);
		window.removeEventListener('pointerdown', this.onPointerDown);
		window.removeEventListener('pointerup', this.onPointerUp);
		window.removeEventListener('resize', this.onWindowResize);
	},
	methods: {
		handlePOIClick(e, poiIndex) {
			const poiOptions = this.allPois[poiIndex].app_position;
			// TODO: fix poiOptions.id = this.allPois[poiIndex].root_item_id;
			poiOptions.id = this.allPois[poiIndex].root_item_id;
			poiOptions.title = this.allPois[poiIndex].title;

			const poiWrapper = document.querySelector('.poi-wrapper[data-poiid="' + this.allPois[poiIndex].id + '"]');

			if (poiWrapper && !poiWrapper.classList.contains('active')) {
				const myRay = new THREE.Ray(new Vector3(poiOptions.point.x, poiOptions.point.y, poiOptions.point.z), new Vector3(poiOptions.face.normal.x, poiOptions.face.normal.y, poiOptions.face.normal.z));
				const cameraPosition = myRay.origin.addVectors(myRay.origin, myRay.direction.multiplyScalar(0.4));

				this.flyToPoi(cameraPosition, new Vector3(poiOptions.point.x, poiOptions.point.y, poiOptions.point.z));
				this.setActivePoi(poiIndex);

				return true;
			}

			const newPos = {
				x: this.camera.position.x + poiOptions.face.normal.x * 0.5,
				y: this.camera.position.y + poiOptions.face.normal.y * 0.5,
				z: this.camera.position.z + poiOptions.face.normal.z * 0.5
			};

			this.flyToPoi(newPos, new Vector3(0, 0.5, 0));
			this.activePOIIndex = null;
		},
		initViewer() {
			this.rendererContainer = this.$refs.threeJSWrapper;

			this.renderer = new THREE.WebGLRenderer({
				alpha: true,
				antialias: true,
			});

			this.renderer.setSize(this.rendererContainer.clientWidth, this.rendererContainer.clientHeight);

			// append renderer dom element
			this.rendererContainer.appendChild(this.renderer.domElement);

			// create scene & light
			this.scene = new THREE.Scene();

			// create camera
			this.camera = new THREE.PerspectiveCamera(
				45,
				this.rendererContainer.clientWidth / this.rendererContainer.clientHeight,
				0.01,
				100
			);
			this.initCamera();

			// add grid
			const grid = new GridHelper(10, 10, 0x000000, 0x000000);
			grid.material.opacity = 0.03;
			grid.material.transparent = true;
			this.scene.add(grid);

			// create orbit this.controls
			this.controls = new OrbitControls(this.camera, this.renderer.domElement);
			this.controls.enableDamping = true;
			this.controls.minZoom = this.minZoom;
			this.controls.maxZoom = this.maxZoom;
			this.initOrbitControls();
			this.orbitControls = this.controls;
			this.orbitControls.enabled = false;

			this.raycaster = new THREE.Raycaster();
			this.loadModel(this.path, this.file);

			this.loading = false;
			this.flyToPoi(new THREE.Vector3(0, 1, 2.5), new THREE.Vector3(0, 0.5, 0));

			this.setEnvironment(this.backgroundLight, this.directLight, this.backgroundImage);

			this.renderer.render(this.scene, this.camera);

			this.setEventListeners();
			this.rotateLeft();
		},
		update() {
			requestAnimationFrame(this.update);

			if (!this.visible) {
				return false;
			}

			TWEEN.update();
			this.controls.update();
			this.renderer.render(this.scene, this.camera);
			if (this.labelRenderer) {
				this.labelRenderer.render(this.scene, this.camera);
			}

			if (this.isFullscreen) {
				this.updatePoiTransparency(this.scene, this.camera);
			}
		},
		onPointerUp(e) {
			if (!!this.getPoiPosition) {
				return false;
			}

			let mouse = new THREE.Vector2();
			mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
			mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

			this.raycaster.setFromCamera(mouse, this.camera);

			let raycastObject = filter(this.scene.children, { name: 'Fluxguide 3d object' });
			let object = this.raycaster.intersectObjects(raycastObject, true);

			let hotspotJson = {}
			if (!object[0]) return;
			hotspotJson.face = object[0].face;
			hotspotJson.point = object[0].point;
			hotspotJson.uv = object[0].uv;

			console.log(JSON.stringify(hotspotJson));
			this.$emit('poiPositionUpdate', hotspotJson)
		},

		onWindowResize() {
			this.renderer.setSize(this.rendererContainer.clientWidth, this.rendererContainer.clientHeight);
			if (this.labelRenderer) this.labelRenderer.setSize(this.rendererContainer.clientWidth, this.rendererContainer.clientHeight);
			this.camera.aspect = this.rendererContainer.clientWidth / this.rendererContainer.clientHeight;
			this.camera.updateProjectionMatrix();
		},
		setEventListeners() {
			window.addEventListener('pointermove', this.onPointerMove);
			window.addEventListener('pointerdown', this.onPointerDown);
			window.addEventListener('pointerup', this.onPointerUp);
			window.addEventListener('resize', this.onWindowResize, false);
		},

		setEnvironment(isHemiLight, isDirLight, isBackground) {

			const vm = this;
			if (isHemiLight) {
				let hemisphereLight = new THREE.HemisphereLight(0xeeeeee, 0x222233, 1);
				hemisphereLight.position.set(3, 2, 1);
				let lightHolder = new THREE.Group();
				lightHolder.add(hemisphereLight);
				this.scene.add(lightHolder);
			}
			if (isDirLight) {
				const dirLightFront = new THREE.DirectionalLight(0xffffff, 1);
				dirLightFront.position.set(5, 2, 3);
				this.scene.add(dirLightFront);
				const dirLightLeft = new THREE.DirectionalLight(0xaaaa77, 1);
				dirLightLeft.position.set(-5, 3, 2);
				this.scene.add(dirLightLeft);
				const dirLightBack = new THREE.DirectionalLight(0x333377);
				dirLightBack.position.set(-5, 2, -3);
				this.scene.add(dirLightBack);
			}
			if (isBackground) {
				new RGBELoader().load('/assets/object-viewer/Puresky.hdr', function (texture) {
					texture.mapping = THREE.EquirectangularReflectionMapping;
					vm.scene.background = texture;
					vm.scene.environment = texture;
				});
			}
		},
		loadModel(path, name) {
			const vm = this;
			let scaling

			let urlPreload = 'assets/object-viewer/PreLoad.glb';
			let preLoader = new GLTFLoader();
			let preLoadedObj;
			preLoader.load(urlPreload, (preload) => {
				preLoadedObj = preload.scene;
				preload.scene.children[0].material.color.set('#ffffff');

				vm.scene.add(preLoadedObj);
			});
			//Remove old model
			if (typeof this.object !== 'undefined') {
				vm.scene.remove(this.object);
			}
			const parts = name.split('.');
			const fileExt = parts[parts.length - 1].toLowerCase();
			if (fileExt === 'glb' || fileExt === 'gltf') {
				const loader = new GLTFLoader().setPath(path);
				loader.load(
					name,
					(gltf) => {
						vm.object = gltf.scene;

						const boundingBox = new THREE.Box3().setFromObject(vm.object);

						// Calculate the dimensions of the bounding box
						const boundingBoxSize = new THREE.Vector3();
						boundingBox.getSize(boundingBoxSize);

						// Calculate the scale factor based on the maximum dimension of the bounding box
						const maxDimension = Math.max(boundingBoxSize.x, boundingBoxSize.y, boundingBoxSize.z);
						scaling = 1 / maxDimension;

						gltf.scene.name = 'Fluxguide 3d object';
						gltf.scene.scale.set(scaling, scaling, scaling);

						vm.scene.remove(preLoadedObj);
						this.scene.add(vm.object);
					},
					undefined,
					(error) => {
						// Handle any error that occurs during loading
						console.error(error);
						this.loadingError = true;
					}
				);
			} else if (fileExt === 'fbx') {
				const vm = this;

				const fbxLoader = new FBXLoader().setPath(path);

				fbxLoader.load(
					name,
					(obj) => {
						vm.object = obj;
						vm.object.name = 'Fluxguide 3d object';

						// Calculate the bounding box of the loaded object
						const boundingBox = new THREE.Box3().setFromObject(vm.object);

						// Calculate the dimensions of the bounding box
						const boundingBoxSize = new THREE.Vector3();
						boundingBox.getSize(boundingBoxSize);

						// Calculate the scale factor based on the maximum dimension of the bounding box
						const maxDimension = Math.max(boundingBoxSize.x, boundingBoxSize.y, boundingBoxSize.z);
						scaling = 1 / maxDimension;

						vm.object.scale.set(scaling, scaling, scaling);
						vm.scene.remove(preLoadedObj);
						vm.scene.add(vm.object);
					},
					undefined,
					(error) => {
						// Handle any error that occurs during loading
						console.error(error);
					}
				);
			} else if (fileExt === 'obj') {
				const vm = this;
				const mtlLoader = new MTLLoader().setPath(path);
				const mtlName = name.replace('.obj', '.mtl');
				mtlLoader.load(
					mtlName,
					(materials) => {
						materials.preload();
						// Load the OBJ file with the materials
						const objLoader = new OBJLoader().setPath(path);
						objLoader.setMaterials(materials);
						objLoader.load(
							name,
							(obj) => {
								vm.object = obj;

								const boundingBox = new THREE.Box3().setFromObject(vm.object);

								// Calculate the dimensions of the bounding box
								const boundingBoxSize = new THREE.Vector3();
								boundingBox.getSize(boundingBoxSize);

								// Calculate the scale factor based on the maximum dimension of the bounding box
								const maxDimension = Math.max(boundingBoxSize.x, boundingBoxSize.y, boundingBoxSize.z);
								scaling = 1 / maxDimension;

								vm.object.scale.set(scaling, scaling, scaling);
								vm.scene.remove(preLoadedObj);
								vm.scene.add(vm.object);
							},
							undefined,
							(error) => {
								// Handle any error that occurs during loading
								console.error(error);
							}
						);
					},
					undefined,
					(error) => {
						// Handle any error that occurs during loading
						console.error(error);
					}
				);
			} else {
				console.log('Wrong Format');
			}
		},
		rescaleObj(scaling) {
			if (typeof this.object !== 'undefined') {
				this.object.scale.set(scaling, scaling, scaling);
			}
		},
		updateAutoRotate() {
			this.controls.autoRotate = false;
			this.autoRotate = false;
		},
		flyToPoi(position, target) {
			if (this.autoRotate) this.updateAutoRotate();
			let distance = this.camera.position.distanceTo(position);
			new TWEEN.Tween(this.camera.position)
				.to(
					{
						x: position.x,
						y: position.y,
						z: position.z,
					},
					400 + 500 * distance
				)
				.easing(TWEEN.Easing.Cubic.Out)
				.start();
			this.controls.target = target;
		},
		initPois() {
			const vm = this;

			vm.labelRenderer = new CSS2DRenderer();
			vm.labelRenderer.setSize(vm.rendererContainer.clientWidth, vm.rendererContainer.clientHeight);
			vm.labelRenderer.domElement.style.position = 'absolute';
			vm.labelRenderer.domElement.style.top = '0px';
			vm.labelRenderer.domElement.id = 'poi-container';
			vm.rendererContainer.prepend(vm.labelRenderer.domElement);

			if (this.scene.children.filter((obj) => { return obj.name == 'poi' }).length < 1) {
				this.allPois.forEach((poi, index) => {
					this.poiToThreeJS(poi, this.$refs.poiWrapper[index]);
				});
			}


		},
		removeAllPois() {
			let element = document.getElementById('poi-container');
			if (element) {
				while (element.firstChild) {
					element.removeChild(element.firstChild);
				}
				element.remove();
			}
			else return;
		},
		poiToThreeJS(poiData, element) {
			const vm = this;
			const poiOptions = poiData.app_position;
			// TODO: fix poiOptions.id = poiData.root_item_id;
			poiOptions.id = poiData.root_item_id;
			poiOptions.title = poiData.title;

			const poi = new Object3D();
			const distance = 0.02;

			const newPosition = {
				x: poiOptions.point.x + poiOptions.face.normal.x * distance,
				y: poiOptions.point.y + poiOptions.face.normal.y * distance,
				z: poiOptions.point.z + poiOptions.face.normal.z * distance
			};
			poi.position.set(newPosition.x, newPosition.y, newPosition.z);

			const label = new CSS2DObject(element);
			label.position.copy(new Vector3(0, 0, 0));
			poi.add(label);
			poi.poiNormal = new Vector3(poiOptions.face.normal.x, poiOptions.face.normal.y, poiOptions.face.normal.z);
			poi.name = "poi";
			this.scene.add(poi);
		},
		setLabel(wrapper, poi) {
			// add label to poi
			const markerDiv = document.createElement('div');
			markerDiv.className = 'poi-label';
			// TODO: fix markerDiv.textContent = fg.content.stops[fg.state.visitor.languageId][poiId].title;
			markerDiv.textContent = poi.title;
			markerDiv.dataset.poiid = poi.id;

			wrapper.appendChild(markerDiv);
		},
		setActivePoi(index) {
			this.activePOIIndex = index;
		},
		resetActivePoi(target) {
			this.activePOIIndex = null;
		},
		updatePoiTransparency(scene, camera) {
			// set distance threshold
			let distanceThreshold = camera.position.distanceTo(new THREE.Vector3(0, camera.position.y, 0)); // threshold at zero
			// get pois
			let pois = filter(scene.children, { name: "poi" });
			// display pois depending on distanceThreshold
			pois.forEach(poi => {
				let poiPosition = new THREE.Vector3();
				poi.getWorldPosition(poiPosition);
				let dotProduct = this.isCameraInFrontOfObject(camera.position, poiPosition, poi.poiNormal);
				let spriteBehindObject = dotProduct > 0;
				let spriteBesideObject = 0.5 > dotProduct && dotProduct > -0.5;
				const spriteDistance = camera.position.distanceTo(poiPosition);
				//let spriteBehindObject = spriteDistance > distanceThreshold; // could be distanceThreshold as well
				poi.children.forEach(poiChild => {
					if (poiChild.element.classList.contains('active')) {
						if (spriteBesideObject) poiChild.element.style.opacity = (0.5 - dotProduct) * 0.5 + 0.5;
						else poiChild.element.style.opacity = spriteBehindObject ? 0.5 : 1;
					}
					else {
						if (spriteBesideObject) poiChild.element.style.opacity = 0.5 - dotProduct;
						else poiChild.element.style.opacity = spriteBehindObject ? 0 : 1;
					}
				});
			});
		},
		isCameraInFrontOfObject(cameraPosition, objectPosition, objectNormal) {
			const cameraToObject = new THREE.Vector3().subVectors(objectPosition, cameraPosition);
			const dotProduct = cameraToObject.dot(objectNormal);
			return dotProduct;
		},
		zoomIn() {
			this.zoomLevel += this.zoomFactor;
			let cameraPosition = this.camera.position.clone();
			let currentTarget = this.controls.target.clone();
			let newPosition = cameraPosition
				.addVectors(
					cameraPosition,
					this.camera.getWorldDirection(currentTarget).multiplyScalar(this.zoomFactor)
				)
				.clone();

			new TWEEN.Tween(this.camera.position)
				.to(
					{
						x: newPosition.x,
						y: newPosition.y,
						z: newPosition.z,
					},
					500
				)
				.easing(TWEEN.Easing.Cubic.Out)
				.start();
		},
		zoomOut() {
			this.zoomLevel -= this.zoomFactor;
			let cameraPosition = this.camera.position.clone();
			let currentTarget = this.controls.target.clone();
			let newPosition = cameraPosition
				.addVectors(
					cameraPosition,
					this.camera.getWorldDirection(currentTarget).multiplyScalar(-this.zoomFactor)
				)
				.clone();

			new TWEEN.Tween(this.camera.position)
				.to(
					{
						x: newPosition.x,
						y: newPosition.y,
						z: newPosition.z,
					},
					500
				)
				.easing(TWEEN.Easing.Cubic.Out)
				.start();
		},
		initCamera() {
			this.camera.position.set(-3, 1, 0);
			this.camera.lookAt(new THREE.Vector3(0, 0, 50));
		},
		resetCamera() {
			this.flyToPoi(new THREE.Vector3(0, 1, 2.5), new THREE.Vector3(0, 0.5, 0));
		},
		initOrbitControls() {
			// create orbit this.controls
			this.controls.target.set(0, 0.5, 0);
			this.controls.enableDamping = true;
			this.controls.dampingFactor = 0.05;
			this.controls.minDistance = 0.8;
			this.controls.maxDistance = 5;
			this.controls.minPolarAngle = Math.PI / 4;
			this.controls.maxPolarAngle = (Math.PI / 2.5) * 2;
			this.controls.update();
		},
		reset() {
			this.resetCamera();
			this.initOrbitControls();
		},
		rotateLeft() {
			// autoRotateSpeed: positive number -> right, negative number -> left
			if (this.autoRotate) {
				this.controls.autoRotate = false;
				this.autoRotate = false;
				if (this.rotateLeftActive) {
					this.controls.autoRotateSpeed = 2;
				} else if (this.rotateRightActive) {
					this.controls.autoRotateSpeed *= 1;
				}
			} else {
				this.controls.autoRotate = true;
				this.controls.autoRotateSpeed *= -1;
				this.rotateLeftActive = true;
				this.rotateRightActive = false;
				this.autoRotate = true;
			}
		},
		rotateRight() {
			// autoRotateSpeed: positive number -> right, negative number -> left
			if (this.autoRotate) {
				this.controls.autoRotate = false;
				this.autoRotate = false;
				if (this.rotateRightActive) {
					this.controls.autoRotateSpeed = 2;
				} else if (this.rotateLeftActive) {
					this.controls.autoRotateSpeed *= -1;
				}
			} else {
				this.controls.autoRotate = true;
				this.controls.autoRotateSpeed *= 1;
				this.rotateRightActive = true;
				this.rotateLeftActive = false;
				this.autoRotate = true;
			}
		},
		openFullscreen() {
			console.log('openFullscreen');
			if (this.isFullscreen && this.touched) {
				return;
			} else if (this.isFullscreen && !this.touched) {
				this.touched = true;
				return;
			}
			this.touched = false;
			this.isFullscreen = true;

			this.$nextTick(() => {
				this.initPois();
				this.orbitControls.enabled = true;
				this.reset();
				window.setTimeout(() => {
					this.onWindowResize();
				}, 100);
			})

		},
		closeFullscreen() {
			console.log('closeFullscreen');
			this.isFullscreen = false;
			this.orbitControls.enabled = false;
			this.activePoi = false;
			this.rotateLeft();
			this.removeAllPois();
			window.setTimeout(() => {
				this.onWindowResize();
			}, 100);
		},

		intersectionCallback(entries) {
			entries.forEach((entry) => {
				this.visible = entry.isIntersecting;
			});
		},
	},
};
</script>

<style lang="less">
.objViewer {
	height: 100%;
	height: 30vh;
	width: 100%;
	background-color: rgb(255, 255, 255);
	background-image: url('/assets/object-viewer/bgImg.png');
	background-position: center;
	background-size: cover;

	canvas {
		position: relative;
	}
}

.objViewer_fullscreen {
	position: absolute;
	width: 100vw;
	height: 100vh;
	top: 0;
	z-index: 1000;

	canvas {
		width: 100vw;
		height: 100vh;
	}
}

.objViewer__threeJSWrapper {
	height: 100%;
}

.objViewer_poi {
	position: absolute;
	background: rgb(64, 158, 105);
	background-image: url("./assets/object-viewer/svg/OpenPoi.svg");
	border-radius: 50%;
	height: 2.25rem;
	width: 2.25rem;
	transition: border 400ms ease-in-out;
	transform: translate(-50%, -50%);
}

.hidden {
	display: none;
}

.active .objViewer_poi {
	background-image: url("./assets/object-viewer/svg/ClosePoi.svg");
}

.objViewer_poi-label {
	position: absolute;
	width: 10rem;
	left: 1rem;
	color: rgb(117, 235, 190);
}

.controls {
	position: absolute;
	display: flex;
	justify-content: center;
	gap: 5px;
}

.info_overlay {
	position: absolute;
	bottom: 1rem;
	right: 1rem;
	left: 1rem;
	background: white;
	border: 10px solid rgb(255, 255, 255);
	height: calc(100vh / 3);
	color: rgb(0, 0, 0);
	overflow: scroll;
	text-overflow: ellipsis;
	z-index: 100;
}

.fullscreen-bttn {
	position: absolute;
	background-color: rgb(255, 255, 255);
	right: 0.8rem;
	top: 0.8rem;
	height: 2.6rem;
	width: 2.6rem;
	border-radius: 500px;
}

.center-button {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.shake {
	height: 5rem;
	width: 5rem;
	border-radius: 500px;
	background-color: rgb(255, 255, 255);
	animation: objViewer_shake 5s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
	transform: translate3d(0, 0, 0);
	animation-iteration-count: infinite;
}

@keyframes objViewer_shake {

	10%,
	90% {
		transform: translate3d(-1px, 0, 0);
	}

	20%,
	80% {
		transform: translate3d(2px, 0, 0);
	}

	30%,
	50%,
	70% {
		transform: translate3d(-4px, 0, 0);
	}

	40%,
	60% {
		transform: translate3d(4px, 0, 0);
	}
}
</style>
