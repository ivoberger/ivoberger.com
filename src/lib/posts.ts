import type { Processor } from 'unified';

import { Client } from '@notionhq/client';
import { unified } from 'unified';
import markdown from 'remark-parse';
import capitalize from 'remark-capitalize';
import squeezeParagraphs from 'remark-squeeze-paragraphs';
import remark2rehype from 'remark-rehype';
import { getHighlighter } from 'shiki';
import rehypeShiki from '@stefanprobst/rehype-shiki';
import slugs from 'rehype-slug';
import autolink from 'rehype-autolink-headings';
import rehypeMinify from 'rehype-preset-minify';
import html from 'rehype-stringify';
import { readingTime } from './readingTime';
import { format } from 'date-fns';

import { defaultAuthor } from './seoConstants';
import type { BlockObjectResponse, GetPageResponse, RichTextItemResponse } from 'src/types/notion';

const notion = new Client({
	auth: import.meta.env.VITE_NOTION_TOKEN
});
const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;

let posts: PostData[];
let tags: string[];
const postsBySlug: { [slug: string]: PostData } = {};
const postsByTag: { [tag: string]: PostData[] } = {};

export async function getPostsByTag(tag: string): Promise<PostSpec[]> {
	await getAllPosts();
	if (!postsByTag[tag]) {
		postsByTag[tag] = posts.filter((post) => post.meta.tags.includes(tag));
	}
	return postsByTag[tag];
}

export async function getPostBySlug(slug: string): Promise<PostData> {
	if (!postsBySlug[slug]) await getAllPosts();
	return postsBySlug[slug];
}

export async function getAllTags(): Promise<string[]> {
	if (tags) return tags;
	await getAllPosts();
	const tagsSet = new Set<string>();
	posts.forEach(({ meta: { tags } }) => tags.forEach(tagsSet.add, tagsSet));
	tags = [...tagsSet.values()];
	return tags;
}

export async function getAllPosts(): Promise<PostData[]> {
	if (posts) return posts;
	const pages = await notion.databases.query({
		database_id: databaseId,
		page_size: 500,
		filter: {
			property: 'Status',
			select: { equals: 'Published' }
		},
		sorts: [{ property: 'Publish Date', direction: 'descending' }]
	});
	await getProcessor();
	return (posts = await Promise.all(pages.results.map(fetchPostFromApi)));
}

async function fetchPostFromApi(page: GetPageResponse): Promise<PostData> {
	const properties = page.properties;
	const slug = properties.Slug.type === 'rich_text' && properties.Slug.rich_text[0].plain_text;
	const publishedDate =
		properties['Publish Date'].type === 'date' && properties['Publish Date'].date.start;

	const blocks = await notion.blocks.children.list({ block_id: page.id, page_size: 1000 });
	const markdown = blocksToMarkdown(blocks.results as BlockObjectResponse[]);

	const content = await new Promise<string>((resolve) =>
		processor.process(markdown, (_, file) => resolve(String(file)))
	);

	const meta: PostMetadata = {
		title: properties.Name.type === 'title' && properties.Name.title[0].plain_text,
		author: defaultAuthor,
		description:
			properties.Description.type === 'rich_text' && properties.Description.rich_text[0].plain_text,
		updatedDate:
			properties['Last Updated'].type === 'last_edited_time' &&
			properties['Last Updated'].last_edited_time,
		publishedDate: publishedDate,
		publishedFormatted: format(new Date(publishedDate), "do 'of' MMMM yyyy"),
		readTime: readingTime(markdown).text,
		tags:
			properties.Tags.type === 'multi_select' &&
			properties.Tags.multi_select.map(({ name }) => name).sort((a, b) => a.localeCompare(b)),
		slug
	};

	const post: PostData = { meta, content };
	postsBySlug[meta.slug] = post;

	return post;
}

let processor: Processor;
async function getProcessor(): Promise<Processor> {
	if (processor) return processor;
	const highlighter = await getHighlighter({ theme: 'dark-plus' });
	return (processor = unified()
		.use(markdown)
		.use(squeezeParagraphs)
		.use(capitalize)
		.use(remark2rehype)
		.use(rehypeShiki, { highlighter })
		.use(slugs)
		.use(autolink, { behavior: 'append' })
		.use(rehypeMinify)
		.use(html));
}

function blocksToMarkdown(blocks: BlockObjectResponse[]): string {
	let result = '';

	for (const block of blocks) {
		if (block.type === 'unsupported') continue;

		const richText = getTextFromBlock(block);
		const text = richTextToMarkdown(richText);
		switch (block.type) {
			case 'heading_1':
				result += `# ${text}`;
				break;
			case 'heading_2':
				result += `## ${text}`;
				break;
			case 'heading_3':
				result += `### ${text}`;
				break;
			case 'code':
				result += `\`\`\`${block.code.language}\n${text}\n\`\`\``;
				break;
			case 'numbered_list_item':
				result += `1. ${text}`;
				break;
			case 'bulleted_list_item':
				result += `- ${text}`;
				break;
			default:
				result += text;
				break;
		}
		result += '\n\n';
	}
	return result;
}

const getTextFromBlock = (block: BlockObjectResponse) => block[block.type].rich_text;
function richTextToMarkdown(richText: RichTextItemResponse[]): string {
	let result = '';

	for (const text of richText) {
		const annotations = text.annotations;
		let res = text.plain_text;
		if (annotations.code) res = `\`${res}\``;
		if (annotations.bold) res = `**${res}**`;
		if (annotations.italic) res = `*${res}*`;
		if (text.href) res = `[${res}](${text.href})`;

		result += res;
	}

	return result;
}
