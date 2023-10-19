<template>
	<div v-if="audioplayer" class="fg-audioplayer">

		<div class="controls" :class="audioplayer.state.playing ? '' : 'paused'">
			<button v-if="!audioplayer.state.playing" class="play" @click="audioplayer.play()">
				<PlaySvg />
			</button>
			<button v-else class="pause" @click="audioplayer.pause()">
				<PauseSvg />
			</button>
		</div>

		<VueSlider
			v-if="progressBar"
			ref="slider"
			v-model="audioProgress"
			:min="0"
			:max="Math.round(audioplayer.state.duration)"
			tooltip="none"
			@change="change()"
			@drag-start="startDragging()"
			@drag-end="endDragging()"
		/>

		<div class="time-output">
			<div class="time-current">{{ audioplayer.state.currentTimeString }}</div>
			<div class="time-duration">{{ audioplayer.state.durationString }}</div>
		</div>
	</div>
</template>

<script>
// Slider
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

// import Audioplayer.js
import AudioplayerGlobal from './AudioplayerGlobal.js';

// SVGs
import PlaySvg from './assets/Play.svg';
import PauseSvg from './assets/Pause.svg';

export default {
	components: {
		VueSlider,
		PlaySvg,
		PauseSvg,
	},
	props: {
		// Index for global fg.m.Audioplayer.allAudioplayers
		audioplayerId: {
			type: String,
			default: undefined,
		},
		/**
		 * @summary Audio source path
		 * @usage Give a plain src url. DON'T use fileURL
		 */
		src: {
			type: String,
			default: '',
		},
		// Autoplay
		autoplay: {
			type: Boolean,
			default: false,
		},
		// Audio progress bar
		progressBar: {
			type: Boolean,
			default: true,
		},
		// Activate proximity-sensor for audio-routing-switch to earpiece
		useEarpieceDetection: {
			type: Boolean,
			default: false,
		},
		// Audioplayback will toggle with earpiece-detection (proximity-sensor)
		togglePlaybackWithProximitySensor: {
			type: Boolean,
			default: false,
		},
		// Prevent audio-playback from main speaker - audio will only play on earpiece or headphones
		preventPlaybackFromLoudspeaker: {
			type: Boolean,
			default: false,
		},
	},
	data() {
		return {
			audioInternalName: this.audioplayerId,
			audioplayer: null, // The (html) video element
			audioProgress: 0, // Audio progress in milliseconds
			remainingTime: null, // Remaining time of audio
			isPlaying: false,
			isDragging: false,
			isPlayingBeforeDragging: false,
		};
	},
	created: function () {
		const vm = this;

		// Init global audioplayer functions
		AudioplayerGlobal.init();

		// define audioplayer-options
		let audioOptions = {
			autoplay: vm.autoplay,
			id: this.audioInternalName,
			useEarpieceDetection: this.useEarpieceDetection,
			togglePlaybackWithProximitySensor: this.togglePlaybackWithProximitySensor,
			preventPlaybackFromLoudspeaker: this.preventPlaybackFromLoudspeaker,
			onTimeupdate(data) {
				vm.audioProgress = data.currentTime;
				vm.remainingTime = fg.core.seconds2timestring(data.duration - data.currentTime);
			},
		};

		// create audioplayer
		const tryCreateAudioWithLock = () => {
			if (!fg.m.Audioplayer.htmlAudioplayerCreateLock) {
				vm.audioplayer = fg.m.Audioplayer.initAudioObject(vm.src, audioOptions);
			} else {
				fg.one('htmlAudioCreateLockResolved', () => {
					tryCreateAudioWithLock();
				});
			}
		};

        tryCreateAudioWithLock();
	},
	beforeUnmount: function () {
		this.audioplayer.destroy();
	},
	methods: {
		startDragging() {
			this.isPlayingBeforeDragging = !this.audioplayer.state.paused;
			this.audioplayer.pause();
			this.isDragging = true;
		},
		endDragging() {
			this.isDragging = false;
			if (this.isPlayingBeforeDragging) {
				this.audioplayer.play();
			}
			this.audioplayer.seekTo(this.audioProgress);
		},
		change() {
			// Trigger time update if slider has been clicked instead of dragged
			this.audioProgress = this.$refs.slider.getValue();
			this.remainingTime = fg.core.seconds2timestring(
				this.audioplayer.state.duration - this.audioplayer.state.currentTime
			);

			if (this.isPlayingBeforeDragging) {
				this.audioplayer.play();
			}
			this.audioplayer.seekTo(this.audioProgress);
		},
	},
};
</script>

<style lang="less" scoped>
@import './Audioplayer.less';
</style>

<style lang="less">
@import './AudioplayerSlider.less';
</style>
