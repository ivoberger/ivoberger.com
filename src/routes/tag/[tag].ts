import type { RequestHandler } from '@sveltejs/kit';

import { getPostsByTag } from '$lib/posts';

export const get: RequestHandler = async ({ params: { tag }, url: { pathname } }) => ({
	body: { posts: await getPostsByTag(tag), path: pathname, tag }
});
