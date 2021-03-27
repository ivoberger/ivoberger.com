import type { RequestHandler } from '@sveltejs/kit';

import { getPost } from '$lib/posts';

export const get: RequestHandler = ({ params }) => ({
	body: getPost(params.slug)
});
