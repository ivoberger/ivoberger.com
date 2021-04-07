import path from 'path';
import { readdirSync, readFileSync } from 'fs';

import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import highlight from '@mapbox/rehype-prism';
import html from 'rehype-stringify';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { format } from 'date-fns';

import { defaultAuthor } from './seoConstants';

const postsDirectory = path.join(process.cwd(), 'data/posts');
const unifiedProcessor = unified().use(markdown).use(remark2rehype).use(highlight).use(html);

export function getPost(slug: string): PostData {
	const { content: rawContent, meta } = readPostSpecFromFile(slug + '.md');

	let content = '';
	unifiedProcessor.process(rawContent, function (err, file) {
		err && console.error(err);
		content = String(file);
	});
	return {
		meta,
		content
	};
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
