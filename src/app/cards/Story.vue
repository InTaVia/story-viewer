<template>
	<!-- Story Container -->

	<div class="story-container" :class="{
		'story-started': data.storyStarted,
		'nogrid': data.currentSlide.layout == 'single-content' || (data.currentSlide.layout == 'single-vis' && data.storyStarted)
	}">

		<!-- Visualisation LAYER  -->
		<div
			v-if="data.currentSlideVisualisation && (data.currentSlide.layout != 'single-content') 
			&& data.currentSlide.layout != 'two-contents'" ref="visualisation"
			class="visualisation">
			<!-- MAP -->
			<map-view v-if="data.currentSlideVisualisation.type == 'map'" ref="storyMap"
				:center="[data.currentSlideVisualisation.mapState.viewState.longitude, data.currentSlideVisualisation.mapState.viewState.latitude]"
				:default-zoom="data.currentSlideVisualisation.mapState.viewState.zoom" :map-settings="{
					style: 'https://api.maptiler.com/maps/dataviz-light/style.json?key=Z2X5tY0jlK44wsp6Kl4i' || 'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json',
				}" @map-zoom="zoomlevel = $event.zoom">

				<MapNavigationControl :show-zoom="true" :show-compass="true" />
				<MapScaleControl />

				<div v-for="(event, index) in currentSlideEvents" :key="index" :color="event.color">
					<map-pin :color="event.eventKindProperties.color.main" v-for="place in event.places" :key="place"
						:is-highlighted="isEventSelected(event)" :latlng="{
							'id': place.geometry.coordinates[1],
							'lat': place.geometry.coordinates[1],
							'lng': place.geometry.coordinates[0]
						}">

						<div class="intavia-map-pin place">
							<EventPin :hoverText="place.label" :hoverHeading="event.eventKindProperties.label"
								:color="event.eventKindProperties.color.main" :colorHighlighted="event.eventKindProperties.color.dark"
								:pinType="event.eventKindProperties.shape" :isHighlighted="isEventSelected(event)">
							</EventPin>
						</div>
					</map-pin>

					<!-- 
					<MapLine 
						v-if="event.places && currentSlideEvents[index+1]?.places"
						:id="'line_' + event.id + '_' + index"
						:latlng-from="{
							'id': '1',
							'lat': event.places[0].geometry.coordinates[1],
							'lng': event.places[0].geometry.coordinates[0]
						}" 
						:latlng-to="{
							'id': '2',
							'lat': currentSlideEvents[index+1].places[0].geometry.coordinates[1],
							'lng': currentSlideEvents[index+1].places[0].geometry.coordinates[0]
						}"
						:color-from="event.color || 'blue'"
						:color-to="currentSlideEvents[index+1].color || 'red'"
					></MapLine> -->
				</div>
			</map-view>

			<!-- TIMELINE -->
			<div class="timeline" v-else-if="data.currentSlideVisualisation.type == 'timeline'">
				<!-- <TimelineView ref="storyTimeline" :timeline-events="currentSlideEvents"></TimelineView> -->
				<TimelineView ref="storyTimeline" :width="800" :height="800" :padding="50" :data-point-size="10"
					:timeline-events="currentSlideEvents"></TimelineView>
			</div>

			<!-- EGO NETWORK -->
			<div ref="networkContainer" class="ego-network"
				v-else-if="data.currentSlideVisualisation.type == 'ego-network'">
				<!-- {{ data.currentSlideVisualisation.network.links }} -->
				<NetworkView :width="300" :height="300" :nodes="data.currentSlideVisualisation.network.nodes"
					:links="data.currentSlideVisualisation.network.links" :nodeWidth="8"></NetworkView>
			</div>

			<!-- BOTTOM -->
			<div v-if="data.storyStarted && data.currentSlide.layout == 'single-vis'"
				class="next-prev-button-container-vis">
				<div class="background-fade"></div>
				<button :class="{ 'disabled': data.currentSlideIndex == 0 }" class="prev-button" @click="showPreviousSlide">
					<PrevSvg></PrevSvg>
				</button>

				<button :class="{ 'disabled': data.currentSlideIndex + 1 == slides.length }" class="next-button"
					@click="showNextSlide">
					<NextSvg></NextSvg>
				</button>
			</div>
		</div>

		<div v-else-if="data.currentSlide.layout == 'two-contents' && data.storyStarted" class="content-big">
			<Transition v-if="data.storyStarted" name="slide-left" mode="out-in">
				<ContentPaneRenderer v-if="data.currentSlideContent" :key="data.currentSlideContentBig"
					:current-slide-content="data.currentSlideContentBig" :is-big="true">
				</ContentPaneRenderer>
			</Transition>
		</div>


		<div v-if="data.currentSlide.layout != 'single-vis' || !data.storyStarted" class="story-content"
			:class="{ 
				'open': data.contentExtended || data.currentSlide.layout == 'single-content',
				'fullscreen': !data.storyStarted
			}">

			<!-- cASE 1: Story not started -> show Preview Container -->
			<div v-if="!data.storyStarted" class="story-preview-container">
				<h1> {{ data.storyProperties.name.value }} </h1>
				<h2 v-if="data.storyProperties.subtitle.value.length > 0"> {{ data.storyProperties.subtitle.value }}
				</h2>
				<h3 v-if="data.storyProperties.author.value.length > 0"> Author: {{ data.storyProperties.author.value }}
				</h3>
				<p v-if="data.storyProperties.copyright.value.length > 0"> copyright: {{
					data.storyProperties.copyright.value
				}} </p>
				<button class="visualisation-start-story-btn" @click="startStory">
					<h3> Start Story </h3>
				</button>
			</div>

			<button v-if="data.contentExtended" @click="data.contentExtended = false" class="show-less-button">
				<!-- <span> show less </span> -->
				<MoreSvg></MoreSvg>
			</button>

			<!-- CASE 2: Story started -> show content renderer -->
			<Transition v-if="data.storyStarted" name="slide-left" mode="out-in">
				<ContentPaneRenderer v-if="data.currentSlideContent" :key="data.currentSlideContent"
					:show-back-to-list-button="data.currentSlideIndex + 1 == slides.length"
					:current-slide-content="data.currentSlideContent">
				</ContentPaneRenderer>
			</Transition>

			<!-- Bottom -->
			<div v-if="data.storyStarted" class="next-prev-button-container">
				<div class="background-fade"></div>
				<button :class="{ 'disabled': data.currentSlideIndex <= 0 }" class="prev-button" @click="showPreviousSlide">
					<PrevSvg></PrevSvg>
				</button>

				<button v-if="!data.contentExtended" @click="data.contentExtended = true" class="show-more-button">
					<span v-if="(data.currentSlide.layout != 'single-content')"> show more </span>
					<MoreSvg v-if="(data.currentSlide.layout != 'single-content')"></MoreSvg>
				</button>

				<button :class="{ 'disabled': data.currentSlideIndex + 1 == slides.length }" class="next-button"
					@click="showNextSlide">
					<NextSvg></NextSvg>
				</button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">

