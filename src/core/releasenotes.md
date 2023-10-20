**Fluxguide-Core-App Release Notes**


<!-- 
(Template to copy)
# Version 22.X (2022-XXX-XX)

## What's new:

## Bug Fixes: 

## Breaking Changes & Migration Notes:
-->



# Version 23.1 (2023-XXX-XX)

## What's new:
- Camera Module (CameraPreview):
    - Added cameraPreview.js to modules because the cordova plugin used in camera.js is currently buggy on Android 13+ devices (permission issues)
    - To use is install cordova-plugin-camera-preview 

## Bug Fixes: 
- Statistics: From now on logVisitorAction only creates a logging entry if fg.state.device.isCordova is true, in case of a web browser or cms simulator a console log is shown

## Breaking Changes & Migration Notes:








# Version 22.6 (2022-DEC-07)


## What's new:
- New Game "DragNDrop-Game" aka "Feuer-Game" aka "Game Sequence" - added as component (Note: You can finde a  real-life-example and CMS-form in Schlösserland-App)
- Refactoring: removed fg.visitor - now ONLY fg.state.visitor MUST be used

## Bug Fixes: 
- Puzzle Game:
    Added mobile touch gestures
- Fix namings in package downloader -> delete packages for cordova

## Breaking Changes & Migration Notes:
- remove all "fg.visitor" - it was REMOVED - replace with "fg.state.visitor"














# Version 22.5 (2022-AUG-31)

## What's new:
- Download-Package Downloader Methods were created - look into demo how it works
- NEW component -> "video-sync" -> for syncing external video-players with audio-track inside app - look into demo-usage how it works
- new global vue-method checkNestedObject

## Bug Fixes: 
- Bugfixes/Optimizations in Geo-Push-Notifications
- Some updates to `MapView.vue`:
    - Now uses `MapPin.vue` and `MapPinUser.vue` instead of HTML-strings!
    - Moved pin type definition to own file
    - Handle `active Pin` internally - no need anymore to keep track of it on the parent level
    - Map Offline functionality:
        - add `isOffline` prop to determine if online of offline tiles should be used
        - Move `getTilesWithinBounds` to `Map.js`
- CoreApp.vue - added `aria-hidden` Tag to inactive cards 
- Bugfix in Downloader - ipa-www-files and inhouse-deployed-files were downloaded TWO times when connected to WIFI - this has being fixed now
- Toast Message -> fixed issue with `duration`. Now if duration is set to false, toast message stays active, until user explicitly clicks on it
- Videoplayer
    - added `crossorigin="anonymous"` tag on video -> fixed tracks/subtitles for Android
    - added z-index and increased transformZ for both android and ios

## Breaking Changes & Migration Notes:











# Version 22.4 (2022-JUN-15)

## What's new:
- Added new map and floorplan in one new awesome component `MapView.vue`
    - Uses Maplibre instead of leaflet
    - Uses Typescript
    - Supports vector tiles (awesome!)
    - Dynamic pin rendering
    - many more!
    - Still subject to change in some parts
- Moved old `floorplan` and `map` components into `__legacy`
- beforeAfterImageOverlay Component -> tiny component to visualise before and after images, with the help of opacity and inputy type range slider
- DialogBox Screenreader Support -> Watcher with focus on Dialog open was added

## Bug Fixes: 

## Breaking Changes & Migration Notes:



# Version 22.3 (2022-MAY-18)

## Bug Fixes: 
- patternlock: include pattern code on success emit
- removed `fg.state.cardAnimation` completely -> from now on few animations are possible at same time 
- changed `core_styles.less` -> changed `active_card` / `previous_card` selectors to `.animation-card` / `.animation-previous-card` responsively -> transitions of card will not be connected to `cardStack`, and run smoothly to the end even if `cardStack` changes
- moved disconnect `MutationObserver` to a place right after Card was injected into DOM, prevents from having multiple `MutationObservers` at the same time

# Version 22.2 (2022-APR-20)

## What's new:
- Moved Swiper.css import from start.js to app.js/custom
- `ibeacon.js` really works now :) -> got refactored and tested with ibeacon touch
- `delay.option` in showCard and hideCard -> if you want to wait before show/hide card, because of animation or so -> use `delay.option`
- Refactor of `device` Module (and references in other modules) to camelCase

## Bug Fixes:
- added `will-change: transform;` to `SliderGallery.less` -> will cause Android glitches if missing
- Add `enableHighAccuracy: true` to map
- complete refactoring of `fg.core.showCard` and `fg.core.hideCard` because of animation bugs / glitches 

