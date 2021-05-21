import type {
	Block,
	DatePropertyValue,
	Filter,
	LastEditedByPropertyValue,
	LastEditedTimePropertyValue,
	MultiSelectPropertyValue,
	Page,
	RichText,
	RichTextPropertyValue,
	TitlePropertyValue
} from '@notionhq/client/build/src/api-types';

import path from 'path';
import { readdirSync, readFileSync } from 'fs';

import { Client } from '@notionhq/client';
import unified from 'unified';
import markdown from 'remark-parse';
import capitalize from 'remark-capitalize';
import squeezeParagraphs from 'remark-squeeze-paragraphs';
import remark2rehype from 'remark-rehype';
import rehypeShiki from '@stefanprobst/rehype-shiki';
import slugs from 'rehype-slug';
import autolink from 'rehype-autolink-headings';
import rehypeMinify from 'rehype-preset-minify';
import html from 'rehype-stringify';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { compareDesc, format } from 'date-fns';

import { defaultAuthor } from './seoConstants';

const notion = new Client({
	auth: import.meta.env.VITE_NOTION_TOKEN
});
const databaseId = import.meta.env.VITE_NOTION_DATABASE_ID;
const postsDirectory = path.join(process.cwd(), 'data/posts');

const processor = unified()
	.use(markdown)
	.use(squeezeParagraphs)
	.use(capitalize)
	.use(remark2rehype)
	.use(rehypeShiki, { theme: 'dark-plus' })
	.use(slugs)
	.use(autolink, { behavior: 'append' })
	.use(rehypeMinify)
	.use(html);

let posts: PostData[];
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

export async function getAllPosts(): Promise<PostData[]> {
	if (posts) return posts;
	const pages = await notion.databases.query({
		database_id: databaseId,
		page_size: 500,
		filter: {
			property: 'Status',
			select: { equals: 'Published' }
		} as Filter,
		sorts: [{ property: 'Publish Date', direction: 'descending' }]
	});

	posts = await Promise.all(pages.results.map(fetchPostFromApi));
	return posts;

	if (!posts) {
		const specs = await Promise.all(readdirSync(postsDirectory).map(readPostSpecFromFile));
		posts = specs.sort(({ meta: { publishedDate: dateA } }, { meta: { publishedDate: dateB } }) =>
			compareDesc(new Date(dateA), new Date(dateB))
		);
	}
}

async function fetchPostFromApi(page: Page): Promise<PostData> {
	const properties = page.properties;

	const blocks = await notion.blocks.children.list({ block_id: page.id, page_size: 1000 });
	const markdown = blocksToMarkdown(blocks.results);
	const content = await new Promise<string>((resolve) =>
		processor.process(markdown, (_, file) => resolve(String(file)))
	);

	const publishedDate = (properties['Publish Date'] as DatePropertyValue).date.start;
	const meta: PostMetadata = {
		title: (properties.Name as TitlePropertyValue).title[0].plain_text,
		author: defaultAuthor,
		description: (properties.Description as RichTextPropertyValue).rich_text[0].plain_text,
		updatedDate: (properties['Last Updated'] as LastEditedTimePropertyValue).last_edited_time,
		publishedDate: publishedDate,
		publishedFormatted: format(new Date(publishedDate), "do 'of' MMMM, yyyy"),
		readTime: readingTime(markdown).text,
		tags: (((properties.Tags as MultiSelectPropertyValue).multi_select as unknown) as {
			name: string;
		}[]).map(({ name }) => name),
		slug: (properties.Slug as RichTextPropertyValue).rich_text[0].plain_text
	};

	const post: PostData = { meta, content };
	postsBySlug[meta.slug] = post;

	return post;
}

function blocksToMarkdown(blocks: Block[]): string {
	let result = '';
	let numListCounter = 1;

	for (const block of blocks) {
		if (block.type === 'unsupported') continue;
		if (block.type === 'numbered_list_item') numListCounter = 1;

		const text = richTextToMarkdown(getTextFromBlock(block));
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
			case 'numbered_list_item':
				result += `${numListCounter}. ${text}`;
				numListCounter++;
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

const getTextFromBlock = (block: Block) => (block as unknown)[block.type].text;
function richTextToMarkdown(richText: RichText[]): string {
	let result = '';

	for (const text of richText) {
		if (text.type !== 'text') result += text.plain_text;
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

async function readPostSpecFromFile(filename: string): Promise<PostData> {
	const filePath = path.join(postsDirectory, filename);
	const fileContents = readFileSync(filePath, 'utf8');

	const { data, content } = matter(fileContents);
	const publishDate = new Date(data.published);
	const slug = filename.split('.')[0];

	const meta = {
		...data,
		slug,
		author: data.author ?? defaultAuthor,
		publishedDate: publishDate.toISOString(),
		publishedFormatted: format(publishDate, "do 'of' MMMM, yyyy"),
		readTime: readingTime(content).text
	} as PostMetadata;

	postsBySlug[slug] = await new Promise((resolve) =>
		processor.process(content, (_, file) =>
			resolve({
				meta,
				content: String(file)
			})
		)
	);

	return postsBySlug[slug];
}
