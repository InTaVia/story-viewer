import core from "../../../core/core";
import { reactive, watch } from 'vue';
import _ from 'lodash';

export default {
	init() {
		if (!fg.m.Audioplayer) {
			fg.m.Audioplayer = {
				allAudioplayers: {},
				globalVolume: undefined,
                htmlAudioplayerCreateLock: false,
				pauseAll: this.pauseAll,
				destroyAll: this.destroyAll,
				stopAll: this.stopAll,
				muteAll: this.muteAll,
				unmuteAll: this.unmuteAll,
				initAudioObject: this.initAudioObject,
				initCordovaAudioplayer: this.initCordovaAudioplayer,
				cordovaAudioplayerUpdate: this.cordovaAudioplayerUpdate,
				initHtml5Audioplayer: this.initHtml5Audioplayer,
				updateCordovaAudioplayerTimedisplay: this.updateCordovaAudioplayerTimedisplay,
				enableControlsNotification: this.enableControlsNotification,
				startEarpieceDetection: this.startEarpieceDetection,
				stopEarpieceDetection: this.stopEarpieceDetection,
				// module-settings
				settings: {
					allowOnlyOneActiveAudioplayer: true,        // if set all other audioplayers will be paused when playing starts (default=true)
					globalVolume: 1,                                // initial value for global Volume (0-1) - Note: this factor will be multiplied with audioplayer-volume
					musicControlIconName: 'musiccontrolicon'     // if "MusicControl" is used (Notification with play/pause button) -> the icon files with this name must be in the drawable-* folder of the android project
				},
                state: reactive({
                    headsetConnected: false
                })
			};

			// init global-volume
			fg.m.Audioplayer.globalVolume = fg.m.Audioplayer.settings.globalVolume;

			// disable earpiece-detection on startup
			this.stopEarpieceDetection();
		}
	},

	pauseAll() {
		for (const audio of Object.values(fg.m.Audioplayer.allAudioplayers)) {
			audio.pause();
		}
	},
	destroyAll() {
		for (const audio of Object.values(fg.m.Audioplayer.allAudioplayers)) {
			audio.destroy();
		}
	},
	stopAll() {
		for (const audio of Object.values(fg.m.Audioplayer.allAudioplayers)) {
			audio.stop();
		}
	},
	muteAll() {
		for (const audio of Object.values(fg.m.Audioplayer.allAudioplayers)) {
			audio.audioElement.muted = true;
		}
	},
	unmuteAll() {
		for (const audio of Object.values(fg.m.Audioplayer.allAudioplayers)) {
			audio.audioElement.muted = false;
		}
	},

	/**
	 * initAudioObject - creates an Audio objects and starts loading it.
	 * @param  audioUrl {string} the url of the audio file (full path from core.getFileURL() ) 
	 * @param  options {object} 
	 *                  - id            {string}    id for this audio object (optional, falls back to filename without extension)
	 *                  - autoplay      {boolean}   track should start playing when ready? (optional, default: false)
	 *                  - volume        {number}    default volume for this track (optional, default: 1)
	 *                  - progressBarTarget {selector|jqueryObject} if set, a progressBar (incl. draggable knob) will be injected into this element (optional)
	 *                  - ...
	 * @return {object} an object with fields "identifier" and "audio".     
	 */
	initAudioObject(audioUrl, options) {

		// no audio url defined -> exit
		if (typeof audioUrl === 'undefined' || audioUrl == "") { console.log("Could not create Audioplayer: no audioUrl defined.", "initAudioObject() in Core Module Audioplayer"); return; }

		//// define options
		var options = options || {};

        // init/define audioplayerId (only used for "allAudioplayers"-key)
        if (!options.id) {
            options.id = audioUrl;
        }
        // error -> this audioplayer-id already exists
        if (fg.m.Audioplayer.allAudioplayers[options.id]) {
            const initialAudioplayerId = options.id;
            options.id = options.id + '__' + _.uniqueId();
            console.warn(
                `[AudioplayerGlobal.js] Audio name "${initialAudioplayerId}" does already exist. ` +
                `"${options.id}" was now used.`
            );
        }

		options.autoplay = options.autoplay;                                                                           // flag - autoplay  
		options.title = options.title || audioUrl.substring(audioUrl.lastIndexOf("/") + 1, audioUrl.lastIndexOf('.'));         	// audio-title (will only be used for music-controls)
		options.subtitle = options.subtitle || "";                                                                              // audio-subtitle (will only be used for music-controls)
		options.cover = options.cover || "";                                                                                    // audio-cover (will only be used for music-controls)
		options.volume = options.volume || 1;                                                                                   // volume of this specific audioplayer (integer from 0-1) 
		options.useCordovaMediaPlugin = options.useCordovaMediaPlugin || false;                                                 // flag - force the use cordova-media-plugin instead of html5-audio (this option will be forced for iOS when using earpiece-detection - because of Audio-Toggle-Problem with WKWebView)
		options.useEarpieceDetection = options.useEarpieceDetection;                                               				// activate proximity-sensor for audio-routing-switch to earpiece
		options.togglePlaybackWithProximitySensor = options.togglePlaybackWithProximitySensor;                 					// audioplayback will toggle with earpiece-detection (proximity-sensor)
		options.preventPlaybackFromLoudspeaker = options.preventPlaybackFromLoudspeaker;                         				// prevent audio-playback from main speaker - audio will only play on earpiece or headphones
		options.onLoadedmetadata = options.onLoadedmetadata || function () { };                                                 // callback - onLoadedmetadata
		options.onLoadeddata = options.onLoadeddata || function () { };                                                        	// callback - onLoadeddata
		options.onCanPlay = options.onCanPlay || function () { };                                                               // callback - onCanPlay
		options.onPlay = options.onPlay || function () { };                                                                     // callback - onPlay
		options.onPause = options.onPause || function () { };                                                                   // callback - onPause
		options.onEnded = options.onEnded || function () { };                                                                   // callback - onEnded
		options.onTimeupdate = options.onTimeupdate || function () { };                                                         // dom-element - progressBarTarget

		//// create audio-element
		// CASE 1 - use cordova-media-plugin
		if ((fg.state.device.isIos && fg.state.device.isCordova && (options.useEarpieceDetection || options.preventPlaybackFromLoudspeaker)) || options.useCordovaMediaPlugin) {
			// define url
			var url = core.getFileURLNative(audioUrl);
			// create cordova-audio-object
			var audioElementCordova = new Media(url);
			// disable html5 audio-object
			var audioElement = false;
		}
		// CASE 2 - use html5-audio
		else {

            // lock audioplayer creation
            fg.m.Audioplayer.htmlAudioplayerCreateLock = true;
			// define url
			var url = core.getFileURL(audioUrl);
                   
            // create audio-element
            var audioElement = new Audio(url);
            audioElement.preload = "auto";
            audioElement.title = options.title;

            // disable cordova-media-object
            var audioElementCordova = false
		}

		//// define audioplayer-instance (vue-object)
		class audioObjectClass {
			constructor(audioElement, audioElementCordova, options) {
				this.audioElement = audioElement;
				this.audioElementCordova = audioElementCordova;
				this.audioElementCordovaIntervalId = 0;
				this.options = options;
				this.id = options.id;
				this.title = options.title;
				this.subtitle = options.subtitle;
				this.cover = options.cover;
				this.state = reactive({
					playing: false,
					paused: true,
					volume: 1,
					currentTime: 0,
					currentTimeString: "",
					playbackPercent: 0,
					playbackPercentFull: 0,
					currentMin: 0,
					currentSec: 0,
					duration: 0,
					durationString: "",
					durationSec: 0,
					durationMin: 0
				});
			}


			// play()
			play() {
				// define this
				const vm = this;

				// (optional) when options are set
				if ((vm.options.preventPlaybackFromLoudspeaker || vm.options.useEarpieceDetection) && window.HeadsetDetection) {
					// start headset detection
					fg.m.Device.startHeadsetDetection();
					// (optional) mute playback for speaker
					if (vm.options.preventPlaybackFromLoudspeaker) {
						window.HeadsetDetection.detect(function (headphonesDetected) {
							// CASE - earpiece-detection is disabled (and headphones are not connected) -> mute audio!
							if (headphonesDetected != true && vm.options.useEarpieceDetection == false) vm.setVolume(0);
							// CASE - earpiece-detection is enabled (and headphones are not connected) -> mute audio!
							else if (headphonesDetected != true && vm.options.useEarpieceDetection == true && fg.m.Audioplayer.state.proximitySensorState != true) vm.setVolume(0);
							// CASE - headphones are connected -> unmute audio!
							else if (headphonesDetected == true) vm.setVolume(vm.options.volume);
						});
					}
				}

				// (optional) pause other audioplayers
				if (fg.m.Audioplayer.settings.allowOnlyOneActiveAudioplayer) {
					fg.m.Audioplayer.pauseAll();
					fg.m.Audioplayer.activeAudioplayerId = vm.id;
					fg.m.Audioplayer.activeAudioplayer = fg.m.Audioplayer.allAudioplayers[vm.id];
				}

				// Pause all Videos
				if (fg.m.Videoplayer) fg.m.Videoplayer.pauseAll();

				// set audio-status-flags
				vm.state.paused = false;
				vm.state.playing = true;

				//// play audio
				// CASE - cordova-media-plugin
				if (vm.audioElementCordova) vm.audioElementCordova.play();
				// CASE - html5-audio
				else vm.audioElement.play();

				// enable MusicControls (on android, if installed)
				if (fg.state.device.isAndroid && fg.state.device.isCordova) {
					try {
						fg.m.Audioplayer.enableControlsNotification(audioObject);
					}
					catch (error) {
						core.console.warn("Could not initialize MusicControls.", "Fluxguide Core/Audioplayer");
					}
				}

				// update media controls
				if (typeof window.MusicControls !== "undefined") MusicControls.updateIsPlaying(true);

				// fire "onPlay" callback
				vm.options.onPlay({
					audioObject: vm
				});

				// (optional) enable earpiece-detection 
				if (vm.options.useEarpieceDetection == true) fg.m.Audioplayer.startEarpieceDetection();

				// start interval for time-update (only for cordova-audio-element)
				if (vm.audioElementCordova) {
					// clear existing interval 
					if (vm.audioElementCordovaIntervalId > 0) {
						window.clearInterval(vm.audioElementCordovaIntervalId);
						vm.audioElementCordovaIntervalId = 0;
					}
					// start interval (for time-update)
					vm.audioElementCordovaIntervalId = window.setInterval(function () {
						if (vm.audioElementCordova.getDuration() >= 0) fg.m.Audioplayer.cordovaAudioplayerUpdate(vm);
					}, 1000);
				}
			}


			// pause()
			pause() {
				// define this
				const vm = this;

				// set flags
				vm.state.paused = true;
				vm.state.playing = false;

				//// pause audio
				// CASE - cordova-media-plugin
				if (vm.audioElementCordova) vm.audioElementCordova.pause();
				// CASE - html5-audio
				else vm.audioElement.pause();

				// update media controls
				if (typeof window.MusicControls !== "undefined") MusicControls.updateIsPlaying(false);

				// fire "onPause" callback
				vm.options.onPause({
					audioObject: vm
				});

				// (optional) disable earpiece-detection
				if (vm.options.useEarpieceDetection == true && vm.options.togglePlaybackWithProximitySensor != true) fg.m.Audioplayer.stopEarpieceDetection();

				// kill interval for time-update (only for cordova-audio-element)
				if (vm.audioElementCordovaIntervalId > 0) {
					window.clearInterval(vm.audioElementCordovaIntervalId);
					vm.audioElementCordovaIntervalId = 0;
				}

			}


			// playToggle()
			playToggle() {
				// toggle audioplayback
				if (this.state.playing == true) this.pause();
				else this.play();
			}


			// stop()
			stop() {
				// define this
				const vm = this;

				// pause audio
				vm.pause();

				//// jump to audio-start
				// CASE - cordova-media-plugin
				if (vm.audioElementCordova) {
					vm.audioElementCordova.seekTo(0);
					fg.m.Audioplayer.updateCordovaAudioplayerTimedisplay(vm, 0);
				}

				// CASE - html5-audio
				else vm.audioElement.currentTime = 0;

				// (optional) disable earpiece-detection
				if (vm.options.useEarpieceDetection == true && vm.options.togglePlaybackWithProximitySensor != true) fg.m.Audioplayer.stopEarpieceDetection();
			}


			// seekTo(timeSeconds)
			seekTo(timeSeconds) {
				// define this
				const vm = this;

				// check parameter
				if (typeof timeSeconds === "undefined" || typeof timeSeconds !== "number") return;

				//// seekTo
				// CASE - cordova-media-plugin
				if (vm.audioElementCordova) vm.audioElementCordova.seekTo(timeSeconds * 1000);
				// CASE - html5-audio
				else vm.audioElement.currentTime = timeSeconds;

				// trigger update time-display (only for cordova-audioplayer)
				if (vm.audioElementCordova) window.setTimeout(function () { fg.m.Audioplayer.updateCordovaAudioplayerTimedisplay(vm, timeSeconds); }, 50);
			}


			// setVolume(volume - from 0 to 1)
			setVolume(volume) {
				// define this
				const vm = this;

				// check parameter
				if (typeof volume === "undefined" || typeof volume !== "number") return;

				// set volume to valid value
				volume = _.clamp(volume, 0, 1);
				vm.state.volume = volume;
				//// set volume
				// CASE - cordova-media-plugin
				if (vm.audioElementCordova) vm.audioElementCordova.setVolume(vm.state.volume * fg.m.Audioplayer.globalVolume);
				// CASE - html5-audio
				else vm.audioElement.volume = vm.state.volume * fg.m.Audioplayer.globalVolume;
			}


			// fadeOut(duration) - (in ms) 
			fadeOut(duration) {
				// define this
				const vm = this;
				// fade out
				fg.m.Audioplayer.fade(0, duration, vm.id);
			}


			// fadeIn(duration) - (in ms) 
			fadeIn(duration) {
				// define this
				const vm = this;
				// fade in
				fg.m.Audioplayer.fade(1, duration, vm.id);
			}


			// destroy()
			destroy() {

				// define this
				const vm = this;

				// stop audio
				vm.stop();

				// (optional) reset "media-controls"
				if (typeof window.MusicControls !== "undefined") {
					MusicControls.updateIsPlaying(false);
					MusicControls.destroy();
				}
				// (optional) disable earpiece-detection
				if (vm.options.useEarpieceDetection == true) fg.m.Audioplayer.stopEarpieceDetection();
				// CASE - cordova-media-plugin -> release audio
				if (vm.audioElementCordova) {
					// kill interval for time-update (only for cordova-audio-element)
					if (vm.audioElementCordovaIntervalId > 0) {
						window.clearInterval(vm.audioElementCordovaIntervalId);
						vm.audioElementCordovaIntervalId = 0;
					}
					// stop audio
					vm.audioElementCordova.stop();
					// release memory
					vm.audioElementCordova.release();
				}
				// CASE - html5 audio
				else if (vm.audioElement) {
					// unload html audio element
					vm.audioElement.src = "";
					vm.audioElement.load();
				}
				// destroy Vue-Instance
				window.setTimeout(function () {
					if (fg.m.Audioplayer.allAudioplayers[vm.id] == undefined) return;
					fg.m.Audioplayer.allAudioplayers[vm.id].state = undefined;
					fg.m.Audioplayer.allAudioplayers[vm.id] = undefined;
					// remove from all-audioplayers
					delete fg.m.Audioplayer.allAudioplayers[vm.id];
					delete fg.m.Audioplayer.activeAudioplayer;
				}, 1);

			}
		}
		// audioObject class END

		// create audioObject (from class that was just defined)
		let audioObject = new audioObjectClass(audioElement, audioElementCordova, options);

		// activate watcher for global volume
		watch(
			() => fg.m.Audioplayer.globalVolume,
			(newValue, oldValue) => {
				_.each(fg.m.Audioplayer.allAudioplayers, function (audioObject) {
					audioObject.setVolume(newValue);
				});
			}
		);

		//// init audioplayer
		// CASE cordova-media-plugin player
		if (audioObject.audioElementCordova) fg.m.Audioplayer.initCordovaAudioplayer(audioObject);
		//  CASE - html5 audio player
		else fg.m.Audioplayer.initHtml5Audioplayer(audioObject);

		// init headset-detection-monitoring (only when "prevent-playback-from-speaker")
		if (options.preventPlaybackFromLoudspeaker) fg.m.Device.startHeadsetDetection();

		// add audioObject to global audioObject-collection
		fg.m.Audioplayer.allAudioplayers[audioObject.options.id] = audioObject;

		// return audioObject
		return audioObject;

	},




	/**
	 * init_cordova_media_plugin - init cordova-media-plugin player
	 */
	initCordovaAudioplayer(audioObject) {

		//// init audio element
		// mute audio
		audioObject.audioElementCordova.setVolume(0);
		// play audio
		audioObject.audioElementCordova.play();

		// init cordova-audioplayer-update
		var watchdogCounter = 0;
		var thisIntervalId = window.setInterval(function () {
			// watchdog-counter
			watchdogCounter++;
			if (watchdogCounter > 30) window.clearInterval(thisIntervalId);
			else if (audioObject.audioElementCordova.getDuration() >= 0) {
				// update time-display for the first time
				fg.m.Audioplayer.cordovaAudioplayerUpdate(audioObject);
				// kill this interval
				window.clearInterval(thisIntervalId);
			}
		}, 100);

	},

	/**
	 * cordovaAudioplayerUpdate - updates cordova-audioplayer-status (fired by interval)
	 */
	cordovaAudioplayerUpdate(audioObject) {

		// audio element was NOT initialized -> exit and wait
		if (audioObject.audioElementCordova.getDuration() < 0) return;

		// CASE - cordova-audio-element is playable for the first time -> final init of audioplayer
		if (audioObject.audioElementCordovaWasInitialized != true) {
			// get duration
			var duration = _.clone(audioObject.audioElementCordova.getDuration());
			var durationMin = Math.floor(duration / 60);
			var durationSec = Math.floor(duration - (durationMin * 60));
			if (durationSec.toString().length < 2) durationSec = '0' + durationSec;
			audioObject.state.duration = duration;
			audioObject.state.durationSec = durationSec;
			audioObject.state.durationMin = durationMin;
			audioObject.state.durationString = core.seconds2timestring(duration);
			// make audio ready for playback
			audioObject.audioElementCordova.pause();
			audioObject.audioElementCordova.setVolume(1);
			audioObject.audioElementCordova.seekTo(0);
			// mark as initialized
			audioObject.audioElementCordovaWasInitialized = true;
			// update playback-time-display
			fg.m.Audioplayer.updateCordovaAudioplayerTimedisplay(audioObject, 0);
			// autoplay
			if (audioObject.options.autoplay) audioObject.play();

		}

		// get current playback-time
		audioObject.audioElementCordova.getCurrentPosition(
			// success callback
			function (position) {
				if (position > -1) {
					// update playback-time-display
					fg.m.Audioplayer.updateCordovaAudioplayerTimedisplay(audioObject, position);
				}
			}, function (e) { console.log("Error in cordovaAudioplayerUpdate(). Could not ger current position - " + e); }
		);

	},



	/**
	 * updateCordovaAudioplayerTimedisplay - init time-display
	 */
	updateCordovaAudioplayerTimedisplay(audioObject, position) {

		// process currentTime
		var currentTime = position;
		var playbackPercent = currentTime / audioObject.state.duration;
		var currentMin = Math.floor(currentTime / 60);
		var currentSec = Math.floor(currentTime - (currentMin * 60));
		if (currentSec.toString().length < 2) currentSec = '0' + currentSec;
		audioObject.state.currentTime = currentTime;
		audioObject.state.playbackPercent = playbackPercent;
		audioObject.state.playbackPercentFull = playbackPercent * 100;
		audioObject.state.currentMin = currentMin;
		audioObject.state.currentSec = currentSec;
		audioObject.state.currentTimeString = core.seconds2timestring(currentTime);

		//// run custom callback
		audioObject.options.onLoadedmetadata({
			audioObject: audioObject,
			currentTime: currentTime,
			currentSec: currentSec,
			currentMin: currentMin,
			duration: audioObject.state.duration,
			durationSec: audioObject.state.durationSec,
			durationMin: audioObject.state.durationMin,
			currentTimeString: core.seconds2timestring(currentTime),
			durationString: audioObject.state.durationString
		});


		// fire given callback "onTimeupdate"
		audioObject.options.onTimeupdate({
			audioObject: audioObject,
			playbackPercent: playbackPercent,
			playbackPercentFull: playbackPercent * 100,
			currentTime: currentTime,
			currentSec: currentSec,
			currentMin: currentMin,
			duration: audioObject.state.duration,
			durationSec: audioObject.state.durationSec,
			durationMin: audioObject.state.durationMin,
			currentTimeString: core.seconds2timestring(currentTime),
			durationString: audioObject.state.durationString
		});

		// on audio end -> stop
		if (audioObject.state.currentTime >= audioObject.state.duration - 1) {
			window.setTimeout(function () {
				// stop audio
				audioObject.stop();
				// fire onEnded
				audioObject.options.onEnded({
					audioObject: audioObject
				});
			}, 1000);
		}

	},





	/**
	 * initHtml5Audioplayer - init the html5 audioplayer
	 */
	initHtml5Audioplayer(audioObject) {

		// "onLoadedmetadata" - get meta-data of audioobject
		audioObject.audioElement.addEventListener('loadedmetadata', function (event) {

			// get time information
			var duration = event.target.duration;
			var currentTime = event.target.currentTime;
			var playbackPercent = currentTime / duration;
			var currentMin = Math.floor(currentTime / 60);
			var currentSec = Math.floor(currentTime - (currentMin * 60));
			if (currentSec.toString().length < 2) currentSec = '0' + currentSec;
			var durationMin = Math.floor(duration / 60);
			var durationSec = Math.floor(duration - (durationMin * 60));
			if (durationSec.toString().length < 2) durationSec = '0' + durationSec;

			// write these infos to audioObject (vue)
			audioObject.state.currentTime = currentTime;
			audioObject.state.playbackPercent = playbackPercent;
			audioObject.state.playbackPercentFull = playbackPercent * 100;
			audioObject.state.currentMin = currentMin;
			audioObject.state.currentSec = currentSec;
			audioObject.state.duration = duration;
			audioObject.state.durationSec = durationSec;
			audioObject.state.durationMin = durationMin;
			audioObject.state.currentTimeString = core.seconds2timestring(currentTime);
			audioObject.state.durationString = core.seconds2timestring(duration);
			// run custom callback
			audioObject.options.onLoadedmetadata({
				audioObject: audioObject,
				currentTime: currentTime,
				currentSec: currentSec,
				currentMin: currentMin,
				duration: duration,
				durationSec: durationSec,
				durationMin: durationMin,
				currentTimeString: core.seconds2timestring(currentTime),
				durationString: core.seconds2timestring(duration)
			});

            // resolve html audioplayer creation lock
            if(fg.m.Audioplayer.htmlAudioplayerCreateLock) {
                fg.m.Audioplayer.htmlAudioplayerCreateLock = false;
                fg.trigger("htmlAudioCreateLockResolved");
            }

		}, false);


		// "onCanPlay" - get meta-data of audioobject
		audioObject.audioElement.addEventListener('canplay', function () {
			// get audiotrack-duration
			var duration = audioObject.audioElement.duration;
			var durationMin = Math.floor(duration / 60);
			var durationSec = Math.floor(duration - (durationMin * 60));
			if (durationSec.toString().length < 2) durationSec = '0' + durationSec;
			// fire module-event
			audioObject.options.onCanPlay({
				audioObject: audioObject,
				duration: duration,
				durationMin: durationMin,
				durationSec: durationSec,
				durationString: core.seconds2timestring(duration)
			});
		}, false);


		// "onEnded" - when audio ended
		audioObject.audioElement.addEventListener('ended', function () {
			// update media controls
			if (typeof window.MusicControls !== "undefined") MusicControls.updateIsPlaying(false);
			// fire onEnded
			audioObject.options.onEnded({
				audioObject: audioObject
			});
			// stop audio
			audioObject.stop();
		}, false);


		// "onTimeupdate" - update playback-time
		audioObject.audioElement.addEventListener('timeupdate', function (event) {
			//// calculate all kind of time-informations
			// get playback-properties
			var duration = event.target.duration;
			var currentTime = event.target.currentTime;
			var playbackPercent = currentTime / duration;
			// calculate some rounded values
			var currentMin = Math.floor(currentTime / 60);
			var currentSec = Math.floor(currentTime - (currentMin * 60));
			if (currentSec.toString().length < 2) currentSec = '0' + currentSec;
			var durationMin = Math.floor(duration / 60);
			var durationSec = Math.floor(duration - (durationMin * 60));
			if (durationSec.toString().length < 2) durationSec = '0' + durationSec;
			// call custom timeupdate-callback
			if (!isNaN(playbackPercent)) {
				// update time-info of audioplayer-instance (vue)
				audioObject.state.currentTime = currentTime;
				audioObject.state.playbackPercent = playbackPercent;
				audioObject.state.playbackPercentFull = playbackPercent * 100;
				audioObject.state.currentMin = currentMin;
				audioObject.state.currentSec = currentSec;

				audioObject.state.duration = duration;
				audioObject.state.durationSec = durationSec;
				audioObject.state.durationMin = durationMin;
				audioObject.state.currentTimeString = core.seconds2timestring(currentTime);
				audioObject.state.durationString = core.seconds2timestring(duration);
				// fire given callback "onTimeupdate"
				audioObject.options.onTimeupdate({
					audioObject: audioObject,
					playbackPercent: playbackPercent,
					playbackPercentFull: playbackPercent * 100,
					currentTime: currentTime,
					currentSec: currentSec,
					currentMin: currentMin,
					duration: duration,
					durationSec: durationSec,
					durationMin: durationMin,
					currentTimeString: core.seconds2timestring(currentTime),
					durationString: core.seconds2timestring(duration)
				});
			}
		}, false);


		// "loadeddata" - init
		audioObject.audioElement.addEventListener('loadeddata', function () {
			// autoplay (if set)
			if (audioObject.options.autoplay) audioObject.play();
			else if (audioObject.state.paused == undefined) audioObject.state.paused = true;
			// set initial volume
			if (typeof audioObject.options.volume !== "undefined" && typeof audioObject.options.volume === "number") audioObject.setVolume(audioObject.options.volume);
			else audioObject.setVolume(fg.m.Audioplayer.globalVolume);
			// run custom callback
			audioObject.options.onLoadeddata({
				audioObject: audioObject
			});

		}, { once: true });

		//// trigger "load" audio
		audioObject.audioElement.load();
	},

	/**
	 * fade(fadeToVolume, duration, id)Help-Function for fadeIn() and fadeOut()
	 * @param  {number} fadeToVolume The Target Volume (0 - 1)
	 * @param  {number} duration     The Duration of the Fade in milliseconds
	 * @param  {[type]} audioplayerId   The id of the audioplayer (optional, if empty -> fade all)
	 */
	fade(fadeToVolume, duration, audioplayerId) {
		// check parameter
		if (typeof fadeToVolume === "undefined") return;
		if (typeof duration === "undefined") duration = 1000;
		// get audioObject
		var audioObject = fg.m.Audioplayer.allAudioplayers[audioplayerId];
		// check if audioObject exists
		if (audioObject == undefined) return;
		// make audio-fade
		var _fadeToVolume = fadeToVolume * fg.m.Audioplayer.globalVolume;
		$(audioObject.audioElement).animate({ volume: _fadeToVolume }, duration, function () {
			audioObject.state.volume = fadeToVolume;
		});
	},




	/**
	 * set the global audio volume (for all tracks)
	 * @param {number} volume Target-Volume (0 - 1)
	 */
	setGlobalVolume(volume) {

		// set new global volume
		var volume = _.clamp(volume, 0, 1);
		fg.m.Audioplayer.globalVolume = volume;

		// set new volume for all existing audioplayers
		_.each(fg.m.Audioplayer.allAudioplayers, function (audioObject) {
			audioObject.setVolume(audioObject.state.volume);
		});
	},



	/**
	 * playSound() - play a sound-file once (without a player)
	 * @param {audioUrl} 
	 * @param {displayID} 
	 *   Description: generic function to play a sound effect ONCE (unloads sound after playback)
	 *   parameter "audio_file" (string) file-path (like "public/content/.../audiofx.mp3")
	 *   DISCLAIMER: 
	 *   (1) immediate playback is not guaranteed, there might a delay (webapp + cordova)
	 *   (2) Playing many sounds also might be problematic (sometimes app stops playing sounds)
	 *   --> if immediate, repeated playback is required consider preloading audios without unloading them
	 *       OR consider using a cordova plugin like https://github.com/floatinghotpot/cordova-plugin-nativeaudio
	 */
	playSound(audioUrl, options) {

		// define URL
		var audioFileUrl = core.getFileURL(audioUrl);

		var options = options || {};

		// CORDOVA -> create cordova media object
		if (fg.state.device.isCordova) {

			// create new media object
			var audioObject = new Media(
				audioFileUrl,
				function (ev) {
					//// success
					// unload object
					if (audioObject) {
						audioObject.stop();
						audioObject.release();
						audioObject = null;
					}
				},
				function (err) {
					// error -> unload object
					if (audioObject) {
						audioObject.stop();
						audioObject.release();
						audioObject = null;
					}
				},
				function (status) {
					// status change MEDIA_STOPPED -> unload object
					if (status == Media.MEDIA_STOPPED) {
						if (audioObject) {
							audioObject.stop();
							audioObject.release();
							audioObject = null;
						}
					}
				});

			// play audio
			audioObject.play();
			if (options.volume != undefined) {
				var vol = options.volume.toString();
				audioObject.setVolume(vol);
			}
			// remove reference
			audioObject = null;
		}

		// webApp -> create html5-audio element
		else {
			var audioObject = new Audio(audioFileUrl);

			// on ended -> unload audio
			audioObject.addEventListener('ended', function () {
				audioObject.src = null;
				audioObject.load();
				audioObject = null;
			});

			// play audio
			audioObject.play();
		}


	},


	/*******************************************
	* enableControlsNotification()
	* DESCRIPTION: enable native audio-controls
	*******************************************/
	enableControlsNotification(audioObject) {

		// check cordova-plugin
		if (!fg.state.device.isCordova) return;
		if (typeof window.MusicControls === "undefined") return;

		// define cover file (check if this file is in www or not) - check if AudioObject.cover exists -> if not MusicControls won't initialize
		if (audioObject.cover != "") {
			var coverFileUrl = core.getFileURLNative(audioObject.cover);
			if (coverFileUrl.indexOf(fgCordova.ipa_www_path) === 0) coverFileUrl = coverFileUrl.substr(fgCordova.ipa_www_path.length);
		}

		var options = {
			track: audioObject.title,                                                                // optional, default : ''
			artist: audioObject.subtitle,                                                             // optional, default : ''
			cover: coverFileUrl || fg.m.Audioplayer.settings.musicControlIconName,        // optional, default : nothing | cover can be a local path (use fullpath 'file:///storage/emulated/...', or only 'my_image.jpg' if my_image.jpg is in the www folder of your app) | or a remote url ('http://...', 'https://...', 'ftp://...')
			dismissable: true,                                                                             // optional, default : false
			hasPrev: false,                                                                            // show previous button, optional, default: true
			hasNext: false,                                                                            // show next button, optional, default: true
			hasClose: false,                                                                            // show close button, optional, default: false
			notificationIcon: fg.m.Audioplayer.settings.musicControlIconName
			// isPlaying   : true,                                                                          // optional, default : true
			// notificationIcon: coverFileUrl
		};

		MusicControls.create(options, function () { /*success */ }, function () { /*error*/ });


		/**
		 * Event Handler for events coming from MusicControl
		 * @param  {string} action
		 */
		function musicControlEvents(action) {
			try {
				var message = JSON.parse(action).message;
			}
			catch (error) {
				return;
			}

			switch (message) {
				case 'music-controls-pause':
					audioObject.pause();
					break;
				case 'music-controls-play':
					audioObject.play();
					break;
				case 'music-controls-destroy':
					audioObject.pause();
					MusicControls.destroy();
					break;


				// Headset events (Android only)
				// All media button events are listed below
				case 'music-controls-media-button':
					// Do something
					break;
				case 'music-controls-headset-unplugged':
					audioObject.pause();
					break;
				case 'music-controls-headset-plugged':
					// Do something
					break;
				default:
					break;
			}
		}

		// Register callback to listen to all events
		MusicControls.subscribe(musicControlEvents);
		// Start listening for events
		MusicControls.listen();

	},



	//// PROXIMITY-SENSOR AND EARPIECE 


	/*******************************************
	* startEarpieceDetection()
	* DESCRIPTION: will start earpiece-detection and route audio to earpiece
	* Note: Cordova-Plugins are required (https://github.com/awoken-well/cordova-plugin-proximity & https://github.com/alongubkin/audiotoggle)
	*******************************************/

	startEarpieceDetection() {

		// check cordova
		if (!fg.state.device.isCordova) return;
		// check if cordova-plugin
		if (navigator.proximity == undefined || window.AudioToggle == undefined) return;
		// headphones are connected -> prevent earpiece-detection
		if (fg.m.Device.state.headsetConnected == true) return;

		// enable proximity-sensor
		navigator.proximity.enableSensor();

		// callback when proximity-sensor has been detected
		function onProximityStateSuccess(proximitySensorState) {

			// proximity-sensor-state has NOT been changed -> exit
			if (fg.m.Audioplayer.state.proximitySensorState == proximitySensorState) return;
			// save new proximity-sensor-state
			fg.m.Audioplayer.state.proximitySensorState = _.clone(proximitySensorState);
			fg.m.Device.state.proximitySensorState = _.clone(proximitySensorState);

			// CASE: Proxity-Sensor-State -> NEAR
			if (proximitySensorState == 1) {
				// trigger "proximity_state_changed" event
				fg.trigger('proximity_state_changed');
				// toggle audiomode to earpiece
				window.setTimeout(function () {
					window.AudioToggle.setAudioMode(window.AudioToggle.EARPIECE);
					// (optional) set volume from audio to default (only for audioplayers with preventPlaybackFromLoudspeaker-flag)
					if (fg.m.Audioplayer.activeAudioplayer) {
						if (fg.m.Audioplayer.activeAudioplayer.options.preventPlaybackFromLoudspeaker) fg.m.Audioplayer.activeAudioplayer.setVolume(fg.m.Audioplayer.activeAudioplayer.options.volume);
					}

					// (optional) auto-playback of active audioplayer when proximity-detection fired
					if (fg.m.Audioplayer.activeAudioplayer) {
						if (fg.m.Audioplayer.activeAudioplayer.options.togglePlaybackWithProximitySensor) {
							//if first play -> delay for android
							if (fg.m.Audioplayer.activeAudioplayer.audioElement.currentTime < 1) timeout = 1500;
							else timeout = 1

							//set time -2secs to past due to Android Delay
							fg.m.Audioplayer.activeAudioplayer.audioElement.currentTime = fg.m.Audioplayer.activeAudioplayer.audioElement.currentTime - 2;

							//play
							window.setTimeout(function () {
								fg.m.Audioplayer.activeAudioplayer.play();
							}, timeout);
						}
					}
				}, 1);
			}

			// CASE: Proxity-Sensor-State -> FAR
			if (proximitySensorState == 0) {
				// trigger "proximity_state_changed" event
				fg.trigger('proximity_state_changed');
				// toggle audiomode to normal mode
				var activeAudioplayer = fg.m.Audioplayer.activeAudioplayer;
				// switch audio back to speaker
				window.setTimeout(function () { window.AudioToggle.setAudioMode(window.AudioToggle.NORMAL); }, 50);
				// (optional) mute volume from active audioplayer (only for audioplayers with preventPlaybackFromLoudspeaker-flag)
				if (fg.m.Audioplayer.activeAudioplayer) {
					if (fg.m.Audioplayer.activeAudioplayer.options.preventPlaybackFromLoudspeaker) fg.m.Audioplayer.activeAudioplayer.setVolume(0);
				}
				// (optional) auto-playback of active audioplayer when proximity-detection fired
				if (fg.m.Audioplayer.activeAudioplayer) {
					if (fg.m.Audioplayer.activeAudioplayer.options.togglePlaybackWithProximitySensor) fg.m.Audioplayer.activeAudioplayer.pause();
				}
			}
		};

		// start check-interval (every second)
		if (fg.m.Device.temp.earpieceDetectionInterval != undefined) window.clearInterval(fg.m.Device.temp.earpieceDetectionInterval);
		fg.m.Device.temp.earpieceDetectionInterval = window.setInterval(function () {
			navigator.proximity.getProximityState(onProximityStateSuccess);
		}, 1000);

	},




	/*******************************************
	* stopEarpieceDetection()
	* DESCRIPTION: will stop earpiece-detectio
	* Note: Cordova-Plugins are required (https://github.com/awoken-well/cordova-plugin-proximity & https://github.com/alongubkin/audiotoggle)
	*******************************************/

	stopEarpieceDetection() {

		// check cordova
		if (!fg.state.device.isCordova) return;
		// check if cordova-plugin
		if (navigator.proximity == undefined || window.AudioToggle == undefined) return;

		// disable proximity-sensor
		navigator.proximity.disableSensor();
	}


};
