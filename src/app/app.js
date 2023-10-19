/* app.js */
/* our custom app */

// import app-styles
import './styles/styles.less';

// import npm-module styles
import 'swiper/swiper.less';

export default {
	/**
	 * @summary First function that gets called from the app startup process
	 */
	// CUSTOM APP STARTS HERE - DO NOT REMOVE
	init() {
		//Init Android Backbutton
		document.addEventListener('backbutton', this.handleAndroidBackButton);


		// FLUXGUIDE CORE EVENT - "appIsRunning"
		fg.on('appIsRunning', function () {

			if(fg.core.getGetParameter('storyId', document.URL)) {
				fg.core.showCard('Story');
			}
			else {
				//showOverViewCard
				fg.core.showCard('StoriesList');

			}
		});

		// FLUXGUIDE CORE EVENT - "visitorDataLoaded"
		fg.on('visitorDataLoaded', function () {});
	},

	//Android Back button
	handleAndroidBackButton() {
		// Your Custom Stuff :)
		// if(fg.state.app.menuOpened == true) {
		//     fg.state.app.menuOpened = false;
		//     return;
		// }

		// Handle First Card
		// if(fg.state.cardStack[fg.state.cardStack.length - 1] == "HomeCard") {
		//     // Close App on Second Try
		//     if(fg.state.app.firstTryToExit == true) {
		//         fg.state.app.firstTryToExit = false;
		//         navigator.app.exitApp();
		//         return;
		//     }
		//     else {
		//         //First Try: Show Toast Message
		//         fg.state.app.firstTryToExit = true;
		//         fg.core.toast(fg.core.getTranslation("exitAppConfirm"));

		//         // Reset Flag
		//         setTimeout(() => {
		//             fg.state.app.firstTryToExit = false;
		//         }, 2000);

		//         return;
		//     }
		// }

		////// DEFAULT CASE: Hide the card
		if (fg.state.cardStack.length > 0) fg.core.hideCard(fg.state.cardStack[fg.state.cardStack.length - 1].appCard, { animation: 'fade' });
	},
};
