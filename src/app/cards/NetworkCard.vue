<template>
	<div ref="networkContainer" class="network-container">
		<Network v-if="visWidth > 0 && visHeight > 0" :width="visWidth" :height="visHeight" :nodeWidth="5"></Network>
	</div>
</template>

<script setup lang="ts">

import { ref, onMounted, onUnmounted, defineExpose, reactive, computed, withScopeId } from 'vue';
import Network from '../components/network/NetworkView.vue'
import data from '../assets/data/visData.js';
import _ from 'lodash';

const props = defineProps(['cardData']);

const networkContainer = ref(null); 
let visWidth = ref(0); 
let visHeight = ref(0); 

onMounted(()=> {
	console.log('containerWidth and Hight',networkContainer.value.clientWidth, networkContainer.value.clientHeight);
	visWidth.value = networkContainer.value.clientWidth; 
	visHeight.value = networkContainer.value.clientHeight; 
})




</script>

<style lang="less" scoped>

.network-container {
	width: 100%; 
	height: 100%;
}


.testbutton {
	position: absolute;
	left: 0; 
	top: 0; 
	z-index: 999;
}

</style>
