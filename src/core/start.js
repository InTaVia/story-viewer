// import scripts
import core from './core.js'; // core-js
import globals from './globals.js'; // core-globals
import initModules from './modules/init_modules.js'; // core-modules
import app from '../app/app.js'; // custom-js (formerly exhibition.js)
import appSettings from './../app/app.settings.js'; // app-settings (base-url, exhibition-id,...)
import { createApp } from 'vue'; // vue
import axios from 'axios'; // Request library (replacement for jquery)
import _ from 'lodash'; // Lodash

import Toaster from '@meforma/vue-toaster';
import VueLazyLoad from 'vue3-lazyload'

// import global core-styles
import './styles/reset.less';
import './styles/core_styles.less';

// // (EXPERIMENTAL) import Logrocket
// import LogRocket from 'logrocket';
// // init Logrocket (only if activated in app.settings.js)
// if (appSettings.activateLogrocket) {
// 	// init Logrocket
// 	LogRocket.init('4rdssl/fluxguide-demo-app');
// 	// This is an example script - don't forget to change it!
// 	LogRocket.identify('ANDRESEIRAFI USER-ID', {
// 		name: 'Andre',
// 		email: 'andre@fluxguide.com',
// 		// Add your own custom user variables here, ie:
// 		customLogRocketVar: 'EIN-TOLLES_ATTRIBUT'
// 	  });
// }

  


// Write first log
core.writeDebugLog('start.js', '1', 'Finished imports');

// coming from cordova -> remove cordova-UI
if (document.getElementById('fg_cordova_progress')) {
	document.getElementById('fg_cordova_progress').remove();
}

// create global fg-scope
window.fg = {};

// init globals eventbus
core.initEventbus(fg);

// inject core into window-scope
window.fg.core = core;

// define some custom js-prototypes
core.defineSomeJsPrototypes();

// init globals
globals.initGlobals();

// debug-log
core.writeDebugLog('start.js', '2', 'Initialized eventbus, prototypes and globals');

// developer-mode -> inject lodash into global scope
if (appSettings.isDebuggingOn) {
	window._ = _;
    window.axios = axios;
}

// define baseUrl (BaseURL for Fluxguide API)
fg.state.baseUrl = localStorage.override_base_url || appSettings.baseUrl;

//// define exhibition-id
fg.state.exhibitionId = localStorage.exhibition_id || appSettings.exhibitionId;
// (very rare) Error-CASE -> exhibition-id is NOT defined
if (fg.state.exhibitionId == undefined) {
	console.log('ERROR! No exhibition-id given! Please define your exhibition-id in app.settings.js');
}

// define system card transitions
if(appSettings.systemCardTransitions) fg.state.systemCardTransitions = appSettings.systemCardTransitions;
else fg.state.systemCardTransitions = {};

// make "app.js" available in fg.core scope
fg.core.app = app;
// init custom app
app.init();

// debug-log
core.writeDebugLog('start.js', '3', 'Custom "app.init()" started');

// TODO -> clear sync_queue (when whatever)
//if (whatever) localStorage.removeItem('sync_queue');

// init core modules
initModules();

// Enable and Disable Kiosk mode on plug in/plug out
if(typeof window.Kioskmanager !== 'undefined') {
    fg.on('device_plugged_in', function(){
        fg.m.Kiosk.stop_kiosk_mode();
    })
    fg.on('device_plugged_out', function(){
        fg.m.Kiosk.start_kiosk_mode();
    })
}

// debug-log
core.writeDebugLog('start.js', '4', 'Finished initialising modules');

// init visitor-session
core.writeDebugLog('start.js', '5', 'Starting visitor session initialisation');
initVisitor();


// init "all_files_on_device"-list (asynchron)
fg.m.Filemanager.get_all_files_on_device(function () {

    // set "all-files-on-device"-flag
	fg.state.start.allFilesOnDeviceLoaded = true;

    // load fg.content
    core.writeDebugLog('start.js', '6', 'Starting content request');
    loadContent();

    // load content-files-list from server
    core.writeDebugLog('start.js', '8', 'Starting content-files-list request');
    loadContentFilesList();

});

// sync time (with server)
core.writeDebugLog('start.js', '9', 'Starting syncing time with server');
syncTime();

