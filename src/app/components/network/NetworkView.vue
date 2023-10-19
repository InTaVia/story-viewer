<template>
    <svg ref="myGraph" id="graph" :viewBox="viewBox">

        <g v-for="line in animatedLinks" :key="line.index">
            <line :x1="line.source.x" :y1="line.source.y" :x2="line.target.x" :y2="line.target.y" stroke="grey"></line>
        </g>

        <g v-for="node in animatedNodes" :event-id="node.id" :key="node.index">

            <!-- <text :x="node.x" :y="node.y + nodeWidth + 12" text-anchor="middle"> {{ getEntityById(node.entityId).kind }}
            </text>  -->

            <PlaceSVG v-if="getEntityById(node.entityId).kind == 'place'" :fill="getColorsById(node.entityId)?.color?.main"
                :stroke-width="'2px'" :stroke="getColorsById(node.entityId)?.color?.dark"
                :transform="`translate(${node.x},${node.y}) scale(1) translate(-12,-12)`">
            </PlaceSVG>
            <PersonSVG v-else-if="getEntityById(node.entityId).kind == 'person'" :fill="getColorsById(node.entityId)?.color?.main"
                :stroke-width="'2px'" :stroke="getColorsById(node.entityId)?.color?.dark"
                :transform="`translate(${node.x},${node.y}) scale(1) translate(-12,-12)`">
            </PersonSVG>
            <ObjectSVG v-else-if="getEntityById(node.entityId).kind == 'cultural-heritage-object'" :fill="getColorsById(node.entityId)?.color?.main"
                :stroke-width="'2px'" :stroke="getColorsById(node.entityId)?.color?.dark"
                :transform="`translate(${node.x},${node.y}) scale(1) translate(-12,-12)`">
            </ObjectSVG>
            <GroupSVG v-else-if="getEntityById(node.entityId).kind == 'group'" :fill="getColorsById(node.entityId)?.color?.main"
                :stroke-width="'2px'" :stroke="getColorsById(node.entityId)?.color?.dark"
                :transform="`translate(${node.x},${node.y}) scale(1) translate(-12,-12)`">
            </GroupSVG>

            <circle v-else :r="node.isPrimary ? nodeWidth * 2 : nodeWidth" :cy="node.y" :cx="node.x"
                :fill="getColorsById(node.entityId)?.color?.main" :stroke-width="'2px'"
                :stroke="getColorsById(node.entityId)?.color?.dark">
            </circle>
        </g>

        <g v-for="node in animatedNodes" :event-id="node.id" :key="node.index">
            <text :x="node.x" :y="node.y + nodeWidth + 12" text-anchor="middle" v-if="node.isPrimary"> {{
                getEntityById(node.entityId).label.default }} </text>
        </g>

    </svg>
</template>

<script setup lang="ts">

import { ref, onMounted, watch, defineProps, defineExpose, reactive, computed } from 'vue';
import _ from 'lodash';

import {
    forceCenter,
    forceCollide,
    forceLink,
    forceManyBody,
    forceSimulation,
    forceX,
    forceY,
    select,
    zoom,
    zoomIdentity,
} from 'd3';

import { getEntityKindPropertiesByKind, getEventKindPropertiesById } from '../../visualization.config';

import PlaceSVG from '../../assets/svgs/place.svg';
import PersonSVG from '../../assets/svgs/person.svg';
import ObjectSVG from '../../assets/svgs/object.svg';
import GroupSVG from '../../assets/svgs/group.svg';

defineExpose({
});

// define props
const props = defineProps({
    // array of timeline events 
    timelineEvents: {
        type: Array,
        default: () => []
    },
    width: {
        default: 500,
        type: Number,
    },
    height: {
        default: 500,
        type: Number,
    },
    nodeWidth: {
        default: 15,
        type: Number,
    },
    padding: {
        default: 50,
        type: Number,
    },
    dataPointSize: {
        default: 20,
        type: Number
    },
    nodes: {
        default: Array,
        type: Object,
    },
    links: {
        default: Array,
        type: Object,
    }
});

// Computed
const viewBox = computed(() => {
    if (width) return `0 0 ${width.value} ${height.value}`;
    else return "0 0 100 100"
});

let chartData = ref([]);
watch(props.timelineEvents, (newQuestion, oldQuestion) => { })

const myGraph = ref(null);

let animatedNodes = ref(props.nodes);
let animatedLinks = ref(props.links);

console.log(animatedNodes.value, animatedLinks.value);


let width = ref(0)
let height = ref(0)




onMounted(() => {

    width.value = myGraph.value.clientWidth;
    height.value = myGraph.value.clientHeight;

    window.setTimeout(() => {
        const simulation = forceSimulation(animatedNodes.value)
            .force(
                'charge',
                forceManyBody()
                    .strength(-550)
                    .distanceMax(props.nodeWidth * 30),
            )
            .force(
                'link',
                forceLink(animatedLinks.value).id((d) => {
                    return d.entityId;
                })
            )
            .force('collide', forceCollide(5))
            .force('center', forceCenter(width.value / 2, height.value / 2))
            .force('forceX', forceX(width.value / 2).strength(.1))
            .force('forceY', forceY(height.value / 2).strength(.1));

        // simulation.alpha(1).restart();

        // simulation.on('tick', () => {
        //     animatedNodes.value = simulation.nodes();
        //     animatedLinks.value = animatedLinks.value;
        // });
    }, 100)

});



// get colors and shapes 
function getColorsById(entityId) {
    let entity = window.currentStory.storyEntities[entityId];
    return getEntityKindPropertiesByKind(entity.kind);
}

function getEntityById(entityId) {
    return currentStory.storyEntities[entityId]
}

</script>

<style lang="less" scoped>
#graph {
    height: 100%;
    width: 100%;
}

.node-label {
    position: absolute;
    // pointer-events: none;
    width: 250px;
    background-color: white;
    padding: .1rem 0;
    transform: translateY(-50%);
    font-family: 'Poppins';
    font-size: .8rem;
    font-weight: 100;
}

.timescale.y.axis {
    font-size: 1em;
    font-family: 'Poppins';
    font-weight: 100;
}

.node-labels {
    font-size: 1em;
    font-family: 'Poppins';
    font-weight: 100;
    // transform: rotate(45deg);
}

.node-label-container {
    // display: none;
    // pointer-events: none;
}
</style>
