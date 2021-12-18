<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page: { path, params } }) => ({
		props: {
			params,
			path
		}
	});
</script>

<script lang="ts">
	import '../app.css';
	import { Footer } from '$lib/components';
</script>

<slot />
<Footer />