import { ref, onMounted, reactive, Fragment, nextTick } from 'vue';
import _ from 'lodash';
import axios from 'axios';

import { extent, scaleBand, scaleTime } from 'd3';

// components
import MapView from '../components/map/MapView.vue'
import MapPin from '../components/map/MapPin.vue';
import MapLine from '../components/map/MapLine.vue';
import MapNavigationControl from '../components/map/MapNavigationControl.vue';
import MapScaleControl from '../components/map/MapScaleControl.vue';
import ContentPaneRenderer from '../components/ContentPaneRenderer.vue';
import TimelineView from '../components/timeline/TimelineView.vue';
import NetworkView from '../components/network/NetworkView.vue';
// svgs
import NextSvg from '../assets/svgs/next-icon.svg'
import PrevSvg from '../assets/svgs/prev-icon.svg'
import MoreSvg from '../assets/svgs/show-more-icon.svg'


import PlaceSVG from '../assets/svgs/place.svg'
import PlacePin from '../components/map/PlacePin.vue';
import EventPin from '../components/map/EventPin.vue';

import { getEventKindPropertiesById } from '../visualization.config.ts';
import { timeScale, colorScale } from "../temporal-coloring.ts";

// define refs
const storyMap = ref(null);
const storyTimeline = ref(null);
const visualisation = ref(null);


/* #### */
// "event-kind" visualization.properties.colorby.value.value ("event-kind" |"time")
getEventKindPropertiesById("event-kind-creation");
// event-kind-creation -> kind property from event 
// shape, dot, main & dark, strokewidth

let storyIdFromApi = reactive(fg.core.getGetParameter('storyId', document.URL));
let autostart = reactive(fg.core.getGetParameter('autostart', document.URL));

if (!storyIdFromApi) storyIdFromApi = fg.state.app.currentStoryId;

