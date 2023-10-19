<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { Pin } from './pin';
import maplibregl from 'maplibre-gl'

export default defineComponent({
	components: {
	},
	props: {
		geojson: {
			type: Object,
			default: null
		},
		routeColor: {
			type: String,
			default: "#000"
		},
		routeWidth: {
			type: Number,
			default: 3
		},
		visible: {
			type: Boolean,
			default: true
		},
		layerName: {
			type: String,
			default: ''
		},
		fitRouteDuration: {
			type: Number,
			default: null
		},
		fitRouteLinear: {
			type: Boolean,
			default: false
		},
		fitOnLoad: {
			type: Boolean,
			default: false,
		}
	},
	watch: {
		visible(newValue) {
			this.map.setLayoutProperty(this.mylayername, 'visibility', newValue ? 'visible' : 'none');
		}
	},
	inject: [
		'map'
	],
	emits: [
	],
	data() {
		return {
			randomstring: (Math.random() + 1).toString(36).substring(7),
			mylayername: this.layerName || ("layer_" + (Math.random() + 1).toString(36).substring(7)),
			myroutename: 'route_' + (Math.random() + 1).toString(36).substring(7),
			mygeojson: JSON.parse(JSON.stringify(this.geojson))
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.loadRoute(this.mygeojson);
		})
	},
	updated() {
		if (this.map.getLayer(this.mylayername)) {
			this.map.removeLayer(this.mylayername);
			this.map.removeSource(this.myroutename);
		}
	},
	beforeUnmount() {
		if (this.map.getLayer(this.mylayername)) {
			this.map.removeLayer(this.mylayername);
			this.map.removeSource(this.myroutename);
		}
	},
	expose: [
		'fitRouteInView',
		'getBoundRegion'
	],
	methods: {
		fitRouteInView(padding = {top: 50, left: 50, right: 50, bottom: 50}, linear = false, duration = null) {
			let options = {
				padding: padding,
				linear: linear,
				bearing: this.map.getBearing(),
			}

			if (duration !== null) {
				options.duration = duration;
			}

			this.map.fitBounds(this.getBoundRegion(), options);
		},
		getBoundRegion() {
			const coordinates = this.geojson.features[0].geometry.coordinates;

			// Create a 'LngLatBounds' with both corners at the first coordinate.
			const bounds = new maplibregl.LngLatBounds(
				coordinates[0],
				coordinates[0]
			);

			coordinates.forEach((coord) => {
				bounds.extend(coord);
			})

			return bounds;
		},
		loadRoute(route: string | object) {
			// We have to wait for the map styling, else we will get a error
			// "style not ready" and the route will not show up.
			// https://github.com/mapbox/mapbox-gl-js/issues/2268#issuecomment-401979967
			let counter = 0;

			const waiting = () => {
				if (!this.map.isStyleLoaded()) {
					if ( counter++ < 100 ) { // ~ 10 sec
						window.setTimeout(waiting, 100);
					} else {
						console.error("Loading for the path failed, map styling took more then 10 seconds.")
					}
				} else {
					if (!this.map.getSource(this.myroutename)) {
						// Add route data to map
						this.map.addSource(this.myroutename, {
							type: 'geojson',
							data: route,
						})
					}

					// Add route style to map
					this.map.addLayer({
						id: this.mylayername,
						type: 'line',
						source: this.myroutename,
						layout: {
							'line-join': 'round',
							'line-cap': 'round',
						},
						paint: {
							'line-color': this.routeColor,
							'line-width': this.routeWidth,
						},
					})

					this.map.setLayoutProperty(this.mylayername, 'visibility', this.visible ? 'visible' : 'none');

					if (this.fitOnLoad) {
						this.fitRouteInView(50, this.fitRouteLinear, this.fitRouteDuration);
					}
				}
			};
			waiting();
		},
	}
});
</script>

<template></template>