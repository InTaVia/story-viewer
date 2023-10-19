<template>
    <svg ref="timelineRef" id="timeline" :viewBox="viewBox">

        <g :transform="`translate(${paddingLeft},${padding/2})`">

            <!-- Timescale -->
            <g class="timescale y axis"></g>

            <!-- loop groups -->
            <g v-for="(eventGroup, index) in chartData" :key="index">

                <TimelinePieChart v-if="eventGroup[1].length > 1" @mouseover="onHoverEvent(eventGroup[1])" @mouseleave="currentHoveredEvents = null"
                    :events="eventGroup[1]" :transform="'translate(' + eventGroup[1][0].x + ',' + eventGroup[1][0].y + ')'">
                </TimelinePieChart>
                <!-- <g v-if="eventGroup[1].length > 1" class="node-labels" trasnform="rotate"
                    :transform="`translate(${eventGroup[1][0].x + 20},${eventGroup[1][0].y + 5})`">
                    
                    <g v-if="isHighlightedInEventGroup(eventGroup[1])">
                        <g v-for="(event, index) in eventGroup[1]" :key="index">
                            <text v-if="event.highlighted"  :class="event.highlighted ? 'bold' : 'light'"> {{ event.label }} </text>
                        </g>
                    </g>
                    <text v-else text-anchor="left">
                        {{ eventGroup[1].length }} Events
                    </text>
                </g> -->

                <!-- loop actual events -->
                <g v-else v-for="(event, indexEvent) in eventGroup[1]" :key="indexEvent">

                    <!-- <g class="node-labels" trasnform="rotate" :transform="`translate(${event.x + 20},${event.y + 5})`">
                        <text text-anchor="left" :class="event.highlighted ? 'bold' : 'light'">
                            {{ event.label }}
                        </text>
                    </g> -->
                    <!-- CIRCLE  -->
                    <circle v-if="event.shape == 'dot'" :r="event.r" :cy="event.y"
                        :cx="event.x + indexEvent * event.r * 2.5" :label="event.label"
                        :fill="event.highlighted ? event.colorHighlighted : event.color"
                        :class="event.highlighted ? 'highlighted' : ''" :stroke-width="'2px'"
                        :stroke="event.colorHighlighted">
                    </circle>
                    <!-- RECT -->
                    <rect v-else-if="event.shape == 'rectangle'" :id="event.id"
                        :x="event.x - event.r + indexEvent * event.r * 2.5" :y="event.y - event.r" :width="event.r * 2"
                        :height="event.r * 2" :label="event.label"
                        :fill="event.highlighted ? event.colorHighlighted : event.color" :stroke-width="'2px'"
                        :stroke="event.colorHighlighted">
                    </rect>

                    <!-- <text :x="event.x - event.r + indexEvent * 25" :y="event.y - event.r">{{ event.shape }}</text> -->

                </g>
            </g>
        </g>

    </svg>



    <div class="node-label-container">
        <div v-for="(eventGroup, index) in chartData" :key="index" class="node-label" :style="{
            left: 45 + paddingLeft + 'px',
            top: eventGroup[1][0].y + padding / 2 + 'px'
        }">
            <div v-if="eventGroup[1].length > 1">
                
                <div v-if="isHighlightedInEventGroup(eventGroup[1])">
                    <div v-for="(event, index) in eventGroup[1]" :key="index">
                        <span v-if="event.highlighted"  :class="event.highlighted ? 'bold' : 'light'"> {{ event.label }}</span>
                    </div>
                </div>
                    <span v-else span-anchor="left">
                        {{ eventGroup[1].length }} Events
                    </span>
            </div>
            <div v-else :class="eventGroup[1][0].highlighted ? 'bold' : 'light'">{{ eventGroup[1][0].label }}</div>

        </div>
    </div>


    <div v-if="currentHoveredEvents" class="timeline-hover_container" :style="{
        top: currentHoveredEvents[0].y + padding / 2 + 'px',
    }">
        <div v-for="(event, index) in currentHoveredEvents" class="timeline-hover_container-event" :key="index" :style="{
            'background-color': event.color
        }">
            <span v-if="event.data.eventKindProperties" class="hover-heading">{{ event.data.eventKindProperties.label
            }}</span>
            <span v-if="event.data.eventKindProperties" class="hover-text">{{ event.data.label.default }}</span>
        </div>
    </div>


</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineProps, defineExpose, reactive, computed } from 'vue';
import _ from 'lodash';
import TimelinePieChart from '../timeline/TimelinePieChart.vue'
import * as d3 from "d3";
import { eventKindByEventId } from '../../visualization.config';


defineExpose({
    flyToEvents
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
    padding: {
        default: 0,
        type: Number,
    },
    dataPointSize: {
        default: 20,
        type: Number
    }
});

