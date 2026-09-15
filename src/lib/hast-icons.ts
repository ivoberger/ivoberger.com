import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { HastParentContent } from 'satteri';

export function iconNode(icon: IconDefinition, className: string[]): HastParentContent {
	const [width, height, , , path] = icon.icon;
	const paths = Array.isArray(path) ? path : [path];
	return {
		type: 'element',
		tagName: 'svg',
		properties: {
			className,
			xmlns: 'http://www.w3.org/2000/svg',
			viewBox: `0 0 ${width} ${height}`,
			fill: 'currentColor',
			'aria-hidden': 'true'
		},
		children: paths.map((d) => ({
			type: 'element',
			tagName: 'path',
			properties: { d },
			children: []
		}))
	} as HastParentContent;
}