// check db-migrations
// (TODO - do this only in developer-mode, and activate this)
// check_db_migrations();
// writeLog("start.js - dev1", 'Started checking for db_migrations');

/*********************************/
/*        THE main vue-app       */
/*********************************/

// create empty container in DOM
let appVueContainer = document.createElement('div');
appVueContainer.id = 'app';
document.body.appendChild(appVueContainer);

// create the main vue-app (core.vue)
import CoreApp from './CoreApp.vue';
const coreApp = createApp(CoreApp).use(Toaster);

coreApp.use(VueLazyLoad, {
	loading: '',
	error: '',
	lifecycle: {
	  loading: (el) => {
		// console.log('loading', el)
	  },
	  error: (el) => {
		// console.log('error', el)
	  },
	  loaded: (el) => {
		// console.log('loaded', el)
	  }
	}
  })

core.writeDebugLog('start.js', '10', 'Created coreApp');

// define global mixin
let mixin = {
	data: function () {
		return {
			fg: {
				state: fg.state,
			},
		};
	},
	methods: {
		fileURL: fg.core.getFileURL,
		fileURLNative: fg.core.getFileURLNative,
        thumbnailURL: core.getThumbnailUrl, 
		showCard: function (cardId, options) {
			fg.core.showCard(cardId, options);
		},
		hideCard: function (cardId, options) {
			fg.core.hideCard(cardId, options);
		},
		getTranslation: fg.core.getTranslation,
		getFocalPoint: fg.core.getFocalPoint,
		checkNestedObject: fg.core.checkNestedObject,
	},
};

// add global mixin
coreApp.mixin(mixin);
// add to fg scope
fg.coreApp = coreApp;

// mount vue-app
fg.vm = coreApp.mount('#app');
core.writeDebugLog('start.js', '11', 'Mounted coreApp');

coreApp.config.unwrapInjectedRef = true;

// start "checkConnection"-function interval
fg.temp.checkConnectionIntervalID = window.setInterval(core.checkConnection, 10000);


////////////////////////////////////////////////////
// loadContent()
// Description: loading fg.content
////////////////////////////////////////////////////
function loadContent() {

    // CASE - cordova 
    if (fg.state.device.isCordova) {

        // SPECIAL CASE - "prevent_all_server_connections" --> use ipa-www-file
        // TODO -> check if this works (was never tested!!!!)
        if (fg.state.coreSettings.preventAllServerConnections == true) {
            // load content from ipa-www
	        const contentURL = fgCordova.ipa_www_path + `fluxguide_content/public/content_${fg.state.exhibitionId}.json`;
	        const contentStopsURL = fgCordova.ipa_www_path + `fluxguide_content/public/content_stops_${fg.state.exhibitionId}.json`;
            loadContentRequest(contentURL, contentStopsURL);
        }

        // CASE - no update available (or offline) -> load content from existing json-file
        // TODO -> how to check if update is available or not??
        //else if (fg.app_update_available == false || fg.core.settings.prevent_all_server_connections == true) {
        else if (fg.state.dataConnection == false) {
            // load content from ipa-www OR documents
            const contentURL = fg.core.getFileURL(`public/content_${fg.state.exhibitionId}.json`);
            const contentStopsURL = fg.core.getFileURL(`public/content_stops_${fg.state.exhibitionId}.json`);
            loadContentRequest(contentURL, contentStopsURL);
        }

        // CASE - update available - download json-file and load afterwards
        else {
            const files = [{"url": `public/content_${fg.state.exhibitionId}.json`, "moddate": _.now(), "size": 5000}, {"url": `public/content_stops_${fg.state.exhibitionId}.json`, "moddate": _.now(), "size": 5000}] 
            fg.m.Downloader.initDownloader(files, 'contentJSONDownloader', function(){
                // load content from ipa-www OR documents
                const contentURL = fg.core.getFileURL(`public/content_${fg.state.exhibitionId}.json`);
                const contentStopsURL = fg.core.getFileURL(`public/content_stops_${fg.state.exhibitionId}.json`);
                loadContentRequest(contentURL, contentStopsURL);
            })
            fg.m.Downloader.allDownloaders.contentJSONDownloader.start();

            // TODO -> activate content-TEMP files (for persistent content-files - for the case when content-file-downloader will fail)
            //// OLD            
            // // download content_x.json and content_stops_x.json
            // files = [{ "url": filename_content_temp_json, "moddate": _.now() }, { "url": filename_content_stops_temp_json, "moddate": _.now() }];
            // fg.modules.Filemanager.download_files(files, {
            //     success: function() {
            //         fg.core.load_fluxguide_content_json(fg.core.get_file_url(filename_content_temp_json), fg.core.get_file_url(filename_content_stops_temp_json));
            //     },
            //     error: function() {
            //         fg.core.restart_app_with_same_visitor();
            //     }
            // });
        }
    }

    
	// CASE - Electron -> load content from local machine
    else if (fg.state.device.isElectron) {
        // load content (from API)
        const contentURL = '../fluxguide_content/public/content_' + fg.state.exhibitionId + '.json';
        const contentStopsURL = '../fluxguide_content/public/content_stops_' + fg.state.exhibitionId + '.json';
        loadContentRequest(contentURL, contentStopsURL);
    }
	
	
	// CASE - web-App -> load content from server
    else {
        // load content (from API)
        const contentURL = fg.state.baseUrl + 'fluxguide_api/get_content/' + fg.state.exhibitionId;
        const contentStopsURL = fg.state.baseUrl + 'fluxguide_api/get_content_stops/' + fg.state.exhibitionId;
        loadContentRequest(contentURL, contentStopsURL);
    }
}


