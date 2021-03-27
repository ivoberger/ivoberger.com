<script>
	import './_global.css';
	import { onMount } from 'svelte';
	import { dev, browser } from '$app/env';
	import { page } from '$app/stores';
	import { rootUrl } from '$lib/seoConstants';
	import Footer from '$lib/components/Footer';
	import { webVitals } from '$lib/webvitals';

	const analyticsId = import.meta.env.VITE_VERCEL_ANALYTICS_ID as string;
	let prismStylesheet = 'https://cdn.jsdelivr.net/gh/PrismJS/prism-themes/themes/';

	if (browser && analyticsId) {
		console.log('[Analytics]', analyticsId);
		page.subscribe(({ path }) => webVitals({ page: path, analyticsId }));
	}
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
	<link href={prismStylesheet} rel="stylesheet" />
	<meta name="color-scheme" content="dark light" />
</svelte:head>

<slot />
<Footer />
