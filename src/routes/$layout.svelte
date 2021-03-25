<script>
	import './_global.css';
	import { onMount } from 'svelte';
	import { dev } from '$app/env';
	import Footer from '$lib/components/Footer';

	let prismStylesheet;

	onMount(() => {
		if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
			// dark mode
			prismStylesheet =
				'https://cdn.jsdelivr.net/gh/PrismJS/prism-themes/themes/prism-atom-dark.css';
		} else {
			prismStylesheet =
				'https://cdn.jsdelivr.net/gh/PrismJS/prism-themes/themes/prism-ghcolors.css';
		}
	});
</script>

<svelte:head>
	{#if !dev}
		<script
			async
			defer
			data-domain="ivoberger.com"
			src="https://plausible.io/js/plausible.js"></script>
	{/if}
	<link href={prismStylesheet} rel="stylesheet" />
	<link
		href="https://fonts.googleapis.com/css2?family=Catamaran:wght@400;700&family=Source+Serif+Pro:ital@0;1&display=swap"
		rel="stylesheet"
	/>
	<title>Ivo's Coding Blog</title>
</svelte:head>
<slot />
<Footer />