////////////////////////////////////////////////////
// loadContentRequest()
// Description: Help-function for loadContent() - will make the AJAX-call (for offline & online case)
////////////////////////////////////////////////////
function loadContentRequest(contentURL, contentStopsURL) {

	// Check if hidden records should be included
	let includeHiddenRequestBody;

	if (core.getGetParameter('include_hidden_records') == '1') {
		includeHiddenRequestBody = 1;
	}


	axios({
		url: contentStopsURL,
		method: 'GET',
		params: { include_hidden_records: includeHiddenRequestBody },
		timeout: 30000,
	})
		.then((response) => {
			// debug-log
			core.writeDebugLog('start.js', '6.2', 'Got content stops response from server');
			// if fg.content was not created yet -> create it
			if (!fg.content) {
				fg.content = {};
			}
			// save into fg.content.stops
			fg.content.stops = response.data.data.stops;
			// mark as ready
			fg.state.start.contentStopsLoaded = true;
		})
		.catch((error) => {
			console.error(`${contentStopsURL} could not be loaded.`, error);
		});


	axios({
		url: contentURL,
		method: 'GET',
		params: { include_hidden_records: includeHiddenRequestBody },
		timeout: 30000,
	})
		.then((response) => {
			core.writeDebugLog('start.js', '6.1', 'Got content response from server');

			const content = response.data.data;
			const contentVersion = response.data.data.content_version;
			const appVersion = response.data.data.system_version;

			// if content.stops is already available -> save it
			if (_.get(fg, 'content.stops')) {
				content.stops = fg.content.stops;
			}

			// save fg.content object
			fg.content = content;

			// check if content-update is available
			if (contentVersion != localStorage.contentVersion) {
				fg.state.contentUpdateAvailable = true;
			} else {
				fg.state.contentUpdateAvailable = false;
			}

			// save content-version
			localStorage.contentVersion = contentVersion;
			fg.state.contentVersion = contentVersion;

			// save app-version
			localStorage.appVersion = appVersion;
			fg.state.appVersion = appVersion;
			
			//// CASE - only one language available (in app-content) - NOTE: this check will also be done in applyVisitorData()
			// check if visitor is already loaded
			if (fg.state.start.visitorDataLoaded) {			
				// check if only one language is available
				if (fg.content.exhibitions[fg.content.default_language_id][fg.state.exhibitionId].supported_languages.length > 1) fg.state.start.onlyOneLanguageAvailable = false;
				else fg.state.start.onlyOneLanguageAvailable = true;
				// if yes -> auto-select language 
				if (fg.state.start.onlyOneLanguageAvailable) {
					fg.state.visitor.languageId = fg.content.exhibitions[fg.content.default_language_id][fg.state.exhibitionId].supported_languages[0];
				}
			}
			
			// set "contentLoaded"-flag
			fg.state.start.contentLoaded = true;
		})
		.catch((error) => {
			console.error(`${contentURL} could not be loaded.`, error);
		});
}

