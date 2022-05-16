<script lang="ts">
	import Icon from 'svelte-awesome';
	import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
</script>

<nav class="group fixed top-0 left-0 z-50 m-4">
	<a
		href="/"
		class="rounded-full border border-gray-100-t bg-black px-5 py-2 transition group-hover:border-gray-600"
	>
		<span class="font-sans text-gray-200 transition group-hover:text-gray-100 dark:text-gray-400">
			<Icon class="mr-1" data={faArrowLeft} />
			Home
		</span>
	</a>
</nav>
