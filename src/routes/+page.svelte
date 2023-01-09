<script lang="ts">
	import type { PageData } from './$types';

	import SvelteSeo from 'svelte-seo';
	import { seoData } from '$lib/seoConstants';
	import { Header, PostList } from '$lib/components';

	export let data: PageData;
</script>

<SvelteSeo {...seoData({})} />

<Header title="Ivo Berger" subTitle="Stuff I Made" subTitleLink="/about/" />
<PostList posts={data.posts} />
