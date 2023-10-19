// FILE: app.settings.js
// DESCRIPION: the main settings for your app


// Enivronment DEVELOPMENT
const envDev = {
    // For most projects (local):
    // baseUrl: 'http://localhost:8888/dm/',
    baseUrl: 'https://intavia.fluxguide.com/fluxguide/',
    isDebuggingOn: true,
}

// Environment TESTING
const envTest = {
    baseUrl: 'https://intavia.fluxguide.com/fluxguide/',
    isDebuggingOn: true,
}

// Environment PRODUCTION
const envProd = {
    baseUrl: 'https://intavia.fluxguide.com/fluxguide/',
    isDebuggingOn: true,
}

// Descide which envionment to use
let env;
switch (import.meta.env.MODE) {
    case "development":
        env = envDev;
        break;
    case "testing":
        env = envTest;
        break;
    case "production":
        env = envProd;
        break;
    default:
        env = envProd;
        break;
}

export default {
	/**
	 * CORE SETTINGS - REQUIRED
	 */
    ...env, // Insert the settings depending on environment
	exhibitionId: 1, // exhibition-id of this app
	// Transitions for the core cards
	systemCardTransitions: {
		langCardTransition: 'fade',
		contentDownloaderTransition: 'fade',
		appContentTransition: 'fade',
		sysMenuCardTransition: 'top',
	},
	// Minumum duration the download screen is shown
	downloaderMinDuration: 0,
	// Minimum time a file needs to download (download duration emulation for web)
	contentDownloadEmulationFileTimeout: 0,

	/**
	 * CUSTOM SETTINGS
	 */
	exampleValue: 15,
};
