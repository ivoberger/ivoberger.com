import type { PageServerLoad } from './$types';

import { getAllPosts } from '$lib/posts';

export const load: PageServerLoad = async () => ({ posts: await getAllPosts() });
