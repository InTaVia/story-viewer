<template>
	<section class="stories-list-container">
		<button @click="openStory(story.storyId)" v-for="story in stories" :key="story.storyId" class="story-btn">
			<h2>{{ story.title }}</h2>
			<h3>{{ story.author }} © {{ story.copyright }}</h3>

			<p v-html="story.description"></p>
		</button>
	</section>©
</template>

<script>
export default {
	components: {},
	props: {
		// options-object from showCard
		cardData: {
			type: Object,
			default: () => {
				return {};
			},
		},
	},
	data() {
		return {
			stories: null,
		};
	},
	mounted() {
		this.stories = JSON.parse(fg.content.exhibitions[1][1].intavia_stories);
		console.log("stories", this.stories)
	},
	methods: {
		openStory: function (storyId) {
			fg.core.clearCardStack()
			
			// write storyid in url parameter
			window.history.pushState(null, null, "?storyId="+storyId+"&autostart=1");

			fg.state.app.currentStoryId = storyId
			fg.core.showCard('Story', {
				animation: 'left',
			});
		}
	},
};
</script>

<style lang="less" scoped>
@import url('../styles/styles.less');

.stories-list-container {
	width: 100vw;
	height: 100vh;
	padding: 1em;
	overflow: scroll;
}

.story-btn {
	// margin: 1em; 
	width: 100%;
	margin-bottom: 1rem;
	padding: 1rem;
	border-radius: 15px;
	background-color: @primary;
	color: white;

	h2 {
		font-weight: 600;
	}

	h3 {
		font-size: 1rem;
		margin-top: .5rem;
	}

	p {
		width: 100%;
		color: white;
		font-size: 1rem;

	}
}
</style>
