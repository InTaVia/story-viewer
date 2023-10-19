<template>
	<div>
		<button @click="setLanguage(2)">Deutsch</button>
		<button @click="setLanguage(1)">English</button>
	</div>
</template>

<script>
export default {
	setup() {
		const setLanguage = (id) => {
			fg.state.visitor.languageId = id;

			//Set HTML Tag Language -> Important for screenreaders
			let languageLocale = fg.content.sys_languages[fg.state.visitor.languageId].locale;
			let languageLocaleForHtmlTag = languageLocale.split("_")[0];
			let htmlTag = document.querySelector("html");
			htmlTag.setAttribute("lang",languageLocaleForHtmlTag);

			showNextCard();
		};

		const showNextCard = () => {
			fg.core.showCard('DemoCard', { animation: 'fade' });
		};

		return {
			setLanguage,
		};
	},
	components: {},
};
</script>
