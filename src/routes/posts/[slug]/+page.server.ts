import type { PageServerLoad } from './$types';

import { getPostBySlug } from '$lib/posts';

export const load: PageServerLoad = async ({ params }) => ({
	post: await getPostBySlug(params.slug)
});
