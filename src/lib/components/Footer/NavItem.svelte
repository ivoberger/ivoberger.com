<script lang="ts">
	export let text: string;
	export let link: string = `/${text.toLowerCase()}`;
</script>

<li class="px-2">
	<a
		href={link}
		class="active--exact active underline decoration-transparent transition duration-500 hover:decoration-gray-400"
	>
		{text}
	</a>
</li>
