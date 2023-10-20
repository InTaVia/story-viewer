<template>
	<!-- (special) STAGE - show System-Card (works everywhere) -->
	<transition
		v-if="fg.state.showSystemMenu"
		appear
		:name="
			fg.state.systemCardTransitions && fg.state.systemCardTransitions.sysMenuCardTransition
				? fg.state.systemCardTransitions.sysMenuCardTransition
				: 'fade'
		"
	>
		<div id="SystemMenu" class="card">
			<SystemMenu />
		</div>
	</transition>

	<!-- STAGE 3 - everything is ready (content, content-download, language-selector,... is loaded) - START app  -->
	<transition
		v-else-if="showApp"
		appear
		:name="
			fg.state.systemCardTransitions && fg.state.systemCardTransitions.appContentTransition
				? fg.state.systemCardTransitions.appContentTransition
				: 'fade'
		"
	>
		<div
			id="app-container"
			key="app-is-ready"
			class="loading-init-fg-ready"
			:data-active-card="activeCard"
			:data-previous-card="previousCard"
		>
			<!-- fixed ui-elements -->
			<FixedUIElements />

			<!-- all cards from card-stack will be inserted here -->
			<Suspense>
				<div
					v-for="(card, index) in fg.state.cardStack"
					:id="card.id"
					:key="card.id"
					:style="getIndex(card)"
					class="card"
					:class="cardClass(card)"
					:aria-hidden="getAriaHidden(card)"
				>
					<component :is="card.appCard" :card-data="card"></component>
				
				</div>
			</Suspense>
		
		</div>
	</transition>

	<!-- STAGE 2 - Content is NOT downloaded yet (AND language is defined) - START content-downloader -->
	<transition
		v-else-if="showContentDownloader"
		appear
		:name="
			fg.state.systemCardTransitions && fg.state.systemCardTransitions.contentDownloaderTransition
				? fg.state.systemCardTransitions.contentDownloaderTransition
				: 'fade'
		"
	>
		<div id="ContentDownload" key="app-is-loading" class="loading-init-fg card">
			<ContentDownload />
		</div>
	</transition>

	<!-- STAGE 1 - Language is not defined yet (AND there are MULTIPLE languages available) - show Language-Selection -->
	<transition
		v-else-if="showLanguageSelector"
		appear
		:name="
			fg.state.systemCardTransitions && fg.state.systemCardTransitions.langCardTransition
				? fg.state.systemCardTransitions.langCardTransition
				: 'fade'
		"
	>
		<div id="LanguageSelection" class="card">
			<LanguageSelection />
		</div>
	</transition>
</template>

<script>
// import core
import core from './core.js';
// import all card-vue-components from custom app
import appCards from '../app/cards.js';

