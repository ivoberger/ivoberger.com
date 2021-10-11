<script lang="ts">
	import Icon from 'svelte-awesome';
	import { faTag } from '@fortawesome/free-solid-svg-icons';
	export let tags: string[];
</script>

<div class="flex flex-wrap pb-10 sm:pb-16">
	{#each tags as tag}
		<a
			href={`/tag/${tag}/`}
			class="inline-block px-4 py-2 mb-2 mr-4 font-sans text-xs font-bold text-teal-400 transition  border border-teal-400 rounded-full hover:text-white hover:bg-teal-400 sm:text-sm"
		>
			<Icon class="mr-1 text-gray-700 fa-sm" data={faTag} />
			{tag}
		</a>
	{/each}
</div>
