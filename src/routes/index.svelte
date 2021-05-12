<script context="module">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ fetch }) => ({
		props: {
			posts: await fetch('/index.json').then((res) => res.json())
		}
	});
</script>

<script>
	import SvelteSeo from 'svelte-seo';
	import { seoData } from '$lib/seoConstants';
	import { Header, PostList } from '$lib/components';
	export let posts: PostData[];
</script>

<SvelteSeo {...seoData({})} />

<Header title="Ivo Berger" subTitle="Stuff I Made" subTitleLink="/about" />
<PostList {posts} />
