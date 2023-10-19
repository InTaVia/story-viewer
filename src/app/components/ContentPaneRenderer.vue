<template>
	<div class="content-pane-renderer-container" :class="{ nopadding: isBig }">

		<div class="content-pane-renderer__element" :class="{
			'no-padding': contentElement.type == '3D',
			'full-height': contentElement.type == '3D' 
			}" v-for="contentElement in currentSlideContent" :key="contentElement">
			
					<!-- special content hofburg -->
			<section v-if="contentElement.type == '3D'" class="content-type_html-special">
				<ObjectViewer v-if="contentElement.properties.text.value.includes('sketchfab')" :all-pois="pois" file-path="https://intavia.fluxguide.com/fluxguide/public/content/fluxguide/exhibitions/1/system/torwachter.glb">
				</ObjectViewer>

				<button v-if="fg.state.device.isNativeapp" @click="launchAR" class="content-type_html-special-ar-btn"> Launch Augmented Reality </button>
			</section>


			<section v-if="contentElement.type == 'Video/Audio'">
				<!-- VIDEO STUFF... REMOVE -->
				<iframe class="content-pane-renderer__video"
					v-if="contentElement.type == 'Video/Audio' && contentElement.properties.link.value.includes('youtube') || contentElement.properties.link.value.includes('youtu.be')"
					:src="prepareYoutubeUrl(contentElement.properties.link.value, 0)" :fullscreenRotation="'none'"
					:class="{ 'big': isBig }">
				</iframe>
				<!-- CONTENT TYPE - VIDEO -->
				<VideoPlayer
					v-else="contentElement.type == 'Video/Audio' && !contentElement.properties.link.value.includes('youtube')"
					:src="contentElement.properties.link.value" :fullscreenRotation="'none'">
				</VideoPlayer>

				<p v-if="contentElement.properties.caption.value" class="image-text">{{
					contentElement.properties.caption.value }}</p>
			</section>

			<!-- CONTENT TYPE - QUIZ -->
			<section v-if="contentElement.type == 'Quiz'">
				<MultipleChoice v-if="contentElement.type == 'Quiz'" :quizItem="contentElement.quizItem"
					:is-teleported="false" :show-quiz-review="true" :save-data-in-visitor-state="false"
					:show-extended-solution="true" :show-end-quiz-item-button="false" @end-quiz-item="null">
				</MultipleChoice>
			</section>

			<!-- CONTENT TYPE - HTML -->
			<section v-if="contentElement.type == 'HTML' && !contentElement.properties.text.value.includes('sketchfab')" class="content-type_html">
				<div :class="{ 'big': isBig }" v-html="contentElement.properties.text.value"></div>
				<h2 v-if="contentElement.properties.title" class="image-title"> {{ contentElement.properties.title.value }} </h2>
			</section>

			<!-- CONTENT TYPE - IMAGE -->
			<section v-if="contentElement.type == 'Image'" class="content-type_image" :class="{ 'nomargin': isBig }">
				<Teleport :disabled="!imageIsFullscreen" to="body">
					<Transition>
						<div>
							<img @click="imageIsFullscreen = !imageIsFullscreen"
								v-lazy="{ src: contentElement.properties.link.value, loading: '', error: '' }"
								:class="{ 'fullscreen': imageIsFullscreen }" class="content-pane-renderer__image">
						</div>
					</Transition>
				</Teleport>
				<h2 v-if="contentElement.properties.title" class="image-title">{{ contentElement.properties.title.value }}
				</h2>
				<p v-if="contentElement.properties.text" class="image-text">{{ contentElement.properties.text.value }}</p>
			</section>

			<!-- CONTENT TYPE - TEXT -->
			<section v-else-if="contentElement.type == 'Text'" class="content-type_text">
				<h2 v-if="contentElement.properties.title" class="text-title">{{ contentElement.properties.title.value }}
				</h2>
				<p v-if="contentElement.properties.text" class="text-text">{{ contentElement.properties.text.value }}</p>
			</section>

			<!-- CONTENT TYPE - 3D -->
			<!-- <section class="content-type_treed">
				<Teleport to="#app" :disabled="!ObjectViewerIsFullscreen">
					<ObjectViewer :path="'https://intavia.fluxguide.com/fluxguide/public/content/fluxguide/exhibitions/1/'"
						:file="'Test.glb'" :allPois="myPois"></ObjectViewer>
				</Teleport>
			</section> -->



		</div>

		<button v-if="showBackToListButton" @click="showListCard" class="back-to-list-btn"> Explore other Stories
		</button>
	</div>
</template>

<script setup lang="ts">

import { ref, onMounted, reactive, computed, Fragment } from 'vue';
import _ from 'lodash';
import VideoPlayer from './videoplayer/Videoplayer.vue';
import AudioPlayer from './audioplayer/Audioplayer.vue';
import MultipleChoice from './quiz/QuizMultipleChoice.vue';
import ObjectViewer from './object-viewer/ObjectViewerPoi.vue';
import pois from './object-viewer/pois.json';


import LoadingGif from '@assets/loading.gif';

// define props
const props = defineProps(['currentSlideContent', 'slide', 'isBig', 'showBackToListButton'])

// prepare youtube link? do we still need this?
function prepareYoutubeUrl(url: string, fromTime: Number) {

	if(url.includes('youtu.be')) {
		let youtubeId = url.split('/')[url.split('/').length-1];
		return "https://www.youtube.com/embed/" + youtubeId + "?start=" + fromTime;
	}
	else {
		let youtubeId = url.split('?v=')[1];
		return "https://www.youtube.com/embed/" + youtubeId + "?start=" + fromTime;
	}
}

let imageIsFullscreen = ref(false);


