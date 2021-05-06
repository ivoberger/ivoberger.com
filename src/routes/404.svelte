<script>
	import Body from '$lib/components/Body.svelte';
</script>

<svelte:head>
	<title>Ooops, there's no page here</title>
	<script>
		plausible('404', { props: { path: document.location.pathname } });
	</script>
</svelte:head>

<Body class="prose dark:prose-light text-center">
	<h1>404</h1>
	<h1>This page doesn't exist</h1>
	<p class="text-xl">Here's a cool image of a black hole though.</p>
	<div class="image-blurred" />
	<p>PS.: It might have sucked in the page you're looking for...</p>
</Body>

<style>
	.image-blurred {
		background-image: url('/404.jpg');
		width: 100%;
		height: 25rem;
		@apply shadow-blend shadow-white dark:shadow-gray-900;
	}
</style>
