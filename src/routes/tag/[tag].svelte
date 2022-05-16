<script lang="ts">
	import SvelteSeo from 'svelte-seo';
	import { Header, HomeButton, PostList } from '$lib/components';
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

<HomeButton />
<Header {title} />
<PostList {posts} />
