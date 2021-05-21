<script context="module">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ page: { params }, fetch }) => ({
		props: {
			posts: await (await fetch(`/tag/${params.tag}.json`)).json(),
			tag: params.tag
		}
	});
</script>

<script>
	import { Body, PostList } from '$lib/components';

	export let posts: PostData[];
	export let tag: string;
</script>

<Body>
	<h1><i>#{tag}</i></h1>
	<PostList {posts} />
</Body>
