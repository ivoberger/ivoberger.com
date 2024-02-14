<script lang="ts">
	import '../app.css';
	import { inject } from '@vercel/analytics';

	import { dev } from '$app/environment';
	import { Footer } from '$lib/components';

	inject({ mode: dev ? 'development' : 'production' });
</script>

<slot />
<Footer />
