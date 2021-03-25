import path from 'path';
import unified from 'unified';
import markdown from 'remark-parse';
import remark2rehype from 'remark-rehype';
import highlight from '@mapbox/rehype-prism';
import html from 'rehype-stringify';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { format } from 'date-fns';
import { readdirSync, readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';

import { defaultAuthor } from '../utils/seoConstants';

export function getPost(slug: string): { meta: PostMetadata; content: string } {
	const unifiedProcessor = unified().use(markdown).use(remark2rehype).use(highlight).use(html);

	const { filePath, data } = getPostsSpecFromFS()[slug];

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
	const postsDirectory = path.join(process.cwd(), 'data/posts');
	const filenames = readdirSync(postsDirectory);

	return filenames.map((filename) => {
		const filePath = path.join(postsDirectory, filename);
		const fileContents = readFileSync(filePath, 'utf8');

		const { data, content } = matter(fileContents);

		return {
			data: {
				...data,
				author: data.author ?? defaultAuthor,
				date: new Date(data.published).toISOString(),
				published: format(new Date(data.published), "do 'of' MMMM, yyyy"),
				readTime: readingTime(content).text
			},
			filePath
		} as PostSpec;
	});
}

const cacheDir = path.join(process.cwd(), '.svelte/cache');
const cachePath = path.join(cacheDir, 'posts.json');
if (!existsSync(cacheDir)) {
	mkdirSync(cacheDir);
}

export function getPostsSpecFromFS(): { [key: string]: PostSpec } {
	if (!existsSync(cachePath)) {
		const posts = getAllPosts();
		console.log(posts);

		writePostsSpecToFS(posts);
	}
	return JSON.parse(readFileSync(cachePath, 'utf8'));
}

export function writePostsSpecToFS(posts: PostSpec[]): void {
	writeFileSync(
		cachePath,
		JSON.stringify(
			posts
				.filter(({ data }) => !!data.slug)
				.reduce(
					(acc, { data: { slug, ...data }, filePath }) => ({
						...acc,
						[slug]: { filePath, data }
					}),
					{}
				)
		),
		{ encoding: 'utf8' }
	);
}
