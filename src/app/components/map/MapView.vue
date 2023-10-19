<script lang="ts">
// import typescript base from vue
import { defineComponent } from 'vue'
import { computed } from '@vue/reactivity';
import type { PropType } from 'vue'

// Maplibre imports
import maplibregl, { Map, MapOptions, Marker, StyleSpecification } from 'maplibre-gl'
// import '../../../node_modules/maplibre-gl/dist/maplibre-gl.css'
import '../../../../node_modules/maplibre-gl/dist/maplibre-gl.css';

// Library imports
//import core from '../../core'

// Pin components import
import { Pin } from './Pin'

// Map JSONs
import MapStyles from './style.json'

let core = {
	getFileURL: (file: string, debug?: boolean) => { return file; }
}

type Position = {
	lat: number
	lng: number
}

type RenderedPin = {
	pin: Pin
	element: Marker
}

type Floor = {
	url: string
	position: [Position, Position, Position, Position]
	// top left, top right, bottom right, bottom left
}

export default defineComponent({
	components: {
	},
	provide() {
		return {
			map: computed(() => this.map),
		}
	},
	props: {
		// Map settings, defined from MapLibre
		// https://maplibre.org/maplibre-gl-js-docs/api/map/
		mapSettings: {
			type: Object as PropType<MapOptions>,
			default: null,
		},
		// Don't show map tiles in background (mostly for floorplan )
		hideMapTiles: {
			type: Boolean,
			default: false,
		},
		useOfflineTiles: {
			type: Boolean,
			default: false,
		},
		pitchWithRotate: {
			type: Boolean,
			default: true,
		},
		dragRotate: {
			type: Boolean,
			default: true,
		},
		touchZoomRotate: {
			type: Boolean,
			default: true,
		},
		dragPan: {
			type: Boolean,
			default: true,
		},
		touchPitch: {
			type: Boolean,
			default: true,
		},
		attributionControl: {
			type: Boolean,
			default: false,
		},
		center: {
			type: Object || Array,
			default: () => ([16.34273428273333, 48.20274178513843]) // { lng: 16.34273428273333, lat: 48.20274178513843 } or [16.34273428273333, 48.20274178513843]
		},
		padding: {
			type: Object || Array,
			default: null
		},
		paddingAnimationSpeed: {
			type: Number,
			default: 0
		},
		maxBounds: {
			type: Array,
			default: null // [[-73.9876, 40.7661], [-73.9397, 40.8002]]
		},
		defaultZoom: {
			type: Number,
			default: null,
		},
		defaultBearing: {
			type: Number,
			default: null,
		},
		defaultPitch: {
			type: Number,
			default: null,
		},
		minZoom: {
			type: Number,
			default: null,
		},
		maxZoom: {
			type: Number,
			default: null,
		},
	},
	emits: [
		'click-map',
		'map-zoom',
		'map-load',
	],
	data() {
		return {
			map: null as Map | null | any,
			renderedPins: [] as RenderedPin[],
			userPositionMarker: null as Marker | null,
			activePinIndex: this.initActivePinIndex as number | null,
			onlineTilesUrl: MapStyles.sources.fluxguide.tiles[0],
		}
	},
	setup() {

	},
	watch: {
		padding: {
			handler(newValue) {
				if (!this.map) {
					console.warn('Error setting padding, map not loaded.');
					return false;
				}

				console.info("Setting padding", this.paddingAnimationSpeed, this.paddingAnimationSpeed);

				if (this.paddingAnimationSpeed) {
					this.map.easeTo({ padding: newValue, duration: this.paddingAnimationSpeed })
				} else {
					this.map.setPadding(newValue);
				}
				return true;
			},
			deep: true
		},
		dragRotate(newValue) {
			this.toggleFeature('dragRotate', !!newValue);
		},
		touchZoomRotate(newValue) {
			this.toggleFeature('touchZoomRotate', !!newValue);
		},
		dragPan(newValue) {
			this.toggleFeature('dragPan', !!newValue);
		},
		touchPitch(newValue) {
			this.toggleFeature('touchPitch', !!newValue);
		},
		attributionControl(newValue) {
			this.toggleFeature('attributionControl', !!newValue);
		},
		userPosition(newPosition) {
			this.setUserPosition(newPosition)
		},
		clearLines() {
			let sources = this.map.getStyle().sources
			sources.forEach(source => {
				if (source.id.startsWith('line_')) {
					this.map.removeSource(source.id);
				}
			})
		},
		useOfflineTiles(newOffline) {
			if (newOffline) {
				MapStyles.sources.fluxguide.tiles = [core.getFileURL(this.onlineTilesUrl)]
			} else {
				MapStyles.sources.fluxguide.tiles = [this.onlineTilesUrl]
			}
			this.map?.setStyle(MapStyles as StyleSpecification)
		},
	},
	mounted() {
		this.initMap();
		window.map = this.map;

		/*window.setTimeout(() => {
			console.log('style', this.map, this.map.getStyle().layers);
		}, 2000);*/
		/*window.setTimeout(() => {
			let map = this.map;
			map.easeTo({
				padding: {
					bottom: 300,
				},
				duration: 1000 // In ms. This matches the CSS transition duration property.
			});
		}, 1000)*/
	},
	methods: {
		resizeMap(): void {
			this.map.resize();
		},
		getMapBoundsFromCoordinates(coordinates) {
			// Create a 'LngLatBounds' with both corners at the first coordinate.
			const bounds = new maplibregl.LngLatBounds(
				coordinates[0],
				coordinates[1]
			);
			coordinates.forEach((coord) => {
				if (!Array.isArray(coord)) {
					console.warn('getMapBoundsFromCoordinates: Possible wrong cordinate format. Format should be [lng, lat]', coord)
				}
				bounds.extend(coord);
			})

			return bounds;
		},
		fitMapBounds(coordinates, options = {}) {
			let bounds = this.getMapBoundsFromCoordinates(coordinates);
			let defaultOptions = {
			}
			options = { ...defaultOptions, ...options }
			this.map.fitBounds(bounds, options);
		},
		toggleFeature(feature: string, state: boolean) {
			if (!this.map) {
				console.warn('[toggleFeature] map not loaded.');
			}
			this.map[feature][state ? 'enable' : 'disable']();
		},
		initMap() {
			//MapStyles.glyphs = core.getFileURL('assets/map/fonts/{fontstack}/{range}.pbf', false)

			MapStyles.layers = MapStyles.layers.filter((item) => {
				return [
					'poi_label', 'poi_label-en', 'place_label_other-en', 'place_label_other', 'place_label_city', 'place_label_city-en',
					'country_label', 'country_label-en',
					'road_major_label', 'road_major_label-en',
					'railway', 'housenumber'
				].indexOf(item.id) === -1
			})

			// set default map settings
			const defaultSettings: MapOptions = {
				zoom: this.defaultZoom || 12,
				minZoom: this.minZoom,
				maxZoom: this.maxZoom,
				bearing: this.defaultBearing,
				pitch: this.defaultPitch,
				style: MapStyles,
				center: this.center, // Kandlgasse 15
				attributionControl: this.attributionControl,
				pitchWithRotate: this.pitchWithRotate,
				dragRotate: this.dragRotate,
				touchZoomRotate: this.touchZoomRotate,
				dragPan: this.dragPan,
				touchPitch: this.touchPitch,
				/*transformRequest: (url, resourceType) => {

					console.log("transformRequest", url);
					return {
						url: url, //'https://maptiles.fluxguide.com/data/v3/12/2233/1420.pbf', //url + '?v=2',
						headers: { 'my-custom-header': true },
						// headers(Object): The headers to be sent with the request.
						// method(string): Request method 'GET' | 'POST' | 'PUT' .
						// body(string): Request body.
						// type(string): Response body type to be returned 'string' | 'json' | 'arrayBuffer'
						// credentials(string): 'same-origin'|'include' Use 'include' to send cookies with cross-origin requests.
						// collectResourceTiming(boolean): If true, Resource Timing API information will be collected for these transformed requests and returned in a resourceTiming property of relevant data events.
					}
				}*/
			}

			if (this.maxBounds) {
				defaultSettings.maxBounds = this.maxBounds;
			}

			// Merge settings (mapSetting overrides defaultSettings)
			const mergedSettings = {
				...defaultSettings,
				...this.mapSettings,
				container: this.$el.parentNode.querySelector('.map-container__map'),
			}

			// Override style with empty sources and layers
			if (this.hideMapTiles) {
				mergedSettings.style = { version: 8, sources: {}, layers: [] }
			}

			// the following is an example of a way to return an error when trying to load a tile
			maplibregl.addProtocol('mapbox', (params, callback) => {
				callback(new Error(`Mapbox protocol not supported by maplibregl. (${params.url})`));
				return { cancel: () => { } };
			});

			//			maplibregl.clearStorage();

			// Init Map
			// @ts-ignore
			this.map = new maplibregl.Map(mergedSettings)
			window.map = this.map;
			// this.map.showTileBoundaries = true;

			this.map.on('load', (event: any) => {
				this.$emit('map-load', event);
				this.map.resize();
			})
			this.map.on('click', (event: any) => {
				this.$emit('click-map', event);
			})
			this.map.on('zoom', (event: any) => {
				this.$emit('map-zoom', this.map.getZoom());
			})

			if (this.padding) {
				this.map.setPadding(this.padding);
			}
		},
		testMap() {
			//this.map.touchZoomRotate._enabled = !this.map.touchZoomRotate._enabled
			// this.map.touchZoomRotate.disable();
			// this.map.touchZoomRotate.enable();
			// this.map.touchPitch.enable();
			// this.map.touchPitch.disable();

			//this.map.doubleClickZoom.disable();
			//this.map.doubleClickZoom.enable();

			//this.map.doubleClickZoom.disable();
			//this.map.doubleClickZoom.enable();

			//this.map.keyboard.disable();
			//this.map.keyboard.enable();

			//this.map.dragRotate.disable();
			//this.map.dragRotate.enable();

			//this.map.dragPan.disable();
			//this.map.dragPan.enable();

			//this.map.scrollZoom.disable();
			//this.map.scrollZoom.enable();

			//this.map.boxZoom.disable();
			//this.map.boxZoom.enable();
			this.map.showTileBoundaries = true;
		},
		flyTo(position: Position) {
			if (!this.map) {
				console.warn('[flyTo] Map not laoded.');
				return false;
			}
			this.map.flyTo({
				center: [position.lng, position.lat],
			})
		},
	},
})
</script>

<template>
	<div class="map-container">
		<div class="map-container__map"></div>
		<div class="map-container__vuePins">
			<slot></slot>
		</div>
	</div>

	<div class="mapView">
		<div class="mapView__map mapView__map--disabled"></div>
		<div class="mapView__Pins"></div>
	</div>
</template>

<style lang="less">
@import url('../../styles/styles.less');

.map-container,
.map-container__map {
	height: calc(((env(safe-area-inset-top) - 76vh)*-1));
	width: 100%;
	isolation: isolate;
	/* contain: content; */

	@media (min-width: @md) {
		height: 100%;
	}
}

.map-container {
	position: relative;
}

.map-container__vuePins {
	display: none;
}

.mapView {}

.mapView__map {}

.mapView__map--disable {}
</style>
