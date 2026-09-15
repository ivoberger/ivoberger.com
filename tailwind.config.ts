import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography';

export default {
	content: ['./src/**/*.{astro,html,js,md,mdx,ts}'],
	darkMode: 'media',
	theme: {
		scale: { 105: '1.05' },
		extend: {
			fontFamily: {
				sans: ['Catamaran Variable', 'sans-serif'],
				serif: ['"Source Serif Pro"', 'serif']
			},
			colors: {
				gray: {
					'100-t': 'rgba(0,0,0, 0.1)',
					'200-t': 'rgba(0,0,0, 0.2)',
					'300-t': 'rgba(0,0,0, 0.3)',
					'400-t': 'rgba(0,0,0, 0.4)'
				},
				brand: {
					linkedIn: '#0077b5',
					bluesky: '#1185fe',
					github: '#24292e'
				}
			},
			transitionDuration: {
				DEFAULT: '300ms'
			}
		}
	},
	plugins: [typography]
} satisfies Config;