let apiResponse = await getStoryById(storyIdFromApi)
// let apiResponse;

let currentStory: any;
if (apiResponse == null) currentStory = Story;
// set current story
else currentStory = JSON.parse(apiResponse.content);

currentStory.slides = _.orderBy(currentStory.slides, ['sort'], ['asc']);

window.currentStory = currentStory;

let allImages = filterImageElements(currentStory.contentPanes);
console.log("all images", allImages);

// const dataDuererById = currentStory.data;
const storyEventsById = currentStory.storyEvents;
const storyEntitiesById = currentStory.storyEntities;

// define reactive data
let slides = reactive(_.values(_.cloneDeep(currentStory.slides)));
let data = reactive({
	'story': currentStory,
	'currentSlideContent': null,
	'currentSlideVisualisation': null,
	'currentSlideContentBig': null,
	'currentSlideIndex': 0,
	'storyStarted': false,
	'storyProperties': currentStory.properties,
	'contentExtended': false,
	'currentSlide': slides[0],
	'allPlaces': null,
});

let currentPlaces = ref(_.filter(data.story.storyEntities, { 'kind': 'place' }));
let currentHighlightedEvents = ref([]);


let currentSlideEvents = ref([]);

if (data.currentSlideVisualisation) {
	// get get current slide events
	currentSlideEvents.value = getEventsByIds(data.currentSlideVisualisation.eventIds)
	// get current temporal extent
	addColorCodingToEvents(currentSlideEvents.value, data.currentSlideVisualisation.properties.colorBy.value.value);
	// get all places of story
	currentPlaces.value = _.filter(data.story.storyEntities, { 'kind': 'place' });
}

// set font family from data
if (data.storyProperties.font) document.body.style.fontFamily = data.storyProperties.font.value.font || 'sans-serif';
else { document.body.style.fontFamily = 'sans-serif' }



// mounted
onMounted(() => {
	
	
	if(autostart == '1') startStory();

	// fit map to bounds
	if (!data.currentSlideVisualisation) return;
	if (data.currentSlideVisualisation.type == 'timeline') return;
	if (data.currentSlideVisualisation.type == 'map') {
		window.setTimeout(() => {
			flyToCurrentPlaces();
		}, 200)
	}


})

// methods
async function getStoryById(storyId: String) {

	let data = JSON.stringify({
		"preventCount": false,
		"offset": 0,
		"limit": 0,
		"contentSectionID": [],
		"ids": [
			storyId
		],
		"orderby": "id",
		"ordertype": "",
		"fulltextsearch": [],
		"fulltextsearchOperator": "AND",
		"filter": []
	});

	let config = {
		method: 'post',
		maxBodyLength: Infinity,
		url: 'https://intavia-api.fluxguide.com/intavia/query',
		headers: {
			'Content-Type': 'application/json'
		},
		data: data
	};

	let response = await axios(config);
	if (response.data.results) return response.data.results.at(-1);
	else return null;
}
function startStory() {

	// set story started to true
	data.storyStarted = true;
	// get first slide 
	let startSlide = currentStory.slides[0];
	// check if start-slide is available 
	if (!startSlide) {
		console.error('No slide to start with');
		return;
	}
	// set current slide
	data.currentSlide = startSlide;
	// get contentByLayout 
	getContentByLayout(startSlide, startSlide.layout);
	// log visitor action - STORY STARTED 
	logVisitorActionSlide('storyStarted')

	// CASE 1 MAP
	if (data.currentSlideVisualisation && data.currentSlideVisualisation.type == 'map') {
		// resize map
		if (storyMap.value) {
			storyMap.value.resizeMap();
			// storyMap.value.clearLines();
		} 
		
		// get highlighted events
		currentHighlightedEvents.value = getHighlightedEvents(Object.values(data.currentSlide.highlighted)[0]);
		// get all events 
		currentSlideEvents.value = getAllEventsFromVisualisation(data.currentSlideVisualisation)
		// flyToCurrentPlaces
		flyToCurrentPlaces();
	}
	// CASE 2 TIMELINE 
	else if (data.currentSlideVisualisation && data.currentSlideVisualisation.type == "timeline") {
		// get highlighted events
		currentHighlightedEvents.value = getHighlightedEvents(Object.values(data.currentSlide.highlighted)[0]);
		// get all events 
		let events = getAllEventsFromVisualisation(data.currentSlideVisualisation)
		// prepare for timeline
		currentSlideEvents.value = prepareEventsForTimeline(events);
		// get current temporal extent
		addColorCodingToEvents(currentSlideEvents.value, data.currentSlideVisualisation.properties.colorBy.value.value);
		flyToEvents();
	}
	if(data.currentSlideVisualisation?.properties.colorBy.value.value == 'time') addColorCodingToEvents(currentSlideEvents.value, 'time');
}

