import type { RequestHandler } from './$types';

import { create } from 'xmlbuilder2';
import { getAllPosts, getPostBySlug } from '$lib/posts';
import { defaultDesc, defaultTitle, rootUrl } from '$lib/seoConstants';

export const GET: RequestHandler = async () => {
	const posts = await getAllPosts();

	const feed = create({ version: '1.0' }).ele('rss', {
		version: '2.0',
		'xmlns:atom': 'http://www.w3.org/2005/Atom'
	});
	const channel = feed.ele('channel');
	channel.ele('title').txt(defaultTitle);
	channel.ele('link').txt(`https://${rootUrl}`);
	channel
		.ele('atom:link')
		.att('href', `https://${rootUrl}/feed.xml`)
		.att('ref', 'self')
		.att('type', 'application/rss+xml');
	channel.ele('description').txt(defaultDesc);
	channel.ele('language').txt('en-us');
	channel.ele('lastBuildDate').txt(new Date(posts[0].meta.publishedDate).toUTCString());
	for (const post of posts) {
		const {
			meta: { slug, publishedDate, title, description, tags }
		} = post;
		const item = channel.ele('item');
		item.ele('title').txt(title);
		item.ele('description').txt(description);
		item.ele('content').dat((await getPostBySlug(slug)).content);
		for (const tag of tags) {
			item.ele('category').txt(tag);
		}
		item.ele('link').txt(`https://${rootUrl}/posts/${slug}/`);
		item.ele('guid').txt(`https://${rootUrl}/posts/${slug}/`);
		item.ele('pubDate').txt(new Date(publishedDate).toUTCString());
	}

	const xml = feed.end({ prettyPrint: true });

	return new Response(xml);
};
