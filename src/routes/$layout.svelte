<script>
	import './_global.css';
	import { onMount } from 'svelte';
	import { dev, browser } from '$app/env';
	import { page } from '$app/stores';
	import { rootUrl } from '$lib/seoConstants';
	import Footer from '$lib/components/Footer';
	import { webVitals } from '$lib/webvitals';

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID as string;
	if (browser && analyticsId) {
		page.subscribe(({ path }) => webVitals({ page: path, analyticsId }));
	}

	let prismStylesheet = 'https://cdn.jsdelivr.net/gh/PrismJS/prism-themes/themes/';
	onMount(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			// dark mode
			prismStylesheet += 'prism-atom-dark.css';
		} else {
			prismStylesheet += 'prism-ghcolors.css';
		}
	});
</script>

<svelte:head>
	{#if !dev}
		<script async defer data-domain={rootUrl} src="https://plausible.io/js/plausible.js"></script>
	{/if}
	{#if prismStylesheet.includes('.css')}
		<link href={prismStylesheet} rel="stylesheet" />
	{/if}
	<meta name="color-scheme" content="dark light" />
</svelte:head>

<slot />
<Footer />
