<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { Pin } from './pin';
import maplibregl, { Map, MapOptions, PositionAnchor, Marker, StyleSpecification, MarkerOptions } from 'maplibre-gl'

export default defineComponent({
	props: {
		latlngFrom: {
			type: Object as PropType<Pin>,
			required: true,
			// eslint-disable-next-line vue/require-valid-default-prop
			default: {
				'id': '1',
				'lat': 51.322682497163214,
				'lng': 12.681674610218947
			}
		},
		latlngTo: {
			type: Object as PropType<Pin>,
			required: true,
			// eslint-disable-next-line vue/require-valid-default-prop
			default: {
				'id': '2',
				'lat': 50.322682497163214,
				'lng': 1.681674610218947
			}
		},
		colorFrom: {
			type: String,
			default: "#41682d",
		},
		id: {
			type: String,
			default: '1',
		},
		colorTo: {
			type: String,
			default: "#41682d",
		},
		lineWidth: {
			type: Number,
			default: 2,
		},
		draggable: {
			type: Boolean,
			default: false,
		},
		zIndex: {
			type: Number,
			default: 0
		},
		anchor: {
			type: String as PropType<PositionAnchor>,
			// 'center', 'top', 'bottom', 'left', 'right', 'top-left', 'top-right', 'bottom-left', 'bottom-right'
			default: 'center'
		},
		isHighlighted: {
			type: Boolean,
			default: false,
		}
	},
	// eslint-disable-next-line vue/order-in-components
	inject: [
		'map',
		'floorplan',
		'floorplanVisible'
	],
	emits: [
		'pin-drag',
		'pin-dragstart',
		'pin-dragend',
		'pin-click',
		'pin-addedToMap',
	],
	data() {
		return {
			isDragging: false,
			maplibre: this.map,
			hover: false,
			marker: null as null | Marker, // type: null | object
			lineGeoJson: null,
		};
	},
	watch: {
		latlng: {
			handler(newValue) {
				if (this.marker) {
					this.marker.setLngLat([newValue.lng, newValue.lat]);
				}
			},
			deep: true
		},
		draggable(newValue) { },
		zIndex(newValue) {
			this.marker.getElement().style.zIndex = (1000 + newValue)
		}
	},
	mounted() {

		const vm = this;

		this.$nextTick(() => {
			this.geojson = {
				type: 'Feature',
				geometry: {
					type: 'LineString',
					coordinates: [
						[this.latlngFrom.lng, this.latlngFrom.lat],
						[this.latlngTo.lng, this.latlngTo.lat]
					],
				},
				properties: {},
			};

			this.map.on('load', function () {
				vm.addLine(vm.latlngFrom, vm.latlngTo);
			});
		});

	},
	updated() {

		if (!this.$el.children.length) {
			// DOM Element is not recreated by vue, nothing to do.
			return false;
		}



		this.$nextTick(() => {
			if(this.map.getSource('line' + this.id)) {
				this.map.removeLayer('line' + this.id)
				this.map.removeSource('line' + this.id)
			}
			// this.marker.remove();
			this.addLine(this.latlngFrom, this.latlngTo);
		});
	},
	//beforeUnmount() {
	unmounted() {

		if (this.map) {
			if(this.map.getSource('line' + this.id)) {
				this.map.removeLayer('line' + this.id)
				this.map.removeSource('line' + this.id)
			}
		}
	},
	methods: {
		addLine(latlngFrom: any, latlngTo: any) {

			this.map.addSource('line' + this.id, {
				type: 'geojson',
				lineMetrics: true,
				data: this.geojson
			});
			this.map.addLayer({
				id: 'line' + this.id,
				type: 'line',
				source: 'line' + this.id,
				layout: {
					'line-cap': 'round',
					'line-join': 'round',
				},
				paint: {
					'line-color': this.colorFrom,
					'line-width': this.lineWidth,
					'line-gradient': [
						'interpolate',
						['linear'],
						['line-progress'],
						0,
						this.colorFrom,
						1,
						this.colorTo
					]
				},
			});
		},
		pinClicked(e: Event) {
			e.stopPropagation();
		},
	}
});
</script>

<template>
	<div aria-hidden="true" v-show="false">
		{{ color }}
		<!-- parentDiv - keep on original DOM location for vue update -->
		<div class="fgMap__pin" :class="{
			'fgMap__pin--draggable': draggable,
			'fgMap__pin--dragging': isDragging,
			'map-pin_inBackground': !isHighlighted
		}" :style="{
	zIndex: hover ? '2000 !important' : '1000'
}" @click="$emit('pin-click', { id, event: $event })" @mouseover="hover = true" @mouseleave="hover = false">
			<slot>
				<div class="fgMap__pinContent" :style="'background:' + color">{{ label }}</div>
			</slot>
		</div>
	</div>
</template>

<style>
.fgMap__pinContent {
	padding: 0.5rem;
	background-color: #1986CA;
	color: #fff;
	border: solid 2px #fff;
	border-radius: 100vmax;
	display: inline-block;
	width: 10px;
	height: 10px;
	aspect-ratio: 1 / 1;
	display: flex;
	align-items: center;
	justify-content: center;
	text-align: center;
}

.fgMap__pin {
	display: inline-block;
	/* fill: #465b4a; */
	stroke: white;
	/* filter: drop-shadow(1px 1px 1px #0000001a); */
	width: 1px;
	height: 1px;
}

.fgMap__pin--draggable {
	position: relative;
}

.fgMap__pin:hover {
	z-index: 10;
}

.fgMap__pin--draggable .fgMap__pinContent {
	background-color: red;
	min-width: 45px;
	min-height: 45px;
	transition: min-width .2s, min-height .2s;
}

.fgMap__pin--draggable .fgMap__pinContent:hover {
	min-width: 5px;
	min-height: 5px;
}

.map-pin_inBackground {
	z-index: 0 !important;
}
</style>