function showPreviousSlide() {
	// dont extend content when on mobile
	data.contentExtended = false;

	data.currentSlideIndex--;
	data.currentSlide = slides[data.currentSlideIndex];

	// check if we are on the last slide 
	if (data.currentSlideIndex == slides.length - 1) logVisitorActionSlide("slideEnded");
	else logVisitorActionSlide("slideOpened");
	// return
	if (data.currentSlideIndex > slides.length - 2) {
		return;
	}

	// check layout to get content 
	if (slides[data.currentSlideIndex].layout == 'two-contents') {
		data.currentSlideContentBig = getContentPaneContent(_.values(slides[data.currentSlideIndex].contentPaneSlots)[1]);
		data.currentSlideContent = getContentPaneContent(_.values(slides[data.currentSlideIndex].contentPaneSlots)[0]);
	}
	else {
		data.currentSlideContent = getContentPaneContent(_.values(slides[data.currentSlideIndex].contentPaneSlots)[0]);
		data.currentSlideVisualisation = getVisualisationPane(_.values(slides[data.currentSlideIndex].visualizationSlots)[0]);
	}

	// CASE 1 MAP
	if (data.currentSlideVisualisation && data.currentSlideVisualisation.type == 'map') {
		// resize map
		if (storyMap.value) storyMap.value.resizeMap();
		// get highlighted events
		currentHighlightedEvents.value = getHighlightedEvents(Object.values(data.currentSlide.highlighted)[0]);
		// get all events 
		currentSlideEvents.value = getAllEventsFromVisualisation(data.currentSlideVisualisation)
		// flyToCurrentPlaces
		flyToCurrentPlaces();
	}
	// CASE 2 TIMELINE 
	else if (data.currentSlideVisualisation && data.currentSlideVisualisation.type == "timeline") {
		// get highlighted events
		currentHighlightedEvents.value = getHighlightedEvents(Object.values(data.currentSlide.highlighted)[0]);
		// get all events 
		let events = getAllEventsFromVisualisation(data.currentSlideVisualisation)
		// prepare for timeline
		currentSlideEvents.value = prepareEventsForTimeline(events);
		// get current temporal extent
		flyToEvents();
	}
	if(data.currentSlideVisualisation.properties.colorBy.value.value == 'time') addColorCodingToEvents(currentSlideEvents.value, 'time');
}
function showNextSlide() {
	// dont extend content when on mobile
	data.contentExtended = false;

	data.currentSlideIndex++;
	data.currentSlide = slides[data.currentSlideIndex];

	// check if we are on the last slide 
	if (data.currentSlideIndex == slides.length - 1) {
		logVisitorActionSlide("slideEnded");
		// return; 
	}
	else logVisitorActionSlide("slideOpened");

	// check layout to get content 
	if (slides[data.currentSlideIndex].layout == 'two-contents') {
		data.currentSlideContentBig = getContentPaneContent(_.values(slides[data.currentSlideIndex].contentPaneSlots)[1]);
		data.currentSlideContent = getContentPaneContent(_.values(slides[data.currentSlideIndex].contentPaneSlots)[0]);
	}
	else {
		data.currentSlideContent = getContentPaneContent(_.values(slides[data.currentSlideIndex].contentPaneSlots)[0]);
		data.currentSlideVisualisation = getVisualisationPane(_.values(slides[data.currentSlideIndex].visualizationSlots)[0]);
	}

	// CASE 1 MAP
	if (data.currentSlideVisualisation && data.currentSlideVisualisation.type == 'map') {
		// resize map
		if (storyMap.value) {
			storyMap.value.resizeMap();
		} 
		// get highlighted events
		currentHighlightedEvents.value = getHighlightedEvents(Object.values(data.currentSlide.highlighted)[0]);
		// get all events 
		currentSlideEvents.value = getAllEventsFromVisualisation(data.currentSlideVisualisation)
		// flyToCurrentPlaces
		flyToCurrentPlaces();
	}
	// CASE 2 TIMELINE 
	else if (data.currentSlideVisualisation && data.currentSlideVisualisation.type == "timeline") {
		// get highlighted events
		currentHighlightedEvents.value = getHighlightedEvents(Object.values(data.currentSlide.highlighted)[0]);
		// get all events 
		let events = getAllEventsFromVisualisation(data.currentSlideVisualisation)
		// prepare for timeline
		currentSlideEvents.value = prepareEventsForTimeline(events);
		// get current temporal extent
		console.log(data.currentSlideVisualisation.properties.colorBy)

		addColorCodingToEvents(currentSlideEvents.value, data.currentSlideVisualisation.properties.colorBy.value.value);
		flyToEvents();
	}
	if(data.currentSlideVisualisation.properties.colorBy.value.value == 'time') addColorCodingToEvents(currentSlideEvents.value, 'time');
}

