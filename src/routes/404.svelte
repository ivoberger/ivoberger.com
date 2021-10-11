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
<Body class="prose dark:prose-light text-center">
	<h1>404</h1>
	<h1>This page doesn't exist</h1>
	<p class="text-xl">Here's a cool image of a black hole though.</p>
	<div class="image-blurred" />
	<p>PS.: It might have sucked in the page you're looking for...</p>
</Body>

<style lang="postcss">
	.image-blurred {
		background-image: url('/404.jpg');
		width: 100%;
		height: 25rem;
		@apply bg-center bg-cover bg-no-repeat;
		box-shadow: 0 0 15px 10px white inset;

		@media (prefers-color-scheme: dark) {
			box-shadow: 0 0 15px 10px #171717 inset;
		}
	}
</style>