// computed
const viewBox = computed(() => {
    if (myWidth.value && myHeight.value) {
        return `0 0 ${myWidth.value} ${myHeight.value}`
    }
    return `0 0 ${props.width} ${props.height}`;
});
// range X 
const rangeX = computed(() => {
    const width = myWidth.value - props.padding;
    return [0, width];
});
// range X
const rangeY = computed(() => {
    const height = myHeight.value - props.padding;
    return [0, height];
});

// Lift the declaration f y to the top of the script setup
let y, yAxis, zoom;

let chartData = ref([]);
let currentHoveredEvents = ref();

const timelineRef = ref(null);
let myWidth = ref(null);
let myHeight = ref(null);


let paddingLeft = ref(null);
if(window.innerWidth < 768) {
    paddingLeft = 50; 
}
else {
    paddingLeft = 150;
}


watch(props.timelineEvents, (newQuestion, oldQuestion) => {
    chartData.value = prepareData();
})

let dataReady = ref();
onMounted(() => {
    myWidth.value = timelineRef.value.clientWidth;
    myHeight.value = timelineRef.value.clientHeight;

    // prepare chartData()
    chartData.value = prepareData();


    // return
    // init zoom
    zoom = d3.zoom().scaleExtent([.5, 500]).on('zoom', (e) => {
        const new_yScale = e.transform.rescaleY(y);

        d3.select("svg").select(".y.axis").call(yAxis.scale(new_yScale));

        let mappedEvents = props.timelineEvents.map((d, i) => {

            let myDate;
            const domainStart = e.transform.rescaleX(new_yScale).domain()[0];
            const domainEnd = e.transform.rescaleX(new_yScale).domain()[1];

            let dateDifferenceMode = getDateDifference(domainStart, domainEnd);

            if (dateDifferenceMode == 'decades') myDate = d3.timeYear(d.date).getTime();
            else if (dateDifferenceMode == 'years') myDate = d3.timeYear(d.date).getTime();
            else if (dateDifferenceMode == 'month') myDate = d3.timeMonth(d.date).getTime();
            else if (dateDifferenceMode == 'days') myDate = d3.timeDay(d.date).getTime();
            else if (dateDifferenceMode == 'hours') myDate = d3.timeHour(d.date).getTime();

            return {
                id: i + 1,
                r: props.dataPointSize,
                x: 25,
                y: new_yScale(myDate),
                shape: d.eventKindProperties.shape,
                color: d.color,
                colorHighlighted: d.colorHighlighted,
                label: d.label?.default || '',
                highlighted: d.isHighlighted || false,
                date: myDate,
                originalStartDate: d.date,
                data: d
            };
        });



        const domainStart = e.transform.rescaleX(new_yScale).domain()[0];
        const domainEnd = e.transform.rescaleX(new_yScale).domain()[1];

        let dateDifferenceMode = getDateDifference(domainStart, domainEnd);

        let rolledUpData;

        if (dateDifferenceMode == 'decades') rolledUpData = d3.rollup(mappedEvents, v => v, d => d3.timeYear(d.date).getTime().toString())
        else if (dateDifferenceMode == 'years') rolledUpData = d3.rollup(mappedEvents, v => v, d => d3.timeYear(d.date).getTime().toString())
        else if (dateDifferenceMode == 'month') rolledUpData = d3.rollup(mappedEvents, v => v, d => d3.timeMonth(d.date).getTime().toString())
        else if (dateDifferenceMode == 'days') rolledUpData = d3.rollup(mappedEvents, v => v, d => d3.timeDay(d.date).getTime().toString())
        else if (dateDifferenceMode == 'hours') rolledUpData = d3.rollup(mappedEvents, v => v, d => d3.timeHour(d.date).getTime().toString())

        chartData.value = rolledUpData;
    });

    d3.select("svg").call(zoom);
});


function prepareData() {


    // Get the minimum date from props.timelineEvents
    const minDate = d3.min(props.timelineEvents, d => d.date);
    const maxDate = d3.max(props.timelineEvents, d => d.date);

    // Convert the string date to a JavaScript Date object
    const minDateObject = new Date(minDate);
    const maxDateObject = new Date(maxDate);

    // Calculate the date of the week before
    const weekBeforeMinDate = new Date(minDateObject);
    const weekAfterMaxDate = new Date(maxDateObject);

    weekBeforeMinDate.setDate(minDateObject.getDate() - 365);
    weekAfterMaxDate.setDate(maxDateObject.getDate() + 365);

// Now, weekBeforeDate contains the date of the week before minDate
console.log(weekBeforeMinDate, weekAfterMaxDate);


    y = d3.scaleTime()
        .domain([
             weekBeforeMinDate,
             weekAfterMaxDate
        ])
        .range(rangeY.value);

    yAxis = d3.axisLeft().scale(y);
    d3.select(".timescale.y.axis").call(yAxis);


    let mappedEvents = props.timelineEvents.map((d, i) => {
        // console.log(d.date, d3.timeYear(d.date) )
        return {
            id: i + 1,
            r: props.dataPointSize,
            x: 25,
            y: y(d3.timeYear(d.date)),
            shape: d.eventKindProperties.shape,
            color: d.color,
            colorHighlighted: d.colorHighlighted,
            label: d.label?.default || '',
            highlighted: d.isHighlighted || false,
            date: d3.timeYear(d.date).getTime(),
            originalStartDate: d.startDate,
            data: d
        };
    });

    let rolledUpData = d3.rollup(mappedEvents, v => v, d => d.date.toString())
    return rolledUpData;
}

