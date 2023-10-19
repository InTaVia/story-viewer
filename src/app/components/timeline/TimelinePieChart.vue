<template>
	<g ref="pieChart" class="pie-chart"></g>
</template>



<script setup lang="ts">
import { ref, onMounted, watch, defineProps, defineExpose, reactive, computed } from 'vue';
import _ from 'lodash';
import * as d3 from "d3";

const props = defineProps({
	// array of timeline events 
	events: {
		type: Array,
		default: () => []
	},

});







const pieData = ref([10, 20, 30, 40]);  // Sample data

let myData = props.events.map(d => _.cloneDeep(d.data))



let kindCount = {};
myData.forEach(function (event) {
	let kind = event.eventKindProperties.label;
	kindCount[kind] = {
		count: (kindCount[kind]?.count || 0) + 1,
		color: event.color
	}
	return;
	kindCount[kind].count = (kindCount[kind] || 0) + 1;
	kindCount[kind].color = event.color;
});



let dataset = Object.keys(kindCount).map(function (kind) {
	return {
		kind: kind,
		count: kindCount[kind].count,
		color: kindCount[kind].color
	};
});

const pie = d3.pie().value(d => d.count);
const arcs = pie(dataset);

const pieRadius = 15;
const arc = d3.arc()
	.innerRadius(0)
	.outerRadius(pieRadius);

const pieChart = ref(null)

onMounted(() => {
	// ... existing code ...

	const pieG = d3.select(pieChart.value);
	const pieSlices = pieG.selectAll('path')
		.data(pie(dataset))
		.enter().append('path')
		.attr('d', arc)
		.attr('d', d3.arc()
			.innerRadius(15)         // This is the size of the donut hole
			.outerRadius(5)
		)
		.attr('fill', (d, i) => d.data.color)  // Color each slice differently
		.attr('stroke', (d, i) => 'white')  // Color each slice differently
		.attr('stroke-width', (d, i) => '2');  // Color each slice differently
});

</script>