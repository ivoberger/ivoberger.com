<script lang="ts">
	import Icon from 'svelte-awesome';
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
</script>

<nav class="fixed top-0 left-0 m-4 group z-50">
	<a
		href="/"
		class="px-5 py-2 transition border rounded-full border-gray-100-t bg-black group-hover:border-gray-600"
	>
		<span class="font-sans transition text-gray-200 dark:text-gray-400 group-hover:text-gray-100">
			<Icon class="mr-1" data={faArrowLeft} />
			Home
		</span>
	</a>
</nav>
