module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		// 'plugin:vue/essential',
		'plugin:vue/vue3-recommended',
		// "plugin:@typescript-eslint/recommended",
		'prettier',
	],
	parserOptions: {
		ecmaVersion: 12,
		parser: '@typescript-eslint/parser',
		sourceType: 'module',
	},
	plugins: ['vue', '@typescript-eslint'],
	rules: {
		camelcase: 'error',
		'no-var': 'error',
        
        /* --- VUE RULES --- */
        'vue/no-v-html': 'off', // Our users usually don't modify the data, so this is no problem
	},
};
