import type { RequestHandler } from '@sveltejs/kit';

import { getAllPosts } from '$lib/posts';
import { rootUrl } from '$lib/seoConstants';

const makeSitemap = (pages: string[], posts: PostSpec[]) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    <url><loc>https://${rootUrl}</loc></url>
    ${pages.map((page) => `<url><loc>https://${rootUrl}/${page}</loc></url>`).join('')}
    ${posts
			.map(
				({ meta: { slug, date } }) => `
    <url>
        <loc>https://${rootUrl}/posts/${slug}</loc>
        <lastmod>${date}</lastmod>
    </url>`
			)
			.join('')}
</urlset>`;

export const get: RequestHandler = async () => {
	const pages = ['about'];
	const posts = await getAllPosts();
	const sitemap = makeSitemap(pages, posts);
	// TODO: add tags to sitemap

	return {
		headers: { 'Content-Type': 'application/xml' },
		body: sitemap
	};
};
