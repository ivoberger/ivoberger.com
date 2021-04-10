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
	import { rootUrl } from '$lib/seoConstants';
	import { Footer } from '$lib/components';
</script>

<svelte:head>
	<script async defer data-domain={rootUrl} src="/stats/plausible.js"></script>
</svelte:head>

<slot />
<Footer />
