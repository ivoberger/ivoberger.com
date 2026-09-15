import { defineConfig, fontProviders } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

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
		rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]]
	},
	vite: {
		plugins: [tailwindcss()]
	}
});
