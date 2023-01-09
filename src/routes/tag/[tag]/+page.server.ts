import type { PageServerLoad } from './$types';

import { getPostsByTag } from '$lib/posts';

export const load: PageServerLoad = async ({ params: { tag } }) => ({
	posts: await getPostsByTag(tag),
	tag
});
