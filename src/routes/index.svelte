<script context="module">
	import type { Load } from '@sveltejs/kit';

	export const load: Load = async ({ fetch }) => {
		const res = await fetch('/index.json');

		return {
			props: {
				posts: await res.json()
			}
		};
	};
</script>

<script>
	import { Header } from '$lib/components';
	export let posts: PostMetadata[];
</script>

<main class="container mx-auto">
	<Header title="Ivo Berger" subTitle="Stuff I Made" subTitleLink="about" />
	<section class="max-w-3xl px-6 mx-auto mb-10">
		{#each posts as { published, title, description, slug }}
			<div
				class="py-4 text-center border-b border-lime-300 group sm:py-10 text-gray-700 dark:text-gray-300"
			>
				<header class="mb-8 ">
					<time class="mb-2 text-xs uppercase">{published}</time>

					<a href={`/posts/${slug}`}>
						<h3 class="my-0 mb-1">{title}</h3>
					</a>
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
				</header>
				<p class="px-2 text-lg leading-normal sm:px-4 md:px-10">
					{description}
				</p>
			</div>
		{/each}
	</section>
</main>
