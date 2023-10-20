/* globals.js */
/* core globals */

//// imports
import _ from 'lodash';
import { reactive } from 'vue';
import core from './core.js';

export default {
	initGlobals() {
		// init fg.state
		fg.state = reactive({
			m: {}, // state for core-modules
			app: {}, // state for (custom) app
			dataConnection: true, // flag for data-connection
			//lastUserAction: Math.round(new Date().getTime()), // last user-interaction (e.g. every tap) - in ms
			lastUserAction: core.time_ms(), // last user-interaction (e.g. every tap) - in ms
			baseUrl: undefined, // base-url (will be set in custom-app OR from super.fluxguide app-record)
			cardStack: [], // card-stack (array)
			cardAnimation: false, // current card-animation (check if there is active animation)
			visitor: {
				languageId: false
			},
			exhibitionId: 1, // visitor-state
			coreSettings: {
				// core-settings:
				preventAllServerConnections: false, // core-setting - prevent all server-connections (for apps without fluxguide-api-connection)
			},
			start: {
				contentLoaded: false, // start-procedure - content.json has been loaded (flag)
				contentStopsLoaded: false, // start-procedure - content_stops.json has been loaded (flag)
				filesListLoaded: false, // start-procedure - active_files has been loaded (flag)
				allFilesOnDeviceLoaded: false, // start-procedure - all_files_on_device.json was loaded (flag)
				visitorDataLoaded: false, // start-procedure - visitor-record has been loaded (flag)
				appIsRunning: false, // start-procedure - app is running - everything has been loaded (flag)
				contentDownloadFinished: false  // start-procedure - content-download is finished (flag)
			},
			device: {
				isIos: this.isIOS() || this.isIpadOS(),
				iosVersion: this.getiOSVersion(),
				isAndroid: navigator.userAgent.match(/Android/i) != null,
				androidVersion: this.getAndroidVersion(),
				isMederSmartguide:
					navigator.userAgent.match(/SmartGuide/i) != null ||
					navigator.userAgent.match(/SmartGuide_Basic/i) != null,
				isIframe: window.location.href.indexOf('noiframe') > -1,
				isSimulator: false,
				isCordova: window.cordova !== undefined && window.cordova !== null,
				isNativeapp: window.cordova !== undefined && window.cordova !== null,
				isWebapp: !(window.cordova !== undefined && window.cordova !== null),
				isElectron: navigator.userAgent.match(/Electron/i) != null,
			},
			developerMode: window.location.href.indexOf('dev') > -1,
            showSystemMenu: false, // Flag if Sytem Menu is visible
		});

        // define isInhouseApp
        if (fg.state.device.isWebapp) fg.state.device.isInhouseApp = false;
        else fg.state.device.isInhouseApp = fgCordova.settings.is_inhouse_app;

		// (Museumstars only) define exhibiton section id for this app 
		if (window.fgCordova) {
			if (fgCordova.settings.museumId) fg.state.museumId = fgCordova.settings.museumId;
		}

			

		// define some globals
		fg.temp = {}; // temp var (for all kind of stupid stuff)
		fg.content = {}; // container for content
		fg.vm = null; // container for main vue-app-instance (only for testing and hacking)

		// init sync-queue
		localStorage.syncQueue = localStorage.syncQueue ? localStorage.syncQueue : JSON.stringify([]);

		//// define data-connection
		// SPECIAL CASE (for electron-app) -> always disable data-connection-flag
		if (fg.state.device.isElectron) {
			fg.state.dataConnection = false;
		}
		// CASE - web-app
		else if (fg.state.device.isWebapp || !fgCordova) {
			fg.state.dataConnection = true;
		}
		// CASE - cordova-app
        else {
            fg.state.dataConnection = fgCordova.data_connection;
        }



		// init window.open for InAppBrowser-plugin
		// window.open needs to be overwritten in native-apps
		if(fg.state.device.isNativeapp) {
			if(cordova.InAppBrowser) {
				window.open = cordova.InAppBrowser.open;
			}
		}

		//// define lastUserAction & detect hidde gesture - on every tap
		let clickEventType = "touchstart";
		if (fg.state.device.isWebapp) clickEventType = "click";
		document.querySelector("body").addEventListener(clickEventType, (e) => {
			// update lastUserAction on every screen-tap
			fg.state.lastUserAction = core.time_ms();
			// special case - hidden-gesture-detection was manualy disabled
			if (fg.temp.disableHiddenGesture == true) return;
			// init counter
			if (!fg.temp.count_hidden_gesture_taps) fg.temp.count_hidden_gesture_taps = 0;
			// start gesture-detection only if two fingers are on the screen (for desktop -> press shift-key during clicking)
			if ((e.touches && e.touches.length > 1) || e.shiftKey) {
				// tap-count
				fg.temp.count_hidden_gesture_taps++;
				// show system-menu (after 10 taps)
				if (fg.temp.count_hidden_gesture_taps > 10) {
					// open system-menu
					fg.state.showSystemMenu = true;
                    fg.temp.count_hidden_gesture_taps = 0;
				}
			}
			// reset tap-counter
			else fg.temp.count_hidden_gesture_taps = 0;
		});


	},
	// end of initGlobals()

	/////////////////////////////////////////////////
	// isIOS()
	// DESCRIPTION: detect iOS device
	/////////////////////////////////////////////////
	isIOS() {
		if (/iPad|iPhone|iPod/.test(navigator.platform)) {
			return true;
		} else {
			return navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
		}
	},

	/////////////////////////////////////////////////
	// isIpadOS()
	// DESCRIPTIONv: detect iPadOS device
	/////////////////////////////////////////////////
	isIpadOS() {
		return navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
	},

	/////////////////////////////////////////////////
	// getiOSVersion()
	// DESCRIPTION: detect iOS version
	/////////////////////////////////////////////////
	getiOSVersion() {
		if (!this.isIOS()) {
			return false;
		}

		// in case of ipad
		if(navigator.appVersion.indexOf("Macintosh") > -1) return null;

		// supports iOS 2.0 and later: <http://bit.ly/TJjs1V>
		let v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
		
		return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
	},

	/////////////////////////////////////////////////
	// getAndroidVersion()
	// DESCRIPTION: detect Android version
	/////////////////////////////////////////////////
	getAndroidVersion() {
		if (!(navigator.userAgent.match(/Android/i) != null)) {
			return false;
		}
		let versions = {
			major: 0,
			minor: 0,
		};
		let matches = navigator.userAgent.match(/Android (\d+)\.*(\d+)*/i);
		if (matches == null) {
			return versions;
		}
		if (matches[1] != undefined) {
			versions.major = parseInt(matches[1]);
		}
		if (matches[2] != undefined) {
			versions.minor = parseInt(matches[2]);
		}
		return versions;
	},
};
