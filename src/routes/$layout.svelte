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
	import './_global.css';
	import './_posts.css';
	import { onMount } from 'svelte';
	import { rootUrl } from '$lib/seoConstants';
	import { Footer } from '$lib/components';
	import { webVitals } from '$lib/webvitals';

	let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID as string;
	export let path: string;
	export let params: Record<string, string>;

	onMount(() => {
		if (analyticsId) webVitals({ path, params, analyticsId });
	});
</script>

<svelte:head>
	<script async defer data-domain={rootUrl} src="https://p.ivoberger.com/js/index.js"></script>
</svelte:head>

<slot />
<Footer />