function getContentPaneContent(contentPaneId: string) {
	// get contents from contentpanes and return as array
	if (!currentStory.contentPanes[contentPaneId]) return;
	let contents = _.values(currentStory.contentPanes[contentPaneId].contents)
	// order contents
	contents = _.orderBy(contents, item => item.layout.y, ['asc']);
	return contents;
}
function getVisualisationPane(visualisationPaneId: string) {
	// get contents from contentpanes and return as array
	let visualisation = currentStory.visualizations[visualisationPaneId];
	return visualisation;
}


function getEventsByIds(eventIds: Array<String>) {
	let storyEvents = [];
	// loop event ids
	eventIds.forEach(eventId => {
		// get storyEvent
		const storyEvent = currentStory.storyEvents[eventId];
		if (!storyEvent) return;
		storyEvent.places = currentStory.storyEventLocations[storyEvent.id];
		storyEvent.eventKindProperties = getEventKindPropertiesById(storyEvent.kind)
		// push in currentSlideEvents
		storyEvents.push(storyEvent);
	});

	// filter storyEvents
	// storyEvents = storyEvents.filter((event) => event.place && event.place.geometry != null);
	return storyEvents;
}

function getHighlightedEvents(highlighted: Object) {
	if (!highlighted) return;
	if (!highlighted.entities && !highlighted.events) {
		console.warn("no highlighted events or entities");
		return;
	}
	let events = [];
	if (highlighted.events) {
		events = getEventsByIds(highlighted.events);
	}
	let eventsFromEntities = [];
	if (highlighted.entities) {
		highlighted.entities.forEach(entityId => {
			eventsFromEntities = prepareEventsByEntityId(entityId);
			events = events.concat(eventsFromEntities);
		});
	}
	// retur merged events and events from entities
	return events;
}

function prepareEventsForTimeline(events) {
	// prepare dates
	_.forEach(events, (e) => {
		if (e.startDate && e.endDate) {
			e.date = new Date(e.startDate);
			e.start = e.startDate;
			e.end = e.endDate;
		}
		else if (e.endDate) {
			e.date = new Date(e.endDate);
			e.end = e.endDate;
		}
		else if (e.startDate) {
			e.date = new Date(e.startDate);
			e.end = e.endDate;
		}
	});

	events = _.orderBy(events, ['date'], ['asc']);
	events = events.filter((event) => typeof event.date !== 'undefined' && event.date != 'Invalid Date');

	return events;
}

function getAllEventsFromVisualisation(visualisation: Object) {
	if (!visualisation.entityIds && !visualisation.eventIds) {
		console.warn("no events or entities");
		return;
	}

	let events = [];
	if (visualisation.eventIds) {
		events = getEventsByIds(visualisation.eventIds);
	}
	if (visualisation.entityIds) {
		let eventsFromEntities = [];
		visualisation.entityIds.forEach(entityId => {
			eventsFromEntities = prepareEventsByEntityId(entityId);
			events = events.concat(eventsFromEntities)
		});
	}
	// retur merged events and events from entities
	return events;
}

function prepareEventsByEntityId(entityId) {

	const storyEntity = currentStory.storyEntities[entityId];
	let events = [];

	storyEntity.relations.forEach(relation => {
		let event = currentStory.storyEvents[relation.event];
		event.places = currentStory.storyEventLocations[event.id];
		event.eventKindProperties = currentStory.vocabulary[event.kind]
		events.push(event);
	});

	return events;

}

