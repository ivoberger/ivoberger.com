<script context="module">
	import type { Load } from '@sveltejs/kit';
	export const load: Load = async ({ page: { path }, fetch }) => ({
		props: {
			post: await (await fetch(`${path}.json`)).json(),
			path
		}
	});
</script>

<script>
	import SvelteSeo from 'svelte-seo';
	import { Body, Tags } from '$lib/components';
	import './_posts.css';
	import { defaultAuthor, rootUrl, seoData } from '$lib/seoConstants';

	export let post: PostData;
	export let path: string;
	let fullImgPath: string;
	let fullPageUrl: string;

	$: ({
		content,
		meta: { readTime, published, cover, title, description, tags, author = defaultAuthor, date }
	} = post);

	const baseUrl = `https://${rootUrl}`;
	fullPageUrl = `${baseUrl}${path}`;
	if (cover) fullImgPath = `${cover?.includes('http') ? '' : baseUrl}${cover}`;

	$: seo = seoData({
		title,
		description,
		tags,
		canonical: fullPageUrl,
		author,
		type: 'article',
		image: fullImgPath
	});
</script>

<svelte:head>
	{#if fullImgPath}
		<meta name="image" content={fullImgPath} />
	{/if}
	<link rel="canonical" href={fullPageUrl} />
</svelte:head>

<SvelteSeo
	{...seo}
	openGraph={{
		...seo.openGraph,
		images: fullImgPath ? [{ url: fullImgPath, alt: 'Article Cover' }] : undefined,
		article: {
			publishedTime: date,
			authors: [author],
			section: tags?.[0],
			tags
		}
	}}
/>

<main itemScope itemType="https://schema.org/TechArticle">
	<header>
		{#if cover}
			<div class="cover-image" style="background-image: url({cover});" />
		{/if}
		<div class={`cover-text ${cover ? 'text-white text-shadow-lg' : 'text-black dark:text-white'}`}>
			<p class="text-sm uppercase">{readTime}</p>
			<h1 itemProp="headline">{title}</h1>
			<time datetime={date} itemProp="datePublished">{published}</time>
		</div>
		<meta itemProp="name" content={title} />
		<meta itemProp="description" content={description} />
		{#if fullImgPath} <meta itemProp="image" content={fullImgPath} /> {/if}
		{#if !!tags?.length} <meta itemProp="keywords" content={tags.join(',')} /> {/if}
	</header>
	<Body itemProp="articleBody" class="mb-10 prose dark:prose-light xl:prose-lg">
		{@html content}

		<footer>
			<Tags {tags} />
		</footer>
	</Body>
</main>

<style>
	header {
		@apply relative overflow-hidden h-96;
	}
	.cover-image {
		@apply absolute inset-0 transform scale-105 filter-blur bg-center bg-cover bg-no-repeat;
	}
	.cover-text {
		@apply absolute inset-x-0 bottom-0 z-10 px-6 pb-14 mx-auto text-center md:max-w-4xl;
	}
	.text-shadow-lg {
		text-shadow: 0 0px 15px rgba(0, 0, 0, 0.7);
	}
</style>
