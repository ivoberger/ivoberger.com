import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import windicss from 'vite-plugin-windicss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess(),
	kit: {
		trailingSlash: 'ignore',
		hydrate: false,
		router: false,
		adapter: adapter(),
		vite: {
			plugins: [windicss()],
			optimizeDeps: {
				include: [
					'is-buffer',
					'extend',
					'debug',
					'mdurl',
					'parse5',
					'style-to-object',
					'github-slugger',
					'clean-css',
					'uglify-js',
					'css-selector-parser'
				]
			}
		}
	}
};

export default config;
