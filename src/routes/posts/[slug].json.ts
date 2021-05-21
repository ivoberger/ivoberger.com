import type { RequestHandler } from '@sveltejs/kit';

import { getPostBySlug } from '$lib/posts';

export const get: RequestHandler = async ({ params }) => ({
	body: await getPostBySlug(params.slug)
});
