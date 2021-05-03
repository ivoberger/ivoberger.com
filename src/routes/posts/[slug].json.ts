import type { RequestHandler } from '@sveltejs/kit';

import { getPost } from '$lib/posts';

export const get: RequestHandler = async ({ params }) => ({
	body: await getPost(params.slug)
});