## Breaking Changes & Migration Notes:
- If you use swiperjs: Add `import 'swiper/swiper.less';` (or an other swiper style import) to your app.js
- due to refactor of `device.js`: check your `AudioplayerGlobal.js` -> headset detection must be camel cased.
    -  headset_connected -> headsetConnected
    - fg.m.Device.start_headset_detection -> fg.m.Device.startHeadsetDetection
- also check if you use fg.m.Device elsewhere in your custom code and still have snake case :)


# Version 22.1 (2022-FEB-23)

## What's new:
- `core.getGlossar` -> Works the same as `core.getStop` but for Glossar
- Added `relatedRecordId` to `logVisitorAction` as optional parameter

- SliderGallery: Added lockPortrait prop to activate/deactivate portrait lock in fullscreen mode, per default it's set to true (behaviour as usual)
- Quiz:
    - New Quiz Type -> Hotspot. Used to either find details on an image or to compare an image onsite with an image shown in the app.

## Bug Fixes: 
- SliderGallery: prevent image being distorted (zoomed in) in fullscreen if focal point feature was used in CMS.
- Map Component in DemoCard -> mapSettingsJSON component name was wrongly used in template -> changed to -> "map-settings-j-s-o-n"
- Map Component -> check in watcher if arrays did reeeeeally have changed

## Breaking Changes & Migration Notes:





# Version 21.5 (2021-DEC-22)

## What's new:
- Moved card imports out of `app.setttings.js` into (new) `card.js`

- VisitorTeam:
    - `fg.core.createVisitorTeam(object, boolean)` -> creates visitor team in `visitor_teams` DB
    - `fg.core.getVisitorTeam(visitorTeamIdJs)` ->  get visitor team from `visitor_teams` Table with visitoreamIdJs identifier. IMPORANT!!! -> The response data will be saved in `fg.state.visitor.visitorTeam` -> `visitorTeam` is from now on core preserved... Do not mess with it! :)
    - `fg.core.getVisitorTeams(timestampFrom)` -> get all visitor teams from `visitor_teams`. `timestampFrom` is an optional parameter -> defines from what creation time and above (till now) teams should be given. Ex.: timestamp for 25.11.2021 -> give me back all teams that were created from 25.11.2021 till now. IMPORTANT! USAGE -> This function is in `core.js` as boilerplate for you, copy + paste it in your custom code at a proper and the most important -> logical :) place. Respode to axios' success and error call in your custom code.
    - `fg.core.getAllVisitorsFromTeam(visitorTeamIdJs)` -> get `visitor.state` from all `visitors`, that belong to the same team. `visitorTeamIdJs` serves as identifier. IMPORTANT! USAGE -> This function is in `core.js` as boilerplate for you, copy + paste it in your custom code at a proper and the most important -> logical :) place. Respode to axios' success and error call in your custom code.
    
- Floorplan is now ready for proximi.io (indoor-positioning-system)
        - you need to install Proximi.io Cordova Plugin -> https://github.com/fluxguide/proximiio-cordova
        - use with Floorplan -> see Floorplan Component Guide in Notion & Demo 
            - new emits like: 
                - ```onProximiioReady(visitorId)```
                - ```onPositionChang(coords)```
                - ```onFloorChange(floor)```
        - use without Floorplan -> see https://github.com/fluxguide/proximiio-cordova

- Quiz:
    - New Quiz Type -> Puzzle. can be also used as solo component. One need to `npm i p5` in order for it to work. Puzzle image, Number of columns and rows can be defined as prop. Puzzle Theme can be also defined as prop.

- Toast messages:
    - Toast messages are accepting a type (string) now which results in a css class, possible types are: success, info, warning, error, default

## Bug Fixes: 

## Breaking Changes & Migration Notes:
- Create `cards.js` and create a `export default` (instead of `export const appCards = `) with the card-components (which were in `app.settings.js`)
- Change `app.settings.js` to a `export default` instead of `export const appSettings = `
- Add the properties `isDebuggingOn` and `contentDownloadEmulationFileTimeout` to `app.settings.js`