let myPois = ref([
	{
		"id": "51",
		"title": "Wooden box",
		"app_position": { "face": { "a": 969, "b": 995, "c": 997, "normal": { "x": -0.19670119504497177, "y": 0.06765119142727946, "z": 0.9781267587416006 }, "materialIndex": 0 }, "point": { "x": -0.0029327203526724353, "y": 0.06146562101286834, "z": 0.4986015928555798 }, "uv": { "x": 0.8149415850974999, "y": 0.3651214496916152 } },
		"app_content": "The wooden box is a versatile and practical storage solution that brings a touch of natural beauty to any space. With its sturdy construction and timeless charm, it provides a reliable and stylish way to organize and store belongings.",
		"root_item_id": "51"
	},
	{
		"id": "52",
		"title": "FLUXGUIDE",
		"app_position": { "face": { "a": 88, "b": 309, "c": 133, "normal": { "x": 0.997738951026956, "y": 0.06720852329600342, "z": 0 }, "materialIndex": 0 }, "point": { "x": 0.19964291912353363, "y": 0.21870465625169344, "z": 0.22786554113168647 }, "uv": { "x": 0.07850272674115734, "y": 0.8983571521494629 } },
		"app_content": "We are a software company dedicated to delivering innovative solutions that empower businesses and individuals. With a focus on collaboration and cutting-edge technologies, we develop customized software applications tailored to meet our clients' unique needs and drive growth.",
		"root_item_id": "52"
	}
]);

let ObjectViewerIsFullscreen = ref(false);

// log content 
console.info('content', props.currentSlideContent);

if(props.currentSlideContent) {
	// contentElement in currentSlideContent
	props.currentSlideContent.forEach(element => {
		if (element.type == "Quiz")
			element.quizItem = prepareQuiz(element);
	});
}


function launchAR() {
	UnityAR.launchUnity()
}

function prepareQuiz(quizJson) {



	let quizItem = {};
	quizItem.question_title = quizJson.properties.question.value;
	quizItem.multiplechoice = [];
	quizJson.properties.answerlist.answers.forEach(answer => {
		quizItem.multiplechoice.push(
			{
				"text_question": answer.text,
				"image_question": [],
				"is_correct": answer.correct ? "1" : "0"
			}
		)
	});;
	return quizItem;
}


let quizItem = reactive(
	{
		"title": "MC (Test)",
		"question_title": "A, B, C, oder D? (alle richtig ausser C)",
		"quiz_type": "multiplechoice",
		"multiplechoice": [
			{
				"text_question": "A",
				"image_question": [],
				"is_correct": "1"
			},
			{
				"text_question": "B",
				"image_question": [],
				"is_correct": "1"
			},
			{
				"text_question": "C",
				"image_question": [],
				"is_correct": ""
			},
			{
				"text_question": "D",
				"image_question": [],
				"is_correct": "1"
			}
		]
	}
);

function showListCard() {
	fg.state.app.currentStoryId = null;


	fg.core.showCard('StoriesList', {
		animation: 'right',
		callback: fg.core.hideCard('Story')

	});
}

onMounted(() => { });


</script>

<style lang="less">
@import url("../styles/styles.less");

.content-pane-renderer-container {
	width: auto;
	height: 100%;
	// overflow-y: scroll;
	padding: 2rem;
	height: calc(100% - 3rem);
	overflow-x: hidden;
	padding-bottom: 12rem;


	@media (min-width: @md) {
		padding: 3.5rem;
	}

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

.content-pane-renderer__image {
	width: 100%;
	height: 100%;
	max-height: 100vh;
	object-fit: contain;
	background-color: lightgrey;
}

.content-pane-renderer__video {
	width: 100%;
	min-height: 300px;
}

.content-pane-renderer__video.big {
	width: 100%;
	height: 60vh;
}

.text-title {
	font-size: 1.5rem;
	margin-top: 0;
}

.image-title {
	font-size: 1rem;
	margin: .2rem 0 0 .5em;
	font-weight: 600;
	text-align: left;

}

.image-text {
	font-size: .9rem;
	margin: .2rem 0 0 .5em;
	font-weight: 400;
	text-align: left;
}

.content-type_image {
	// border-left: 10px solid @primary;
	margin-top: 1em;
}

.content-type_html {
	margin: 2em auto;
}

.content-type_html-special {
	height: 100%;
}

&.content-big .content-type_text {
	padding: 1rem;
}

.content-type_text {
	margin-bottom: 2em;
}

.nopadding {
	padding: 0;
	height: 100vh;
}

.nomargin {
	padding: 0;
	margin: 0
}

.fullscreen {
	position: absolute;
	left: 0;
	top: 0;
	width: 100vw;
	height: 100vh;
	z-index: 99999999;
	transition: all .5s;
}

.back-to-list-btn {
	padding: 1rem;
	height: 3.5rem;
	border: 2px solid @primary;
	border-radius: 200px;
	color: @primary;
	margin-top: 5rem;
	left: 50%;
	transform: translateX(-50%);
	position: relative;
}

.content-pane-renderer__element {
	// margin-top: 2rem;
	// padding-top: 3rem;
	// padding-bottom: 5rem;

	// @media (min-width: @md) {
	// 	padding: unset;

	// }


}

.content-pane-renderer__element.no-padding.full-height {
	position: relative;
}

.content-type_html-special-ar-btn {
	position: absolute;
	left: 50%; 
	top: 1rem; 
	transform: translateX(-50%);
	padding: 1rem;
	background-color: white;
	color: @primary;
	border-radius: 100px;
	border: 2px solid @primary;
	font-family: "Poppins";
	font-weight: 600;
}


.full-height {
	height: 100%; 
}

.no-padding {
	padding: 0;
}

.v-enter-active,
.v-leave-active {
	transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
	opacity: 0;
}
</style>