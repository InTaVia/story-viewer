<script lang="ts">
import { defineComponent, computed } from 'vue';
import maplibregl from 'maplibre-gl'
// import type { PropType } from 'vue';


export default defineComponent({
	components: {
	},
	props: {
		fitOnLoad: {
			type: Boolean,
			default: false
		},
		fitPadding: {
			type: Object,
			default: {top: 50, bottom: 50, left: 50, right: 50}
		},
		layerId: {
			type: String,
			default: ''
		},
		url: {
			type: String,
			required: true,
		},
		position: {
			type: Array,
			required: true,
		},
		visible: {
			type: Boolean,
			default: true
		},
	},
	watch: {
		visible(newValue) {
			this.isVisible = newValue;
			this.map.setLayoutProperty(
				this.layername,
				'visibility',
				newValue ? 'visible' : 'none'
			);
		}
	},
	inject: [
		'map'
	],
	provide() {
		return {
			floorplan: computed(() => this.layername),
			floorplanVisible: computed(() => this.isVisible),
		}
	},
	emits: [
	],
	data() {
		return {
			layername: this.layerId || ("layer_" + (Math.random() + 1).toString(36).substring(7)),
			sourcename: ("source_" + (Math.random() + 1).toString(36).substring(7)),
			isVisible: this.visible,
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.addFloor();
		})
	},
	updated() {
	},
	beforeUnmount() {
		this.removeLayer();
	},
	expose: [
		'fitToViewport',
	],
	methods: {
		fitToViewport(padding = null) {
			this.map.fitBounds(
				new maplibregl.LngLatBounds(
					this.position[0],
					this.position[2]
				), {
					duration: 0,
					bearing: this.map.getBearing(),
					padding: padding || this.fitPadding,
				}
			);
		},
		addFloor() {
			if (!this.map) {
				console.warn("Map not found, cancle addFloor.")
				return
			}

			let counter = 0;

			// We have to wait for the map styling, else we will get a error
			// "style not ready" and the route will not show up.
			// https://github.com/mapbox/mapbox-gl-js/issues/2268#issuecomment-401979967
			const waiting = () => {
				if (!this.map.isStyleLoaded()) {
					if ( counter++ < 100 ) { // ~ 10 sec
						window.setTimeout(waiting, 100);
					} else {
						console.error("Adding layer failed, map styling took more then 10 seconds.")
					}
				} else {

					this.map.addSource(this.sourcename, {
						type: 'image',
						url: this.url,
						coordinates: [
							[this.position[0].lng, this.position[0].lat],
							[this.position[1].lng, this.position[1].lat],
							[this.position[2].lng, this.position[2].lat],
							[this.position[3].lng, this.position[3].lat],
						],
					})
					// add source as layer to map
					this.addLayer()

					if(this.fitOnLoad) {
						this.fitToViewport();
					}
				}
			};
			waiting();
		},
		addLayer() {
			this.map.addLayer({
				id: this.layername,
				type: 'raster',
				source: this.sourcename,
				layout: {
					'visibility': (this.visible ? 'visible' : 'none')
				},
			});

			//this.map.setLayoutProperty(this.layername, 'visibility', this.visible ? 'visible' : 'none');

			//if (this.fitOnLoad) {
			//	this.fitRouteInView(50, this.fitRouteLinear, this.fitRouteDuration);
			//}
		},
		removeLayer() {
			if (!this.layername || !this.map.getLayer(this.layername)) {
				return false;
			}

			this.map.removeLayer(this.layername);
			return true;
		},
	}
});
</script>

<template><slot v-if="isVisible"></slot></template>