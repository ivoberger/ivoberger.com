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
	import { Footer } from '$lib/components';
</script>

<slot />
<Footer />
