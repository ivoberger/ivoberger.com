import type { RequestHandler } from '@sveltejs/kit';

import { getPostsByTag } from '$lib/posts';

export const get: RequestHandler = async ({ params }) => ({
	body: await getPostsByTag(params.tag)
});
