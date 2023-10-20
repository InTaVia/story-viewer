//// imports
import core from "./../../core.js";
import _ from 'lodash';
import $ from 'jquery';


export default {


    /**
     * init module
     */
    init(){

        //// init state & settings
        window.fg.state.m.Permissions = {
            camera: null,
            cameraWithStorage: null,
            externalStorage: null,
            location: null,
            microphone: null,
            notifications: null
        };
        // map global module-state and module-settings directly to module-scope
        this.state = window.fg.state.m.Permissions;

        //// Module globals
        this.temp = {};

        // get all visitor-permissions on init
        this.checkAllPermissions();

    },








    /**
     * Set device permission
     * Description: setting a device-permission
     * @param {string} permissionType: permission-type ( "camera", "cameraWithStorage" (Android only), "notifications" (iOS only), "location", "location_always")
     * @param {function} callback: callback after permission was defined
     */
    setPermission: function(permissionType, callback) {
        
        // check if cordova 
        if (!fg.state.device.isCordova) return;
        // define callback 
        callback = callback || function(){};
        // check existing permission -> then set new one
        fg.m.Permissions.checkPermission(permissionType, function(status){fg.m.Permissions.setPermissionHelpfunction(permissionType, callback);});

    },

    setPermissionHelpfunction: function(permissionType, callback) {

        // CASE - set "camera"
        if (permissionType == "camera" || permissionType == "cameraWithStorage") {
            let externalStorage;
            // define if storage-permission is also needed (only for Android)
            if (permissionType == "camera") externalStorage = false;
            else if (permissionType == "camera_storage") externalStorage = true;
            // CASE - permission already set -> do nothing
            if (fg.state.m.Permissions.camera == "GRANTED") callback();
            // CASE - permission was already denied -> open settings
            else if ( (fg.state.m.Permissions.camera == "DENIED" && fg.state.device.isIos) || (fg.state.m.Permissions.camera == "DENIED_ALWAYS") ) {
                window.cordova.plugins.settings.open("application_details", function() {
                        // when coming back to app (from settings) -> call this once    
                        $(document).one("resume", function() {
                            // check if permission was given
                            fg.m.Permissions.checkPermission(permissionType, function(status){callback(status);});
                        });
                    },
                    function () {console.log('failed to open notifications-settings');}
                );
            }
            // CASE - permission is not set yet -> set "camera" permission
            else {
                cordova.plugins.diagnostic.requestCameraAuthorization({
                    successCallback: function(status){
                        // get permission-status-string
                        let permissionStatus = fg.m.Permissions.getPermissionString(status);
                        // save to user-data
                        fg.state.m.Permissions.camera = permissionStatus;
                        // run callback
                        callback();
                    },
                    errorCallback: function(error){console.error("Error in set_camera_permission. The following error occurred: "+error);},
                    externalStorage: externalStorage
                });
            }
        }


        // CASE - set "notifications"
        else if (permissionType == "notifications") {
            // CASE - permission already set (or Android - because notifications-permission does not exist on android) -> dont try to get permission again
            if (fg.state.m.Permissions.notifications == "GRANTED") {callback();}
            // CASE - permission was already denied -> open settings
            else if (fg.state.m.Permissions.notifications == "DENIED" || fg.state.m.Permissions.notifications == "DENIED_ALWAYS") {
                window.cordova.plugins.settings.open("application_details", function() {
                        // when coming back to app (from settings) -> call this once    
                        $(document).one("resume", function() {
                            // check if permission was given
                            fg.m.Permissions.checkPermission('notifications', function(status){callback(status);});
                        });
                    },
                    function () {console.log('failed to open notifications-settings');}
                );
            }
            // CASE - set "notifications" permission
            else {
                cordova.plugins.diagnostic.requestRemoteNotificationsAuthorization({
                    successCallback: function(status){
                        // convert permission-status string
                        let permissionStatus = fg.m.Permissions.getPermissionString(status);
                        // save to user-data
                        fg.state.m.Permissions.notifications = permissionStatus;
                        // run callback
                        callback();
                    },
                    errorCallback: function(err){console.error("Error requesting remote notifications authorization: " + err);},
                    types: [
                        cordova.plugins.diagnostic.remoteNotificationType.ALERT,
                        cordova.plugins.diagnostic.remoteNotificationType.SOUND,
                        cordova.plugins.diagnostic.remoteNotificationType.BADGE
                    ],
                    omitRegistration: false
                });


            }
        }





        // CASE - set "location"
        else if (permissionType == "location" || permissionType == "location_always") {

            // CASE - permission "location" already set 
            if (permissionType == "location" && (fg.state.m.Permissions.location == "GRANTED" || fg.state.m.Permissions.location == "GRANTED_WHEN_IN_USE") ) {callback();}
            // CASE - permission "location_always" already set
            if (permissionType == "location_always" &&(fg.state.m.Permissions.location == "GRANTED" || fg.state.m.Permissions.location == "GRANTED_WHEN_IN_USE")) {callback();}
            // CASE - permission was already denied -> open settings
            else if ((fg.state.m.Permissions.location == "DENIED_ALWAYS") || (fg.state.device.isIos && fg.state.m.Permissions.location=="DENIED")) {
                fg.state.app.askForLocationPermission = true;
            }
            // CASE - permission was not asked yet -> ask for permission
            else {
                if(permissionType == "location") {
                    cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
                        // get permission-status-string
                        let permissionStatus = fg.m.Permissions.getPermissionString(status);
                        // save to user-data
                        fg.state.m.Permissions.location = permissionStatus;
                        // run callback
                        callback();
                    }, function(error){console.error("Error requesting location location authorization: " + err);}, 
                    cordova.plugins.diagnostic.locationAuthorizationMode.WHEN_IN_USE);
                }

                if(permissionType == "location_always") {
                    cordova.plugins.diagnostic.requestLocationAuthorization(function(status){
                        // get permission-status-string
                        let permissionStatus = fg.m.Permissions.getPermissionString(status);
                        // save to user-data
                        fg.state.m.Permissions.location = permissionStatus;
                        // run callback
                        callback();
                    }, function(error){console.error("Error requesting location location authorization: " + err);}, 
                    cordova.plugins.diagnostic.locationAuthorizationMode.ALWAYS);
                }
                
            }

        }







    },






    
    /**
     * checkPermission(permissionType, callback)
     * Description: callback function will return a parameter with permission-status-string
     * Possible permission-types: "camera", "cameraWithStorage" (Android only), "notifications", "location", "location_always"
     * Callback will return status of defined permission: "GRANTED", "DENIED", "NOT_REQUESTED", "GRANTED_WHEN_IN_USE" (iOS only), "DENIED_ALWAYS" (Android only)
     * @param {string} permissionType: permission-type ( "camera", "cameraWithStorage" (Android only), "notifications" (iOS only), "location", "location_always")
     * @param {function} callback: callback after permission was defined
     */    
    checkPermission: function(permissionType, callback) {

        // check callback-parameter
        callback = callback || function(){};

        // CASE - get "camera" permission
        if (permissionType == "camera") {
            cordova.plugins.diagnostic.getCameraAuthorizationStatus({
                successCallback: function(status){
                    // get permission status string
                    let permissionStatus = fg.m.Permissions.getPermissionString(status);
                    // save permission-info into visitor-data
                    fg.state.m.Permissions.camera = permissionStatus;
                    // callback
                    callback(permissionStatus);
                },
                errorCallback: function(error){
                    console.error("Error in check_camera_permission. The following error occurred: "+error);
                },
                externalStorage: false
            });
        }


        // CASE - get "cameraWithStorage" permission
        else if (permissionType == "cameraWithStorage") {
            cordova.plugins.diagnostic.getCameraAuthorizationStatus({
                successCallback: function(status){
                    // get permission status string
                    let permissionStatus = fg.m.Permissions.getPermissionString(status);
                    // save permission-info into visitor-data
                    fg.state.m.Permissions.cameraWithStorage = permissionStatus;
                    // callback
                    callback(permissionStatus);
                },
                errorCallback: function(error){
                    console.error("Error in check_camera_permission. The following error occurred: "+error);
                },
                externalStorage: true
            });
        }


        // CASE - get "location" permission
        else if (permissionType == "location" || permissionType == "location_always") {
            cordova.plugins.diagnostic.getLocationAuthorizationStatus(function(status){
                    // get permission status string
                    let permissionStatus = fg.m.Permissions.getPermissionString(status);
                    // save permission-info into visitor-data
                    fg.state.m.Permissions.location = permissionStatus;
                    // callback
                    callback(permissionStatus);
             }, function(error){
                 console.error("Error in check_location_permission. The following error occurred: "+error);
             });
        }


        // CASE - get "notifications" permission
        else if (permissionType == "notifications") {
            if (fg.state.device.isAndroid) {
                fg.state.m.Permissions.notifications = "GRANTED";
                callback("GRANTED");
            }
            else {
                cordova.plugins.diagnostic.getRemoteNotificationsAuthorizationStatus(function(status){
                    // get permission status string
                    let permissionStatus = fg.m.Permissions.getPermissionString(status);
                    // save permission-info into visitor-data
                    fg.state.m.Permissions.notifications = permissionStatus;
                    // callback
                    callback(permissionStatus);
                }, function(error){
                    console.error("Error in check_notifications_permission. The following error occurred: "+error);
                });
            }
        }


        // CASE - get "microphone" permission
        else if (permissionType == "microphone") {
            cordova.plugins.diagnostic.getMicrophoneAuthorizationStatus(function(status){
                // get permission status string
                let permissionStatus = fg.m.Permissions.getPermissionString(status);
                // save permission-info into visitor-data
                fg.state.m.Permissions.microphone = permissionStatus;
                // callback
                callback(permissionStatus);
            }, function(error){
                console.error("Error in check_microphone_permission. The following error occurred: "+error);
            });
        } 

        // CASE - get "externalStorage" permission
        else if (permissionType == "externalStorage") {
            // if ios -> just give it a grant
            if (fg.state.device.isIos || cordova.plugins.diagnostic.getExternalStorageAuthorizationStatus == undefined) {
                fg.state.m.Permissions.externalStorage = "GRANTED";
                callback("GRANTED");
            }
            // get permission for android
            else {
                    cordova.plugins.diagnostic.getExternalStorageAuthorizationStatus(function(status){
                    // get permission status string
                    let permissionStatus = fg.m.Permissions.getPermissionString(status);
                    // save permission-info into visitor-data
                    fg.state.m.Permissions.externalStorage = permissionStatus;
                    // callback
                    callback(permissionStatus);
                }, function(error){
                    console.error("Error in check_microphone_permission. The following error occurred: "+error);
                });
            }
        }

        // error - notifications-type does not exist
        else {
            console.log('Error in fg.m.Permissions.checkPermission() - this permission-type does not exist: ' + permissionType);
        }


    },





    /**
     * getPermissionString(status)
     * Description: internal function for getting a normalized status-string for permission (that we have same values for iOS and Android)
     * Possible status-strings: "GRANTED", "DENIED", "NOT_REQUESTED", "GRANTED_WHEN_IN_USE" (iOS only), "DENIED_ALWAYS" (Android only)
     * @param {string} status: status-string that should be converted
     * @param {function} callback: callback after permission was defined
     * @returns {string} return normalized permission-state-string
     */  
    getPermissionString: function(status) {

        // check if cordova 
        if (!fg.state.device.isCordova) return;
        let permissionStatus;
        // CASE - "GRANTED" - permission wurde erfolgreich gegeben
        if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED) permissionStatus = "GRANTED";
        // CASE - "DENIED" - permission not given (....)
        else if(status === cordova.plugins.diagnostic.permissionStatus.DENIED) permissionStatus = "DENIED"; 
        // CASE - "NOT_REQUESTED" - permission was not asked yet
        else if(status === cordova.plugins.diagnostic.permissionStatus.NOT_REQUESTED) permissionStatus = "NOT_REQUESTED";
        // (iOS only) CASE "GRANTED_WHEN_IN_USE" - for geoposition only - permission that geolocation can NOT be used in background-mode
        else if(status === cordova.plugins.diagnostic.permissionStatus.GRANTED_WHEN_IN_USE) permissionStatus = "GRANTED_WHEN_IN_USE";
        // (Android only) CASE "DENIED_ALWAYS" - only for android
        else if(status === cordova.plugins.diagnostic.permissionStatus.DENIED_ALWAYS) permissionStatus = "DENIED_ALWAYS";
        // Hmmmmm.. some other value
        else permissionStatus = status;
        // return
        return permissionStatus;

    },






    /**
     * checkAllPermissions()
     * Description: check ALL device-permissions (will be saved in fg.state)
     * This will be done automaticly when app is starting
     */  
    checkAllPermissions: function() {

        // exit when not cordova
        if (fg.state.device.isCordova != true) return;

        // check camera
        fg.m.Permissions.checkPermission('camera');
        // check cameraWithStorage (only for android)
        fg.m.Permissions.checkPermission('cameraWithStorage');
        // check location
        fg.m.Permissions.checkPermission('location');
        // check notifications
        fg.m.Permissions.checkPermission('notifications');
        // check microphone
        fg.m.Permissions.checkPermission('microphone');
        // check external storage (android only)
        fg.m.Permissions.checkPermission('externalStorage');

    }












}
// Permissions Module END