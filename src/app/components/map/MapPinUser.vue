<script lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import { Pin } from './pin';

export default defineComponent({
	props: {
		pin: {
			type: Object as PropType<Pin>,
			required: true,
		},
	},
	emits: ['click-user-pin'],
	methods: {
		userPinClicked(e: Event) {
			e.stopPropagation();

			this.$emit('click-user-pin', this.pin);
		},
	},
});
</script>

<template>
	<!-- Outer div MUST not be changed - maplibre gets confused if this element is changes in any way -->
	<div>
		<div class="container">
			<button class="user-location-pin" @click="userPinClicked"></button>
			<div class="ping ping-animation"></div>
		</div>
	</div>
</template>

<style lang="less" scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
}

@pin-size: 12px;
.user-location-pin {
	height: @pin-size;
	width: @pin-size;
	padding: 0.5rem;
	background-color: rgb(78, 73, 214);
	color: #fff;
	border: solid 3px #fff;
	border-radius: 100vmax;
	z-index: 1;
}

.ping {
	position: absolute;
	height: @pin-size * 4;
	width: @pin-size * 4;
	border-radius: 100vmax;
	background-color: rgb(78, 73, 214);
	z-index: -1;
}

.ping-animation {
	animation: ping 4s ease-in-out infinite both;
}

@keyframes ping {
	0% {
		transform: scale(0.2);
		opacity: 0.8;
	}
	80% {
		transform: scale(1.2);
		opacity: 0;
	}
	100% {
		transform: scale(2.2);
		opacity: 0;
	}
}
</style>
