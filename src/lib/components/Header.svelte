<script lang="ts">
	export let title: string;
	export let subTitle: string | undefined;
	export let subTitleLink: string | undefined;
</script>

<header class="mb-10">
	<div
		class="max-w-xl px-6 py-10 mx-auto text-center border-b border-lime-500 md:max-w-3xl xl:max-w-4xl md:py-32"
	>
		<h1 class="text-4xl sm:text-5xl md:text-6xl">{title}</h1>
		{#if subTitle}
			<h2>
				{#if subTitleLink}
					<a
						href={subTitleLink}
						class="text-gray-700 dark:text-gray-300 transition duration-500 border-b border-transparent hover:text-gray-800 dark:hover:text-gray-100 hover:border-gray-400"
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
