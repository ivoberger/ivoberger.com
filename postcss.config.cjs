const postcssPresetEnv = require('postcss-preset-env');
const cssnano = require('cssnano');

const mode = process.env.NODE_ENV;
const dev = mode === 'development';
const tailwindcss = dev ? require('@tailwindcss/jit') : require('tailwindcss');

module.exports = {
	plugins: [
		tailwindcss,
		postcssPresetEnv({
			autoprefixer: {
				flexbox: 'no-2009'
			},
			stage: 3,
			features: {
				'custom-properties': false
			}
		}),
		!dev && cssnano
	]
};
