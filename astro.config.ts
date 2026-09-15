import process from 'node:process';
import { defineConfig, fontProviders } from 'astro/config';
import { loadEnv } from 'vite';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';
import tailwindcss from '@tailwindcss/vite';
import { headingAnchors } from './src/lib/heading-anchors';
import { codeBlocks } from './src/lib/code-blocks';
import { postTokens } from './src/lib/post-tokens';

import svelte from '@astrojs/svelte';
import cloudflare from '@astrojs/cloudflare';
import { standardSite } from './src/integrations/standard-site';

const env = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), 'ATPROTO_');

export default defineConfig({
	site: 'https://ivoberger.com',
	trailingSlash: 'always',
	adapter: cloudflare(),
	integrations: [
		sitemap(),
		svelte(),
		standardSite({ handle: env.ATPROTO_HANDLE, password: env.ATPROTO_PASSWORD })
	],
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
		plugins: [tailwindcss()],
		optimizeDeps: { exclude: ['@astrojs/svelte'] },
		ssr: { optimizeDeps: { exclude: ['@astrojs/svelte'] } }
	}
});
