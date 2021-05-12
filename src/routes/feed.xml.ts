import type { RequestHandler } from '@sveltejs/kit';

import { getAllPosts, getPostBySlug } from '$lib/posts';
import { defaultDesc, defaultTitle, rootUrl } from '$lib/seoConstants';

const makeFeed = async (posts: PostSpec[]) => {
	const postsData: string = (
		await Promise.all(
			posts.map(
				async ({ meta: { slug, date, title, description, tags } }) => `
<item>
<title>${title}</title>
<description>${description}</description>
<content><![CDATA[${(await getPostBySlug(slug)).content}]]></content>
${tags.map((tag) => `<category>${tag}</category>`).join('\n')}
<link>https://${rootUrl}/posts/${slug}</link>
<guid>https://${rootUrl}/posts/${slug}</guid>
<pubDate>${new Date(date).toUTCString()}</pubDate>		
</item>`
			)
		)
	).join('');

	return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" >
<channel>
	<title>${defaultTitle}</title>
  	<link>https://${rootUrl}</link>
	<atom:link href="https://${rootUrl}/feed.xml" rel="self" type="application/rss+xml" />
	<description>${defaultDesc}</description>
	<language>en-us</language>
    ${postsData}
</channel>
</rss>`;
};

export const get: RequestHandler = async () => {
	const posts = await getAllPosts();
	const feed = await makeFeed(posts);

	return {
		headers: { 'Content-Type': 'application/rss+xml' },
		body: feed
	};
};
