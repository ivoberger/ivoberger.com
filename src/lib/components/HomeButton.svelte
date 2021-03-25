<script>
	import Icon from 'svelte-awesome';
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
</script>

<nav class="fixed top-0 left-0 m-4 group">
	<a
		href="/"
		class="px-5 py-2 transition border rounded-full bg-gray-100-t border-gray-100-t group-hover:border-gray-800 dark:bg-black dark:group-hover:border-gray-600"
	>
		<span
			class="font-sans text-gray-700 transition group-hover:text-black dark:text-gray-400 dark:group-hover:text-gray-100"
		>
			<Icon class="mr-1" data={faArrowLeft} />
			Home
		</span>
	</a>
</nav>
