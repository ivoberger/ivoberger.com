<script lang="ts">
	type PortfolioEntryData = {
		title: string;
		url?: string;
		repoUrl?: string;
		imageUrl?: string;
		description: string;
	};

	const portfolioEntries: Array<PortfolioEntryData> = [
		{
			title: 'This Website',
			url: 'https://ivoberger.com',
			repoUrl: 'https://github.com/ivoberger/ivoberger.com',
			description: `The page you're looking at is made with SvelteKit, TypeScript and TailwindCSS and deployed on Vercel.
      It's entirely static through the SvelteKit's SSG feature. Posts are written in Markdown and converted to nice-looking HTML at build-time.
      It was originally built with Gridsome, then moved to NextJS and now to SvelteKit.
      It's an all-in-one blog, portfolio and pet project to try out new shiny things.`
		},
		{
			title: 'timberSentry',
			url: 'https://jitpack.io/#com.ivoberger/timberSentry',
			repoUrl: 'https://github.com/ivoberger/timberSentry',
			description: `During my time developing native Android apps I found myself building the same setup with Timber and Sentry
    to implement seamless error reporting with contextual logging every time so I built a library to do it.
    It's written in pure Kotlin and simply exposes a SentryTree that can be used with Timber and will automagically
    log everything to Sentry. It is distributed using JitPack.`
		},
		{
			title: 'StatikGMapsAPI',
			url: 'https://jitpack.io/#com.ivoberger/StatikGMapsAPI',
			repoUrl: 'https://github.com/ivoberger/StatikGMapsAPI',
			description: `The Metsään Tie app needed to display a lot of static maps in a list and simply using the lite mode of
    the native GMaps View didn't work. The solution was to use the Google Maps Static API, which simply returns picture of a map
    base on the URL parameters given.
    Writing these requests by hand is error-prone so I wrote a library that let's you build API requests in a type-safe manner and
    runs some validation before returning a URL so you can be (reasonably) sure to get a valid request.
    The URL can then simply be plugged into an image loading library like Glide or Coil.
    Every commit to master triggers a build & test pipeline on GitHub Actions.`
		},
		{
			title: 'Metsään Tie',
			url: 'https://roadsml.com',
			description: `Metsään Tie is an app developed by RoadsML for the Finnish Forest Center to track road conditions using
    phone sensors and user feedback. It allows the user to record their driving through GPS for location and the accelerometer
    for road condition. It can then be uploaded to a backend and viewed on a openly accessible map by the Finnish Forest Center.
    Note: App is no longer published as the project has been discontinued.`
		}
	];

	import SvelteSeo from 'svelte-seo';
	import Icon from 'svelte-awesome';
	import { faGithub } from '@fortawesome/free-brands-svg-icons';
	import { faLink } from '@fortawesome/free-solid-svg-icons';
	import { Header, HomeButton, Body } from '$lib/components';
	import { seoData } from '$lib/seoConstants';
</script>

<SvelteSeo {...seoData({ title: 'About Me', description: 'My Portfolio' })} />

<Header title="Stuff I Made" subTitle="You could call it a Portfolio" />

<HomeButton />
<Body>
	{#each portfolioEntries as { title, description, url, repoUrl }}
		<article class="mb-10">
			<header class="title">
				<h2 class="mr-1">{title}</h2>
				{#if repoUrl}
					<a href={repoUrl} target="_blank" rel="noreferrer" class="icon-link">
						<span class="visible-hidden">Repository for {title}</span>
						<Icon data={faGithub} />
					</a>
				{/if}
				{#if url}
					<a href={url} target="_blank" rel="noreferrer" class="icon-link">
						<span class="visible-hidden">Link to {title}</span>
						<Icon data={faLink} />
					</a>
				{/if}
			</header>
			<p class="prose max-w-none dark:prose-invert">{description}</p>
		</article>
	{/each}
</Body>

<style lang="postcss">
	@reference "tailwindcss";
	.title {
		@apply flex flex-row;
	}
	.icon-link {
		@apply p-2 pt-1 text-gray-700 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100;
	}
</style>
