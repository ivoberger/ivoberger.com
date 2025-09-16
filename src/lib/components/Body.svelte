<script lang="ts">
</script>

<article {...$$props}>
	<slot />
</article>

<style lang="postcss">
	@reference "tailwindcss";
	article {
		@apply mx-auto mb-16 max-w-2xl border-b border-lime-500 px-6 pt-8 pb-10 sm:px-12 sm:pt-16 md:max-w-3xl xl:max-w-4xl;
	}
</style>
