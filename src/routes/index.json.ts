import type { RequestHandler } from '@sveltejs/kit';

import { getAllPosts } from '$lib/posts';

export const get: RequestHandler = async () => ({
	body: await getAllPosts()
});