// get the content by layout
function getContentByLayout(slide: any, layout: String) {
	if (layout == 'two-contents') {
		data.currentSlideContentBig = getContentPaneContent(_.values(slides[0].contentPaneSlots)[1]);
		data.currentSlideContent = getContentPaneContent(_.values(slides[0].contentPaneSlots)[0]);
	}
	else if (layout == 'single-content') {
		data.currentSlideContent = getContentPaneContent(_.values(slide.contentPaneSlots)[0]);
	}
	else {
		data.currentSlideContent = getContentPaneContent(_.values(slide.contentPaneSlots)[0]);
		data.currentSlideVisualisation = getVisualisationPane(_.values(slide.visualizationSlots)[0]);
	}
}


function addColorCodingToEvents(events: Array<any>, colorCoding: 'event-kind' | "time") {
	debugger
	// get current event extent from current events
	let currentEventExtent = getTemporalExtent([events]);
	let currentTimeScaleNormalized = timeScale(...currentEventExtent);
	// loop events and get color 
	events.forEach(event => {
		// if color coding is time -> get color 
		if (colorCoding == 'time') {
			if (event.startDate) {
				let eventDate = new Date(event.startDate);
				event.color = colorScale(currentTimeScaleNormalized(eventDate))
				event.colorHighlighted = "black";
			}
		}
		else {
			event.color = event.eventKindProperties.color.main;
			event.colorHighlighted = event.eventKindProperties.color.dark;
		}
	})
}

// Get Places by Event IDs
function getPlacesByEventIds(eventIds: Array<string>) {
	let places: any[] = [];
	eventIds.forEach(eventId => {
		// check if place is available in data
		if (!storyEventsById[eventId]) {
			console.warn("No event found with ID: " + eventId);
			return;
		}
		// get place id of event
		const place = _.find(storyEventsById[eventId].relations, {
			'role': 'role-took_place_at',
		});

		let placeID: any;
		if (place) {
			placeID = place.entity;
			// return place if available 
			if (storyEntitiesById[placeID]) places.push(storyEntitiesById[placeID]);
			else console.warn("No place found with ID: " + placeID);
		}
		else return;
	});

	places = places.filter((place) => place.geometry != null);
	return places;
}

function prepareMapDataBySlide(slide: any) {
	if (!slide) {
		console.warn("no slide given!")
	}

	if (slide.highlighted) {

	}
	else {

	}
}

function flyToEvents() {

	if (!data.currentSlide.highlighted[data.currentSlideVisualisation.id]) {
		let storyEvents = currentSlideEvents.value;
		window.setTimeout(function () {
			storyTimeline.value.flyToEvents(storyEvents, true);
		}, 1000)
	}
	else {
		window.setTimeout(function () {
			// fly to events 
			if (data.currentSlide.highlighted[data.currentSlideVisualisation.id].events.length > 0) {
				storyTimeline.value.flyToEvents(data.currentSlide.highlighted[data.currentSlideVisualisation.id].events, true);
			}
		}, 1000);
	}
}


function isEventSelected(event) {

	if (!data.currentSlide.highlighted[data.currentSlideVisualisation.id]) return false;

	let inEvents = data.currentSlide.highlighted[data.currentSlideVisualisation.id].events.includes(event.id);
	if (inEvents) {
		return true
	}

	else return false;
}

function flyToCurrentPlaces() {
	window.setTimeout(() => {
		// get all coordinates for bounds

		let events = getHighlightedEvents(data.currentSlide.highlighted[data.currentSlideVisualisation.id]);
		if (!events) events = currentSlideEvents.value;

		let coordinates = events.flatMap((event) => {
			if (event.places) return event.places.map(place => place.geometry.coordinates)
		});

		if (coordinates.length == 0) return;
		if (coordinates.length == 1) coordinates.push(coordinates[0]);
		// fit bounds
		if (!storyMap.value) return;

		// get the viewstate -> data.currentSlideVisualisation.mapState.viewState

		let padding = 50;
		if (window.innerWidth <= 768) padding = 50;
		else padding = 200;


		storyMap.value.fitMapBounds(
			coordinates,
			{
				"padding": {
					top: padding,
					left: padding,
					right: padding,
					bottom: padding
				},
				"maxZoom": 17
			}
		);
	}, 500);

}


// Function to filter elements of type "Image"
function filterImageElements(obj) {
	const imageElements = [];
	for (const key in obj) {
		const content = obj[key];
		if (content.hasOwnProperty("contents")) {
			const contents = content.contents;
			for (const innerKey in contents) {
				const element = contents[innerKey];
				if (element.type === "Image") {
					imageElements.push(element);
				}
			}
		}
	}
	return imageElements;
}

