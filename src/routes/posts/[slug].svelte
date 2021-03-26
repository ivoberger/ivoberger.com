<script context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ page: { path }, fetch }) => {
		const res = await fetch(`${path}.json`);

		return {
			props: {
				post: await res.json(),
				path
			}
		};
	};
</script>

<script>
	import { onMount } from 'svelte';
	import SvelteSeo from 'svelte-seo';
	import { Body, HomeButton } from '$lib/components';
	import { defaultAuthor, seoData } from '$lib/seoConstants';

	export let post: PostData;
	export let path: string;
	let fullImgPath: string;
	let fullPageUrl: string;

	$: ({
		content,
		meta: { readTime, published, cover, title, description, tags, author = defaultAuthor, date }
	} = post);

	onMount(() => {
		const host = window.location.host;
		const protocol = window.location.protocol;
		const baseUrl = `${protocol}//${host}`;
		fullPageUrl = `${baseUrl}${path}`;
		fullImgPath = `${cover?.includes('http') ? '' : baseUrl}${cover}`;
	});
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
	<meta name="image" content={fullImgPath} />
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

<div itemScope itemType="https://schema.org/TechArticle">
	<header>
		<div class="relative overflow-hidden text-center text-white max-h-cover min-h-cover">
			<div
				class="absolute inset-x-0 bottom-0 z-10 max-w-xl px-6 pb-16 mx-auto text-center md:max-w-3xl xl:max-w-4xl text-shadow-lg"
			>
				<p class="text-sm uppercase">{readTime}</p>
				<h1 itemProp="headline">{title}</h1>
				<p itemProp="datePublished">{published}</p>
			</div>

			<img
				class="filter-blur"
				src={cover}
				alt="Post cover"
				width={1600}
				height={900}
				itemProp="image"
			/>
		</div>
		<HomeButton />
		<meta itemProp="name" content={title} />
		<meta itemProp="description" content={description} />
		<meta itemProp="image" content={fullImgPath} />
		{#if !!tags?.length} <meta itemProp="keywords" content={tags.join(',')} /> {/if}
	</header>
	<Body classes="text-lg text-gray-700 dark:text-gray-200 border-b border-lime-500">
		<article class="mb-10" itemProp="articleBody">{@html content}</article>
		<!-- TODO: re-enable once tag pages are implemented
     <footer>
      <Tags tags={tags} />
    </footer> -->
	</Body>
</div>
