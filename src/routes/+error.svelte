<script lang="ts">
	import { HomeButton, Body } from '$lib/components';
</script>

<svelte:head>
	<title>Ooops, there's no page here</title>
	<script lang="ts">
		plausible('404', { props: { path: document.location.pathname } });
	</script>
</svelte:head>

<HomeButton />
<Body class="prose text-center dark:prose-invert">
	<h1>404</h1>
	<h1>This page doesn't exist</h1>
	<p class="text-xl">Here's a cool image of a black hole though.</p>
	<div class="image-blurred" />
	<p>PS.: It might have sucked in the page you're looking for...</p>
</Body>

<style lang="postcss">
	.image-blurred {
		@apply h-96 w-full bg-[url('/404.jpg')] bg-cover bg-center bg-no-repeat shadow-[0_0_15px_10px_inset] shadow-white dark:shadow-neutral-900;
	}
</style>