// get MIN- and MAX date from array of events
function getTemporalExtent(data: Array<Array<Event>>): [Date, Date] {
	const dates: Array<Date> = [];

	data.forEach((entry) => {
		entry.forEach((event) => {
			if (event.startDate != null) {
				dates.push(new Date(event.startDate));
			}

			if (event.endDate != null) {
				dates.push(new Date(event.endDate));
			}
		});
	});
	// default: full (mock) time range
	if (dates.length === 0) {
		return [new Date(Date.UTC(1800, 0, 1)), new Date(Date.UTC(2020, 11, 31))];
	}
	// dates must contain only `Date`s here, and at least one
	return extent(dates) as [Date, Date];
}


function logVisitorActionSlide(action) {

	if (action == 'storyStarted') {
		fg.core.logVisitorAction(4, {
			"storyName": currentStory.properties.name.value,
			"storyId": currentStory.id,
			"userId": fg.core.getGetParameter('userId', document.URL),
			"storyIdFromAPI": parseInt(storyIdFromApi),
			"action": "storyStarted",
			"timestamp": Date.now(),
		}, null)
	}
	else if (action == 'storyEnded') {
		fg.core.logVisitorAction(4, {
			"storyName": currentStory.properties.name.value,
			"storyId": currentStory.id,
			"userId": fg.core.getGetParameter('userId', document.URL),
			"storyIdFromAPI": parseInt(storyIdFromApi),
			"action": "storyEnded",
			"timestamp": Date.now(),
		}, null)
	}
	// default action 
	else if (action == "slideOpened") {
		fg.core.logVisitorAction(4, {
			"storyName": currentStory.properties.name.value,
			"storyId": currentStory.id,
			"userId": fg.core.getGetParameter('userId', document.URL),
			"storyIdFromAPI": parseInt(storyIdFromApi),
			"action": "slideOpened",
			"slideNumber": data.currentSlideIndex + 1,
			"timestamp": Date.now(),
		}, null)
	}


}


</script>

<style lang="less">
@import url('../styles/styles.less');

.story-container {

	padding: env(safe-area-inset-top, 20px) env(safe-area-inset-right, 20px) env(safe-area-inset-bottom, 20px) env(safe-area-inset-left, 20px);
	overflow: hidden;


	display: block;

	@media (min-width: @md) {
		display: grid;
		grid-template-columns: 60vw 40vw;
		grid-template-rows: 1fr;
		gap: 0px 0px;
		grid-template-areas: ". .";
		height: 100vh;
	}
}


.story-container.nogrid {
	display: block;
	max-width: 1080px;
	margin: 0 auto;
}

.story-container.story-started {
	grid-template-columns: 60vw 40vw;
}

.vis-map {

	position: absolute;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;

	@media (min-width: @md) {
		position: unset;
		width: 100%;
		height: 100%;
	}
}

.story-content {

	box-shadow: 0px 0px 30px #00000031;
	position: absolute;
	top: 60vh;
	top: calc(~"((env(safe-area-inset-top) - 75vh)*-1)");

	width: 100%;
	height: 100vh;
	background-color: white;
	border-top-left-radius: 1rem;
	border-top-right-radius: 1rem;
	transition: all .5s;
	z-index: 999;
	// padding-bottom: 5rem;


	overflow-y: auto;
	overflow-x: hidden;

	@media (min-width: @md) {
		position: unset;
		top: inherit;
		width: inherit;
		border-radius: none;
	}
}

.story-content.open {
	// bottom: 0;
	height: 100vh;
	transition: all .5s;
	top: env(safe-area-inset-top);
	z-index: 9999;
	// bottom: calc(~"(env(safe-area-inset-top) - 5vh)");

}
.story-content.fullscreen {
	// bottom: 0;
	height: 100vh;
	transition: all .5s;
	top: 0;
	z-index: 9999;
	justify-content: center;
	align-items: center;
	// bottom: calc(~"(env(safe-area-inset-top) - 5vh)");

}


.visualisation {
	width: 100vw;
	height: 100vh;

	@media (min-width: @md) {
		width: 100%;
		height: 100%;
	}

}

.visualisation .ego-network,
.visualisation .timeline {
	width: 100%;
	height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #EDEBDF;
}

.visualisation .timeline {
	display: block;
}

.content-big {
	background-color: #EDEBDF;
	padding: 0;

	@media (min-width: @md) {
		// order: 1;
	}
}

