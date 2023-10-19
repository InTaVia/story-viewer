<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { Pin } from './pin';

import EventSVG from '../../assets/svgs/event.svg';
import EventProductionSVG from '../../assets/svgs/event-production.svg';
import { Circle } from 'troisjs';


export default defineComponent({
	components: {
		EventSVG,
		EventProductionSVG
	},
	props: {
		hoverText: {
			type: String,
			default: "empty",
			required: false
		},
		hoverHeading: {
			type: String,
			default: "empty",
			required: false
		},
		color: {
			type: String,
			default: "#41682d",
		},
		colorHighlighted: {
			type: String,
			default: "#41682d",
		},
		pinType: {
			type: String,
			default: "dot",
		},
		isHighlighted: {
			type: Boolean, 
			default: false,
		}
	},
	data() {
		return {
			hover: false,
		}
	},
	methods: {
	},
});
</script>

<template>
	<!-- Outer div MUST not be changed - maplibre gets confused if this element is changes in any way -->
	<div>
		<div class="place-pin">
			<EventSVG v-if="pinType == 'dot'" :style="{
				fill: color,
				stroke: colorHighlighted
			}" @mouseover="hover = true" @mouseleave="hover = false"> </EventSVG>
			<EventProductionSVG v-else-if="pinType == 'rectangle'" :style="{
					fill: color,
					stroke: colorHighlighted
				}" @mouseover="hover = true"
				@mouseleave="hover = false"> </EventProductionSVG>
					<div class="place-pin-hover" :class="{ hover: hover || isHighlighted }" :style="'background-color:' + colorHighlighted">
						<span class="hover-heading"> {{ hoverHeading }} </span>
						<span class="hover-text"> {{ hoverText }} </span>
					</div>
		</div>
	</div>
</template>

<style lang="less" scoped>
@import url('../../styles/styles.less');


.place-pin {
	width: 20px;
	height: 20px;
}

.event-svg,
.production-svg {
	width: 30px;
	height: 30px;
	// fill: @event-primary;
	stroke: @event-highlighted;
	stroke-width: 2px;
	position: absolute;
	left: -15px;
	top: -20px;
	transition: all .5s;

}



.selected {
	width: 100px; 
	height: 100px;
}


.event-svg:hover,
.production-svg:hover {
	width: 30px;
	height: 30px;
	fill: @event-primary;
	stroke: @event-highlighted;
	stroke-width: 2px;
	position: absolute;
	left: -15px;
	top: -20px;
	transition: all .5s;
}

.place-pin-hover {
	font-family: 'Poppins', sans-serif;
	position: relative;
	top: -36px;
	background: #41682d;
	color: #fff;
	height: 3em;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;
	padding: 1em;
	transform: translate(-50%, -100%);
	border-radius: 5px;
	font-weight: 600;
	width: max-content;
	max-width: 200px;
	height: max-content;
	pointer-events: none;
	z-index: 9999999999999999999;

	p {
		color: white;
		margin: 0;
	}
}

.place-pin-hover .hover-heading {
	font-weight: 100;
}
.place-pin-hover .hover-text {
	font-weight: 600;
}

.place-pin-hover {
	opacity: 0;
	transition: all .5s;
}

.place-pin-hover.hover {
	z-index: 999999999;
	opacity: 1;
	transition: all .5s;

}
</style>
