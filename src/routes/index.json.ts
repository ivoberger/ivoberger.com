import type { RequestHandler } from '@sveltejs/kit';
import { compareDesc } from 'date-fns';

import { getAllPosts } from '$lib/posts';

export const get: RequestHandler = () => ({
	body: getAllPosts()
		.map(({ meta }) => meta)
		.sort(({ date: dateA }, { date: dateB }) => compareDesc(new Date(dateA), new Date(dateB)))
});
