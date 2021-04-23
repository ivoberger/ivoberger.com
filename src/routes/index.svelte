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
	import { Header } from '$lib/components';
	export let posts: PostMetadata[];
</script>

<SvelteSeo {...seoData({})} />

<Header title="Ivo Berger" subTitle="Stuff I Made" subTitleLink="/about" />
<main class="posts">
	{#each posts as { published, title, description, slug, date }}
		<article class="article-summary">
			<header>
				<time class="date" datetime={date}>{published}</time>
				<a href={`/posts/${slug}`}>
					<h3 class="my-0">{title}</h3>
				</a>
			</header>
			<!-- TODO: re-enable once tag pages are implemented
       <p class="text-sm leading-normal sm:text-base">
        {tags.length && (
          <>
            in{" "}
              <a href={`/tag/${tags[0]}`} class="capitalize transition duration-500 border-b border-transparent hover:border-gray-400">
                {tags[0]}
              </a>
          </>
        )}
      </p>  -->
			<p class="description">
				{description}
			</p>
		</article>
	{/each}
</main>

<style>
	.posts {
		@apply max-w-3xl mx-auto px-6 mb-10;
	}
	.article-summary {
		@apply py-4 text-center border-b border-lime-300 sm:py-8 text-gray-700 dark:text-gray-300;
	}
	.date {
		@apply mb-2 text-xs uppercase;
	}
	.description {
		@apply px-2 text-lg leading-normal sm:px-4 md:px-10 mt-6;
	}
</style>