function getDateDifference(date1, date2) {
    const diffInMilliseconds = Math.abs(date2 - date1);
    const secondsInMillisecond = 1000;
    const minutesInMillisecond = secondsInMillisecond * 60;
    const hoursInMillisecond = minutesInMillisecond * 60;
    const daysInMillisecond = hoursInMillisecond * 24;
    const monthsInMillisecond = daysInMillisecond * 30.4375; // Average number of days in a month
    const yearsInMillisecond = daysInMillisecond * 365.25; // Average number of days in a year
    const decadesInMillisecond = yearsInMillisecond * 10;
    const centuriesInMillisecond = yearsInMillisecond * 100;
    const milleniasInMiliseconds = yearsInMillisecond * 1000;

    // >= 10 millenias | 10 centuries ... 
    if (diffInMilliseconds >= milleniasInMiliseconds * 10) {
        return 'millenias';
    } else if (diffInMilliseconds >= centuriesInMillisecond * 10) {
        return 'centuries';
    } else if (diffInMilliseconds >= decadesInMillisecond * 10) {
        return 'decades'
    } else if (diffInMilliseconds >= yearsInMillisecond * 10) {
        return 'years'
    } else if (diffInMilliseconds >= monthsInMillisecond * 10) {
        return 'month'
    } else if (diffInMilliseconds >= daysInMillisecond) {
        return 'days'
    } else if (diffInMilliseconds >= hoursInMillisecond) {
        return 'hours'
    } else if (diffInMilliseconds >= minutesInMillisecond) {
        return 'minutes'
    } else {
        return 'seconds'
    }
}

// fly to hightlihgted events
function flyToEvents(ids: String[], highlightEvents: Boolean) {
    if (!ids) return;
    let eventGroup = [];
    ids.forEach((id) => {
        let event = _.cloneDeep(_.find(props.timelineEvents, { id: id }));
        if (event) eventGroup.push(event);
    });

    if (eventGroup.length == 0) return;
    const dataExtent = d3.extent(_.map(eventGroup, "date"));
    // padding for the view
    let padding = props.padding;

    d3.select('svg').transition()
        .duration(750)
        .call(zoom.transform, d3.zoomIdentity.scale(rangeY.value[1] / (y(dataExtent[1]) + padding - (y(dataExtent[0]) - padding)))
            .translate(0, -y(dataExtent[0]) + padding));


    props.timelineEvents.forEach(element => {
        element.isHighlighted = false;
    });
    // hightlight event 
    eventGroup.forEach((event) => {
        props.timelineEvents.find((mEvent) => { return event.id === mEvent.id }).isHighlighted = true;
    });
}

function onHoverEvent(events) {
    currentHoveredEvents.value = events;
    console.log(events);
}

function isHighlightedInEventGroup(eventGroup) {
    let isHighlighted = false;
    eventGroup.forEach((event)=>{
        if(event.highlighted) isHighlighted = true; 
    })
    // console.log(eventGroup, isHighlighted)   
    return isHighlighted;
}


</script>

<style lang="less" scoped>
@import url('../../styles/styles.less');


#timeline {
    height: 100%;
    width: 100%;
}

.highlighted {
    animation: pulse-animation 2s infinite;
}

.node-label {
    position: absolute;
    width: 250px;
    background-color: #EDEBDF;
    padding: .1rem 0;
    transform: translateY(-50%);
    font-family: 'Poppins';
    font-size: .8rem;
    font-weight: 100;
    pointer-events: none;


    @media (min-width: @md) {
        font-size: 1rem;
	}
}



.bold {
    font-weight: 600;
}

.light {
    font-weight: 100;
}

.timeline-hover_container {
    position: absolute;
    pointer-events: none;
    left: 200px;
    background: none;
    // padding: .5em;
    max-width: 40%;
    border-radius: 5px;
    color: white;
    display: flex;
    flex-direction: column;
    transform: translateY(-50%);
    text-shadow: 0 0 6px #0000009c;

}

.timeline-hover_container .hover-heading {
    font-size: .8em;
    font-weight: 100;

}

.timeline-hover_container .hover-text {
    font-size: .8em;
    font-weight: 600;
}

.timeline-hover_container-event {
    display: flex;
    flex-direction: column;
    margin-bottom: .3rem;
    padding: 1em;
    border-radius: 5px;
}

.timeline-hover_container-event:last-child {
    margin-bottom: 0;
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

@keyframes pulse-animation {
    0% {
        stroke-width: 2px;
    }

    50% {
        stroke-width: 12px;
    }

    100% {
        stroke-width: 2px;
    }
}</style>
