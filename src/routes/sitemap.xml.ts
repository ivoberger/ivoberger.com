import type { RequestHandler } from '@sveltejs/kit';

import { getAllPosts, getAllTags, getPostsByTag } from '$lib/posts';
import { rootUrl } from '$lib/seoConstants';

const makeSitemap = async (
	pages: string[],
	tags: string[],
	posts: PostSpec[]
) => `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
    <url>
		<loc>https://${rootUrl}</loc>
		<priority>0.6</priority>
		<changefreq>weekly</changefreq>
	</url>
    ${pages
			.map(
				(page) =>
					`<url>
						<loc>https://${rootUrl}/${page}/</loc>
						<priority>0.3</priority>
						<changefreq>monthly</changefreq>
					</url>`
			)
			.join('')}   
    ${posts
			.map(
				({ meta: { slug, updatedDate } }) => `
    <url>
        <loc>https://${rootUrl}/posts/${slug}/</loc>
		<priority>0.8</priority>
		<changefreq>monthly</changefreq>
        <lastmod>${updatedDate.split('T')[0]}</lastmod>
    </url>`
			)
			.join('')}
	${(
		await Promise.all(
			tags.map(
				async (tag) =>
					`<url>
					<loc>https://${rootUrl}/tag/${tag}/</loc>
					<priority>0.5</priority>
					<changefreq>monthly</changefreq>
					<lastmod>${(await getPostsByTag(tag))[0].meta.updatedDate.split('T')[0]}</lastmod>
				</url>`
			)
		)
	).join('')}
</urlset>`;

export const get: RequestHandler = async () => {
	const pages = ['about'];
	const posts = await getAllPosts();
	const tags = await getAllTags();
	const sitemap = await makeSitemap(pages, tags, posts);

	return {
		body: sitemap
	};
};
