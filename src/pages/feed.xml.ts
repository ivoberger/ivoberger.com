import rss from '@astrojs/rss';
import MarkdownIt from 'markdown-it';
import type { APIContext } from 'astro';
import { getAllPosts, toSummary } from '../lib/posts';
import { defaultTitle, defaultDesc, siteUrl } from '../consts';

const parser = new MarkdownIt();

export async function GET(context: APIContext) {
	const posts = await getAllPosts();
	return rss({
		title: defaultTitle,
		description: defaultDesc,
		site: context.site ?? siteUrl,
		trailingSlash: true,
		items: posts.map((post) => {
			const meta = toSummary(post);
			return {
				title: meta.title,
				description: meta.description,
				link: `/posts/${meta.slug}/`,
				pubDate: post.data.publishDate,
				categories: meta.tags,
				content: parser.render(post.body ?? '')
			};
		})
	});
}
