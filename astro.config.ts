import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

export default defineConfig({
	site: 'https://ivoberger.com',
	trailingSlash: 'always',
	integrations: [sitemap()],
	markdown: {
		shikiConfig: { theme: 'dark-plus' },
		rehypePlugins: [rehypeSlug, [rehypeAutolinkHeadings, { behavior: 'append' }]]
	},
	vite: {
		plugins: [tailwindcss()]
	}
});
