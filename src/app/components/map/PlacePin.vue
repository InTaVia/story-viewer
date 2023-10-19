<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { Pin } from './pin';

import PlaceSVG from '../../assets/svgs/place.svg';


export default defineComponent({
	components: {
		PlaceSVG
	},
	props: {
		hoverText: {
			type: String,
			default: "empty",
			required: false
		},
		hoverText2: {
			type: String,
			default: "empty",
			required: false
		},
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
		<div @mouseover="hover = true" @mouseleave="hover = false" class="place-pin">
			<PlaceSVG></PlaceSVG>

			<div class="place-pin-hover" :class="{hover: hover}">
				<p> {{ hoverText }} </p>
				<!-- <p> {{ hoverText2 }} </p> -->
			</div>
		</div>
	</div>
</template>

<style lang="less" scoped>

@import url('../../styles/styles.less');


.place-pin {
	width: 30px; 
	height: 30px;
}

.place-svg {
	width: 30px;
	height: 30px;
	fill: @place-primary;
	stroke: @place-highlighted;
	stroke-width: 2px;
	position: absolute;
	left: -15px;
	top: -30px;
	transition: all .5s;

}
.place-svg:hover {
	width: 30px;
	height: 30px;
	fill: @place-primary;
	stroke: @place-highlighted;
	stroke-width: 2px;
	position: absolute;
	left: -15px;
	top: -30px;
	transition: all .5s;
}

.place-pin-hover {
	font-family: 'Poppins', sans-serif;
	position: absolute;
	top: -36px;
	background: #41682d;
	color: #fff;
	height: 3em;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 1em;
	transform: translate(-50%, -100%);
	border-radius: 5px;
	font-weight: 600;
	width: max-content;
	max-width: 200px;
	height: max-content;
	pointer-events: none;

}

.place-pin-hover {
	opacity: 0;
	transition: all .5s;
}
.place-pin-hover.hover {
	opacity: 1;
	transition: all .5s;
}

</style>
