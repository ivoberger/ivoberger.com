const sveltePreprocess = require('svelte-preprocess');
const static = require('@sveltejs/adapter-static');
const pkg = require('./package.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		defaults: {
			script: 'typescript',
			style: 'postcss'
		},
		replace: [
			['import.meta.env.VERCEL_ANALYTICS_ID', JSON.stringify(process.env.VERCEL_ANALYTICS_ID)]
		]
	}),
	kit: {
		adapter: static(),
		hydrate: false,
		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			},
			plugins: [
				require('vite-plugin-windicss').default({
					scan: { dirs: ['./src'], fileExtensions: ['css', 'svelte', 'ts'] }
				})
			]
		}
	}
};
