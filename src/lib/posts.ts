import { getCollection, type CollectionEntry } from 'astro:content';
import { format } from 'date-fns';
import { readingTime } from './readingTime';

export interface PostSummary {
	slug: string;
	title: string;
	description: string;
	publishedDate: string;
	publishedFormatted: string;
	updatedDate: string;
	readTime: string;
	tags: Array<string>;
	cover?: string;
}

const coverFrom = (entry: CollectionEntry<'blog'>): string | undefined =>
	entry.data.seo?.image?.src?.replace(/^\.\//, '/');

export function toSummary(entry: CollectionEntry<'blog'>): PostSummary {
	const { data, body, id } = entry;
	return {
		slug: id,
		title: data.title,
		description: data.excerpt,
		publishedDate: data.publishDate.toISOString(),
		publishedFormatted: format(data.publishDate, "do 'of' MMMM yyyy"),
		updatedDate: (data.updatedDate ?? data.publishDate).toISOString(),
		readTime: readingTime(body ?? '').text,
		tags: [...data.tags].sort((a, b) => a.localeCompare(b)),
		cover: coverFrom(entry)
	};
}

export async function getAllPosts(): Promise<Array<CollectionEntry<'blog'>>> {
	const posts = await getCollection('blog');
	return posts.sort((a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf());
}

export async function getAllSummaries(): Promise<Array<PostSummary>> {
	return (await getAllPosts()).map(toSummary);
}

export async function getAllTags(): Promise<Array<string>> {
	const posts = await getAllPosts();
	const set = new Set<string>();
	posts.forEach((post) => post.data.tags.forEach((tag) => set.add(tag)));
	return [...set];
}
