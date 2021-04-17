const sveltePreprocess = require('svelte-preprocess');
const svelteWindi = require('svelte-windicss-preprocess');
const static = require('@sveltejs/adapter-static');
const pkg = require('./package.json');

const windicss = require('vite-plugin-windicss').default;

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		svelteWindi.preprocess({ kit: true, config: 'windi.config.cjs' }),
		sveltePreprocess({
			defaults: {
				script: 'typescript',
				style: 'postcss'
			}
		})
	],
	kit: {
		adapter: static(),
		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			},
			plugins: [windicss()]
		}
	}
};
