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

export function getPost(slug: string): { meta: PostMetadata; content: string } {
	const unifiedProcessor = unified().use(markdown).use(remark2rehype).use(highlight).use(html);

	const { filePath, data } = readPostSpecFromFile(slug + '.md');

	const { content } = matter(readFileSync(filePath, 'utf8'));

	let postContent = '';
	unifiedProcessor.process(content, function (err, file) {
		err && console.error(err);
		postContent = String(file);
	});
	return {
		meta: data,
		content: postContent
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
		data: {
			...data,
			slug,
			author: data.author ?? defaultAuthor,
			date: publishDate.toISOString(),
			published: format(publishDate, "do 'of' MMMM, yyyy"),
			readTime: readingTime(content).text
		},
		filePath
	} as PostSpec;
}
