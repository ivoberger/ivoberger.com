const sveltePreprocess = require('svelte-preprocess');
const static = require('@sveltejs/adapter-static');
const pkg = require('./package.json');

const windicss = require('vite-plugin-windicss').default;

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		defaults: {
			script: 'typescript',
			style: 'postcss'
		}
	}),
	kit: {
		adapter: static(),
		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			},
			plugins: [
				windicss({
					scan: { dirs: ['./src'], fileExtensions: ['css', 'svelte', 'ts'] }
				})
			]
		}
	}
};
