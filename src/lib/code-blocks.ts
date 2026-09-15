import type { HastContent, HastParentContent, HastPluginDefinition } from 'satteri';

export function codeBlocks(): HastPluginDefinition {
	return {
		name: 'code-blocks',
		element: {
			filter: ['pre'],
			visit(node, ctx) {
				const props = node.properties ?? {};
				if (typeof props.class !== 'string' || !props.class.split(/\s+/).includes('astro-code'))
					return;

				const lang = String(props.dataLanguage ?? '');
				const copyIcon: HastContent = {
					type: 'element',
					tagName: 'svg',
					properties: {
						className: ['copy-icon'],
						xmlns: 'http://www.w3.org/2000/svg',
						viewBox: '0 0 24 24',
						fill: 'none',
						stroke: 'currentColor',
						'stroke-width': '2',
						'stroke-linecap': 'round',
						'stroke-linejoin': 'round',
						'aria-hidden': 'true'
					},
					children: [
						{
							type: 'element',
							tagName: 'rect',
							properties: { width: '13', height: '13', x: '9', y: '9', rx: '2', ry: '2' },
							children: []
						},
						{
							type: 'element',
							tagName: 'path',
							properties: { d: 'M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1' },
							children: []
						}
					]
				};
				const children: HastContent[] = [
					{
						type: 'element',
						tagName: 'button',
						properties: { type: 'button', className: ['copy-button'], 'aria-label': 'Copy code' },
						children: [
							copyIcon,
							{
								type: 'element',
								tagName: 'span',
								properties: { className: ['copy-label'] },
								children: [{ type: 'text', value: 'Copy' }]
							}
						]
					}
				];
				if (lang) {
					children.unshift({
						type: 'element',
						tagName: 'span',
						properties: { className: ['code-lang'], 'aria-hidden': 'true' },
						children: [{ type: 'text', value: lang }]
					});
				}
				ctx.wrapNode(node, {
					type: 'element',
					tagName: 'div',
					properties: { className: ['code-block'] },
					children
				} as HastParentContent);
			}
		}
	};
}
