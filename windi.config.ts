import { defineConfig } from 'windicss/helpers';
import defaultTheme from 'windicss/defaultTheme';
import colors from 'windicss/colors';
import filters from 'windicss/plugin/filters';
import typography from 'windicss/plugin/typography';

export default defineConfig({
	extract: {
		include: ['./**/*.{svelte,html}'],
		exclude: ['node_modules', '.git']
	},
	darkMode: 'media',
	theme: {
		filter: {
			blur: 'blur(5px)'
		},
		textShadow: {
			lg: '0 0px 10px rgba(0, 0, 0, 0.7)'
		},
		transitionDuration: {
			DEFAULT: '300ms'
		},
		scale: { 105: '1.05' },
		fontFamily: {
			sans: ['CatamaranVariable', ...defaultTheme.fontFamily.sans],
			serif: ['"Source Serif Pro"', ...defaultTheme.fontFamily.serif]
		},
		extend: {
			colors: {
				gray: {
					...(colors.trueGray as Record<string | number, string>),
					'100-t': 'rgba(0,0,0, 0.1)',
					'200-t': 'rgba(0,0,0, 0.2)',
					'300-t': 'rgba(0,0,0, 0.3)',
					'400-t': 'rgba(0,0,0, 0.4)'
				},
				lime: colors.lime,
				brand: {
					linkedIn: '#0077b5',
					twitter: '#3d90c4',
					dev: '#0a0a0a',
					stackOverflow: '#f48024',
					github: '#24292e'
				}
			},
			typography: {
				DEFAULT: {
					css: {
						a: {
							color: colors.lime[600],
							textDecoration: 'none'
						},
						'a code': {
							color: colors.lime[600]
						},
						pre: { lineHeight: '1.5', textAlign: 'left' }
					}
				},
				light: {
					css: {
						color: colors.gray[300],
						'[class~="lead"]': {
							color: colors.trueGray[300]
						},
						strong: {
							color: colors.trueGray[200]
						},
						'ol > li::before': {
							color: colors.trueGray[400]
						},
						'ul > li::before': {
							backgroundColor: colors.trueGray[600]
						},
						hr: {
							borderColor: colors.trueGray[700]
						},
						blockquote: {
							color: colors.gray[200],
							borderLeftColor: colors.trueGray[700]
						},
						h1: {
							color: colors.trueGray[200]
						},
						h2: {
							color: colors.trueGray[200]
						},
						h3: {
							color: colors.trueGray[200]
						},
						h4: {
							color: colors.trueGray[200]
						},
						'figure figcaption': {
							color: colors.trueGray[400]
						},
						code: {
							color: colors.trueGray[200]
						},
						'pre code': {
							color: colors.trueGray[200]
						},
						pre: {
							color: colors.trueGray[700]
						},
						thead: {
							color: colors.trueGray[200],
							borderBottomColor: colors.trueGray[600]
						},
						'tbody tr': {
							borderBottomColor: colors.trueGray[700]
						}
					}
				}
			}
		},
		variants: {
			extend: { typography: ['dark'] }
		}
	},
	plugins: [typography, filters]
});
