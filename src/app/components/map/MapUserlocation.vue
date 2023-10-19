<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { Pin } from './pin';
import { GeolocateControl } from 'maplibre-gl'
import MapPin from './MapPin.vue';

export default defineComponent({
	components: {
		MapPin
	},
	props: {
		latlng: {
			type: null || Object as PropType<Pin>,
			default: null
		},
		lazy: {
			type: Boolean,
			default: false
		},
		userlocate: {
			type: Boolean,
			default: false
		},
	},
	watch: {
		latlng(latlng) {
			console.log("update", latlng);
		},
		userlocate(newValue: Boolean) {
			if(newValue) {
				this.useMaplibreUserPosition();
			} else {
				this.stopMaplibreUserPosition();
			}
		}
	},
	inject: [
		'map'
	],
	emits: [
		'userlocation-init',
		'userlocation-request'
	],
	data() {
		return {
			geolocateControl: null
		};
	},
	mounted() {
		if (this.userlocate) {
			this.useMaplibreUserPosition();
		}
	},
	updated() { 

	},
	unmounted() {
		this.stopMaplibreUserPosition();
	},
	methods: {
		stopMaplibreUserPosition() {
			if (this.geolocateControl) {
				this.map.removeControl(this.geolocateControl);
				this.geolocateControl = null;
			}
		},
		useMaplibreUserPosition() {
			this.$nextTick(() => {
				if (!this.geolocateControl) {
					this.geolocateControl = new GeolocateControl({
						positionOptions: {
							enableHighAccuracy: true,
						},
						// When active the map will receive updates to the device's location as it changes.
						trackUserLocation: false,
						showAccuracyCircle: true,
					})
				}

				this.map.addControl(this.geolocateControl);
			});
		},
		record() {

		}
	}
});
</script>

<template>
	<MapPin v-if="latlng && !userlocate" :latlng="latlng" ><slot><div class="fgMap__userposition"></div></slot></MapPin>
</template>

<style>
	.fgMap__userposition {
		padding: 0.5rem;
		background-color: #216bff;
		color: #fff;
		border: solid 2px #fff;
		border-radius: 100vmax;
		display: inline-block;
		min-width: 16px;
		min-height: 16px;
		aspect-ratio: 1 / 1;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
	}
</style>
