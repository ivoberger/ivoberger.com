<script context="module">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ page: { params, path }, fetch }) => ({
		props: {
			posts: await (await fetch(`/tag/${params.tag}.json`)).json(),
			tag: params.tag,
			path
		}
	});
</script>

<script>
	import SvelteSeo from 'svelte-seo';
	import { Header, PostList } from '$lib/components';
	import { rootUrl, seoData } from '$lib/seoConstants';

	export let path: string;
	export let posts: PostData[];
	export let tag: string;

	const title = `#${tag}`;
	const baseUrl = `https://${rootUrl}`;
	const fullPageUrl = `${baseUrl}${path}`;

	$: seo = seoData({
		title,
		description: `Articles on ${title}`,
		canonical: fullPageUrl,
		type: 'article'
	});
</script>

<SvelteSeo {...seo} />

<Header {title} />
<PostList {posts} />
