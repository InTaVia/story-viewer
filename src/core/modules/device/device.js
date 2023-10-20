

//// imports
import core from "./../../core.js";
import _ from 'lodash';
import $ from 'jquery';

export default {


    /**
     * init module
     */
    init() {

        //// init state & settings
        window.fg.state.m.Device = {

            volume: null,                                                   // (media-)volume of device (0-1)
            wifiStatus: null,                                              // wifi-status (true/false)
            batteryLevel: null,                                            // battery-level (from 0-100%)
            batteryChargingStatus: null,                                  // battery-charging-status (true/false)
            screenBrightness: null,                                        // current screen-brightness (0-1)
            screenAlwaysOn: false,                                        // state if display will keep on (true/false)
            screenOrientationLock: null,                                  // current screen-orientation-lock (string: portrait, landscape, portrait-primary,...)
            screenOrientation: null,                                       // current screen-orientation     
            headsetConnected: null,                                        // current headset-connection-state          
            proximitySensorState: null,                                   // current proximity-sensor-state (values: 1 -> near, 2 -> far)
            bluetoothStatus: null,                                         // current ibeacon-status (will not be initialized automaticly, but can be done with fg.m.Device.get_bluetoothStatus())

            // settings
            settings: {
                lockScreenOrientation: "portrait-primary",                // define initital screen-orientation-lock - possible values: portrait-primary, portrait-secondary, landscape-primary, landscape-secondary, portrait, landscape
                batteryMonitoringIntervalSecondsInhouse: 5,             // interval for battery-monitoring-interval for inhouse-apps (in seconds) - will also be used for plugged-in / plugged-out event)
                batteryMonitoringIntervalSecondsAppstore: 60,           // interval for battery-monitoring-interval for appstore-apps (in seconds) - for appstore-apps (will also be used for plugged-in / plugged-out event)
                enableHeadsetDetection: false                             // enable/disable headset-detection - will start headset-detection on startup (with an interval)
            }

        };
        // map global module-state and module-settings directly to module-scope
        this.state = window.fg.state.m.Device;
        this.settings = window.fg.state.m.Device.settings;

        //// Module globals
        this.temp = {};

        // init custom events
        this.initCustomEvents();

        // check wifi-state on startup (TODO -> inhouse-devices does not work with this -> check workaround with android intend from yannick)
        //fg.m.Device.getWifiStatus();

        // set first screen orientation if available (mobile safari-browser doesn't have "window.screen.orientation", cordova has)
        if (typeof window.screen.orientation !== "undefined") fg.m.Device.state.screenOrientation = window.screen.orientation.type;
        else fg.m.Device.state.screenOrientation = fg.m.Device.getScreenOrientationFallback();

        // init screen-orientation (init orientation & detection-event)
        fg.m.Device.initScreenOrientation();

    },





    /**
     * initCustomEvents() - init custom events
     */
    initCustomEvents: function () {


        // appLaunched event
        fg.on('appLaunched', function () {

            // get the init current headset state
            fg.m.Device.getCurrentHeadsetState();

            // init screen brightness (only for inhouse-devices)
            fg.m.Device.initScreenBrightness();

            // check screen-brightness on startup
            fg.m.Device.getScreenBrightness();

            // init headset-detection-monitoring
            if (fg.m.Device.settings.enableHeadsetDetection || fg.state.device.isInhouseApp) fg.m.Device.startHeadsetDetection();

            // init battery-monitoring (every x seconds) 
            fg.m.Device.startBatteryMonitoring()

        });
        // appLaunched END



    },










    //// VOLUME


    /**
     * Set the System Volume of the Device (= Media Volume)
     * @param {number|string}   volume  number from 0-1 OR string like "+0.1" to increase 10%, "-0.1" to decrease 10%
     * @return {number}                 returns the new system volume
     */
    setSystemVolume: function (volume) {

        // CASE 1 - newer plugin (https://github.com/MCluck90/cordova-plugin-android-volume) - Note 1: this plugin works with 0-100, but we will keep it to 0-1
        if (window.androidVolume) {
            // CASE 1 - if a string like "+0.1" or "-0.1" is passed -> use this as a delta
            if (typeof volume === "string" && (volume[0] == "+" || volume[0] == "-")) {
                var delta = parseFloat(volume.substring(1));
                var newVol = fg.m.Device.state.volume;
                if (volume[0] == "+") newVol += delta;
                else if (volume[0] == "-") newVol -= delta;
            }
            // CASE 2 - simple volume value is passed like (0.4)
            else {
                var newVol = parseFloat(volume);
            }
            // move to 0-100 space
            var volume = parseInt(newVol * 100);
            // make sure volume is not lower than 0 or higher than 100
            volume = _.clamp(volume, 0, 100);
            // configuration for androidVolume plugin
            var showToast = false;
            var success = function () { /* console.log("set volume to ", volume); */ };
            var error = function () { /* console.log("ERROR setting volume to ", volume); */ };
            if (!_.isNaN(volume)) {
                window.androidVolume.setMusic(volume, showToast, success, error);
                fg.m.Device.state.volume = volume / 100;
                return fg.m.Device.state.volume;
            }
            else {
                return fg.m.Device.state.volume;
            }
        }

        // CASE 2 - legacy plugin (https://github.com/Jiliac/phonegap-plugin-systemvolume)
        else {
            if (!_.has(window, 'system.setSystemVolume')) return;
            if (typeof volume === "string" && (volume[0] == "+" || volume[0] == "-")) {
                var delta = parseFloat(volume.substring(1));
                var newVol = fg.m.Device.state.volume;
                if (volume[0] == "+") newVol += delta;
                else if (volume[0] == "-") newVol -= delta;
            }
            else {
                var newVol = parseFloat(volume);
            }
            var newVol = parseFloat(_.clamp(newVol, 0, 1).toFixed(2));
            if (!_.isNaN(newVol)) window.system.setSystemVolume(newVol);
            fg.m.Device.state.volume = newVol;
            return newVol;
        }

    },






    //// DEVICE-SYSTEM-SETTINGS


    /**
     * openSystemSettings(setting)
     * open android-system-settings
     * Note: (optional) you can choose the specific setting
     * Possible specific settings:
     *     "open" | "accessibility" | "add_account" | "airplane_mode" | "apn" | "application_details" | "application_development" | "application" | "bluetooth" | "captioning" | "cast" | "data_roaming" | "date" | "device_info" | "display" | "dream" | "home" | "input_method" | "input_method_subtype" | "internal_storage" | "locale" | "location_source" | "manage_all_applications" | "manage_applications" | "memory_card" | "network_operator" | "nfcsharing" | "nfc_payment" | "nfc_settings" | "print" | "privacy" | "quick_launch" | "search" | "security" | "settings" | "show_regulatory_info" | "sound" | "sync" | "usage_access" | "user_dictionary" | "voice_input" | "wifi_ip" | "wifi" | "wireless"
     *     (for up-to-date list please refer to: https://github.com/guyromb/Cordova-open-native-settings)
     */
    openSystemSettings: function (setting) {

        // check cordova
        if (!fg.state.device.isCordova) return;
        // check parameter
        setting = setting || undefined;

        // CASE - Settings-Plugin is NOT installed -> i will use the diagnostic-plugin instead
        if (window.cordova.plugins.settings == undefined) {
            // check diagnostic-plugin
            if (window.cordova.plugins.diagnostic == undefined) { console.log('ERROR in openSystemSettings(). Not a single plugin for this feature is installed'); return; }
            // fire console-warning
            console.log('Warning in openSystemSettings Cordova-open-native-settings Plugin is NOT available. I will try the Diagnostic-Plugin, but detailed settings wont work this way.');
            // open settings with diagnostic-plugin
            if (setting == "wifi") cordova.plugins.diagnostic.switchToWirelessSettings();
            else if (setting == "wireless" || setting == "cellular_usage") cordova.plugins.diagnostic.switchToMobileDataSettings();
            else if (setting == "location") cordova.plugins.diagnostic.switchToLocationSettings();
            else if (setting == "bluetooth") cordova.plugins.diagnostic.switchToBluetoothSettings();
            else if (setting == "nfc_settings") cordova.plugins.diagnostic.switchToNFCSettings();
            else cordova.plugins.diagnostic.switchToSettings(function () { }, function () { console.log('Error. Could not open the device-settings.') });
        }
        // CASE - Settings-Plugin is installed
        else {
            // open setting
            window.cordova.plugins.settings.open(setting, function () { }, function () {
                if (fg.state.device.isAndroid) window.cordova.plugins.settings.open('wifi');
                else window.cordova.plugins.settings.open('application_details');
            });
        }

    },


















    //// WIFI

    /**
     * setWifiStatus(state, success, error)
     * DESCRIPTION: turn WIFI on/off
     * NOTE: location-permission MUST be set for this feature
     */
    setWifiStatus: function (state, success, error) {

        // check cordova
        if (!fg.state.device.isCordova) return;

        // check parameter
        if (state == undefined) return;
        success = success || function () { };
        error = error || function () { };

        // check location-permission (ACCESS_FINE_LOCATION) - must be set for cordova-plugin
        if (fg.state.m.Permissions.location == "GRANTED" || fg.state.m.Permissions.location == "GRANTED_WHEN_IN_USE") var locationPermission = true;
        else var locationPermission = false;
        if (!locationPermission && fg.m.Device.temp.enableWifiAlreadyAskedPermission != true) {
            fg.m.Permissions.setPermission('location', function () {
                fg.m.Device.temp.enableWifiAlreadyAskedPermission = true;
                window.setTimeout(function () { fg.m.Device.enableWifi(success, error); }, 50);
            });
            return;
        }

        // CASE 1 - new cordova-plugin (https://github.com/tripflex/wifiwizard2)
        if (window.WifiWizard2) {
            // enable wifi
            WifiWizard2.setWifiEnabled(state).then(function () {
                // set state-flag
                fg.m.Device.state.wifiStatus = state;
                // call success-callback
                success();
            });
        }

        // CASE 2 - old cordova-plugin (https://github.com/hoerresb/WifiWizard.git)
        else if (window.WifiWizard) {
            // enable wifi
            WifiWizard.setWifiEnabled(state, function () {
                // set state-flag
                fg.m.Device.state.wifiStatus = state;
                // call success-callback
                success();
            }, function () {
                // error
                error();
            });
        }

        // CASE 3 - no wifiwizard-plugin installed -> use diagnositc-plugin
        else if (cordova.plugins.diagnostic) {
            // enable wifi
            cordova.plugins.diagnostic.setWifiState(function () {
                // set state-flag
                fg.m.Device.state.wifiStatus = state;
                // call success-callback
                success();
            }, error, state);
        }

        // ERROR CASE - no plugin installed -> exit
        else console.log('Error in setWifiStatus(). Cordova-Plugin not installed OR location-permission is not given.');

    },




    /**
     * getWifiStatus(callback)
     * DESCRIPTION: get wifi-state
     */
    getWifiStatus: function (callback) {

        // check cordova
        if (!fg.state.device.isCordova) return;

        // check if inhouse app (TODO -> make this feature available for all devices - we had problem with android devices)
        if (!fg.state.device.isInhouseApp) return;

        // check parameter
        callback = callback || function () { };

        // check plugin
        if (cordova.plugins.diagnostic.isWifiEnabled) {
            cordova.plugins.diagnostic.isWifiEnabled(function (enabled) {
                // set wifi-state
                if (enabled == 1 || enabled == "1" || enabled == true) fg.m.Device.state.wifiStatus = true;
                else fg.m.Device.state.wifiStatus = false;
                // callback
                callback(enabled);
            }, function (error) {
                console.error("Error in getWifiStatus(). Following error occurred: " + error);
                // callback
                callback(error);
            });
        }


    },









    //// BLUETOOTH


    /**
     * getBluetoothStatus()
     * get bluetooth-status 
     * NOTE for iOS: this will open system-message "do would like to use bluetooth?" on first call)
     */
    getBluetoothStatus: function (callback) {

        // check cordova
        if (!fg.state.device.isCordova) return;

        // define parameter
        callback = callback || function () { };

        cordova.plugins.diagnostic.getBluetoothState(function (state) {
            // set bluetooth-state
            if (state === cordova.plugins.diagnostic.bluetoothState.POWERED_ON) fg.m.Device.state.bluetoothStatus = true;
            else fg.m.Device.state.bluetoothStatus = false;
            // run callback
            callback();
        }, function (error) {
            console.log('Error in getBluetoothStatus()');
            console.error(error);
        });

    },



    /**
     * enable_bluetooth()
     * turn bluetooth on
     */
    setBluetoothStatus: function (state, successCallback) {

        // check cordova
        if (!fg.state.device.isCordova) return;

        // check parameter
        if (state == undefined) { console.log('Error in setBluetoothStatus(). state is not given!'); return; }
        state = state || false;
        successCallback = successCallback || function () { };

        // check plugin
        if (cordova.plugins.locationManager == undefined) {
            console.log('Error in set_bluetooth-state. Cordova-iBeacon-Plugin is NOT installed.');
            return;
        }

        // CASE - turn on bluetooth
        if (state === true) {
            cordova.plugins.locationManager.enableBluetooth().then(function () {
                // set state
                fg.m.Device.state.bluetoothStatus = true;
                // custom callback
                successCallback();
            }).fail(function () {
                console.log("Could not turn on Bluetooth.");
            });
        }

        // CASE - turn off bluetooth
        else if (state === false) {
            cordova.plugins.locationManager.disableBluetooth().then(function () {
                // set state
                fg.m.Device.state.bluetoothStatus = false;
                // custom callback
                success_callback();
            }).fail(function () {
                console.log("Could not turn off Bluetooth.");
            });
        }

    },




    /**
     * restartBluetooth(callback)
     * restart bluetooth on device
     */
    restartBluetooth: function (callback) {

        // check cordova
        if (!fg.state.device.isCordova) return;

        // check parameter
        callback = callback || function () { };

        // check plugin
        if (cordova.plugins.locationManager == undefined) {
            console.log('Error in restartBluetooth(). Cordova-iBeacon-Plugin is NOT installed.');
            return;
        }

        // STEP #1 - turn off bluetooth
        fg.m.Device.setBluetoothStatus(false, function () {
            // STEP #2 - turn on bluetooth
            window.setTimeout(function () {
                fg.m.Device.setBluetoothStatus(true, function () {
                    // STEP #3 - check if bluetooth is turned on
                    window.setTimeout(function () {
                        cordova.plugins.diagnostic.getBluetoothState(function (state) {
                            // set bluetooth-state
                            if (state === cordova.plugins.diagnostic.bluetoothState.POWERED_ON) fg.m.Device.state.bluetoothStatus = true;
                            else fg.m.Device.state.bluetoothStatus = false;
                            // (optional) STEP #4 - if bluetooth is still not turned on -> try again
                            if (fg.m.Device.state.bluetoothStatus != true) {
                                window.setTimeout(function () {
                                    fg.m.Device.setBluetoothStatus(true, function () {
                                        callback();
                                    });
                                }, 5000);
                            }
                            // run callback
                            else callback();
                        }, function (error) {
                            console.log('Error in restartBluetooth()');
                            console.error(error);
                        });
                    }, 500);
                });
            }, 1000);
        });
    },





















    //// SCREEN-BRIGHTNESS


    /**
     * initScreenBrightness()
     * initital screen-brightness (ONLY for inhouse-devices right now)
     */
    initScreenBrightness: function () {

        // check cordova
        if (!fg.state.device.isCordova) return;
        // check if inhouse-app
        if (fg.state.device.isInhouseApp != true) return;

        // set high inital brightness
        fg.m.Device.setScreenBrightness(fg.m.Kiosk.settings.brightness_high);
        // start interval to check brightness / keepScreen on
        if (fg.m.Device.brightnessCheckInterval != undefined) window.clearInterval(fg.m.Device.brightnessCheckInterval);

        // start "screen-brightness-monitoring"-interval 
        fg.m.Device.brightnessCheckInterval = window.setInterval(function () {
            if (fg.last_user_action != NaN) {
                // CASE - no user action for a while -> dim screen to low -> time defined via fg.m.Kiosk.settings.brightness_timeout
                if (core.time_server() - fg.last_user_action > fg.m.Kiosk.settings.brightness_timeout && fg.active_card != "slave_slide_detail_card" && fg.m.Kiosk.disable_screen_dimming_temporarily != true) {
                    fg.m.Device.setScreenBrightness(fg.m.Kiosk.settings.brightness_low);
                }
                // CASE - no user-action for a long while -> turn off screen -> time defined via fg.m.Kiosk.settings.screen_off_timeout)
                if (fg.last_user_action != 0 && fg.last_user_action != undefined && core.time_server() - fg.last_user_action > fg.m.Kiosk.settings.screen_off_timeout) {
                    // set flag for pause/resume state
                    fg.m.Kiosk.allow_sleep_mode_temporarily = true;
                    // disable "keep-screen-on" (ENABLE android-display-sleep-timer)
                    fg.m.Device.setScreenAlwaysOn(false);
                }
            }
        }, 15000);
    },


    /**
     * setScreenBrightness(value)
     * DESCRIPTION: set screen-brightness (value 0 to 1)
     */
    setScreenBrightness: function (value) {

        // check cordova
        if (fg.state.device.isCordova != true) return;
        // check plugin
        if (_.has(window, 'cordova.plugins.brightness') == false) return;
        // check parameter
        if (!(value >= 0 && value <= 1)) {
            console.log('Error in setScreenBrightness(). Parameter missing or invalid. Value should be between 0 and 1.');
            return;
        }
        // set brightness
        var brightness = cordova.plugins.brightness;
        brightness.setBrightness(value, function () {
            fg.m.Device.state.screenBrightness = _.clone(value);
        }, function () { console.log('Error in setScreenBrightness(). From Plugin.') });

    },


    /**
     * getScreenBrightness(callback)
     * DESCRIPTION: get screen-brightness (value 0 to 1)
     * NOTE: this should not be used from outside - use state instead: fg.m.Device.state.screenBrightness
     */
    getScreenBrightness: function (callback) {

        // check cordova
        if (fg.state.device.isCordova != true) return;
        // check plugin
        if (_.has(window, 'cordova.plugins.brightness') == false) return;
        // check parameter
        callback = callback || function () { };
        // get brightness
        var brightness = cordova.plugins.brightness;
        brightness.getBrightness(function (value) {
            // set state
            fg.m.Device.state.screenBrightness = _.clone(value);
            // call callback
            callback(value);
        });

    },

    /**
     * setScreenAlwaysOn(state, callback)
     * DESCRIPTION: set/unset that screen should stay always on
     * NOTE: if you set this to TRUE the screen will stay on, if you set to FALSE the screen will use the android-system-settings for display-sleep-timer
     */
    setScreenAlwaysOn: function (state, callback) {

        // check cordova
        if (fg.state.device.isCordova != true) return;
        // check plugin
        if (_.has(window, 'cordova.plugins.brightness') == false) return;
        // check parameter
        callback = callback || function () { };
        if (state != true && state != false) {
            console.log('Error in setScreenAlwaysOn(). State is not given.');
            return;
        }
        // set keep-screen-on-flag
        cordova.plugins.brightness.setKeepScreenOn(state);
        // save state
        fg.m.Device.state.screenAlwaysOn = state;

    },










    //// SCREEN-ORIENTATION

    /**
     * initScreenOrientation()
     * DESCRIPTION: intitial screen-orientation & event-listener to listen to screen-orienation-change
     */
    initScreenOrientation: function () {

        // onOrientationChange Event
        $(window).bind('orientationchange', _.debounce(function () {
            // on android + cordova-app -> delay orientationchange event (because of lousy orientation-change-transition)
            if (fg.state.device.isAndroid && fg.state.device.isCordova) window.setTimeout(fg.m.Device.orientationChangeHandler, 600);
            else fg.m.Device.orientationChangeHandler();
        }, 100));

        // resize Event
        $(window).bind('resize', _.debounce(function () {
            // on android + cordova-pp -> delay orientationchange event (because of lousy orientation-change-transition)
            if (fg.state.device.isAndroid && fg.state.device.isCordova) window.setTimeout(fg.m.Device.orientationChangeHandler, 600);
            else fg.m.Device.orientationChangeHandler();
        }, 100));

        // lock to initital screen-orientation
        if (fg.m.Device.settings.lockScreenOrientation) {

            // SPECIAL for old meder-smartguide (because of upside-down-situation)
            if (fg.state.device.isMederSmartguide && fg.state.device.meder_smartguide_version == 1 && fg.m.Device.settings.lockScreenOrientation.includes('portrait')) fg.m.Device.lockScreenOrientation('portrait-secondary');
            // set initial screen orientation   
            fg.m.Device.lockScreenOrientation(fg.m.Device.settings.lockScreenOrientation);
        }

        // set inital orientation-handler
        window.setTimeout(function () {

        }, 600);
    },


    /**
     * orientationChangeHandler()
     * DESCRIPTION: handle orientationchange events
     */
    orientationChangeHandler: function () {

        // set some states
        if (typeof window.screen.orientation !== "undefined") fg.m.Device.state.screenOrientation = window.screen.orientation.type;
        else fg.m.Device.state.screenOrientation = fg.m.Device.getScreenOrientationFallback();

        // set device-oriented body-classes
        fg.m.Device.setCssBodyClasses();

        // CASE - slideshow available
        if ($('.slideshow_viewport:visible').length > 0) {
            // set height of viewport
            $('.slideshow_viewport:visible').each(function (index, viewport) {
                if ($(viewport).hasClass('fs')) {
                    $(viewport)
                        .css('height', window.innerHeight)
                        .css('width', window.innerWidth);
                }
                else {
                    $(viewport).css('width', window.innerWidth);
                }
                var slides = $(viewport).find('.slide');
                slides.css('width', window.innerWidth);
                $(viewport).find('.scroller').css('width', window.innerWidth * slides.length);
                var wrapp_id = $(viewport).find('.slideshow_wrapper').attr('id');
            });
        }

    },


    /**
     * setCssBodyClasses()
     * DESCRIPTION: set all kind of device-related classes on body
     */
    setCssBodyClasses: function () {

        // init lists
        var addClasses = [];
        var removeClasses = [];

        // retina-class
        if (window.devicePixelRatio > 1) addClasses.push('is_retina');

        // class "isIframe"
        if (fg.isIframe) addClasses.push('isIframe');
        else removeClasses.push('isIframe');

        // Portrait
        if (window.innerHeight > window.innerWidth) {
            removeClasses.push('is_landscape');
            // class "is_portrait"
            addClasses.push('is_portrait');
            // class "tablet"
            if (innerWidth >= 600) addClasses.push('tablet');
            else removeClasses.push('tablet');
            // class "small_phone" (like iphone 5 or smaller)
            if (innerWidth <= 320) addClasses.push('small_phone');
            else removeClasses.push('small_phone');
        }

        // Landscape
        else {
            // class "is_landscape"
            removeClasses.push('is_portrait');
            addClasses.push('is_landscape');
            // class "tablet"
            if (innerWidth >= 900) addClasses.push('tablet');
            else removeClasses.push('tablet');
            // class "small_phone" (like iphone 5 or smaller)
            if (innerHeight <= 320) addClasses.push('small_phone');
            else removeClasses.push('small_phone');
        }

        // development
        if (fg.developerMode) addClasses.push('developerMode');

        // in house app
        if (fg.state.device.isInhouseApp) addClasses.push("isInhouseApp");

        // apply classes
        if (addClasses.length > 0) $("body").addClass(addClasses.join(" "));
        if (removeClasses.length > 0) $("body").removeClass(removeClasses.join(" "));

    },



    /**
     * lockScreenOrientation(orientation)
     * DESCRIPTION: lock screen-orientation
     * following orientations are supported: portrait-primary, portrait-secondary, landscape-primary, landscape-secondary, portrait, landscape
     */
    lockScreenOrientation: function (orientation) {

        // check cordova
        if (fg.state.device.isCordova != true) return;
        // check plugin (or web-api)
        if (window.screen == undefined) return;
        // check parameter
        if (orientation == undefined) {
            console.log('Error in lockScreenOrientation(). orientation is not given.');
            return;
        }
        // HACK do unlock before orientation-lock - becuase of problem - known from apc.fluxguide.com - TODO: check if this is a good idead
        //screen.orientation.unlock();
        // enable orientation-lock
        window.screen.orientation.lock(orientation);
        // save state
        fg.m.Device.state.screenOrientationLock = orientation;
        fg.m.Device.state.screenOrientation = orientation;

    },


    /**
     * unlockScreenOrientation()
     * DESCRIPTION: disables the screen-orientation-lock
     */
    unlockScreenOrientation: function () {

        // check cordova
        if (fg.state.device.isCordova != true) return;
        // check plugin (or web-api)
        if (window.screen == undefined) return;
        // disable orientation-lock
        window.screen.orientation.unlock();
        // save state
        fg.m.Device.state.screenOrientationLock = false;

    },




    //// BATTERY-STATUS

    /**
     * startBatteryMonitoring()
     * start periodic battery-monitoring (every x seconds)
     */
    startBatteryMonitoring: function () {

        // start battery-status-interval (for inhouse or appstore)
        if (fg.state.device.isInhouseApp) {
            fg.m.Device.batteryReadingInterval = window.setInterval(function () {
                fg.m.Device.getBatteryStatus();
            }, fg.m.Device.settings.batteryMonitoringIntervalSecondsInhouse * 1000);
        }
        else {
            fg.m.Device.batteryReadingInterval = window.setInterval(function () {
                fg.m.Device.getBatteryStatus();
            }, fg.m.Device.settings.batteryMonitoringIntervalSecondsAppstore * 1000);
        }
        // read battery first time
        if (fg.state.device.isInhouseApp) fg.m.Device.getBatteryStatus(function (battery) {
            if (fg.m.Kiosk) fg.m.Kiosk.show_charging_info(fg.m.Kiosk.update_battery_info);
        });
        else fg.m.Device.getBatteryStatus();

    },


    /**
     * getBatteryStatus()
     * get battery-status & charging-status
     */
    getBatteryStatus: function (callback) {

        // check cordova
        if (!fg.state.device.isCordova) return;
        // check cordova-plugin
        if (navigator.getBattery == undefined) return;

        // get battery-status
        navigator.getBattery().then(function (battery) {
            // save battery-status into state
            fg.m.Device.state.batteryLevel = Math.round(battery.level * 100);
            // (legacy) save battery-status into var (only for backwards-compatibility)
            if (fg.m.Kiosk) fg.m.Kiosk.batteryLevel = battery.level;
            // Handle Plugged IN / OUT 
            fg.m.Device.checkChargerStatusChanged(battery.charging);
            // fire callback
            if (callback && typeof callback === "function") callback(battery);
            // backwards-compatibility (for inhouse-apps) - update battery-level in UI
            if (fg.state.device.isInhouseApp && fg.m.Kiosk) fg.m.Kiosk.update_battery_info();
        });

    },


    /**
     * checkChargerStatusChanged(charger_status)
     * Handle Plugged IN  /  OUT 
     * charger_status: true if plugged in / false if plugged out
     */
    checkChargerStatusChanged: function (chargerStatus) {

        // console.log(chargerStatus);

        // CASE - battery-status was never set before -> init
        if (fg.m.Device.state.batteryChargingStatus == null) {
            // update state
            fg.m.Device.state.batteryChargingStatus = _.clone(chargerStatus);
            // (legacy) save battery-status into var (only for backwards-compatibility)
            if (fg.m.Kiosk) fg.m.Kiosk.battery_charging_status = chargerStatus;
            // (optional) -> disable "keep-screen-on" when charging
            if (fg.state.device.isInhouseApp && fg.m.Kiosk) {
                if (chargerStatus == true && fg.m.Kiosk.settings.disable_screen_always_on_when_charging) {
                    fg.m.Device.setScreenAlwaysOn(false);

                }
            }
        }

        // CASE - device was "plugged IN"
        if (chargerStatus == true && fg.m.Device.state.batteryChargingStatus == false) {

            // update state
            fg.m.Device.state.batteryChargingStatus = _.clone(chargerStatus);
            // (legacy) save battery-status into var (only for backwards-compatibility)
            if (fg.m.Kiosk) fg.m.Kiosk.battery_charging_status = _.clone(chargerStatus);
            // (optional) -> disable "keep-screen-on" (android-display-sleep-timer will be enabled)
            if (fg.state.device.isInhouseApp && fg.m.Kiosk) {
                if (fg.m.Kiosk.settings.disable_screen_always_on_when_charging) {
                    fg.m.Device.setScreenAlwaysOn(false);
                }
            }
            // fire event "device_plugged_in"
            fg.trigger('device_plugged_in');
        }
        // CASE - device was "plugged OUT"
        else if (chargerStatus == false && fg.m.Device.state.batteryChargingStatus == true) {

            // update state
            fg.m.Device.state.batteryChargingStatus = _.clone(chargerStatus);
            // (legacy) save battery-status into var (only for backwards-compatibility)
            if (fg.CKiosk) fg.m.Kiosk.battery_charging_status = _.clone(chargerStatus);
            //// deactivate medertransceiver (only if in use)
            if (fg.m.MederTransceiver) {
                if (fg.m.MederTransceiver.state.current_mode != "NONE") {
                    // remember last medertransceiver-mode
                    fg.m.Device.temp.lastMedertransceiverMode = _.clone(fg.m.MederTransceiver.state.current_mode);
                    // stop medertransceiver
                    if (fg.m.Device.temp.lastMedertransceiverMode != "NONE") fg.m.MederTransceiver.set_mode('NONE');
                }
            }

            // fire event
            fg.trigger('device_plugged_out');
        }

    },







    //// HEADSET DETECTION


    /*******************************************
    * startHeadsetDetection()
    * DESCRIPTION: will start headset-detection (in an interval)
    * Note: Cordova-Plugin is required (https://github.com/EddyVerbruggen/HeadsetDetection-PhoneGap-Plugin)
    *******************************************/
    startHeadsetDetection: function () {

        // check cordova
        if (!fg.state.device.isCordova) return;
        // check cordova-plugin 
        if (window.HeadsetDetection == undefined) return;

        // start interval for headset-detection
        if (fg.m.Device.temp.headsetDetectionInterval != undefined) window.clearInterval(fg.m.Device.temp.headsetDetectionInterval);
        fg.m.Device.temp.headsetDetectionInterval = window.setInterval(function () {
            // check headset-state
            fg.m.Device.getCurrentHeadsetState();
        }, 1000);

    },



    /*******************************************
    * getCurrentHeadsetState()
    * DESCRIPTION: get headset-status
    *******************************************/
    getCurrentHeadsetState: function () {

        // check cordova
        if (!fg.state.device.isCordova) return;
        // check cordova-plugin
        if (window.HeadsetDetection == undefined) return;

        // detect connected headphones
        window.HeadsetDetection.detect(function (detected) {
            // this is first headphone-check
            if (fg.m.Device.state.headsetConnected == null) fg.m.Device.state.headsetConnected = _.clone(detected);

            // NEW STATE DETECTED - fire "headset-connection"-event
            if (fg.m.Device.state.headsetConnected != detected) {
                // set new state
                fg.m.Device.state.headsetConnected = _.clone(detected);
                // CASE - headset was connected
                if (detected == true) {
                    // add this to avoid weird behaviour for Android 8+
                    window.AudioToggle.setAudioMode(window.AudioToggle.NORMAL);
                    // trigger "headsetWasAdded" event
                    fg.trigger('headsetWasAdded');
                    // prevent proximity-sensor (earpiece-detection) when headphones are connected
                    fg.m.Audioplayer.stop_earpiece_detection();
                    // (optional) reset volume from active audioplayer - when muted before
                    if (fg.m.Audioplayer.activeAudioplayer) {
                        fg.m.Audioplayer.activeAudioplayer.setVolume(fg.m.Audioplayer.activeAudioplayer.options.volume);
                    }
                }
                // CASE - heaset was disconnected
                else if (detected == false) {
                    // pause all audios (simulate ios behaviour)               
                    fg.m.Audioplayer.pauseAll();
                    // trigger event
                    fg.trigger('headsetWasRemoved');
                    // (optional) mute active audioplayer (when speaker-output is prevented)
                    if (fg.m.Audioplayer.activeAudioplayer) {
                        if (fg.m.Audioplayer.activeAudioplayer.options.prevent_playback_from_speaker) fg.m.Audioplayer.activeAudioplayer.setVolume(0);
                        if (fg.m.Audioplayer.activeAudioplayer.options.use_earpiece_detection) fg.m.Audioplayer.start_earpiece_detection();
                    }
                }
            }

        });
    },



    /*******************************************
    * get_screenOrientation_fallback()
    * DESCRIPTION: get screen-orientation - ONLY for mobile safari (non-cordova)
    *******************************************/
    getScreenOrientationFallback: function () {
        if (window.matchMedia("(orientation: portrait)").matches) return "portrait-primary";
        else return "landscape-primary";
    }





}
// Device Module END