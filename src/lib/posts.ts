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
import { format } from 'date-fns';

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

export function getPost(slug: string): Promise<PostData> {
	const { content: rawContent, meta } = readPostSpecFromFile(slug + '.md');

	return new Promise((resolve) =>
		processor.process(rawContent, (_, file) =>
			resolve({
				meta,
				content: String(file)
			})
		)
	);
}

export function getAllPosts(): PostSpec[] {
	return readdirSync(postsDirectory).map(readPostSpecFromFile);
}

function readPostSpecFromFile(filename: string): PostSpec {
	const filePath = path.join(postsDirectory, filename);
	const fileContents = readFileSync(filePath, 'utf8');

	const { data, content } = matter(fileContents);
	const publishDate = new Date(data.published);
	const slug = filename.split('.')[0];

	return {
		meta: {
			...data,
			slug,
			author: data.author ?? defaultAuthor,
			date: publishDate.toISOString(),
			published: format(publishDate, "do 'of' MMMM, yyyy"),
			readTime: readingTime(content).text
		},
		content
	} as PostSpec;
}
