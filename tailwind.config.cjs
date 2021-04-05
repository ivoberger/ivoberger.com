const { tailwindExtractor } = require('tailwindcss/lib/lib/purgeUnusedStyles');
const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

module.exports = {
	purge: {
		content: ['./src/**/*.{html,js,svelte,ts}'],
		options: {
			defaultExtractor: (content) => [
				// If this stops working, please open an issue at https://github.com/svelte-add/tailwindcss/issues rather than bothering Tailwind Labs about it
				...tailwindExtractor(content),
				// Match Svelte class: directives (https://github.com/tailwindlabs/tailwindcss/discussions/1731)
				...[...content.matchAll(/(?:class:)*([\w\d-/:%.]+)/gm)].map(([_, group]) => group)
			],
			keyframes: true
		}
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
			...defaultTheme.transitionDuration,
			DEFAULT: '300ms'
		},
		scale: { 105: '1.05' },
		extend: {
			colors: {
				gray: {
					...colors.trueGray,
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
			fontFamily: {
				sans: ['Catamaran', ...defaultTheme.fontFamily.sans],
				serif: ['Source Serif Pro', ...defaultTheme.fontFamily.serif]
			},
			typography: (theme) => ({
				DEFAULT: { css: { a: { textDecoration: 'none' } } },
				light: {
					css: {
						color: theme('colors.gray.300', colors.gray[300]),
						'[class~="lead"]': {
							color: theme('colors.gray.300', colors.gray[300])
						},
						a: {
							color: theme('colors.lime', colors.lime)
						},
						strong: {
							color: theme('colors.gray.200', colors.gray[200])
						},
						'ol > li::before': {
							color: theme('colors.gray.400', colors.gray[400])
						},
						'ul > li::before': {
							backgroundColor: theme('colors.gray.600', colors.gray[600])
						},
						hr: {
							borderColor: theme('colors.gray.700', colors.gray[700])
						},
						blockquote: {
							color: theme('colors.gray.200', colors.gray[200]),
							borderLeftColor: theme('colors.gray.700', colors.gray[700])
						},
						h1: {
							color: theme('colors.gray.200', colors.gray[200])
						},
						h2: {
							color: theme('colors.gray.200', colors.gray[200])
						},
						h3: {
							color: theme('colors.gray.200', colors.gray[200])
						},
						h4: {
							color: theme('colors.gray.200', colors.gray[200])
						},
						'figure figcaption': {
							color: theme('colors.gray.400', colors.gray[400])
						},
						code: {
							color: theme('colors.gray.200', colors.gray[200])
						},
						'pre code': {
							color: theme('colors.gray.200', colors.gray[200])
						},
						'a code': {
							color: theme('colors.lime', colors.lime)
						},
						pre: {
							color: theme('colors.gray.700', colors.gray[700])
						},
						thead: {
							color: theme('colors.gray.200', colors.gray[200]),
							borderBottomColor: theme('colors.gray.600', colors.gray[600])
						},
						'tbody tr': {
							borderBottomColor: theme('colors.gray.700', colors.gray[700])
						}
					}
				}
			})
		},
		variants: {
			extend: { typography: ['dark'] }
		}
	},
	plugins: [
		require('@tailwindcss/typography'),
		require('tailwindcss-filters'),
		require('tailwindcss-typography')
	]
};
