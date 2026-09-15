import GithubSlugger from 'github-slugger';
import type { HastContent, HastPluginDefinition } from 'satteri';

export function headingAnchors(): HastPluginDefinition {
	const slugger = new GithubSlugger();
	return {
		name: 'heading-anchors',
		element: {
			filter: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
			visit(node, ctx) {
				const text = ctx.textContent(node);
				const existing = node.properties?.id;
				const id = typeof existing === 'string' ? existing : slugger.slug(text);
				ctx.setProperty(node, 'id', id);
				const anchor: HastContent = {
					type: 'element',
					tagName: 'a',
					properties: { className: ['anchor'], href: `#${id}`, 'aria-label': `Link to ${text}` },
					children: [
						{
							type: 'element',
							tagName: 'span',
							properties: { className: ['icon', 'icon-link'] },
							children: []
						}
					]
				};
				ctx.appendChild(node, anchor);
			}
		}
	};
}
