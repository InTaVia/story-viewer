<template>
	<div ref="timelineContainer" class="timeline-container">
		<TimelineView ref="timelineView" v-if="visWidth > 0 && visHeight > 0" :width="visWidth" :height="visHeight" :data-point-size="10" :timeline-events="timelineEvents"></TimelineView>
	</div>
	<button class="testbutton" @click="callChildMethod">Fly To Events</button>
</template>


<script setup lang="ts">

import { ref, onMounted, onUnmounted, defineExpose, reactive, computed, withScopeId } from 'vue';
import TimelineView from '../components/timeline/TimelineView.vue';
import data from '../assets/data/visData.js';
import _ from 'lodash';

const props = defineProps(['cardData']);

const timelineContainer = ref(null); 
let visWidth = ref(0); 
let visHeight = ref(0); 

let dataOld = ref([]);
dataOld = _.cloneDeep(data);

const timelineView = ref(null)

const callChildMethod = () => {
	timelineView.value.flyToEvents(["data-duerer_english-macro-ev-001"], true);
}

let eventData = data;

// prepare dates
_.forEach(eventData, (e) => {
	e.date = new Date(e.startDate);
    e.start = e.startDate;
    e.end = e.startDate;
});

eventData = _.orderBy(data, ['date'], ['asc']);
let timelineEvents = ref(eventData);

// set one to highlighted
timelineEvents.value[1].isHighlighted = false; 

window.setTimeout(()=>{
	timelineEvents.value[2].isHighlighted = false; 
},2000)

onMounted(()=> {
	// set svg width and height
	visWidth.value = timelineContainer.value.clientWidth; 
	visHeight.value = timelineContainer.value.clientHeight; 
})




</script>

<style lang="less" scoped>

.timeline-container {
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