////////////////////////////////////////////////////
// loadContentFilesList()
// Description: load list of all content-files (fluxguide_api/get_active_files/<exhibition_id>)
////////////////////////////////////////////////////

function loadContentFilesList() {

    //// !!! TODO -> uncomment this !!!
	// CASE - skip list-download (for web-app or if NO content-update available)
	// if (fg.state.device.isWebapp || fg.state.contentUpdateAvailable) {
	// 	// just make empty list
	// 	fg.contentFilesList = [];
	// 	// mark as ready
	// 	fg.state.ajaxSuccessFilesList = true;
	// 	// exit
	// 	return;
	// }


    // CASE - offline
    if (fg.state.dataConnection == false) {
        fg.contentFilesList = [];
        fg.state.start.filesListLoaded = true;
    }

    // CASE - is online
    else if (fg.state.dataConnection) {
        // Get active file list from Fluxguide API
        const activeFilesUrl = fg.state.baseUrl + 'fluxguide_api/get_active_files/' + fg.state.exhibitionId;
        axios({
            url: activeFilesUrl,
            timeout: 30000,
        })
        .then((response) => {
            core.writeDebugLog('start.js', '8.1', 'Got active file list response from server');

            // save files-list
            fg.contentFilesList = response.data.data;
            // mark as ready
            fg.state.start.filesListLoaded = true;
        })
        .catch((error) => {
            console.error(`${activeFilesUrl} could not be loaded.`, error);
        });
    }


}

////////////////////////////////////////////////////
// syncTime()
// Description: syncing time with server
////////////////////////////////////////////////////
function syncTime() {
	// online
	if (fg.state.dataConnection == true && fg.state.coreSettings.preventAllServerConnections == false) {
		const timestampUrl = fg.state.baseUrl + 'fluxguide/get_timestamp';

		// AJAX - get current timestamp from server
		axios({
			method: 'GET',
			url: timestampUrl
		})
			.then((response) => {
				core.writeDebugLog('start.js', '9.1', 'Got syncTime response from server');
				const responseData = response.data;
				let timestamp_server = parseInt(responseData.timestamp);
				let timestamp_server_ms = parseInt(responseData.timestamp_ms);
				let timestamp_client = core.time();
				fg.timestamp_client_diff = timestamp_client - timestamp_server;
				fg.timestamp_client_diff_ms = new Date().getTime() - timestamp_server_ms;

				// write time diff into device localstorage
				localStorage.setItem('timestamp_client_diff', fg.timestamp_client_diff);
				localStorage.setItem('timestamp_client_diff_ms', fg.timestamp_client_diff_ms);

				// write utc offset (of server) to localstorage
				fg.timestamp_utc_offset_server = responseData.utc_offset;
				localStorage.setItem('timestamp_utc_offset_server', fg.timestamp_utc_offset_server);

				//// update "last_content_update"
				// calculate with time-diff (only if value is not from local-storage)
				if (!localStorage.getItem('last_content_update')) {
					fg.last_content_update = fg.last_content_update - fg.timestamp_client_diff;
				}
				localStorage.setItem('last_content_update', fg.last_content_update);
			})
			.catch((error) => {
				core.writeDebugLog(
					'start.js',
					'9.11',
					`${timestampUrl} could not be loaded. Sync timestamp offline.`,
					error
				);
				fg.core.syncTimestampOffline();
			});
	}

	// offline
	else {
		fg.core.syncTimestampOffline();
	}
}

////////////////////////////////////////////////////
// check_db_migrations()
// Description: Check if there are any migrations that need to be run - get's checked automatically when in "developerMode"
////////////////////////////////////////////////////
function check_db_migrations() {
	// Check if there are any migrations that need to be run - get's checked automatically when in "developerMode"
	// TODO - do this only in developer-mode
	// $.ajax({
	//     dataType: 'json',
	//     url: fg.state.baseUrl + 'fluxguide_api/check_migrations_status',
	//     headers: {
	//         "Authorization": "ff1e2930eb3b14ae757de3ba77f437a2"
	//     },
	//     success: function(response) {
	//         if(response.state === "MIGRATION_REQUIRED") {
	//             console.log("❗️ Database-Migrations required, please run migrate-script. (./migrate.sh) More Info: Notion/Fluxguide Core Docs/Migrations");
	//         }
	//         else console.log('DB is fine');
	//     },
	//     error: function() {}
	// });
}

