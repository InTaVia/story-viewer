<template>
	<h1>{{ cardData.id }}</h1>
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
		return {};
	},
	methods: {},
};
</script>

<style lang="less" scoped></style>
