<template>

    <!-- ***** IMPORTANT (AUDIOPLAYER ONLY) ***** -->
    <!-- give a "plain" src. Don't use fileURL -->

	<strong>Default audioplayer without autoplay</strong>
	<Audioplayer
		audioplayer-id="audio1"
		:src="fg.state.baseUrl + 'public/content/fluxguide/exhibitions/1/birds.mp3'"
	></Audioplayer>
	<hr />
	<strong>Audioplayer without progress bar</strong>
	<Audioplayer
		audioplayer-id="audio2"
		:progress-bar="false"
		:src="fg.state.baseUrl + 'public/content/fluxguide/exhibitions/1/birds.mp3'"
	></Audioplayer>
	<hr />
	<strong>Audioplayer with earpiece detection</strong>
	<Audioplayer
		audioplayer-id="audio3"
		:use-earpiece-detection="true"
		:src="fg.state.baseUrl + 'public/content/fluxguide/exhibitions/1/birds.mp3'"
	></Audioplayer>
</template>

<script>
import Audioplayer from './Audioplayer.vue';

export default {
	components: {
		Audioplayer,
	},
};
</script>
