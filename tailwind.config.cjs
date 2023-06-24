const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	darkMode: 'media',
	theme: {
		textShadow: {
			lg: '0 0px 10px rgba(0, 0, 0, 0.7)'
		},
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
					twitter: '#3d90c4',
					dev: '#0a0a0a',
					stackOverflow: '#f48024',
					github: '#24292e'
				}
			},
			transitionDuration: {
				DEFAULT: '300ms'
			}
		}
	},

	plugins: [require('@tailwindcss/typography')]
};

module.exports = config;
