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
	<h3>Here's a cool image of a black hole though.</h3>
	<div class="image-blurred-edge" />
	<h4>PS.: It might have sucked in the page you're looking for...</h4>
</Body>

<style>
	.image-blurred-edge {
		background-image: url('404.jpg');
		width: 100%;
		height: 200px;
		/* you need to match the shadow color to your background or image border for the desired effect*/
		@apply shadow-blend shadow-white dark:shadow-gray-900;
	}
</style>