export default {
	name: 'App',

	components: appCards,
	computed: {
		// flag for STAGE 1 - all init data loaded (content, filesList...) BUT language-id is NOT defined yet -> Language-Selector-Screen will open
		showLanguageSelector() {
			fg.state.visitor.languageId = 2;
			return false;
			if (
				fg.state.start.contentLoaded &&
				fg.state.start.contentStopsLoaded &&
				fg.state.start.filesListLoaded &&
				fg.state.start.allFilesOnDeviceLoaded &&
				fg.state.start.visitorDataLoaded &&
				fg.state.start.contentDownloadFinished != true &&
				!(parseInt(fg.state.visitor.languageId) > 0)
			) {
				return true;
			} else {
				return false;
			}
		},

		// flag for STAGE 2 - all init data loaded (content, filesList...) AND language-id IS defined BUT content-download is NOT finished yet - Content-Downloader-Screen will open
		showContentDownloader() {
			if (
				fg.state.start.contentLoaded &&
				fg.state.start.contentStopsLoaded &&
				fg.state.start.allFilesOnDeviceLoaded &&
				fg.state.start.visitorDataLoaded &&
				fg.state.start.filesListLoaded &&
				!fg.state.start.contentDownloadFinished &&
				parseInt(fg.state.visitor.languageId) > 0
			) {
				// offline-case -> skip content-downloader and start app
				if (fg.state.dataConnection == false) {
					// mark download as finished
					fg.state.start.contentDownloadFinished = true;
					// set "app-is-running"-flag
					fg.state.start.appIsRunning = true;
					// trigger "appIsRunning"-event (this will kick in your custom application)
					fg.trigger('appIsRunning');
					return false;
				}
				// online-case -> start content-downloader
				return true;
			} else {
				return false;
			}
		},

		// flag for STAGE 3 - all init data loaded (content, filesList,...) AND language-id IS defined AND content-download IS finished -> Your App will start
		showApp() {
			if (
				fg.state.start.contentLoaded &&
				fg.state.start.contentStopsLoaded &&
				fg.state.start.allFilesOnDeviceLoaded &&
				fg.state.start.visitorDataLoaded &&
				parseInt(fg.state.visitor.languageId) > 0 &&
				fg.state.start.filesListLoaded &&
				fg.state.start.contentDownloadFinished
			) {
				return true;
			} else {
				return false;
			}
		},
		activeCard: function () {
			return fg.state.cardStack[fg.state.cardStack.length - 1].id;
		},
		previousCard: function () {
			if (fg.state.cardStack[fg.state.cardStack.length - 2])
				return fg.state.cardStack[fg.state.cardStack.length - 2].id;
			else return '';
		},
	},

	watch: {
		//// watcher for visitor-state
		// Note: this will automaticly save the visitor-state on server and localstorage
		'fg.state.visitor': {
			handler(newValue, oldValue) {
				// exit if visitor was not initialized
				if (fg.state.start.visitorDataLoaded != true) {
					return;
				}
				// trigger "visitor_state_changed"
				fg.trigger('visitor_state_changed');
				// call save_visitor()
				core.saveVisitor(400);
			},
			deep: true,
		},
	},

	created() {
		// Trigger first "custom-js" event
		fg.trigger('appLaunched');
		
		// detect if language is already set
		let languageId = 2;
		if (localStorage.visitor) {
			let visitor = JSON.parse(localStorage.visitor);
			if (parseInt(visitor.language_id) > 0) languageId = parseInt(visitor.language_id);
			fg.state.visitor.languageId = languageId;
		}
		if (languageId > 0) {
			fg.state.start.languageIdIsDefined = true;
			fg.state.visitor.languageId = languageId;
		}
	},

	methods: {
		getIndex(card) {
			let index = fg.state.cardStack.indexOf(card);
			let style = 'z-index:' + (index + 100) + ';';

			return style;
		},
		cardClass(card) {
			const vm = this;
			let cardClass = '';

			if (card.activeCard) cardClass += 'active-card';
			else if (card.previousCard) cardClass += 'previous-card';

			return cardClass;
		},
		getAriaHidden(card) {
			if (card.activeCard) return false;
			else return true;
		}
	},
};
</script>

<style scoped>
/************************* Standard Vue Card Transitions for system cards *************************/

/* TOP */
.top-enter-active,
.top-leave-active {
	transition: all 400ms ease-in-out;
}

.top-enter-from,
.top-leave-to {
	transform: translate3d(0%, -100%, 0);
}

/* BOTTOM */
.bottom-enter-active,
.bottom-leave-active {
	transition: all 400ms ease-in-out;
}

.bottom-enter-from,
.bottom-leave-to {
	transform: translate3d(0%, 100%, 0);
}

/* LEFT */
.left-enter-active,
.left-leave-active {
	transition: all 400ms ease-in-out;
}

.left-enter-from,
.left-leave-to {
	transform: translate3d(100%, 0%, 0);

	z-index: 400;
}


/* RIGHT */
.right-enter-active,
.right-leave-active {
	transition: all 400ms ease-in-out;
}

.right-enter-from,
.right-leave-to {
	transform: translate3d(-100%, 0%, 0);
}


/* FADE */
.fade-enter-active,
.fade-leave-active {
	transition: all 400ms ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}

/* NONE */
.none-enter-active,
.none-leave-active {
	transition: all 0ms linear;
}

.none-enter-from,
.none-leave-to {
	opacity: 0;
}
</style>
