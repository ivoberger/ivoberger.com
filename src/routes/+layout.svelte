<script lang="ts">
	import '../app.css';
	import { page } from '$app/stores';
	import { browser } from '$app/environment';
	import { Footer } from '$lib/components';
	import { webVitals } from '$lib/webvitals';

	const analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

	export const trailingSlash = 'never';
	export const prerender = true;

	$: if (browser && analyticsId) {
		webVitals({
			path: $page.url.pathname,
			params: $page.params,
			analyticsId
		});
	}
</script>

<slot />
<Footer />
