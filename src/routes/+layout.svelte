<script lang="ts">
	import '../app.css';
	import { Footer } from '$lib/components';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

	injectSpeedInsights();
</script>

<slot />
<Footer />
