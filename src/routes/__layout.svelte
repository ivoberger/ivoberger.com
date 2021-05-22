<script context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page: { path, params } }) => ({
		props: {
			params,
			path
		}
	});
</script>

<script>
	import 'virtual:windi.css';
	import '@fontsource/catamaran/variable.css';
	import '@fontsource/source-serif-pro/400.css';
	import { Footer } from '$lib/components';
</script>

<slot />
<Footer />

<style global>
	body {
		@apply font-sans antialiased text-gray-900 bg-white dark:bg-gray-900 dark:text-gray-100;
	}

	h1,
	h2,
	h3,
	h4,
	h5,
	h6 {
		@apply font-serif;
	}

	h1 {
		@apply mb-1 font-semibold text-3xl sm:text-4xl md:text-5xl;
	}

	h2 {
		@apply mb-1 text-xl sm:text-2xl;
	}

	h3 {
		@apply my-3 sm:my-5 font-semibold text-3xl sm:text-3xl md:text-4xl;
	}

	.visible-hidden {
		clip: rect(1px, 1px, 1px, 1px);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}

	.visible-hidden:focus {
		clip: auto;
		height: auto;
		overflow: auto;
		position: absolute;
		width: auto;
	}

	svg.fa-icon {
		height: 1em;
		width: 1em;
		vertical-align: -0.125em;
		font-size: inherit;
		overflow: visible;
	}
</style>
