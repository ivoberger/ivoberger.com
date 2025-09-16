<script lang="ts">
	export let posts: Array<PostData>;
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
				<p class="text-sm flex gap-1 justify-center leading-normal sm:text-base">
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

<style lang="postcss">
	@reference "tailwindcss";
	.posts {
		@apply mx-auto mb-10 max-w-3xl px-6;
	}
	.article-summary {
		@apply border-b border-lime-300 py-4 text-center text-gray-700 dark:text-gray-300 sm:py-8;
	}
	.tag-link {
		@apply italic underline decoration-transparent transition duration-500 hover:decoration-gray-400;
	}
	.date {
		@apply mb-2 text-xs uppercase;
	}
	.readTime {
		@apply mb-2 ml-1 text-xs uppercase;
	}
	.description {
		@apply mt-6 px-2 text-lg leading-normal sm:px-4 md:px-10;
	}
</style>
