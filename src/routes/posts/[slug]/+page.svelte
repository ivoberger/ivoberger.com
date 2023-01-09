<script lang="ts">
	import type { PageData } from './$types';

	import SvelteSeo from 'svelte-seo';
	import { Body } from '$lib/components';
	import '../_posts.css';
	import { defaultAuthor, rootUrl, seoData } from '$lib/seoConstants';

	export let data: PageData;
	let fullImgPath: string;

	$: ({
		content,
		meta: {
			readTime,
			updatedDate,
			publishedDate,
			publishedFormatted,
			cover,
			title,
			description,
			tags,
			author = defaultAuthor
		}
	} = data.post);

	const baseUrl = `https://${rootUrl}`;
	const fullPageUrl = `${baseUrl}${data.path}`;
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
	<link rel="canonical" href={fullPageUrl} />
</svelte:head>

<SvelteSeo
	{...seo}
	openGraph={{
		...seo.openGraph,
		images: fullImgPath ? [{ url: fullImgPath, alt: 'Article Cover' }] : undefined,
		article: {
			publishedTime: publishedDate,
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
			<h1 itemProp="name headline">{title}</h1>
			<time datetime={publishedDate} itemProp="datePublished">{publishedFormatted}</time>
			<time datetime={updatedDate} itemProp="dateModified" />
		</div>
		<meta itemProp="description abstract" content={description} />
		<meta itemProp="url" content={fullPageUrl} />
		{#if fullImgPath} <meta itemProp="image" content={fullImgPath} /> {/if}
		{#if !!tags?.length} <meta itemProp="keywords" content={tags.join(',')} /> {/if}
	</header>
	<Body
		itemProp="articleBody"
		class="prose mb-10 prose-a:text-lime-600 dark:prose-invert dark:prose-a:text-lime-500 xl:prose-lg"
	>
		{@html content}
	</Body>
</main>

<style>
	header {
		@apply relative h-96 overflow-hidden;
	}
	.cover-image {
		@apply absolute inset-0 scale-105 transform bg-cover bg-center bg-no-repeat blur-sm;
	}
	.cover-text {
		@apply absolute inset-x-0 bottom-0 z-10 mx-auto px-6 pb-14 text-center md:max-w-4xl;
	}
	.text-shadow-lg {
		text-shadow: 0 0px 15px rgba(0, 0, 0, 0.7);
	}
</style>
