<script lang="ts">
	export let posts: PostData[];
</script>

<main class="posts">
	{#each posts as { meta: { publishedFormatted, publishedDate, title, description, slug, tags, readTime } } (slug)}
		<article class="article-summary">
			<header>
				<time class="date" datetime={publishedDate}>{publishedFormatted}</time>,
				<span class="readTime"> {readTime} </span>
				<a href={`/posts/${slug}/`}>
					<h3 class="my-0">{title}</h3>
				</a>
				<p class="text-sm leading-normal sm:text-base">
					{#each tags as tag (tag)}
						<a href={`/tag/${tag}/`} class="tag-link">
							#{tag}
						</a>
					{/each}
				</p>
			</header>
			<p class="description">
				{description}
			</p>
		</article>
	{/each}
</main>

<style style="postcss">
	.posts {
		@apply max-w-3xl mx-auto px-6 mb-10;
	}
	.article-summary {
		@apply py-4 text-center border-b border-lime-300 sm:py-8 text-gray-700 dark:text-gray-300;
	}
	.tag-link {
		@apply italic transition duration-500 underline decoration-transparent hover:decoration-gray-400;
	}
	.date {
		@apply mb-2 text-xs uppercase;
	}
	.readTime {
		@apply mb-2 text-xs uppercase ml-1;
	}
	.description {
		@apply px-2 text-lg leading-normal sm:px-4 md:px-10 mt-6;
	}
</style>
