import type { RequestHandler } from '@sveltejs/kit';

import { getAllPosts } from '$lib/posts';
import { defaultDesc, defaultTitle, rootUrl } from '$lib/seoConstants';

const makeFeed = (posts: PostSpec[]) => `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" >
<channel>
	<title>${defaultTitle}</title>
  	<link>https://${rootUrl}</link>
	<atom:link href="https://${rootUrl}/feed.xml" rel="self" type="application/rss+xml" />
	<description>${defaultDesc}</description>
	<language>en-us</language>
    ${posts
			.map(
				({ data: { slug, date, title, description, tags } }) => `
    <item>
		<title>${title}</title>
		<description>${description}</description>
		${tags.map((tag) => `<category>${tag}</category>`).join('\n')}
        <link>https://${rootUrl}/posts/${slug}</link>
        <guid>https://${rootUrl}/posts/${slug}</guid>
        <pubDate>${new Date(date).toUTCString()}</pubDate>
    </item>`
			)
			.join('')}
</channel>
</rss>`;

export const get: RequestHandler = () => {
	const posts = getAllPosts();
	const feed = makeFeed(posts);

	return {
		headers: { 'Content-Type': 'application/rss+xml' },
		body: feed
	};
};
