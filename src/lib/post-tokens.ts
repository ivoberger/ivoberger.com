import type { HastPluginDefinition } from 'satteri';

const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

export function postTokens(): HastPluginDefinition {
	return {
		name: 'post-tokens',
		text(node, ctx) {
			if (!node.value.includes('{{age}}')) return;
			const published = (ctx.data.astro as { frontmatter?: Record<string, unknown> } | undefined)
				?.frontmatter?.publishDate;
			const date = published ? new Date(String(published)) : null;
			if (!date || Number.isNaN(date.getTime())) return;
			const years = Math.floor((Date.now() - date.getTime()) / YEAR_MS);
			const label = `${years} year${years === 1 ? '' : 's'}`;
			return { type: 'text', value: node.value.replaceAll('{{age}}', label) };
		}
	};
}