.story-preview-container {

	position: absolute;
	padding: 1rem;
	padding-top: 2rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	width: 100vw;
	height: 100vh;
	background-color: #fff;


	h1,
	h2,
	h3 {
		margin: .5rem;
		text-align: center;
	}

	h2,
	h3 {
		// display: none;
		font-size: 1rem;

		@media (min-width: @md) {
			display: block;
			font-size: unset;
		}
	}

	p {
		font-size: .8rem;
	}

	@media (min-width: @md) {
		justify-content: center;
	}
}

.visualisation-start-story-btn {
	height: auto;
	width: auto;
	padding: 1rem;
	background-color: #fff;
	position: relative;
	border-radius: 1000px;
	// margin-top: 1em;
	border: 2px solid @primary;
	color: @primary;
	transition: all .5s;

	h3 {
		color: @primary;
		margin: 0;
		font-family: "Poppins";
		font-weight: 600;
	}

	@media (min-width: @md) {
		margin-top: 1;
	}
}

.visualisation-start-story-btn:hover {
	height: auto;
	width: auto;
	padding: 1rem;
	background-color: #fff;
	color: #fff;
	background-color: @primary;
	position: relative;
	border-radius: 1000px;
	margin-top: 1em;
	border: 2px solid @primary;
	color: @primary;
	transition: all .5s;

	h3 {
		color: #fff;
		margin: 0;
	}
}

.next-prev-button-container-vis {
	position: fixed;
	display: flex;
	max-width: 1080px;
	width: 100%;
	justify-content: space-between;
	padding: 1rem;
	padding-top: 5rem;
	z-index: 21;
	bottom: 0;
	// left: 0;
}

.next-prev-button-container {
	position: fixed;
	display: flex;
	width: 100%;
	justify-content: space-between;
	padding: 1rem;
	padding-top: 5rem;
	z-index: 21;
	// background: rgb(255, 255, 255);
	// background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(252, 252, 252, 1) 50%, rgba(250, 250, 250, 0) 100%);
	bottom: 0;

	@media (min-width: @md) {

		position: relative;
		bottom: 1rem;
		display: flex;
		width: 100%;
		justify-content: space-between;
		padding: 0 1rem;

		.prev-button>svg {
			transform: translateX(-10%);
		}

		.next-button>svg {
			transform: translateX(10%);
		}
	}
}

.next-prev-button-container .background-fade,
.next-prev-button-container-vis .background-fade {
	background: rgb(255, 255, 255);
	background: linear-gradient(0deg, rgba(255, 255, 255, 1) 0%, rgba(252, 252, 252, 1) 60%, rgba(250, 250, 250, 0) 100%);
	position: absolute;
	z-index: -1;
	bottom: 0;
	width: 100%;
	height: 100px;
	left: 0;
}

.next-prev-button-container .show-more-button {
	display: block;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.2rem;
	fill: @primary;
	color: @primary;
	transform: scale(.8);


	@media (min-width: @md) {
		display: none;
	}
}

.show-less-button {
	margin: 1rem 0;
	left: 50%;
	position: absolute;
	transform: translateX(-50%) scale(.8);
	display: flex;
	flex-direction: column;
	align-items: center;
	fill: @primary;
	color: @primary;
	gap: 0.2rem;



	svg {
		// transform: rotate(180deg);
	}

	@media (min-width: @md) {
		display: none;
	}
}

.next-prev-button-container .prev-button,
.next-prev-button-container .next-button,
.next-prev-button-container-vis .prev-button,
.next-prev-button-container-vis .next-button {
	width: 3rem;
	height: 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2px solid @primary;
	border-radius: 50%;
	fill: @primary;
	transition: all .5s;
}

.next-prev-button-container .prev-button:hover,
.next-prev-button-container .next-button:hover,
.next-prev-button-container-vis .prev-button:hover,
.next-prev-button-container-vis .next-button:hover {
	width: 3rem;
	height: 3rem;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 2px solid @primary;
	background-color: @primary;
	border-radius: 50%;
	fill: #fff;
	transition: all .5s;
}

.next-prev-button-container .prev-button.disabled,
.next-prev-button-container .next-button.disabled {
	pointer-events: none;
	opacity: .2;
}

.pin-svg {
	transform: translate(-10px, -35px);
}


.slide-left-enter-active,
.slide-left-leave-active {
	transition: all 0.25s ease-out;
}

.slide-left-enter-from {
	opacity: 0;
	transform: translateX(30px);
}

.slide-left-leave-to {
	opacity: 0;
	transform: translateX(-30px);
}

.intavia-map-pin.place {
	position: relative;
}
</style>
