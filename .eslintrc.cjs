module.exports = {
	root: true,
	parser: '@typescript-eslint/parser',
	extends: ['eslint:recommended', 'prettier'],
	plugins: ['svelte3', '@typescript-eslint'],
	ignorePatterns: ['.eslintrc.js'],
	overrides: [
		{ files: ['*.svelte'], processor: 'svelte3/svelte3' },
		// For *.cjs, set env to node to remove the require() complaints.
		{ files: ['*.cjs'], env: { node: true } },
		// Enable the TS rules here instead, so the *.cjs override doesn't inherit them.
		{ files: ['!*.cjs'], extends: 'plugin:@typescript-eslint/recommended' }
	],
	settings: {
		'svelte3/typescript': require('typescript')
	},
	parserOptions: {
		sourceType: 'module',
		ecmaVersion: 2018
	}
};