////////////////////////////////////////////////////
// initVisitor()
// Description: init visitor-data (will be called in createNewVisitor AND load_visitor)
////////////////////////////////////////////////////
function initVisitor() {
	// SPECIAL - set visitor_id_js from get-parameter
	if (core.getGetParameter().visitor_id_js != undefined) {
		localStorage.setItem('visitor_id_js', core.getGetParameter().visitor_id_js);
	}

	// CASE - "continue visitor-session"
	if (localStorage.getItem('visitor_id_js') != null && localStorage.getItem('visitor_id_js') != '0') {
		// get visitor_id_js from localStorage
		fg.visitor_id_js = localStorage.getItem('visitor_id_js');
		// load visitor data
		loadVisitorData();
	}
	// CASE - "new visitor-session" -> create new visitor
	else {
		// create new visitor
		createNewVisitor();
	}
}

////////////////////////////////////////////////////
// createNewVisitor()
// Description: init visitor-data (will be called in createNewVisitor AND load_visitor)
////////////////////////////////////////////////////
function createNewVisitor() {

	// create visitor_id_js
	fg.visitor_id_js = core.generateUid();

	let cordovaDevice = {};
	// get phonegap device info
	if (fg.state.device.isCordova) {
		cordovaDevice = {
			phonegap_uuid: device.uuid,
			phonegap_name: device.name,
			phonegap_model: device.model,
			phonegap_version: device.version,
			phonegap_device: JSON.stringify(device),
		};
	}
	// web-app
	else {
		cordovaDevice = {
			phonegap_uuid: 0,
			phonegap_name: 0,
			phonegap_model: 0,
			phonegap_versin: 0,
			phonegap_device: '',
		};
	}

	// define postData
	let postData = new FormData();
	postData.append('visitor_id_js', fg.visitor_id_js);
	postData.append('sys_language_id', 0);
	postData.append('exhibition_id', fg.state.exhibitionId);
	postData.append('phonegap_uuid', cordovaDevice.phonegap_uuid);
	postData.append('phonegap_name', cordovaDevice.phonegap_name);
	postData.append('phonegap_model', cordovaDevice.phonegap_model);
	postData.append('phonegap_version', cordovaDevice.phonegap_version);
	postData.append('phonegap_device', cordovaDevice.phonegap_device);
	postData.append('is_appstore_app', fg.state.device.isCordova && !fg.state.device.isInhouseApp ? 1 : 0);

	// set localstorage
	localStorage.setItem('visitor_id_js', fg.visitor_id_js);

	// ONLINE -> create visitor on server
	if (fg.state.dataConnection && !fg.state.coreSettings.preventAllServerConnections) {
		const createVisitorUrl = `${fg.state.baseUrl}fluxguide_api/create_visitor`;
		axios({
			method: 'POST',
			url: createVisitorUrl,
			data: postData
		})
			.then((response) => {
				// debug-log
				core.writeDebugLog('start.js', '5.1', 'Created new visitor on server request finished');

				// apply visitor data
				applyVisitorData(response.data.data.visitor);
			})
			.catch((error) => {
				console.error(`${createVisitorUrl} could not be loaded. Starting offline.`, error);
				// set offline
				core.startOfflineMode();
				// call create_visitor() again (next time it will run offline)
				createNewVisitor();
			});
	}

	// OFFLINE -> create visitor offline
	else {
		// create empty visitor-data-object
		let visitorData = {};
		visitorData['readable_id'] = '';
		visitorData['email'] = false;
		visitorData['nickname'] = '';
		visitorData['email_sent'] = false;
		visitorData['ac_record'] = false;
		visitorData['photos'] = [];
		visitorData['allow_photo_location'] = '-1';
		visitorData['visitor_team_id'] = 0;
		visitorData['quiz_log'] = false;
		visitorData['profile_photo'] = false;
		visitorData['additional_data'] = {};
		visitorData['push_notifications_registration_id'] = '';
		visitorData['push_notifications_subscriptions'] = [];
		visitorData['state'] = {};

		// "createNewVisitor" to sync-queue (visitor will be sent to server once the online-connection is back)
		core.pushSyncQueue({
			url: 'fluxguide_api/create_visitor',
			postData: postData,
		}, true);

		// TODO -> create submit_data-function
		core.submitData();

		// apply visitor data
		applyVisitorData(visitorData);
	}
}

