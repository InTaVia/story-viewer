<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { Pin } from './pin';
import maplibregl, { Map, MapOptions, PositionAnchor, Marker, StyleSpecification, MarkerOptions } from 'maplibre-gl'

export default defineComponent({
	props: {
		latlng: {
			type: Object as PropType<Pin>,
			required: true,
		},
		label: {
			type: String,
			default: "",
		},
		color: {
			type: String,
			default: "blue",
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
	watch: {
		latlng: {
			handler(newValue) {
				if (this.marker) {
					this.marker.setLngLat([newValue.lng, newValue.lat]);
				}
			},
			deep: true
		},
		draggable(newValue) {
			this.marker.setDraggable(newValue);

			if (newValue) {
				this.bindDragEvents();
			} else {
				this.unbindDragEvents();
			}
		},
		zIndex(newValue) {
			// this.marker.getElement().style.zIndex = (1000 + newValue)
		}
	},
	data() {
		return {
			isDragging: false,
			maplibre: this.map,
			hover: false,
			marker: null as null | Marker // type: null | object
		};
	},
	mounted() {
		this.$nextTick(() => {
			this.addPin(this.latlng.lng, this.latlng.lat);
			this.bindDragEvents();
		});
	},
	updated() {
		if (!this.$el.children.length) {
			// DOM Element is not recreated by vue, nothing to do.
			return false;
		}

		this.$nextTick(() => {
			this.marker.remove();
			this.addPin(this.latlng.lng, this.latlng.lat);
		});
	},
	//beforeUnmount() {
	unmounted() {
		if (this.map && this.marker) {
			this.marker.remove();
		}
	},
	methods: {
		onDragStart(e: any) {
			this.isDragging = true;

			const lnglat = this.marker.getLngLat();
			this.$emit('pin-dragstart', lnglat);
		},
		onDragEnd(e: any) {
			this.isDragging = false;

			const lnglat = this.marker.getLngLat();
			this.$emit('pin-dragend', lnglat);
		},
		onMove(e: any) {
			// this.$emit('update-position', lnglat);
			this.$emit('pin-drag', e.target.getLngLat());
		},
		addPin(lat: any, lng: any) {
			let markerOptions: MarkerOptions = {
				color: this.color,
				draggable: this.draggable,
				anchor: this.anchor,
			}

			if (this.$slots.default) {
				markerOptions['element'] = this.$el.children[0];
			}

			this.marker = new maplibregl.Marker(markerOptions)

			if (!this.marker) {
				console.error('Create of new marker failed.', this.marker)
				return false;
			}

			// this.marker.getElement().style.zIndex = (1000 + this.zIndex);
			this.marker.setLngLat([this.latlng.lng, this.latlng.lat]).addTo(this.map);
			this.$emit('pin-addedToMap');
		},
		bindDragEvents() {
			if (this.draggable) {
				this.marker.on('dragstart', this.onDragStart);
				this.marker.on('dragend', this.onDragEnd);
				this.marker.on('drag', this.onMove);
				return true;
			}

			return false;
		},
		unbindDragEvents() {
			this.marker.off('dragstart');
			this.marker.off('dragend');
			this.marker.off('drag');
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
		}"
		:style="{
			// zIndex: hover ? '2000 !important' : '1000'
		}"
		@click="$emit('pin-click', { id, event: $event })" @mouseover="hover = true" @mouseleave="hover = false">
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
