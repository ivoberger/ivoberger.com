<script>
	import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
	import Icon from 'svelte-awesome';
	export let link: string;
	export let title: string;
	let classes: string;
	export let icon: IconDefinition;

	export { classes as class };
</script>

<a href={link} target="_blank" rel="noreferrer" class={`transition pr-4 ${classes}`}>
	<span class="visible-hidden">{title}</span>
	<Icon data={icon} label={title} />
</a>
