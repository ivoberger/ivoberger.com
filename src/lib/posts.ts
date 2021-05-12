import path from 'path';
import { readdirSync, readFileSync } from 'fs';

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
	if (!posts) {
		const specs = await Promise.all(readdirSync(postsDirectory).map(readPostSpecFromFile));
		posts = specs.sort(({ meta: { date: dateA } }, { meta: { date: dateB } }) =>
			compareDesc(new Date(dateA), new Date(dateB))
		);
	}
	return posts;
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
		date: publishDate.toISOString(),
		published: format(publishDate, "do 'of' MMMM, yyyy"),
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
