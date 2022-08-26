import type { RequestHandler } from './$types';

import { create } from 'xmlbuilder2';
import { getAllPosts, getAllTags, getPostsByTag } from '$lib/posts';
import { rootUrl } from '$lib/seoConstants';

const addUrl = (
	builder: ReturnType<typeof create>,
	url: string,
	changefreq?: 'weekly' | 'monthly',
	priority?: number,
	lastmod?: string
) => {
	const urlEle = builder.ele('url');
	urlEle.ele('loc').txt(url);
	if (changefreq) urlEle.ele('changefreq').txt(changefreq);
	if (lastmod) urlEle.ele('lastmod').txt(lastmod);
	if (priority) urlEle.ele('priority').txt(`${priority}`);
};

const buildSitemap = async (): Promise<string> => {
	const pages = ['about'];
	const posts = await getAllPosts();
	const tags = await getAllTags();

	const sitemap = create({ version: '1.0' }).ele('urlset', {
		xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9'
	});
	addUrl(sitemap, rootUrl, 'weekly', 0.6);
	for (const page of pages) {
		addUrl(sitemap, `https://${rootUrl}/${page}/`, 'monthly', 0.3);
	}
	for (const post of posts) {
		const {
			meta: { slug, updatedDate }
		} = post;
		addUrl(sitemap, `https://${rootUrl}/posts/${slug}/`, 'monthly', 0.8, updatedDate.split('T')[0]);
	}
	for (const tag of tags) {
		addUrl(
			sitemap,
			`https://${rootUrl}/tag/${tag}/`,
			'monthly',
			0.5,
			(await getPostsByTag(tag))[0].meta.updatedDate.split('T')[0]
		);
	}
	return sitemap.end({ prettyPrint: true });
};

export const GET: RequestHandler = async () => new Response(await buildSitemap());
