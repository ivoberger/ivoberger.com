import { sveltePreprocess } from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: [sveltePreprocess({ postcss: true })],
	kit: {
		prerender: { concurrency: 4 },
		adapter: adapter()
	}
};

export default config;
