import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faCopy } from '@fortawesome/free-regular-svg-icons';
import {
	faDartLang,
	faHtml5,
	faJs,
	faTypescript
} from '@fortawesome/free-brands-svg-icons';
import { faCode, faTerminal } from '@fortawesome/free-solid-svg-icons';
import type { HastContent, HastParentContent, HastPluginDefinition } from 'satteri';
import { iconNode } from './hast-icons';

const LANG_ICONS: Record<string, IconDefinition> = {
	html: faHtml5,
	javascript: faJs,
	typescript: faTypescript,
	dart: faDartLang,
	bash: faTerminal,
	shell: faTerminal,
	sh: faTerminal,
	json: faCode
};

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
				const children: HastContent[] = [
					{
						type: 'element',
						tagName: 'button',
						properties: { type: 'button', className: ['copy-button'], 'aria-label': 'Copy code' },
						children: [
							iconNode(faCopy, ['copy-icon']),
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
						children: [iconNode(LANG_ICONS[lang] ?? faCode, ['lang-icon']), { type: 'text', value: lang }]
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
