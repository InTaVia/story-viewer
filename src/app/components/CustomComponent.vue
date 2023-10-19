<template>
	<div>
		<h1>Hello World!</h1>
		<span>{{ time }}</span>

	</div>
</template>

<script>

export default {
	data() {
		return {
			time: fg.core.time(),
		};
	},
};
</script>
