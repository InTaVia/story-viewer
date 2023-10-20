/* core.js */
/* all utlity function that the core has to offer */



// imports
import axios from 'axios';
import $ from 'jquery';
import _, { find, forEach } from 'lodash';
import translations from '../app/translations.js';
import appSettings from '../app/app.settings.js';

const reverseCardAnimations = {
    "left": "right",
    "right": "left",
    "top": "bottom",
    "bottom": "top",
    "fade": "fade",
    "push-left": "push-right",
    "push-right": "push-left",
    "push-top": "push-bottom",
    "push-bottom": "push-top",
    "press-left": "press-right",
    "press-right": "press-left",
}


export default {

	/**
	 * @name setCardStackActivePrevCard
	 * @description a helper function for Show/HideCard. Sets active and previous card in fg.state.cardStack Object depending on index value 
     */
	setCardStackActivePrevCard(){
		// after each card stack manipulation active and previous values in each fg.state.cardStack[Card] will be updated
		// sets correct state for activeCard in cardStack Object
		fg.state.cardStack[fg.state.cardStack.length - 1].activeCard = true;
		fg.state.cardStack[fg.state.cardStack.length - 1].previousCard = false;
			
		// sets correct state for rest in cardStack Object
		if(fg.state.cardStack.length > 1){
			for(let i = 0; i <= fg.state.cardStack.length - 2; i++){
				fg.state.cardStack[i].previousCard = false;
				fg.state.cardStack[i].activeCard = false;
			}
			// sets correct state for prevCard in cardStack Object and animation duration
			fg.state.cardStack[fg.state.cardStack.length - 2].previousCard = true;
		}
	},

    /**
	 * @name showCard
	 * @description show a card (will inject vue-component in DOM))
	 * @param {string} appCardName name of the card component (must exist in appCards)
     * @param {Object} options Options how the card should appear + card data
     * @param {('left'|'right'|'top'|'bottom'|'fade'|
	 *          'push-left'|'push-right'|'push-top'|'push-bottom'|'press-left'|'press-right')} options.animation animation must exist as css class
     * @param {number} options.duration the duration of the animation
     * @param {number} options.dalay the delay of the animation
     * @param {function} options.callback callback-function after show-card
     * @param {string} options.id (optional) custom name for card-stack-id. this will be used for card-stack-logic only. If not given -> appCardName will be used
	 * @param {Object} options.cardData data which gets passed to the component as prop
     * @param {Boolean} options.activeCard showCard will set this card to active card per default
	 * @param {Boolean} options.previousCard showCard will unset this card from previous card per default
     */
    showCard(appCardName, options = {}) {

        // define default values
        if(!options.id) options.id = appCardName
        if(!options.animation) options.animation = undefined
        if(!options.duration) options.duration = 200
        if(!options.delay) options.delay = 0
        if(!options.callback) options.callback = () => {}
		if(!options.activeCard) options.activeCard = true
		if(!options.previousCard) options.previousCard = false

        
        // define card object
        const card = {
            appCard: appCardName,
            ...options
        }


        // check if appCard exists
        if(fg.vm.$options.components[appCardName] == undefined) {
            console.error('Error in showCard(). The given component "' + card.appCard + '" does NOT exist.');
			return;
        }


		const newActiveCard = find(fg.state.cardStack, {id: card.id});

		// CASE - card is already in stack - bring it to front
		if ( newActiveCard ) {
			const newCardStack = []
			for(let card of fg.state.cardStack) {
				if(card.id != newActiveCard.id) {
					newCardStack.push(card)
				}
			}
			newCardStack.push(newActiveCard)
			fg.state.cardStack = newCardStack
		} else {
			// CASE - write a new card
			// PUSH CARD OBJECT INTO CARD-STACK
			fg.state.cardStack.push(card);
		}


		// after each card stack manipulation active and previous values in each fg.state.cardStack[Card] will be updated
		// sets correct state for activeCard in cardStack Object
		fg.core.setCardStackActivePrevCard();
		

		// the card stack was already written -> app-container exists
		if(options.animation && fg.state.cardStack.length > 0) {

			const appContainer = document.querySelector('#app-container');
		
			// Options for the observer (which mutations to observe)
			const observerOptions = { childList: true };

			// Create an observer instance linked to the callback function
			const observer = new MutationObserver(mutations => {

				// get active card
				const activeCard = document.getElementById(appCardName);

				
				if(activeCard){
					// disconnect observer abd reset cardAnimation Array
					observer.disconnect();
					const previousCard = document.getElementById(fg.state.cardStack[fg.state.cardStack.length - 2].id);
					activeCard.classList.add('enter-' + options.animation, 'animation-card');
					if(previousCard) previousCard.classList.add('enter-' + options.animation, 'animation-previous-card');

					setTimeout(function(){
						if(activeCard) activeCard.style.transitionDuration = options.duration + 'ms';
						if(previousCard) previousCard.style.transitionDuration = options.duration + 'ms';
	
						if(activeCard) activeCard.classList.add('show-animate');
						if(previousCard) previousCard.classList.add('show-animate');
					}, 5 + options.delay);
	
					setTimeout(function(){
	
						if(activeCard) activeCard.classList.remove('enter-' + options.animation, 'show-animate', 'animation-card');
						if(previousCard) previousCard.classList.remove('enter-' + options.animation, 'show-animate', 'animation-previous-card');
		
						// call callback
						card.callback();
	
					}, options.duration + options.delay + 10);
				}
					
			});

			// Start observing the target node for configs mutations
			observer.observe(appContainer, observerOptions);

		} else {

			setTimeout(function(){
				card.callback()
			}, options.delay)

		}

    },


    /**
	 * @name hideCard
	 * @description hide a card (will be removed vue-component from DOM)
	 * @param {string} cardId id of the card in the card stack
     * @param {Object} options Options how the card should disappear
     * @param {('left'|'right'|'top'|'bottom'|'fade'|
	 *          'push-left'|'push-right'|'push-top'|'push-bottom'|'press-left'|'press-right')} options.animation animation must exist as css class
     * @param {number} options.duration the duration of the animation
	 * @param {number} options.dalay the delay of the animation
	 * @param {function} options.callback callback-function after hide-card
	 * @param {Boolean} options.activeCard hideCard will check which card is active card
	 * @param {Boolean} options.previousCard hideCard will check which card is previuos card
	 */
     hideCard(cardId, options = {}) {

        // if no card-id given -> take upper one
        if (cardId == undefined) {
            cardId = this.getTopCard().id;
            options.animation = reverseCardAnimations[this.getTopCard().animation]
        }
        // if there is only 1 card in stack left -> exit
		if (fg.state.cardStack.length == 1) {
			return;
		}
        // check if card exists in stack
        const card = this.getCard(cardId)
        if(!card) {
            console.error('Error in hideCard(). The card id "' + cardId + '" does not exists.')
            return;
        }

        // define default values
        if(!options.animation) options.animation = reverseCardAnimations[card.animation];
        if(!options.duration) options.duration = 200;
		if(!options.delay) options.delay = 0;
        if(!options.callback) options.callback = () => {};

		// get active card
		const activeCard = document.getElementById(cardId);

		if(options.animation && activeCard){
			const previousCard = document.getElementById(fg.state.cardStack[fg.state.cardStack.length - 2].id);
			
			activeCard.classList.add('leave-' + options.animation, 'animation-card');
			// get previous card
			if(previousCard) previousCard.classList.add('leave-' + options.animation, 'animation-previous-card');

			setTimeout(function(){
				activeCard.style.transitionDuration = options.duration + 'ms';
				if(previousCard) previousCard.style.transitionDuration = options.duration + 'ms';

				activeCard.classList.add('hide-animate');
				if(previousCard) previousCard.classList.add('hide-animate');
			}, 5 + options.delay);

			setTimeout(function(){

				// REMOVE CARD WITH CORRESPONDING ID FROM STACK
				fg.state.cardStack = fg.state.cardStack.filter((card) => {
					return card.id != cardId
				});
				
				// clean up styles
				if(previousCard) previousCard.classList.remove('leave-' + options.animation, 'hide-animate', 'animation-previous-card');
				
				// after each card stack manipulation active and previous values in each fg.state.cardStack[Card] will be updated
				// sets correct state for activeCard in cardStack Object
				fg.core.setCardStackActivePrevCard();
				
				// call callback
				options.callback();

			}, options.duration + options.delay + 10);


		} else {

			// wait for delay option
			setTimeout(function(){
				// REMOVE CARD WITH CORRESPONDING ID FROM STACK
				fg.state.cardStack = fg.state.cardStack.filter((card) => {
					return card.id != cardId
				})

				// after each card stack manipulation active and previous values in each fg.state.cardStack[Card] will be updated
				// sets correct state for activeCard in cardStack Object
				fg.core.setCardStackActivePrevCard();

				// call callback
				options.callback()

			}, options.delay);
		}
    },

    /**
     * 
     * @param {string} cardId 
     * @returns card object or undefinded if the card does not exist
     */
    getCard(cardId) {
        return fg.state.cardStack.filter((card) => {
            return card.id != cardId
        })
    },

    /**
     * @name getTopCard
     * @returns The last object of the card stack
     */
    getTopCard() {
        return fg.state.cardStack[fg.state.cardStack.length - 1];
    },

    /**
     * @name clearCardStack
     * @description removes all objects except the last one from the card stack
     */
    clearCardStack() {
        fg.state.cardStack.splice(0, fg.state.cardStack.length - 1)
    },


	/**
	 * @name getTranslation
	 * @description returns the translation in current language or emtpy string
	 * @param {string} keyword
	 */
	getTranslation(keyword) {

		if (!fg.translations) {
			fg.translations = translations
		}

		// ERROR CASE: no translations loaded yet -> just return keyword
		if (typeof fg.translations === 'undefined' || typeof fg.state.visitor.languageId === 'undefined') {
			return keyword;
		}

		// ERROR CASE - keyword does NOT exist -> just return keyword
		if (typeof fg.translations[keyword] === 'undefined') {
			if (fg.state.developerMode) {
				fg.core.console.warn('Missing translation: "' + keyword + '"');
			}
			return keyword;
		}

		// CASE - this translations DOES exist in active language -> return translation
		if (typeof fg.translations[keyword][fg.state.visitor.languageId] !== 'undefined') {
			return fg.translations[keyword][fg.state.visitor.languageId];
		}
		// (missing language) CASE 1 - use main-lanuage translation
		else if (typeof fg.translations[keyword][fg.content.default_language_id] !== 'undefined') {
			if (fg.state.developerMode) {
				fg.core.console.warn(
					'Missing translation: "' +
					keyword +
					'" in language ' +
					fg.state.visitor.languageId +
					' (using ' +
					fg.content.sys_languages[fg.content.default_language_id].title +
					' as fallback)'
				);
			}
			return fg.translations[keyword][fg.content.default_language_id];
		} 
        // (missing language) CASE 2 - use english 
        else if (typeof fg.translations[keyword]['1'] !== 'undefined') {
			if (fg.state.developerMode) {
				fg.core.console.warn(
					'Missing translation: "' +
					keyword +
					'" in language ' +
					fg.state.visitor.languageId +
					' (using EN as fallback)'
				);
			}
			return fg.translations[keyword]['1'];
		}
	},

	/**
	 * @name getStaticContent
	 * @description returns content of static page
	 * @param {string} keyword
	 * @returns {object | undefined} static content object or undefined if the keyword doesnt exist
	 */
	getStaticContent(keyword) {
		const staticContent = Object.values(fg.content.static_pages[fg.state.visitor.languageId][fg.state.exhibitionId])
		return staticContent.filter(obj => obj.keyword == keyword)[0]
	},




	/**
	 * @name saveVisitor
	 * @description write "fg.state" into localStorage AND update on server
	 * @param {int} debounceForServerSubmitMs
	 */
	saveVisitor(debounceForServerSubmitMs) {
		// reference to core
		let core = this;

		// init parameter
		if (debounceForServerSubmitMs == undefined) {
			debounceForServerSubmitMs = 500;
		}

		// define visitor data (for detecting changes)
		let postData = {};
		postData['visitor_id_js'] = fg.state.visitor.visitorIdJs;
		postData['exhibition_id'] = fg.state.exhibitionId;
		postData['sys_languages_id'] = fg.state.visitor.languageId;
		postData['state'] = JSON.stringify(fg.state.visitor);

		// check if visitor-data has changed
		let postDataHash = JSON.stringify(postData);
		postDataHash = postDataHash.hashCode();
		let updateOnServer = false;
    
		if (localStorage.getItem('visitor') == null) {
			updateOnServer = true;
		} else if (localStorage.last_sent_visitor_object != postDataHash) {
			updateOnServer = true;
		}
        
		// update on server (with debounce-logic)
		if (updateOnServer) {
            // clear previous "submit-to-server"-timeout
			if (fg.temp.saveVisitorTimeout) {
                window.clearTimeout(fg.temp.saveVisitorTimeout);
			}

			// start timeout for server-communication
			fg.temp.saveVisitorTimeout = window.setTimeout(function () {
				// save "last_sent_visitor_object" as hashCode
				localStorage['last_sent_visitor_object'] = postDataHash;

				// push into sync-queue and submit to server
				core.pushSyncQueue({
                    url: 'fluxguide_api/update_visitor',
                    postData: postData,
                })
				core.submitData();
			}, debounceForServerSubmitMs);
		}

		// update localstorage object
		let visitorData = {};
		visitorData.state = fg.state.visitor;
		localStorage.setItem('visitor', JSON.stringify(visitorData));

		// save timestamp of this call
		fg.temp.lastSaveVisitorTimestamp = this.time_server();
	},

    /**
     * @description pushes a object into the syncQueue which gets worked off on submitData
     * @param {object} syncItem - Object containing the information and data which syncs with the server
     * @param {string} syncItem.url - destination relative to the base api url. Example: 'fluxguide_api/update_visitor'
     * @param {object} syncItem.postData - data of the post body from the request to the server
     * @param {object} syncItem.headers - headers for the request to the server
     * @param {boolean} isFormData - transforms
     */
    pushSyncQueue(syncItem, isFormData) {

        // Cancel if some other process is reading from the localStorage syncQueue
        if(fg.submitDataInProgress) {
            setTimeout(() => {
                this.pushSyncQueue(syncItem, isFormData)
            }, 50);
            return;
        }
        fg.submitDataInProgress = true;

        // Check if syncQueue got too long (about 1MB)
        if(localStorage.syncQueue.length > 1000000) {
            let syncQueue = JSON.parse(localStorage.syncQueue)
            // Keep a 10th of the too large syncQueue
            syncQueue = syncQueue.slice(0, Math.round(syncQueue.length / 10))
            localStorage.syncQueue = JSON.stringify(syncQueue)
        }

        // Convert FormData to JS Object if needed
        if(isFormData) {
            let postDataAsJson = {}
            syncItem.postData.forEach((value, key) => postDataAsJson[key] = value);
            syncItem.postData = postDataAsJson
            syncItem.isFormData = true;
        }

        // Retrieve syncQueue from localstorage
        const syncQueue = JSON.parse(localStorage.syncQueue)
        // Push new object into syncQueue
        syncQueue.push(syncItem)
        // Write new syncQueue into local storage
        localStorage.syncQueue = JSON.stringify(syncQueue)

        fg.submitDataInProgress = false;
    },

    /**
     * @summary submit data to server - all server-request must be handled with sync-queue
     */
    submitData() {

        // if special-flag "prevent_all_server_connections" is set -> exit here
		if (fg.state.coreSettings.preventAllServerConnections) {
			return true;
		}

        // Cancel if some other process is reading from the localStorage syncQueue
        if(fg.submitDataInProgress) {
            setTimeout(this.submitData, 25);
            return;
        }
        
        // Lock the syncQueue
        fg.submitDataInProgress = true;
        // get the syncQueue
        const syncQueue = JSON.parse(localStorage.syncQueue);
        
        // check if there are items in the syncQueue
        if(syncQueue.length) {

            let syncItem = syncQueue[0]

            if(fg.state.dataConnection) {
                // check if url is 'local' or a fluxguide api call
                let submitUrl = syncItem['url'].toLowerCase();
				if (!submitUrl.startsWith('http://') && !submitUrl.startsWith('https://')) {
                    submitUrl = fg.state.baseUrl + submitUrl;
                }

                // Convert postData back to formData if needed
                if(syncItem.isFormData) {
                    const formData = new FormData();
                    for(let key in syncItem.postData){
                        formData.append(key, syncItem.postData[key])
                    }
                    syncItem.postData = formData;
                } 
                // Stringify postData for JSON-Style requests
                else {
                    syncItem.postData = JSON.stringify(syncItem.postData)
                }

                // SEND DATA/REQUEST TO SERVER
                axios.post(submitUrl, syncItem.postData, {
                    cache: 'no-cache',
                })
                // RESPONSE CASE - server responded and data is usable
                .then((response) => {

                    // SUCCESS CASE - server responded with success
                    if(typeof(response.data) == "object" && response.data.status == "success") {
                        // Remove syncItem from syncQueue and preserve it in syncItem
                        syncItem = syncQueue.shift();
                        localStorage.syncQueue = JSON.stringify(syncQueue);
    
                        // release lock
                        fg.submitDataInProgress = false;
    
                        // call submitData recursively again for the next element
                        window.setTimeout(this.submitData, 25)
                    }
                    // ERROR CASE - server responded with an error
                    else {
                        if(response.data && response.data.status == "error") {
                            console.error("Sync Queue failed! " + submitUrl + " responded with: " + response.data.message)
                        } else {
                            console.error("Sync Queue failed! " + submitUrl + " responded with: " + response.data)
                        }

                        // release lock
                        fg.submitDataInProgress = false;
                    }
                    
                })
                // NO CONNECTION CASE - server did not answer
                .catch((error) => {

                    console.error("Submitting syncQueue failed!", error);

                    // On error start offline mode
                    if(fg.state.dataConnection) {
                        this.startOfflineMode();
                    }
                    fg.submitDataInProgress = false;
                    return;
                })
            }
            else {
                // Unlock localStorage syncQueue on no connection
                fg.submitDataInProgress = false;
            }
        }
        else {
            // Unlock localStorage syncQueue when nothing to send
            fg.submitDataInProgress = false;
        }
    },

 
    /**
	 * @name createVisitorTeam
     * @description creates a new visitor team in DB Table visitor_teams
     * @param {object} visitorTeamData - Object containing the information about the visitor team
     * @param {boolean} createVisitorTeam - default true -> will per default create also the visitorTeam for this visitor
     */
    createVisitorTeam(visitorTeam, createVisitorTeam) {

        // visitorTeam Obj Example:
        //  var visitorTeam = {
        //     exhibitions_id: fg.state.exhibitionId,
        //     schoolname: "Super Heroes",
        //     classname: "1B",
        //     playMode: "freeExploration"
        // };

        // default value
        visitorTeam = visitorTeam || {};
        createVisitorTeam = createVisitorTeam || true;

        // creaate visitor-team-data
        let data = visitorTeam;
        // define exhibition_id
        data.exhibitionsId = visitorTeam.exhibitionId || fg.state.exhibitionId;
        // define visitorTeamIdJs
        data.visitorTeamIdJs = fg.core.generateUid();

        // save created visitor-team into state
        if (!fg.state.visitor.visitorTeam) {
            fg.state.visitor.visitorTeam = {};
        }

        // if createVisitorTeam is true -> save the visitorTeam data in visitor's state.
        if(createVisitorTeam) fg.state.visitor.visitorTeam = data;

        axios.post(fg.state.baseUrl + 'fluxguide_api/create_visitor_team', JSON.stringify(data), {
            cache: 'no-cache',
        })
        // SUCCESS CASE - server responded and data is usable
        .then((res) => {
            console.log('AJAX SUCCESS', res);
        })
        .catch((error) => {
            console.log('AJAX ERROR', err);
        });

    

    },


    /**
	 * @name getVisitorTeam
     * @description gets visitor team from DB Table visitor_teams
     * @param {String} visitorTeamIdJs - identifier for the vistor's team
     */
     getVisitorTeam(visitorTeamIdJs) {

        if(visitorTeamIdJs == undefined) return;

        let url = fg.state.baseUrl + 'fluxguide_api/get_visitor_team/' + visitorTeamIdJs;

        axios({
            url: url,
            method: 'GET',
            timeout: 30000,
        })
        .then((response) => {
            
            // parse additional data
            let visitorTeamState = JSON.parse(response.data.data.state);
            
            // save each visitorTeamState as a separate key
            if (!fg.state.visitor.visitorTeam) {
				fg.state.visitor.visitorTeam = {};
			}
        
            // save into fg.state.visitor.visitorTeam
            forEach(visitorTeamState, function(data, key){
                if(key == "exhibitionsId") fg.state.visitor.visitorTeam.exhibitionId = data;
                else if(key == "visitorTeamIdJs") fg.state.visitor.visitorTeam.visitorTeamIdJs = data;
                else fg.state.visitor.visitorTeam[key] = data;

            });

        })
        .catch((error) => {
            console.error(`Visitor Team could not be loaded.`, error);
        });
    
    },


    /**
	 * @name getVisitorTeams
     * @description gets all visitor teams from DB Table visitor_teams
     * @param {Number} timestampFrom - optional parameter "timestampFrom" -> only get visitor-teams that was created after given timestamp (in seconds)
     */
     getVisitorTeams(timestampFrom) {

        if(timestampFrom == undefined) timestampFrom = 0;

        let url = fg.state.baseUrl + 'fluxguide_api/get_visitor_teams/' + timestampFrom;

        axios({
            url: url,
            method: 'GET',
            timeout: 30000,
        })
        .then((response) => {  
            // get data
            let visitorTeams = response.data.data;
        })
        .catch((error) => {
            console.error(`Visitor Team could not be loaded.`, error);
        });
    
    },

    /**
	 * @name getAllVisitorsFromTeam
     * @description get all visitors from team with visitorTeamIdJs
     * @param {String} visitorTeamIdJs - visitor team id js identifier
     */
    getAllVisitorsFromTeam(visitorTeamIdJs) {

        if(visitorTeamIdJs == undefined) return;

        let url = fg.state.baseUrl + 'fluxguide_api/get_all_visitors_from_team/' + visitorTeamIdJs;

        axios({
            url: url,
            method: 'GET',
            timeout: 30000,
        })
        .then((response) => {
            // get data
            let visitors = response.data.data;
            console.log(visitors);
        })
        .catch((error) => {
            console.error(`Visitor Team could not be loaded.`, error);
        });
    },


    /**
     *
     * @param {Number} actionId identifier for the triggered option
     * @param {Object} metadata data which gets saved with the log-entry
     * @param {Number} relatedRecordId Id (NOT root item id!) of the entry (quiz, stop, tour,...) related to this log-action
     */
    logVisitorAction(actionId, metadata, relatedRecordId) {
		if(!fg.state.device.isCordova) {
			// Only show console log of metadata if web browser or simulator and return
			console.log(`Visitor Log: logVisitorAction(actionId: ${actionId}, metadata: ${JSON.stringify(metadata)}, relatedRecordId: ${relatedRecordId ? relatedRecordId : ""})`);
			return;
		}

        const visitorLogEndpoint = 'fluxguide_api/write_log/';

        // Cancel if some other process is reading from the localStorage syncQueue
        if(fg.submitDataInProgress) {
            setTimeout(() => {
                this.logVisitorAction(actionId, metadata)
            }, 50);
            return;
        }

        // Lock localStorage syncQueue
        fg.submitDataInProgress = true

        let syncQueue = JSON.parse(localStorage.syncQueue);

        const newLogRecord = {
            "action": actionId,
            "exhibition_id": fg.state.exhibitionId,
			"exhibition_section_id": fg.state.app.activeMuseumId || "",
            "visitor_id_js": fg.visitor_id_js,
            "related_record_id": relatedRecordId || "",
            "timestamp": this.time_server()
        }

        if(metadata) {
            newLogRecord.metadata = JSON.stringify(metadata)
        }

        // Get all syncQueueItems which have the visitorLogEndpoint as url and the current visitor id
        const existingSyncQueueItems = syncQueue.filter((syncItem) => {
            return syncItem.url == visitorLogEndpoint 
                && syncItem.postData[0].visitor_id_js == fg.state.visitor.visitorIdJs;
        })

        // CASE - A logRecord item (for this user) already exists in the sync queue
        if(existingSyncQueueItems.length) {

            // Check if visitor logs are larger than (about) 1MB
            if(JSON.stringify(existingSyncQueueItems[0].postData).length > 1000000) {

                // Slice existing syncQueue items to a 10th
                existingSyncQueueItems[0].postData = existingSyncQueueItems[0].postData.slice(
					0,
					Math.round(existingSyncQueueItems[0].postData.length / 10)
				);
            }

            // Add new logRecord to existing ones
            existingSyncQueueItems[0].postData.push(newLogRecord);

            // Save new syncQueue to localstorage
            localStorage.syncQueue = JSON.stringify(syncQueue);

            // Unlock localStorage syncQueue
            fg.submitDataInProgress = false;
        }
        // CASE - No logRecords in sync queue - write a new one
        else {
            // Create new item for syncQueue
            const newSyncItem = {
                url: visitorLogEndpoint,
                postData: [newLogRecord],
            }

            // Unlock localStorage syncQueue so pushSyncQueue can write
            fg.submitDataInProgress = false;

            // push to syncQueue
            this.pushSyncQueue(newSyncItem)
        }
    },

	/**
	 * @name restartAppWithSameVisitor
	 * @summary restart app (with current visitor)
	 * @emits "restartAppWithSameVisitor" at the beginning of the function
	 */
	restartAppWithSameVisitor() {
		// trigger custom event
		fg.trigger('restartAppWithSameVisitor');

		// cordova-app
		if (fg.state.device.isCordova) {

			// SPECIAL: Stop iBeacon Scanning first, if in progress
			if (_.get(fg, 'modules.Ibeacon.temp.scan_in_progress') === true) {
				// stop scanning and restart after a timeout of 1s
				fg.m.Ibeacon.stop_ibeacon_scan();
				window.setTimeout(function () {
					location.reload();
				}, 1000);
				return;
			}

			// Normal Case: reload App
			location.reload();
		}

		// web app
		else {
			// TODO -> make restart for simulator
			// CASE: Fluxguide simulator reload iFrame parent
			// if (fg.device.is_simulator) {
			// 	parent.location.reload();
			// }

			location.reload();
		}
	},




	/**
	 * @name restartAppWithNewVisitor
	 * @summary start new session AND restart app
	 * @emits "restartAppWithNewVisitor" at the beginning of the function
	 */
	restartAppWithNewVisitor() {

		// trigger custom event
		fg.trigger('restartAppWithNewVisitor');

		// clear localstorage
		localStorage.removeItem('visitor_id_js');
		localStorage.removeItem('visitor');

		// TODO -> check if these localstorages are still important
		localStorage.removeItem('auth_email');
		localStorage.removeItem('auth_token');
		localStorage.removeItem('activation_code_retry_count');
		localStorage.removeItem('language_id');

		// cordova-app
		if (fg.state.device.isCordova) {
			// TODO -> if start new session and offline -> save sync_queue as JSON-File on Device

			//// SPECIAL: Stop iBeacon Scanning first, if in progress
			if (_.get(fg, 'modules.Ibeacon.temp.scan_in_progress') === true) {
				// stop scanning and restart after a timeout of 1s
				fg.m.Ibeacon.stop_ibeacon_scan();
				window.setTimeout(function () {
					location.reload();
				}, 1000);
				return;
			}

			// Normal Case: reload App
			location.reload();
		}

		// web app
		else {

			// TODO -> make restart for simulator
			// CASE: Fluxguide simulator reload iFrame parent
			// if (fg.device.is_simulator) {
			// 	parent.location.reload();
			// }

			// make page-reload
			location.reload();
		}
	},




	/**
	 * @name startOfflineMode
	 * @summary change to offline-mode
	 */
	startOfflineMode() {
		// set data-connection-flag
		fg.state.dataConnection = false;
		// trigger custom event - "startOfflineMode"
		fg.trigger('startOfflineMode');
	},



	/**
	 * @name startOnlineMode
	 * @summary change to online-mode
	 */
	startOnlineMode() {
		// set data-connection-flag
		fg.state.dataConnection = true;
		// trigger custom event - "startOnlineMode"
		fg.trigger('startOnlineMode');
	},



	/**
	 * @name checkConnection
	 * @summary Check device-RE-connection (this is main interval-function - active all the time)
	 * @description This function will be called every 10 seconds. it will (1) check if device has reconnected and (2) manage sync-queue and (3) manage submit-log
	 */

	checkConnection() {

        // SUBMIT DATA
        fg.core.submitData();

        // Dont check connection if inHouseApp and no wifi
        if(fg.state.device.isInhouseApp && !fg.state.m.Device.wifi_status) return;
        
        // trigger custom event - "checkConnection"
		fg.trigger('checkConnection');
        
		//// CHECK IF DEVICE WAS RECONNECTED - check if device was reconnected to network (only if device is currently in OFFLINE-MODE)
		if (fg.state.dataConnection == false && fg.state.coreSettings.preventAllServerConnections == false) {
			// check if connection has been reconnected (get ping from fluxguide-api-server)
			if (fg.temp.check_connection_ajax) fg.temp.check_connection_ajax.abort(); // cancel previous request if still in progress
			let statusUrl = fg.state.baseUrl + "public/system/fluxguide/status";
			fg.temp.check_connection_ajax = $.ajax({
				url: statusUrl,
				cache: false,
				type: 'post',
				success: function (response) {
					// connection has been reconnected
					if (response == "1") fg.core.startOnlineMode();
					else fg.core.startOfflineMode();
				}
			});
		}

	},







	/**
	 *
	 * @summary dynamicly get real URL from given file_name -> the real URL can be from (1) documents-path, (2) ipa-www-path or (3) online-path
	 * @param {string} file_name - there are three types: (1) Fluxguide-API/content-files ("public/...") || (2) app-files ("assets/...") || (3) external URLs ("http(s)://www.whatever.com/test.png")
	 * @param {boolean} useNativeUrl - flag if native link should be used (if NOT cordova-styled-link will be used) - this is important e.g. for cordova-audioplayer 
	 * @returns the real URL of this file 
	 */
	getFileURL(file_name, useNativeUrl = false) {

		// file_name is not a string --> exit
		if (typeof file_name !== 'string') {
			console.warn('Error in getFileURL(). You must give a string as url. Check handlebars or template-data.');
			return;
		}

		// trim string
		file_name = file_name.trim();

		// empty filename given -> exit
		if (file_name == '') {
			return;
		}

		// check if this is external URL (does contain http(s)://...)
		let is_external_url = /^http(s*):\/\//.test(file_name);

		// SPECIAL CASE - given file-url was already converted with getFileURL() -> then skip file-url-convertion
		if (!file_name.startsWith('public/') && !file_name.startsWith('assets/') && !is_external_url) {
			return file_name;
		}

		// init base_url
		let base_url = '';

		// CASE 1a - external URL (webapp)
		if (is_external_url && fg.state.device.isCordova != true) {
			return file_name;
		}
		// CASE 1b - external URL (native app)
		else if (is_external_url && fg.state.device.isCordova) {
			// check if file already exist on device
			var file = _.filter(fgCordova.all_files_on_device, { external_url: file_name });
			// file is NOT on device -> return url
			if (file.length == 0) {
				return file_name;
			}
			// file is on device -> return local filepath
			else {
				return fgCordova.documents_path_cdv + file[0].url;
			}
		}


		// CASE 2a + 2b: electron app
		else if (fg.state.device.isElectron) {

			// CASE 2a - is app-file
			if (file_name.startsWith('assets/')) {
				return file_name;
			}

			// CASE 2b - is content-file
			else {
				return '../fluxguide_content/' + file_name;
			}

		}


		// CASE 3a + 3b: webapp
		else if (fg.state.device.isWebapp) {

			// CASE 3a - is app-file
			if (file_name.startsWith('assets/')) {
				return file_name;
			}

			// CASE 3b - is content-file
			else {
				base_url = fg.state.baseUrl;
			}

		}

		// CASE 4a + 4b + 4c: native-app
		else {
			// get file from "all_files_on_device"-list
			var file = _.filter(fgCordova.all_files_on_device, { url: file_name });

			// CASE 4a - file is NOT downloaded on device -> use online-file
			if (file.length == 0) {

				// CASE - is app-file
				if (file_name.startsWith('assets/')) {
					base_url = fgCordova.settings.base_url_app;
				}
				// CASE - is content-file
				else base_url = fg.state.baseUrl;

			}

			// CASE 4b - file is "ipa"-file - load from ipa-www-folder
			else if (file[0].ipa == '1' || file[0].is_ipawww_file == '1') {
				// CASE - is app-file
				if (file_name.startsWith('assets/')) {
					base_url = fgCordova.ipa_www_path + 'fluxguide_app/';
				}
				// CASE - is content-file
				else base_url = fgCordova.ipa_www_path + 'fluxguide_content/';

				// TODO: change this to a better solution: detect installed-app-version-change on startup --> fire a custom event "app-version-changed" --> update all_files_on_device-list
				//// SPECIAL CASE FOR IPA_WWW_FILES - check if this file is still a ipa-www-file using fg.active_files (get_active_files)
				// if (fg.active_files != undefined) {
				// 	let files_from_get_active_files_list = _.filter(fg.active_files, { url: file_name });
				// 	if (files_from_get_active_files_list.length > 0) {
				// 		if (files_from_get_active_files_list[0].ipa != '1') {
				// 			// this file is not an "ipa-file" anymore -> remove file from list
				// 			_.pull(fgCordova.all_files_on_device, file[0]);
				// 			fg.core.getFileURL(file_name);
				// 		}
				// 	}
				// }
			}

			// CASE 4c - file was downloaded to device (into documents)
			else {
				// CASE - is app-file
				if (file[0].is_app_file == "1") {
					if (useNativeUrl) base_url = fgCordova.documents_path_native + 'fluxguide_app/';
					else base_url = fgCordova.documents_path_cdv + 'fluxguide_app/';
				}
				// CASE - is content-file
				else {
					if (useNativeUrl) base_url = fgCordova.documents_path_native + 'fluxguide_content/';
					else base_url = fgCordova.documents_path_cdv + 'fluxguide_content/';
				}
			}
		}

		// return URL
		return base_url + file_name;

	},


	/**
	 *
	 * @summary dynamicly get real URL from given file_name -> the real URL can be from (1) documents-path, (3) ipa-www-path or (3) online-path
	 * @param {string} file_name - there are three types: (1) content-files ("public/content/...") || (2) app-files ("assets/...") || (3) external URLs ("http(s)://www.whatever.com/test.png")
	 * @returns the real URL of this file 
	 */
	getFileURLNative(fileName) {

		// return native URL
		return fg.core.getFileURL(fileName, true);

	},

    /**
	 * @summary get the url for the thumbnail of a video. Usually should be contained in a getFileURL
	 * @param {string} videoUrl - the conent url of the video ("public/content/...")
	 * @returns the corresponding thumbnail Url of the given video
	 */
    getThumbnailUrl(videoUrl) {
        return videoUrl.replace(".mp4", "__thumbnail.jpg");
    },



	/////////////////////////////////////////////////
	// fg.core.check_hidden_gesture()
	// Description: generic function to check if a certain pattern of events was triggered
	// Usage: call this function after every event that should be monitored
	// Example: fg.core.check_hidden_gesture("swipeleft", ["swipeleft", "swiperight"], function() {console.log("found"); });
	/////////////////////////////////////////////////
	check_hidden_gesture(event_type, pattern, success_callback) {
		// init hidden_gesture array
		if (typeof fg.temp.hidden_gesture_stack === 'undefined') {
			fg.temp.hidden_gesture_stack = [];
		}
		// add event to array
		fg.temp.hidden_gesture_stack.push(event_type);

		//var pattern = ["swipeleft", "swiperight", "swipeleft"];
		// if there are too many elements -> reset stack
		if (fg.temp.hidden_gesture_stack.length > pattern.length) {
			fg.temp.hidden_gesture_stack = [];
		}

		// compare stack with pattern
		if (pattern.compare(fg.temp.hidden_gesture_stack)) {
			// found!
			// empty gesture stack
			fg.temp.hidden_gesture_stack = [];
			// call success callback
			success_callback();
		}

		// clear previously set timer
		if (typeof fg.temp.hidden_gesture_timer !== 'undefined') {
			window.clearTimeout(fg.temp.hidden_gesture_timer);
		}
		// set a new timer to clear the stack after a while
		fg.temp.hidden_gesture_timer = window.setTimeout(function () {
			fg.temp.hidden_gesture_stack = [];
		}, 5000);
	},

	/////////////////////////////////////////////////
	// fg.core.syncTimestampOffline()
	// Description: sync timestamp when offline
	/////////////////////////////////////////////////
	syncTimestampOffline() {
		fg.timestamp_client_diff = parseInt(localStorage.getItem('timestamp_client_diff'));
		fg.timestamp_client_diff_ms = parseInt(localStorage.getItem('timestamp_client_diff_ms'));
		fg.timestamp_utc_offset_server = parseInt(localStorage.getItem('timestamp_utc_offset_server'));

		// update "last_content_update"
		fg.last_content_update = fg.last_content_update - fg.timestamp_client_diff;
		localStorage.setItem('last_content_update', fg.last_content_update);
	},

	/////////////////////////////////////////////////
	// getGetParameter()
	// DESCRIPTION: Get a SINGLE or ALL GET parameters of the current URL
	// @param {string} param the name of the parameter to return. Leave empty/null to return an assoc array of all get parameters
	/////////////////////////////////////////////////
	getGetParameter(param,customURL) {
		// check if native URLSearchParams is supported
		let native_support = self.URLSearchParams && self.URLSearchParams.prototype.get;

		if (native_support) {

			let url = "";
			if(customURL) {
				try {
					url = new URL(customURL);
				  } catch (_) {
					return false;  
				  }

				url = new URL(customURL);	
				
			}
			else url = new URL(window.location.href);

			let searchParams = new URLSearchParams(url.search);

			if (param != undefined) {
				return searchParams.get(param);
			} else {
				let return_obj = [];
				for (let p of searchParams.entries()) {
					return_obj[p[0]] = p[1];
				}
				return return_obj;
			}
		}

		// old behaviour -> use window.location.search and return all params
		else {
			function getGetParameter_helpfunction(prmstr) {
				let params = {};
				let prmarr = prmstr.split('&');
				for (let i = 0; i < prmarr.length; i++) {
					let tmparr = prmarr[i].split('=');
					params[tmparr[0]] = tmparr[1];
				}
				return params;
			}

			let prmstr = window.location.search.substr(1);
			let all_params = prmstr != null && prmstr != '' ? getGetParameter_helpfunction(prmstr) : {};
			if (param != undefined) {
				return all_params[param];
			} else {
				return all_params;
			}
		}
	},

	/////////////////////////////////////////////////
	// fg.core.alert()
	// Description: override standard alert with cordova alert (if applicable and available)
	// only "message" is required
	// button_label = "Ok"
	/////////////////////////////////////////////////
	alert(message, callback, title, button_label) {
		if (!message) {
			return;
		}
		var callback = callback || function () { };
		var title = title || ' ';
		var button_label = button_label || undefined;

		// CASE - Cordova
		if (fg.state.device.isCordova && navigator.notification) {
			navigator.notification.alert(message, callback, title, button_label);
		}
		// CASE - Web-App
		else {
			// change message to title if message is empty
			if ((message == '' || message == ' ') && title != '') {
				message = title;
			}
			alert(message);
			callback();
		}
	},

	/////////////////////////////////////////////////
	// fg.core.confirm()
	// Description: override standard alert with cordova alert (if applicable and available)
	// only "message" is required
	// callback:
	//  - one function: function will be called on button 1 = ("OK")
	//  - array of two functions: function[0] will be called on button 1, function[1] will be called on button 2
	//  - array of three functions: function[0] will be called on button 1, function[1] will be called on button 2, function[2] will be called on "dismiss"
	// button_labels = ["Ok", "Cancel"]
	/////////////////////////////////////////////////
	confirm(message, callback, title, button_labels) {
		if (!message) {
			return;
		}
		// define parameters
		var callback = callback || function () { };
		var title = title || ' ';
		var button_labels = button_labels || undefined;

		// define success-callback
		let success_callback = function (button_index) {
			if (_.isArray(callback)) {
				if (button_index == 1 && typeof callback[0] === 'function') {
					callback[0]();
				}
				if (button_index == 2 && typeof callback[1] === 'function') {
					callback[1]();
				}
				if (button_index == 0 && typeof callback[2] === 'function') {
					callback[2]();
				}
			} else {
				if (button_index == 1) {
					callback();
				}
			}
		};

		// CASE - Cordova
		if (fg.state.device.isCordova && navigator.notification) {
			navigator.notification.confirm(message, success_callback, title, button_labels);
		}
		// CASE - Webapp
		else {
			// change message to title if message is empty
			if ((message == '' || message == ' ') && title != '') {
				message = title;
			}
			if (confirm(message)) {
				callback();
			}
		}
	},

	/////////////////////////////////////////////////
	// toast(message, options)
	// Description: show a quick toast (like on android). uses cordova plugin "toast" if available, otherwise uses DOM-element
	// parameters:
	//   message (string) the message to display
	//   options (object)
	//      - duration (number): the duration of the toast visibility (optional)
	//		- position (string): top, bottom, top-right, bottom-right,top-left, bottom-left
	//		- type (string): can be success, info, warning, error, default and shows as css class
	/////////////////////////////////////////////////
	toast(message, options) {
		const vm = this;
		let toastOptions = options || {};
	
		if (options && options.duration != undefined) toastOptions.duration = options.duration
		else toastOptions.duration = 2000;

		if (options && options.position) toastOptions.position = options.position
		else toastOptions.position = 'bottom';

		if (options && options.maxToasts) toastOptions.maxToasts = options.maxToasts
		else toastOptions.maxToasts = false;

		if (options && options.type) toastOptions.type = options.type
		else toastOptions.type = 'default';

		return fg.vm.$toast.show(message, {queue:false, maxToasts: toastOptions.maxToasts, position: toastOptions.position, duration: toastOptions.duration, type: toastOptions.type });
	},

	/**
	 *
	 * @description Return styles of image positioning for focal point feature imageObject -> Data JSON type,
	 * @param {JSON} imageObject structure like -> { url : " ", core_image_focal_point_coordinates.x : "32", core_image_focal_point_coordinates.y : "11" }
	 * @param {string} [type='object-position'] css positioning description ("background-position" / "object-position")
	 * @returns returns also 'object-fit / background-size: cover' styles, because the whole feature makes only sence with this preset
	 */
	getFocalPoint(imageObject, type) {
		if (imageObject === undefined) {
			return false;
		}
		// set position type
		let positionType = type || 'object-position';
		// get coordinates depending on positionType
		if (positionType == 'background-position') {
			if (imageObject.core_image_focal_point_coordinates) {
				return (
					'background-position:' +
					imageObject.core_image_focal_point_coordinates.x +
					'% ' +
					imageObject.core_image_focal_point_coordinates.y +
					'%; background-size: cover;'
				);
			} else {
				return 'background-position: 50% 50%; background-size: cover;';
			}
		} else if (positionType =='values-only'){
			if(imageObject.core_image_focal_point_coordinates) return imageObject.core_image_focal_point_coordinates.x + '% ' + imageObject.core_image_focal_point_coordinates.y+'%';
			else return '50% 50%';
		} else {
			if (imageObject.core_image_focal_point_coordinates) {
				return (
					'object-position:' +
					imageObject.core_image_focal_point_coordinates.x +
					'% ' +
					imageObject.core_image_focal_point_coordinates.y +
					'%; object-fit: cover;'
				);
			} else {
				return 'object-position: 50% 50%; object-fit: cover;';
			}
		}
	},

	/**
	 *
	 * @summary get a stop by id (in current language). returns undefined if not found
	 * @param {int} stopId
	 * @returns {JSON} stop object
	 */
	getStop(stopId) {
		if (typeof stopId === 'undefined') {
			return undefined;
		}
		try {
			return fg.content.stops[fg.state.visitor.languageId][stopId];
		} catch (e) {
			return undefined;
		}
	},

	getStopByPublicNumber(number) {
		if (typeof number === 'undefined') {
			return undefined;
		}
        let stopId;
		try {
			stopId = fg.content.public_numbers[fg.state.visitor.languageId][fg.state.exhibitionId][number];
		} catch (e) {
			return undefined;
		}
		return fg.core.getStop(stopId);
	},

	/////////////////////////////////////////////////
	// fg.core.getStopsByCategoryId(categoryId)
	// Description: get stops by categoryId (in current language). returns empty array if not found
	/////////////////////////////////////////////////
	getStopsByCategoryId(categoryId) {
		let stops = [];
		if(typeof categoryId === 'undefined') return stops;


		if(typeof fg.content.categories[fg.state.visitor.languageId][fg.state.exhibitionId][categoryId] === "undefined") return stops;

		// get the stop ids as array from this category
		let stopIds = fg.content.categories[fg.state.visitor.languageId][fg.state.exhibitionId][categoryId].stops;

		stops = _.map(stopIds, function(stopId) {
			return fg.content.stops[fg.state.visitor.languageId][stopId];
		});
		// filter out undefined stops
		stops = _.reject(stops, _.isEmpty);

		return stops;
	},




	/**
	 *
	 * @summary Returns tour object of given Id
	 * @param {int} tourId Id of the tour. Must be root_item_id!
	 * @returns {Object} Tour object from fg.content
	 */
	getTour(tourId) {
		if (typeof tourId === 'undefined') {
			return undefined;
		}
		try {
			return fg.content.tours[fg.state.visitor.languageId][fg.state.exhibitionId].tours[tourId];
		} catch (e) {
			return undefined;
		}
	},

    /**
	 *
	 * @summary get a glossar by id (in current language). returns undefined if not found
	 * @param {int} glossarId
	 * @returns {JSON} glossar object
	 */
	getGlossar(glossarId) {
		if (typeof glossarId === 'undefined') {
			return undefined;
		}
		try {
			return fg.content.glossar[fg.state.visitor.languageId][glossarId];
		} catch (e) {
			return undefined;
		}
	},

	/**
	 *
	 * @summary get the width and height for one or multiple images (ASYNC!)
	 * @description losely based on: http://stackoverflow.com/questions/1944280/determine-original-size-of-image-cross-browser
	 * @param {string|string[]} images string with image-url OR array of multiple image-urls
	 * @param {Function} callback param 1 -> array with image sizes of all requested images
	 * @example fg.core.get_image_size(fg.core.getFileURL('/public/content/fluxguide/exhibitions/1/file.jpg', function(image_data){ console.log(image_data); });
	 */
	get_image_size(images, callback) {
		let images_array;
		if (_.isArray(images)) {
			images_array = images;
		} else {
			images_array = [images];
		}

		let images_loaded_count = 0;
		let images_data = [];
		var callback = callback || function () { };

		for (let i = 0; i < images_array.length; i++) {
			let newImg = new Image();
			let newImgSrc = images_array[i];

			(function (_newImg, _newImgSrc, _i) {
				// onload event
				_newImg.onload = function () {
					// add to images_data
					let image_data = {
						height: _newImg.height,
						width: _newImg.width,
						url: _newImgSrc,
					};

					images_data[_i] = image_data;

					images_loaded_count++;

					// all images are loaded --> callback
					if (images_loaded_count == images_array.length) {
						callback(images_data);
					}
				};

				// set src
				_newImg.src = _newImgSrc;

				// for cached images in Chrome on OSX:
				// if(_newImg.complete || _newImg.readyState === 4) _newImg.onload();
			})(newImg, newImgSrc, i);
		}
	},

	/////////////////////////////////////////////////
	// fg.core.openUrlInInappBrowser(url)
	// DESCRIPTION: open an url in inapp-browser
	/////////////////////////////////////////////////
	openUrlInInappBrowser(url, options) {
		// define options
		let config = options || {};

		config.closebuttoncaption = config.closebuttoncaption || 'Close';
		config.closebuttoncolor = config.closebuttoncolor || '#ffffff'; // only applicable if location enabled
		config.hideurlbar = config.hideurlbar || 'no'; // android only
		config.location = config.location || 'yes'; // InAppBrowsers location bar
		config.navigationbuttoncolor = config.navigationbuttoncolor || '#ffffff';
		config.toolbar = config.toolbar || 'yes';
		config.toolbarcolor = config.toolbarcolor || '#ffffff';

		// get url
		url = encodeURI(url);

		// add http to url
		if (url.substring(0, 7) != 'http://' && url.substring(0, 8) != 'https://') {
			url = 'http://' + url;
		}

		// CASE - cordova
		if (fg.state.device.isCordova) {
			fg.temp.inappbrowser = cordova.InAppBrowser.open(
				url,
				'_blank',
				`location=${config.location},toolbar=${config.toolbar},enableViewportScale=yes,clearcache=yes,clearsessioncache=yes,zoom=no,closebuttoncaption=${config.closebuttoncaption},closebuttoncolor=${config.closebuttoncolor},hideurlbar=${config.hideurlbar},navigationbuttoncolor=${config.navigationbuttoncolor},toolbarcolor=${config.toolbarcolor}`
			);
		}
		// CASE - web-app
		else {
			window.open(url, '_blank');
		}
	},

	/////////////////////////////////////////////////
	// openUrlInSystemBrowser(url, confirm)
	// DESCRIPTION: open an url in safari/android-browser (and not in app itself)
	// use boolean "confirm" to enable the "confirm"-popup
	/////////////////////////////////////////////////
	openUrlInSystemBrowser(url, confirm) {
		// get url
		url = encodeURI(url);

		// add http to url
		if (url.substring(0, 7) != 'http://' && url.substring(0, 8) != 'https://' && url.indexOf('www') !== -1) {
			url = 'http://' + url;
		}

		if (confirm == true) {
			// notification that app will switch to browser
			fg.core.confirm(
				fg.core.getTranslation('openLinkInSystemBrowserMessage'),
				function () {
					// CASE - cordova
					if (fg.state.device.isCordova) {
						window.open(url, '_system');
					}
					// CASE - web-app
					else {
						window.open(url, '_blank');
					}
				},
				fg.core.getTranslation('openLinkInSystemBrowserMessageShort'),
				[fg.core.getTranslation('yes'), fg.core.getTranslation('no')]
			);
		} else {
			// CASE - cordova
			if (fg.state.device.isCordova) {
				window.open(url, '_system');
			}
			// CASE - web-app
			else {
				window.open(url, '_blank');
			}
		}
	},

	/////////////////////////////////////////////////
	// openAddressInMaps(address)
	// DESCRIPTION: open an address in native maps application
	/////////////////////////////////////////////////

	openAddressInMaps(address, confirm) {
		if (typeof address === 'undefined') {
			return;
		}

		// replace special chars
		address = address.replace(/<(?:.|\n)*?>/gm, ' ');
		address = encodeURI(address);

		let link;

		// CASE iOS -> use apple maps OR google maps
		if (fg.state.device.isIos == true) {
			link = 'maps://?q=' + address;
		}
		// android -> use google maps
		else {
			link = 'https://maps.google.com/?q=' + address;
		}

		if (confirm == true) {
			fg.core.confirm(
				' ',
				function () {
					window.open(link, '_system');
				},
				fg.core.getTranslation('openMapsLinkMessage'),
				[fg.core.getTranslation('yes'), fg.core.getTranslation('no')]
			);
			// open link in google maps or apple maps
		} else {
			// CASE - cordova
			if (fg.state.device.isCordova) {
				window.open(link, '_system');
			}
			// CASE - web-app
			else {
				window.open(link, '_blank');
			}
		}
	},


	/**
	 * Fluxguide Core EventBus
	 * based on EventBus https://github.com/krasimir/EventBus
	 * Usage:
	 * 		Start listening for an event:
	 * 			fg.on("myeventname", functionname)
	 *
	 * 		Start listening for a one-time event:
	 * 			fg.one("myeventname", functionname)
	 *
	 * 		Start listening for multiple events at once:
	 * 			fg.on("myeventname1 myeventname2", functionname)
	 *
	 *		Trigger an event:
	 * 			fg.trigger("myeventname", data)
	 */
	initEventbus(fg) {
		// local var for all listeners
		let _listeners = {};

		/**
		 * Adds an Event Listener to the Bus
		 * @param {string}   type     the type of event (like "show_card_done").
		 *                            To assign multiple events, seperate them with a single space
		 * @param {Function} callback
		 * @param {[type]}   scope    needs definition, leave null if not needed
		 * @param {boolean}  once 	  trigger the callback only once (unregister the event immediately after calling)
		 */
		fg.on = function (type, callback, scope, once) {
			if (typeof type === 'undefined' || type == '') {
				throw new Error('No event type specified.');
			}

			let args = [];
			for (let i = 0; i < arguments.length; i++) {
				args.push(arguments[i]);
			}
			args = args.length > 3 ? args.splice(3, args.length - 1) : [];

			// split up type if it contains a space
			let types = [type];
			if (type.indexOf(' ') !== -1) {
				types = type.split(' ');
			}

			var once = once || false;

			types.forEach(function (_type) {
				if (typeof _listeners[_type] != 'undefined') {
					_listeners[_type].push({ scope: scope, callback: callback, once: once, args: args });
				} else {
					_listeners[_type] = [{ scope: scope, callback: callback, once: once, args: args }];
				}
			});
		};
		// one
		fg.one = function (type, callback) {
			fg.on(type, callback, null, true);
		};

		/**
		 * Removes an Event Listener from the Bus
		 * @param  {string}   type     the type of the event (like "show_card_done").
		 *                             To remove multiple events, seperate them with a single space
		 *                             To remove all events listeners for a single event, leave callback empty
		 * @param  {Function} callback
		 * @param  {[type]}   scope    needs definition
		 */
		fg.off = function (type, callback, scope) {
			if (typeof type === 'undefined' || type == '') {
				throw new Error('No event type specified.');
			}

			let types = [type];
			if (type.indexOf(' ') !== -1) {
				types = type.split(' ');
			}

			types.forEach(function (_type) {
				if (typeof _listeners[type] != 'undefined') {
					let numOfCallbacks = _listeners[type].length;
					let newArray = [];
					for (let i = 0; i < numOfCallbacks; i++) {
						let listener = _listeners[type][i];
						// if(listener.scope == scope && listener.callback == callback) {
						if (listener.scope == scope) {
						} else {
							newArray.push(listener);
						}
					}
					_listeners[type] = newArray;
				}
			});
		};

		/**
		 * Checks if the Bus has a specific event listener
		 * @param  {string}   type     the type of the event
		 * @param  {Function} callback
		 * @param  {[type]}   scope    needs definition
		 * @return {Boolean}
		 */
		fg.hasEventListener = function (type, callback, scope) {
			if (typeof _listeners[type] != 'undefined') {
				let numOfCallbacks = _listeners[type].length;
				if (callback === undefined && scope === undefined) {
					return numOfCallbacks > 0;
				}
				for (let i = 0; i < numOfCallbacks; i++) {
					let listener = _listeners[type][i];
					if ((scope ? listener.scope == scope : true) && listener.callback == callback) {
						return true;
					}
				}
			}
			return false;
		};

		/**
		 * Triggers an Event
		 * @param  {string} type   the type of the event
		 * @param  {Object} data the data of the event
		 */
		fg.trigger = function (type, data) {
			if (typeof type === 'undefined' || type == '') {
				throw new Error('No event type specified.');
			}

			let event = {
				type: type,
				data: data,
			};
			let args = [];
			let numOfArgs = arguments.length;
			for (var i = 0; i < numOfArgs; i++) {
				args.push(arguments[i]);
			}
			args = args.length > 2 ? args.splice(2, args.length - 1) : [];
			args = [event].concat(args);

			if (typeof _listeners[type] != 'undefined') {
				let listeners = _listeners[type].slice();
				let numOfCallbacks = listeners.length;
				let listenersToRemove = [];
				for (var i = 0; i < numOfCallbacks; i++) {
					let listener = listeners[i];
					if (listener && listener.callback) {
						let concatArgs = args.concat(listener.args);
						// one time listener?
						if (listener.once == true) {
							listenersToRemove.push(listener);
						}
						listener.callback.apply(listener.scope, concatArgs);
					}
				}
				// remove one-time listeners
				_.pullAll(_listeners[type], listenersToRemove);
			}
		};

		/**
		 * Get a list of all currently registered events on the Bus
		 * @return {string} a list of all events
		 * // TODO: make this more usable
		 */
		fg.getAllEventListeners = function () {
			let str = '';
			for (let type in _listeners) {
				let numOfCallbacks = _listeners[type].length;
				for (let i = 0; i < numOfCallbacks; i++) {
					let listener = _listeners[type][i];
					str += listener.scope && listener.scope.className ? listener.scope.className : 'anonymous';
					str += " listen for '" + type + "'\n";
				}
			}
			return str;
		};
	},

	/////////////////////////////////////////////////
	// define some custom js prototypes
	// TODO -> check if all of these are still used (and REMOVE if not)
	/////////////////////////////////////////////////
	defineSomeJsPrototypes() {
		// toRad() - Usage: my_number.toRad()
		Number.prototype.toRad = function () {
			return this * (Math.PI / 180);
		};

		/////////////////////////////////////////////////
		// hashCode()
		// DESCRIPTION: convert String to numeric hashCode
		// Usage: my_string.hashCode();
		// See: http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
		/////////////////////////////////////////////////
		String.prototype.hashCode = function () {
			let hash = 0,
				i,
				chr,
				len;
			if (this.length === 0) {
				return hash;
			}
			for (i = 0, len = this.length; i < len; i++) {
				chr = this.charCodeAt(i);
				hash = (hash << 5) - hash + chr;
				hash |= 0; // Convert to 32bit integer
			}
			return hash;
		};

		/////////////////////////
		// extend Date object
		/////////////////////////
		// getRealMonth: 1 -> January, 12 -> December (getMonth would be 0-based)
		if (typeof Date.prototype.getRealMonth === 'undefined') {
			Date.prototype.getRealMonth = function () {
				let month = this.getMonth() + 1;
				return month < 10 ? '0' + month : month;
			};
		}
		// getDateString: outputs e.g. 2015-05-15
		if (typeof Date.prototype.getDateString === 'undefined') {
			Date.prototype.getDateString = function () {
				let day = this.getDate() < 10 ? '0' + this.getDate() : this.getDate();
				return this.getFullYear() + '-' + this.getRealMonth() + '-' + day;
			};
		}
		// getDay2: -> Get Number of Weekday (0-6), like getDay but 0: Monday, 6: Sunday
		if (typeof Date.prototype.getDay2 === 'undefined') {
			Date.prototype.getDay2 = function () {
				let day = this.getDay() > 0 ? this.getDay() - 1 : 6;
				return day;
			};
		}

		/////////////////////////////////////////////////
		// array Comparison
		// Description: Extend the Array Prototype to enable array comparison
		// from: http://stackoverflow.com/questions/7837456/comparing-two-arrays-in-javascript
		/////////////////////////////////////////////////
		Array.prototype.compare = function (array) {
			// if the other array is a falsy value, return
			if (!array) {
				return false;
			}

			// compare lengths - can save a lot of time
			if (this.length != array.length) {
				return false;
			}

			for (let i = 0; i < this.length; i++) {
				// Check if we have nested arrays
				if (this[i] instanceof Array && array[i] instanceof Array) {
					// recurse into the nested arrays
					if (!this[i].compare(array[i])) {
						return false;
					}
				} else if (this[i] != array[i]) {
					// Warning - two different object instances will never be equal: {x:20} != {x:20}
					return false;
				}
			}
			return true;
		};
	},

	////////////////////////////////////////////////////
	// seconds2timestring(time)
	// DESCRIPTION: translate time (like "8.230" sec) to "0:08" -> used for audioplayer etc
	////////////////////////////////////////////////////
	seconds2timestring(time) {
		let current_time = Math.round(time);
		let current_time_min = Math.floor(current_time / 60);
		let current_time_sec = Math.round(current_time - current_time_min * 60);
		if (current_time_sec.toString().length < 2) {
			current_time_sec = '0' + current_time_sec;
		}
		let output = current_time_min + ':' + current_time_sec;
		return output;
	},

	/////////////////////////////////////////////////
	// timestamp_to_words()
	// Description: timestamp to words
	/////////////////////////////////////////////////
	timestamp_to_words(timestamp) {
		// create time object from timestamp
		timestamp = parseInt(timestamp);
		// get timezone offset in ms
		let timezone_offset = new Date().getTimezoneOffset();
		timezone_offset = timezone_offset * 60;
		timezone_offset += parseInt(fg.timestamp_utc_offset_server);

		// calculate correct time for incoming timestamp
		timestamp = timestamp * 1000 - fg.timestamp_client_diff - timezone_offset;
		timestamp = timestamp / 1000;

		// calculate difference between now and timestamp
		let diff = timestamp - time();
		fg.temp.diff = diff;

		// generate output string
		let string = moment.duration(diff, 'seconds').humanize(true);

		return string;
	},


	/////////////////////////////////////////////////
	// string_to_object()
	// Description: returns the object of the given string. use dot-notation (instead of [] )
	/////////////////////////////////////////////////
	string_to_object(str) {
		let arr = str.split('.');

		let fn = window || this;
		for (let i = 0, len = arr.length; i < len; i++) {
			fn = fn[arr[i]];
		}

		if (typeof fn === undefined || fn === undefined) {
			throw new Error('object not found (string_to_object)');
		}

		return fn;
	},

	/////////////////////////////////////////////////
	// toCurrentLocaleString()
	// Description: format a number using toLocaleString with the currenly selected language as the locale. will fall back to browser language
	/////////////////////////////////////////////////
	toCurrentLocaleString(number) {
		if (typeof number === 'undefined') {
			return undefined;
		}
		if (typeof number !== 'number') {
			return number;
		}
		let formatted_number;
		if (number.toString().length < 5) {
			return number;
		}

		try {
			formatted_number = number.toLocaleString(fg.locale);
		} catch (error) {
			formatted_number = number.toLocaleString();
		}
		return formatted_number;
	},

	/////////////////////////////////////////////////
	// bytesToSize(bytes)
	// Description: returns a string of bytes -> MB/GB
	/////////////////////////////////////////////////
	bytesToSize(bytes) {
		let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
		if (bytes == 0) {
			return '0 Byte';
		}
		let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
		return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
	},

	/////////////////////////////////////////////////
	// time()
	// Description: return current timestamp (in seconds)
	/////////////////////////////////////////////////
	time() {
		return Math.round(new Date().getTime() / 1000);
	},

	/////////////////////////////////////////////////
	// time_ms()
	// Description: return current timestamp (in ms)
	/////////////////////////////////////////////////
	time_ms() {
		return Math.round(new Date().getTime() / 1);
	},

	/////////////////////////////////////////////////
	// time_server()
	// Description: return current SERVER timestamp (in seconds)
	/////////////////////////////////////////////////
	time_server() {
		if (typeof fg.timestamp_client_diff != 'number') {
			fg.timestamp_client_diff = 0;
		}
		return Math.round(new Date().getTime() / 1000) - fg.timestamp_client_diff;
	},

	/////////////////////////////////////////////////
	// time_server_ms()
	// Description: return current SERVER timestamp (in ms)
	/////////////////////////////////////////////////
	time_server_ms() {
		return new Date().getTime() - fg.timestamp_client_diff_ms;
	},

	/**
	 * Generate UID (unique ID)
	 * Creates a random ID (with RFC4122 - http://www.ietf.org/rfc/rfc4122.txt)
	 * and attaches a timestamp postfix.
	 * Like: "af7867f4-11d1-40ac-88dd-f04c335bb926-1560753203455"
	 * @return {string}
	 */
	generateUid() {
		let d = new Date().getTime();
		let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			let r = (d + Math.random() * 16) % 16 | 0;
			d = Math.floor(d / 16);
			return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16);
		});

		// add timestamp
		if (this.time_server_ms() > 0) {
			uuid = uuid + '-' + this.time_server_ms();
		} else {
			uuid = uuid + '-' + this.time();
		}

		return uuid;
	},

	/**
	 * Generate a RFC4122 uuid
	 * in the form of "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx"
	 * taken from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
	 * @return {string} the UUID, like "78a7b882-5c8d-431b-a44f-8a22b69916ef"
	 */
	uuid() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			let r = (Math.random() * 16) | 0,
				v = c == 'x' ? r : (r & 0x3) | 0x8;
			return v.toString(16);
		});
	},

	/**
	 * Generate a "short" uuid
	 * @param {number} char_count how many characters? (defaults to 8)
	 * adapted from from https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
	 * @return {[type]} [description]
	 */
	short_uuid(char_count) {
		char_count = char_count || 8;
		return Array(++char_count)
			.join('x')
			.replace(/[xy]/g, function (c) {
				let r = (Math.random() * 16) | 0,
					v = c == 'x' ? r : (r & 0x3) | 0x8;
				return v.toString(16);
			});
	},

	///////////////////////////////////////////////
	// time_sort_function_asc(a,b)
	// DESCRIPTION: sorts two objects with attribute "time_from" in format "17:00"
	///////////////////////////////////////////////
	time_sort_function_asc(a, b) {
		let at = a.time_from.split(':');
		let bt = b.time_from.split(':');
		return parseInt(at[0]) * 60 + parseInt(at[1]) > parseInt(bt[0]) * 60 + parseInt(bt[1]) ? 1 : -1;
	},

	///////////////////////////////////////////////
	// time_sort_function_desc(a,b)
	// DESCRIPTION: sorts two objects with attribute "time_from" in format "17:00"
	///////////////////////////////////////////////
	time_sort_function_desc(a, b) {
		let at = a.time_from.split(':');
		let bt = b.time_from.split(':');
		return parseInt(at[0]) * 60 + parseInt(at[1]) > parseInt(bt[0]) * 60 + parseInt(bt[1]) ? -1 : 1;
	},

	///////////////////////////////////////////////
	// animate($el, effect, options)
	// DESCRIPTION: make animation with
	// HINT for options: options.duration, options.delay, options.iteration_count, options.callback
	// HINT for effect: bounce, flash, pulse, rubberBand, shake, swing, tada, wobble, bounceIn, bounceInDown, bounceInLeft, bounceInRight, bounceInUp, bounceOut, bounceOutDown, bounceOutLeft, bounceOutRight, bounceOutUp, fadeIn, fadeInDown, fadeInDownBig, fadeInLeft, fadeInLeftBig, fadeInRight, fadeInRightBig, fadeInUp, fadeInUpBig, fadeOut, fadeOutDown, fadeOutDownBig, fadeOutLeft, fadeOutLeftBig, fadeOutRight, fadeOutRightBig, fadeOutUp, fadeOutUpBig, flipInX, flipInY, flipOutX, flipOutY, lightSpeedIn, lightSpeedOut, rotateIn, rotateInDownLeft, rotateInDownRight, rotateInUpLeft, rotateInUpRight, rotateOut, rotateOutDownLeft, rotateOutDownRight, rotateOutUpLeft, rotateOutUpRight, hinge, rollIn, rollOut, zoomIn, zoomInDown, zoomInLeft, zoomInRight, zoomInUp, zoomOut, zoomOutDown, zoomOutLeft, zoomOutRight, zoomOutUp, slideInDown, slideInLeft, slideInRight, slideInUp, slideOutDown, slideOutLeft, slideOutRight, slideOutUp
	///////////////////////////////////////////////
	animate($el, effect, options) {
		// define parameters
		options = options || {};
		let duration = options.duration || false;
		let delay = options.delay || 0;
		let iteration_count = options.iteration_count || false;
		let callback = options.callback || function () { };
		if ($el == undefined || effect == undefined) {
			return;
		}

		// check if element is visible
		if (delay == 0) {
			if ($el.css('opacity') == '0') {
				$el.css('opacity', '1');
			}
			if ($el.is(':visible') == false) {
				$el.show();
			}
		} else {
			window.setTimeout(function () {
				if ($el.css('opacity') == '0') {
					$el.css('opacity', '1');
				}
				if ($el.is(':visible') == false) {
					$el.show();
				}
			}, delay);
		}

		// callback for animation-end
		$el.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
			$el.removeClass('animated ' + effect);
			callback();
		});
		// define animation attributes
		if (duration) {
			$el.css('-webkit-animation-duration', duration + 'ms');
		}
		//if (delay) $el.css('-webkit-animation-delay', delay + 'ms');
		if (iteration_count) {
			$el.css('-webkit-animation-iteration-count', iteration_count);
		}

		// make animation
		if (delay == 0) {
			$el.addClass('animated ' + effect);
		} else {
			window.setTimeout(function () {
				$el.addClass('animated ' + effect);
			}, delay);
		}
	},

	/**
	 * @param {string} scope name of the scope which the log should be scoped with
	 * @param {number | string} id Identifier of the log
	 * @param {string} description Description of the log entry event
	 * @param {string} [error] Error (object) thrown by the event
	 */
	writeDebugLog(logScopeName, logTitle, logDescription, error) {
		// "isDebuggingOn"-flag is not set -> exit
		if (!appSettings.isDebuggingOn || appSettings.preventStartupConsoleLogs) {
			return;
		}

		// prevent logs from start.js (when setting-flag is set)
		if (appSettings.preventStartupConsoleLogs && logScopeName == "start.js") return;

		// init window.startedTime
		if (!window.startedTime) {
			window.startedTime = {};
			window.debugLogs = {};
		}

		// init startedTime (if logScopeName is not created yet)
		if (!window.startedTime[logScopeName]) {
			window.startedTime[logScopeName] = Date.now();
			window.debugLogs[logScopeName] = [];
		}

		// calculate timeDiff
		const timeDiffFromStart = Date.now() - window.startedTime[logScopeName];

		// fire console.log
		console.log(`[${logTitle}] "${logDescription}" -- ${timeDiffFromStart}ms after start.js start`);
		// file console.error
		if (error) {
			console.error(`Error on Step ${logTitle} - ${logDescription}: ${error}`);
		}
		// save additionaly into global
		window.debugLogs[logScopeName].push({ logScopeName, logTitle, logDescription, error });
	},


	/////////////////////////////////////////////////
	// fg.core.checkNestedObject(obj, level, ...rest)
	// Description: Check for the Existence of Nested JavaScript Object Key
	// Example of usage in js file: fg.core.checkNestedObject(stop, 'images', '0', 'image_preview', '0', 'url')
	// Example of usage in vue template file: <img v-if="checkNestedObject(stop, 'images', '0', 'image_preview', '0', 'url')" :src="fileURL(stop.images[0].image_preview[0].url)" :alt="stop.title" />
	/////////////////////////////////////////////////
	checkNestedObject(obj, level, ...rest) {
		if (obj === undefined || obj === null) return false;
		if (rest.length == 0 && obj.hasOwnProperty(level)) return true;
		return this.checkNestedObject(obj[level], ...rest);
	}


};
// core-functions END
