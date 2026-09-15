import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import { headingAnchors } from './src/lib/heading-anchors';
import { codeBlocks } from './src/lib/code-blocks';
import { postTokens } from './src/lib/post-tokens';

export default defineConfig({
	site: 'https://ivoberger.com',
	trailingSlash: 'always',
	integrations: [sitemap()],
	fonts: [
		{
			provider: fontProviders.fontsource(),
			name: 'Catamaran',
			cssVariable: '--font-catamaran',
			weights: [400, 600, 700],
			styles: ['normal']
		},
		{
			provider: fontProviders.fontsource(),
			name: 'Source Serif Pro',
			cssVariable: '--font-source-serif-pro',
			weights: [400, 600],
			styles: ['normal', 'italic']
		}
	],
	markdown: {
		shikiConfig: { theme: 'dark-plus' },
		processor: satteri({ hastPlugins: [headingAnchors(), codeBlocks(), postTokens()] })
	},
	vite: {
		plugins: [tailwindcss()]
	}
});
