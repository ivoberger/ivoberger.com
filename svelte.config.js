import preprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import windicss from 'vite-plugin-windicss';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: preprocess({
		defaults: {
			script: 'typescript',
			style: 'postcss'
		}
	}),
	kit: {
		// hydrate: false,
		// router: false,
		adapter: adapter(),
		vite: {
			plugins: [windicss.default()]
		}
	}
};

export default config;
