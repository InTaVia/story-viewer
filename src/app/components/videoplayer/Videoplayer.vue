<template>
	<div class="fg-videoplayer-container">
		<teleport :to="teleportFullscreenTo" :disabled="!isFullscreen">
			<section class="videoplayer-section" :class="[isFullscreen ? 'fullscreen ' + fullscreenRotation : '']">
				<!-- Videoplayer wrapper -->
				<div class="fg-videoplayer" :class="[isFullscreen ? 'fullscreen ' + fullscreenRotation : '']">
					<!-- Actual video element -->
					<video
						crossorigin="anonymous"
						:controls="false"
						:preload="preload"
						:playsinline="!isFullscreen"
						:autoplay="autoplay"
						:muted="muted"
						class="video"
						:class="{ fullscreen: isFullscreen }"
						:poster="fileURL(poster)"
						@click.prevent.stop="videoClickHandler()"
					>
						<source :src="src" :type="type" />

						<!-- Will not be rendered, needed for custom subtitles -->
						<track v-if="subtitle" label="subtitle" kind="subtitles" srclang="de" :src="subtitle" default />
					</video>

					<div v-if="activeCue" ref="subtitleDiv" class="subtitles">{{ activeCue.text }}</div>
				</div>

				<!-- Controls -->
				<div
					v-if="isMetaDataLoaded && isControlsVisible"
					class="controls"
					@click.prevent.stop="resetHideControlsTimer()"
				>
					<!-- Play / Pause -->
					<button v-if="!isPlaying" class="play fullscreen-play-pause" @click.prevent.stop="play()">
						<PlaySvg />
					</button>
					<button v-else class="pause fullscreen-play-pause" @click.prevent.stop="pause()">
						<PauseSvg />
					</button>
					<!-- Time played -->
					<span class="time-played">
						{{ seconds2timestring(Math.floor(videoProgress / 1000)) }}
					</span>

					<!-- Slider -->
					<VueSlider
						v-model="videoProgress"
						:min="0"
						:max="Math.round(video.duration * 1000)"
						tooltip="none"
						:duration="0.2"
						:direction="setSliderDirection"
						@drag-start="startDragging()"
						@drag-end="endDragging()"
						@change="changeBuffer()"
					/>

					<!-- duration -->
					<span class="time-duration">
						{{ seconds2timestring(Math.floor(video.duration)) }}
					</span>
				</div>

				<div v-else-if="!isFullscreen">
					<!-- Play / Pause -->
					<button v-if="!isPlaying" class="play-video-btn" @click.prevent.stop="play()">
						<div class="video-btn-wrapper"><PlaySvg /></div>
					</button>
					<button v-else class="play-video-btn" @click.prevent.stop="pause()">
						<div class="video-btn-wrapper"><PauseSvg /></div>
					</button>
				</div>

				<!-- Fullscreen -->
				<button
					v-if="!isFullscreen && isControlsVisible"
					class="fullscreen-button"
					@click.prevent.stop="openFullscreen()"
				>
					<OpenFullscreenSvg />
				</button>
				<button
					v-if="isFullscreen && isControlsVisible"
					class="fullscreen-button"
					@click.prevent.stop="exitFullscreen()"
				>
					<CloseFullscreenSvg />
				</button>
			</section>
		</teleport>
	</div>
</template>

<script>
// Slider
import VueSlider from 'vue-slider-component';

// lodash
import uniqueId from 'lodash/uniqueId';

// Core
import core from './../../../core/core';

// import Videoplayer.js
import VideoplayerGlobal from './VideoplayerGlobal.js';

// SVGs
import PlaySvg from './assets/Play.svg';
import PauseSvg from './assets/Pause.svg';
import OpenFullscreenSvg from './assets/OpenFullscreen.svg';
import CloseFullscreenSvg from './assets/CloseFullscreen.svg';

