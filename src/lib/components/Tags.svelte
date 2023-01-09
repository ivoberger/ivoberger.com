<script lang="ts">
	import Icon from 'svelte-awesome';
	import { faTag } from '@fortawesome/free-solid-svg-icons';
	export let tags: string[];
</script>

<div class="flex flex-wrap pb-10 sm:pb-16">
	{#each tags as tag}
		<a
			sveltekit:prefetch
			href={`/tag/${tag}/`}
			class="mb-2 mr-4 inline-block rounded-full border border-teal-400 px-4 py-2 font-sans text-xs  font-bold text-teal-400 transition hover:bg-teal-400 hover:text-white sm:text-sm"
		>
			<Icon class="fa-sm mr-1 text-gray-700" data={faTag} />
			{tag}
		</a>
	{/each}
</div>
