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
	import './_global.css';
	import 'typeface-catamaran';
	import 'typeface-source-serif-pro';
	import { onMount } from 'svelte';
	import { rootUrl } from '$lib/seoConstants';
	import Footer from '$lib/components/Footer';
	import { webVitals } from '$lib/webvitals';

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID as string;
	export let path: string;
	export let params: Record<string, string>;

	let prismStylesheet = 'https://cdn.jsdelivr.net/gh/PrismJS/prism-themes/themes/';
	onMount(() => {
		if (analyticsId) webVitals({ path, params, analyticsId });
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			// dark mode
			prismStylesheet += 'prism-atom-dark.css';
		} else {
			prismStylesheet += 'prism-ghcolors.css';
		}
	});
</script>

<svelte:head>
	<script async defer data-domain={rootUrl} src="https://stats.ivoberger.com/js/index.js"></script>
	{#if prismStylesheet.includes('.css')}
		<link href={prismStylesheet} rel="stylesheet" />
	{/if}
	<meta name="color-scheme" content="dark light" />
</svelte:head>

<slot />
<Footer />