Check out [the changes in the boilerplate template](https://bitbucket.org/fluxguide/fluxguide-core-app-custom-boilerplate/commits/a89b1e039cfda6ca53cc7425318d8624924a9af9) (ignore the changes in `package-lock.json` and `package.json`)

- `LanguageSelectScreen` -> changed into `LanguageSelection`... Check your `cards.js` and `fg.core.showCard('LanguageSelectScreen')` -> `fg.core.showCard('LanguageSelection')`
- `ContentDownloadScreen` -> changed into `ContentDownload`... Check your `cards.js` and `fg.core.showCard('ContentDownloadScreen')` -> `fg.core.showCard('ContentDownload')`




# Version 21.4 (2021-Nov-24)

## What's new:
- New component: Patternlock
- VisitorTeam Logic -> Work in progress: New ```fg.core.createVisitorTeam``` -> creates a new visitor team in ```visitor_teams``` DB
- VisitorTeam Logic -> Work in progress: New ```fg.core.getVisitorTeam(visitorId)``` -> gets a visitor team with a given id
- Added ```id="CardName"``` im CoreApp.vue for following Core Cards: LanguageSelection, SystemMenu, ContentDownload
- New Feature for Floorplan Module: Indoor localization with Proximi.io

## Bug Fixes: 

## Breaking Changes & Migration Notes:
- Do DB Migration: VisitorTeam Logic -> In order to use new ```fg.core.createVisitorTeam``` function you have to migrate/update your DB






<!-- Add new notes here -->
# Version 21.3 (2021-11-10)

## What's new:
- New component: QR Code component

## Bug Fixes: 
- `syncQueue` visitor saving fixed -> before this visitor update was broken


## Breaking Changes & Migration Notes:







# Version 21.2 (2021-10-19)

## What's new:
- we now have back the "visitor-log"-function - fg.core.logVisitorAction(actionId, metadata)
- Completely rewrote `submitData` and everything around `syncQueue` (now uses localStorage as single source of truth)
- Added `pushSyncQueue` for adding sync-items to the sync-queue
- Removed `submitLog` (now contained in submitData)

## Bug Fixes:

## Breaking Changes & Migration Notes:
- Removed `fg.logRecords`, `fg.syncQueue`, `fg.syncQueueOffline`. If you use them, you should replace them with the functionality of `pushSyncQueue`






# Version 21.1 (2021-09-09)

## What's new:
- Added `core.logVisitorAction(actionId, metadata)`
PushNotifications Module:
 - already tested -> Geofence Notifications, see MuseumStars
Refactored Permissions Module to camelCase


## Bug Fixes:
Videoplayer:
- subtitles prop changed required to false
- fixed vm is not defined in mounted func
Audioplayer:
- multiple audioplayers (which get initialized on the same time) are now working - HTML5 audio only
- if a duplicate audioplayer(id) is used it now creates a unique id instead of deleting the existing audioplayer
Slider-Gallery:
- Removed Videoplayer.pauseAll() on slide change
- Stop auto-sliding when a video is played
Core.js
- ShowCard/HideCard - completely refactored, see breaking Changes & Migration Notes
Meder:
-  Hack included in core Map Module to ensure that Meder will find your gps position (`getCurrentPosition` on locate Button) -> for further reference: http://www.quickmeme.com/img/a2/a20a0adec6f4b2d9822846381f9aa637b8429d3a0464d0a6b7d84d81accb32b5.jpg


## Breaking Changes & Migration Notes:
- if you use the Permissions Module in custom -> switch Functions to camelCase (zB `setPermission`)
- Change in audioplayer: when using multiple audioplayers in one vue-template -> they will now be initialized asynchronous (template and audio-object).
- ShowCard/HideCard - completely refactored
    - fg.core.cardStack removed
    - ```fg.state.cardStack = {}``` from now on card stack is an Object that lives in fg.state :)
    - Card Object structure:
        ```appCard, id, cardData, callback, animation, duration, activeCard, previousCard```
    - You can use card's structure in your show/hideCard functions like following:
        ```
            let cardOptions = { 
                animation: 'push-left',
                duration: 600,
                callback: function(){
                    fg.core.hideCard('HomeCard');
                }
                // you can add custom data for this card (e.g. which stop-id is this detail-card)
                stopID: 99
            }
            fg.core.showCard('StartMemoriesCard', cardOptions );
        ```
    - In show/hideCard it is important to specify cardId as first parameter, all other specs will be specified in options parameter
    - Duration of animations will be now be written only via JS, not CSS
    - card component (all your standart cards), have now access to following props:
        - cardData (e.g. cardData.stopID)

    - CSS ```core_styles.less``` card animations were also refactored and will not work with old type of showCard/hideCard
    - Added a helper function ```setCardStackActivePrevCard``` in core.js that will set active/previous cards' states
    - Added ```if(fg.state.cardAnimation) return; ```in showCard/hideCard ... so if there is a card transition, one can not open other card (otherwise glitchy glitchy :)) 
- Refactored logging & sync spaces to camelCase
    - `fg.log_records` is now `fg.logRecords`
    - `fg.sync_queue` is now `fg.syncQueue`
    - `fg.sync_queue_offline` is now `fg.syncQueueOffline`
    - `fg.submit_data_in_progress` is now `fg.submitDataInProgress`
    - `fg.temp.submit_log_lock` is now `fg.temp.submitLogLock`