////////////////////////////////////////////////////
// loadVisitorData()
// Description: Load visitor-data
////////////////////////////////////////////////////
function loadVisitorData() {
	// if no active visitor -> exit
	if (fg.visitor_id_js == 0) {
		return;
	}

	// ONLINE
	if (fg.state.dataConnection && !fg.state.coreSettings.preventAllServerConnections) {
        // get visitor-data from server
        const visitorDataUrl = fg.state.baseUrl + 'fluxguide_api/get_visitor_data';
        axios({
            method: 'GET',
            url: visitorDataUrl,
            params: { visitor_id_js: fg.visitor_id_js },
        })
            .then((response) => {
                // CASE - the requested visitor does not exist anymore -> create a new one
                if (response.data.status == 'error') {
                    if (response.data.error_code === 'VISITOR_NOT_FOUND') {
                        createNewVisitor();
                    }
                    return;
                }

                // apply visitor-data
                applyVisitorData(response.data.data);
            })
            .catch((error) => {
                const retryTime = 500;
                console.error(
                    `${visitorDataUrl} could not be loaded. Starting offline and trying again in ${retryTime}ms`,
                    error
                );
                if (fg.state.dataConnection == true) {
                    core.startOfflineMode();
                }
                window.setTimeout(function () {
                    loadVisitorData();
                }, retryTime);
            });
    }

	// OFFLINE
	else {
		// CASE - visitor exists
		if (fg.visitor_id_js != undefined) {
			// check if visitor exists in localstorage
			if (localStorage.getItem('visitor') != null) {
				// load visitor from localstorage
				fg.visitor_init = JSON.parse(localStorage.getItem('visitor'));
				// apply visitor-data
				applyVisitorData(fg.visitor_init);
			}
			// visitor does not exist in localstorage -> create new visitor
			else {
				createNewVisitor();
			}
		}

		// CASE - visitor is not created yet -> create new visitor
		else {
			createNewVisitor();
		}
	}
}

////////////////////////////////////////////////////
// applyVisitorData()
// Description: init visitor-data (will be called in createNewVisitor AND load_visitor)
////////////////////////////////////////////////////
function applyVisitorData(visitor_data) {
	
	// init visitor-data
	if (!visitor_data.state.readableVisitorId) visitor_data.state.readableVisitorId = visitor_data.readable_id;
	visitor_data.state.visitorIdJs = fg.visitor_id_js;
	fg.state.visitor = _.cloneDeep(visitor_data.state);

	//// set visitor language-ID
	// init language-var
	let languageId = null;
	// CASE - language-id is already defined (from previous visitor-state) -> autoselect last used language
	if (parseInt(visitor_data.state.languageId) > 0) languageId = visitor_data.state.languageId;	
	// CASE - language-id is not defined yet -> set null
	else languageId = null;

	//// CASE - only one language available (in app-content) - NOTE: this check will also be done in loadContent()
	// check if content is already loaded
	if (fg.state.start.contentLoaded) {
		// check if only one language is available
		if (fg.content.exhibitions[fg.content.default_language_id][fg.state.exhibitionId].supported_languages.length > 1) fg.state.start.onlyOneLanguageAvailable = false;
		else fg.state.start.onlyOneLanguageAvailable = true;
		// if yes -> auto-select language 
		if (fg.state.start.onlyOneLanguageAvailable) {
			languageId = fg.content.exhibitions[fg.content.default_language_id][fg.state.exhibitionId].supported_languages[0];
		}
	}

	// set defined language in visitor-state
	fg.state.visitor.languageId = languageId;

	// save visitor into localstorage
	localStorage.setItem('visitor', JSON.stringify(visitor_data));

	// set "visitorDataLoaded"-flag
	fg.state.start.visitorDataLoaded = true;

	// trigger visitorDataLoaded event
	fg.trigger('visitorDataLoaded');
}

core.writeDebugLog('start.js', 'last', 'Finished last (synchronus) line from start.js');
