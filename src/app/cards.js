// (SECTION 1) - Core Cards - !! IMPORTANT !!: these components MUST exist and may NOT be renamed)
import FixedUIElements from './cards/coreCards/FixedUiElements.vue';
import ContentDownload from './cards/coreCards/ContentDownload.vue'; /* Content-Download */
import LanguageSelection from './cards/coreCards/LanguageSelection.vue'; /* Language-Selector  */
import SystemMenu from './cards/coreCards/SystemMenu.vue'; /* System-Menu-Card  */

// (SECTION 2) - Your cards
/* Your custom cards */
import DemoCard from '../core/components/DemoCard.vue';
// import HomeCard from './cards/HomeCard.vue';
// import ThreeDHuman from './cards/ThreeDHuman.vue';
import Story from './cards/Story.vue';
import TimelineCard from './cards/TimelineCard.vue'
import StoriesList from './cards/StoriesList.vue'
import NetworkCard from './cards/NetworkCard.vue'

// export (don´t forget to add alls your cards-imports here as well)
export default {
	FixedUIElements,
	ContentDownload,
	LanguageSelection,
	SystemMenu,

	Story,
	TimelineCard,
	StoriesList,
	NetworkCard
};