export default {
	components: {
		VueSlider,
		PlaySvg,
		PauseSvg,
		OpenFullscreenSvg,
		CloseFullscreenSvg,
	},
	props: {
		// Index for global fg.m.Videoplayer.allVideoplayers
		videoplayerId: {
			type: String,
			default: null,
		},
		// Video source path for the <source> element
		src: {
			type: String,
			required: true,
		},
		// Preload
		preload: {
			type: String,
			default: 'metadata'
		},
		// Autoplay
		autoplay: {
			type: Boolean,
			default: false,
		},
		// Muted
		muted: {
			type: Boolean,
			default: false,
		},
		// Destination where the videoplayer gets teleported to in fullscreen view
		teleportFullscreenTo: {
			type: String,
			default: 'body',
		},
		// MIME type for the video source
		type: {
			type: String,
			default: 'video/mp4',
		},
		// Video Poster - Preview Image
		poster: {
			type: String,
			required: false,
			default: '',
		},
		// Subtitle path for the <track> element
		subtitle: {
			type: String,
			required: false,
			default: null,
		},
		// Direction which the video gets rotated in fullscreen view
		fullscreenRotation: {
			type: String,
			default: 'left',
			validator(value) {
				return ['left', 'right', 'none'].includes(value);
			},
		},
	},
	emits: ['play'],
	data() {
		return {
			videoInternalName: this.videoplayerId,
			video: null, // The (html) video element
			videoProgress: 0, // Video progress in milliseconds
			isPlaying: false,

			isFullscreen: false,
			isDragging: false,
			isPlayingBeforeDragging: false,

			isMounted: false,
			isMetaDataLoaded: false,
			teleportDestination: '',

			isControlsVisible: true,
			hideControlsTimer: null,

			sliderDirection: 'ltr',
			track: null,
			activeCue: null,
		};
	},
	computed: {
		setSliderDirection() {
			if (this.isFullscreen == true && this.fullscreenRotation == 'left') this.sliderDirection = 'btt';
			else if (this.isFullscreen == true && this.fullscreenRotation == 'right') this.sliderDirection = 'ttb';
			else this.sliderDirection = 'ltr';

			return this.sliderDirection;
		},
	},
	watch: {
		videoProgress() {
			if (this.isDragging) {
				this.video.currentTime = this.videoProgress / 1000;
			}
		},
	},
	created() {
		// Init global videoplayer functions
		VideoplayerGlobal.init();

		// init/define videoplayerId (only used for "allVideoPlayer"-key)
		let videoplayerId = this.videoplayerId;
		if (!videoplayerId) {
			videoplayerId = this.src;
		}

		// error -> this videoplayer-title already exists
		if (fg.m.Videoplayer.allVideoplayers[videoplayerId]) {
			const initialvideoplayerId = videoplayerId;
			videoplayerId = videoplayerId + '__' + uniqueId();
			console.warn(
				`[Videoplayer.vue] Video name "${initialvideoplayerId}" does already exist. ` +
					`"${videoplayerId}" was now used.`
			);
		}

		this.videoInternalName = videoplayerId;

		// save this videoplayer-component in global
		fg.m.Videoplayer.allVideoplayers[videoplayerId] = this;
	},
	mounted() {
		const vm = this;

		// Add html5-native event listeners to the video DOM element
		this.video = this.$el.querySelector('video');

		this.video.addEventListener('loadedmetadata', () => {
			this.isMetaDataLoaded = true;
		});
		this.video.addEventListener('play', () => {
			this.isPlaying = true;
			this.resetHideControlsTimer();
		});
		this.video.addEventListener('pause', () => {
			this.isPlaying = false;
			this.resetHideControlsTimer();
		});
		this.video.addEventListener('timeupdate', (e) => {
			this.videoProgress = this.video.currentTime * 1000;
			if (vm.track == undefined && vm.subtitle) {
				vm.track = document.getElementsByTagName('track')[0].track;
			}
			if (vm.track) {
				vm.activeCue = vm.track.activeCues[0];
				vm.track.mode = 'hidden';
			}
		});
	},
	unmounted() {
		// Remove self from global state
		delete fg.m.Videoplayer.allVideoplayers[this.videoInternalName];
	},
	methods: {
		// Play the video if not already playing
		play() {
			const vm = this;
			// pause all audios if there are some
			if (fg.m.Audioplayer) fg.m.Audioplayer.pauseAll();

			if (this.video.paused) {
				this.video.play();
			}

			if (vm.track == undefined && vm.subtitle) {
				vm.track = document.getElementsByTagName('track')[0].track;
			}
			if (vm.track) {
				vm.activeCue = vm.track.activeCues[0];
				vm.track.mode = 'hidden';
			}

			this.$emit('play');
		},

		// Pause the video if not already paused
		pause() {
			if (!this.video.paused) {
				this.video.pause();
			}
		},

		// Open fullscreen
		openFullscreen() {
			this.isFullscreen = true;
		},

		// Exit fullscreen
		exitFullscreen() {
			this.isFullscreen = false;
		},

		// helper-functions
		startDragging() {
			this.isPlayingBeforeDragging = !this.video.paused;
			this.pause();
			this.isDragging = true;
		},
		endDragging() {
			this.isDragging = false;
			if (this.isPlayingBeforeDragging) {
				this.play();
			}
		},
		changeBuffer() {
			if (!this.isDragging) {
				this.isDragging = true;

				setTimeout(() => {
					this.isDragging = false;
				}, 50);
			}
		},
		seconds2timestring(string) {
			return core.seconds2timestring(string);
		},
		resetHideControlsTimer() {
			clearTimeout(this.hideControlsTimer);
			this.isControlsVisible = true;

			if (this.isPlaying) {
				this.hideControlsTimer = setTimeout(() => {
					this.isControlsVisible = false;
				}, 5000);
			}
		},
		videoClickHandler() {
			// Hide controls if visible
			if (this.isControlsVisible) {
				clearTimeout(this.hideControlsTimer);
				this.isControlsVisible = false;

				// If controls not visible, show them
			} else {
				this.resetHideControlsTimer();
			}
		},
	},
};
</script>

<style lang="less" scoped>
@import './Videoplayer.less';
</style>

<style lang="less">
@import './VideoplayerSlider.less';
</style>
