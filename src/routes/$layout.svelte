<script>
	import './_global.css';
	import { onMount } from 'svelte';
	import { dev } from '$app/env';
	import { rootUrl } from '$lib/seoConstants';
	import Footer from '$lib/components/Footer';

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
	<link href={prismStylesheet} rel="stylesheet" />
	<meta name="color-scheme" content="dark light" />
</svelte:head>

<slot />
<Footer />
