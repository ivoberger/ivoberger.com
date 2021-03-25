<script lang="ts">
	export let text: string;
	export let link: string = `/${text.toLowerCase()}`;
</script>

<li class="px-2">
	<a
		href={link}
		class="transition duration-500 border-b border-transparent hover:border-gray-400 active--exact active"
	>
		{text}
	</a>
</li>
