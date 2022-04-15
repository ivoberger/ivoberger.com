import type { RequestHandler } from '@sveltejs/kit';

import { getPostBySlug } from '$lib/posts';

export const get: RequestHandler = async ({ params, url: { pathname } }) => ({
	body: { post: await getPostBySlug(params.slug), path: pathname }
});
