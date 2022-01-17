import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [
		preprocess({
			postcss: true
		})
	],
	kit: {
		trailingSlash: 'ignore',
		hydrate: false,
		router: false,
		prerender: {
			concurrency: 4
		},
		adapter: adapter()
	}
};

export default config;
