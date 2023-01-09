<script lang="ts">
	import type { PageData } from './$types';

	import SvelteSeo from 'svelte-seo';
	import { Header, HomeButton, PostList } from '$lib/components';
	import { rootUrl, seoData } from '$lib/seoConstants';

	export let data: PageData;

	const title = `#${data.tag}`;
	const baseUrl = `https://${rootUrl}`;
	const fullPageUrl = `${baseUrl}${data.path}`;

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
<PostList posts={data.posts} />
