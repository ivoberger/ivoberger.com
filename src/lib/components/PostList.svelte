<script>
	export let posts: PostData[];
</script>

<main class="posts">
	{#each posts as { meta: { published, title, description, slug, date, tags } }, index (slug)}
		<article class="article-summary">
			<header>
				<time class="date" datetime={date}>{published}</time>
				<a href={`/posts/${slug}`}>
					<h3 class="my-0">{title}</h3>
				</a>
			</header>
			<p class="text-sm leading-normal sm:text-base">
				{#each tags as tag (tag)}
					{#if tag !== tags[0]}
						{'- '}
					{/if}
					<a href={`/tag/${tag}`} class="tag-link">
						{tag}
					</a>
				{/each}
			</p>
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
	.tag-link {
		@apply capitalize italic transition duration-500 border-b border-transparent hover:border-gray-400;
	}
	.date {
		@apply mb-2 text-xs uppercase;
	}
	.description {
		@apply px-2 text-lg leading-normal sm:px-4 md:px-10 mt-6;
	}
</style>
