<script lang="ts">
	import '../app.css';
	import { inject } from '@vercel/analytics';
	import { page } from '$app/stores';
	import { browser, dev } from '$app/environment';
	import { Footer } from '$lib/components';
	import { webVitals } from '$lib/webvitals';

	inject({ mode: dev ? 'development' : 'production' });

	const analyticsId = import.meta.env.VERCEL_ANALYTICS_ID;

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
