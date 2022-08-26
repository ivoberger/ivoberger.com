<script lang="ts">
	export let title: string;
	export let subTitle: string | undefined = undefined;
	export let subTitleLink: string | undefined = undefined;
</script>

<header class="mb-10">
	<div
		class="mx-auto max-w-xl border-b border-lime-500 px-6 py-10 text-center md:max-w-3xl md:py-32 xl:max-w-4xl"
	>
		<h1 class="text-4xl sm:text-5xl md:text-6xl">{title}</h1>
		{#if subTitle}
			<h2>
				{#if subTitleLink}
					<a
						sveltekit:prefetch
						href={subTitleLink}
						class="border-b border-transparent text-gray-700 transition duration-500 hover:border-gray-400 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100"
					>
						{subTitle}
					</a>
				{:else}
					<span class="text-gray-800 dark:text-gray-200">{subTitle}</span>
				{/if}
			</h2>
		{/if}
	</div>
</header>