# Version 21.0 (2021-07-29)

## What's new:
- Added offline mode for cordova apps
- Added `core.getStaticContent('keyword')` to get single entry from `fg.content.staticContent`
- Loading-screen added, implementation of component is done in custom app
- Added Toast Message -> function `fg.core.toast("MY MESSAGE",{optional_options})`
- Added logging method to core `core.writeDebugLog("start.js", "412", "Log description")`
- Removed jQuery from start.js
- Reworked start.js
- Added hidden gesture (NEW methods: on mobile -> hold one finger on screen and tap 10 times with the second finger -- on desktop -> hold shift-key while clicking 10 times)
- Added checkConnection() method in a global interval (NOTE: this was formerly known as refresh())
- New Core component: `search` -> uses `vue-fuse`
- `DemoCard` added which shows different states of our existing components
- Added `swiper.less` in `start.js`
- Added DialogBox, SliderGallery, Quiz Demos
- Added `* {box-sizing: border-box}` in `reset.less`
- Added Transitions for Core Cards -> such as Language, System Menu, contentDownloader and showApp.
    - default : `fade` possible transitions -> `fade, top, bottom, left, right, none`
    - use it in your app.settings.js as following object:
    ```
        export const appSettings = {
            ...
            cardTransitions: {
                langCardTransition: 'fade',
                contentDownloaderTransition: 'fade',
                appContentTransition: 'fade',
                sysMenuCardTransition: 'top'
            }
		};
    ```


## Bug Fixes:
Quiz:
- Remove .empty class from matrix items-container if items were drawn back again

Videoplayer:
- Fullscreen Slider should work now

Audioplayer
- Changed 500ms destroy timeout to 1 ms, fast clicking can not kill you app anymore

## Breaking Changes & Migration Notes:
- `app_is_running` renamed to `appIsRunning`
- `visitor_data_was_loaded`renamed to `visitorDataLoaded`
- loading flags are now scoped under `fg.state.start` instead of directly `fg.state`
    - `ajaxSuccessContent` renamed to `contentLoaded`
    - `ajaxSuccessContentStops` renamed to `contentStopsLoaded`
    - `ajaxSuccessTranslations` renamed to `translationsLoaded`
    - `ajaxSuccessFilesList` renamed to `filesListLoaded`
    - `ajaxSuccessContentStaticPages` removed.

- Translations are now in `/src/app/translations.js`!
    - Removed `translationsLoaded` flag! Remove it everywhere from your code!

- Refactored `open_url_in_system_browser`
    - `open_url_in_system_browser` renamed to `openUrlInSystemBrowser`
    - `openUrlInSystemBrowser` takes two params, url and confirm which defines if confirm modal should be shown or not, default is false
- Refactored `open_url_in_inapp_browser`
    - `open_url_in_inapp_browser`renamed to `openUrlInInappBrowser`
    - `openUrlInInappBrowser` takes two params, url and options
    - All options do have default values

- Renamed `screen_always_on` to `screenAlwaysOn` 
- Renamed `set_screen_always_on` to `setScreenAlwaysOn`
- Renamed `open_adress_in_maps` to `openAddressInMaps`

- Videoplayer
  - `<section class="videoplayer-section">` is now wrapping the complete videoplayer
  - `<fg-videoplayer>`is now only responsible for video rotation in fullscreen
  - new data `sliderDirection`
  - new computed function -> `setSliderDirection`
  - new styles in `Videoplayer.less`

- `reset.less`
    removed `body { font-size: 13px; line-height: 1.231; }` Add this to your custom CSS if you expereience some font issues after an update 
    added `* {box-sizing: border-box}` Check for containers where you expect `box-sizing` to be `content-box`



## Refactoring! Please fix or your app will diiiiie
- Refactoring of fg.state.device vars to camelCase
    - `is_ios` renamed to `isIos`
    - `ios_version` renamed to `iosVersion`
    - `is_android` renamed to `isAndroid`
    - `android_version` renamed to `androidVersion`
    - `is_meder_smartguide` renamed to `isMederSmartguide`
    - `is_iframe` renamed to `isIframe`
    - `is_simulator` renamed to `isSimulator`
    - `is_cordova` renamed to `isCordova`
    - `is_native_app` renamed to `isNativeapp`
    - `is_web_app` renamed to `isWebapp`
    - `is_inhouse_app` renamed to `isInhouseApp`
- refactored `developer_mode` to `developerMode`
- refactored `restart_app_to_new_visitor` to `restartAppToNewVisitor`
- refactored `restart_app_to_same_visitor` to `restartAppToSameVisitor`

## Boilerplate Changes
- Android-Back-Button Event-Listener was added in app.js - please manually add these events in your app