<script>
	export let classes: string = '';
</script>

<main
	class={`max-w-2xl px-6 pt-8 sm:pt-16 pb-10 mx-auto mb-16 md:max-w-3xl xl:max-w-4xl sm:px-12 ${classes}`}
>
	<slot />
</main>
