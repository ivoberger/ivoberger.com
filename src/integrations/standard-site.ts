import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import matter from 'gray-matter';
import type { AstroIntegration } from 'astro';
import { rootUrl, siteUrl, defaultTitle, defaultDesc } from '../consts';
import {
	createSession,
	deleteRecord,
	listRecordKeys,
	putRecord,
	publicationRkey,
	resolveIdentity,
	tidFromDate
} from '../lib/atproto';

const PUBLICATION = 'site.standard.publication';
const DOCUMENT = 'site.standard.document';

interface Post {
	slug: string;
	title: string;
	description?: string;
	tags: Array<string>;
	publishedAt: Date;
	updatedAt: Date;
}

async function readPosts(): Promise<Array<Post>> {
	const dir = fileURLToPath(new URL('../content/blog/', import.meta.url));
	const files = (await readdir(dir)).filter((f) => f.endsWith('.md') || f.endsWith('.mdx'));
	const posts: Array<Post> = [];
	for (const file of files) {
		const { data } = matter(await readFile(path.join(dir, file), 'utf8'));
		const publishedAt = new Date(data.publishDate);
		posts.push({
			slug: file.replace(/\.mdx?$/, ''),
			title: data.title,
			description: data.excerpt,
			tags: Array.isArray(data.tags) ? data.tags : [],
			publishedAt,
			updatedAt: data.updatedDate ? new Date(data.updatedDate) : publishedAt
		});
	}
	return posts;
}

interface StandardSiteOptions {
	handle?: string;
	password?: string;
}

export function standardSite(options: StandardSiteOptions = {}): AstroIntegration {
	return {
		name: 'standard-site',
		hooks: {
			'astro:build:done': async ({ dir, logger }) => {
				const handle = options.handle || rootUrl;

				let identity;
				try {
					identity = await resolveIdentity(handle);
				} catch (err) {
					logger.warn(`skipped: cannot resolve ${handle}: ${(err as Error).message}`);
					return;
				}
				const { did, pds } = identity;

				const wellKnown = path.join(fileURLToPath(dir), '.well-known');
				await mkdir(wellKnown, { recursive: true });
				await writeFile(
					path.join(wellKnown, PUBLICATION),
					`at://${did}/${PUBLICATION}/${publicationRkey}`
				);

				const password = options.password;
				if (!password) {
					logger.info('ATPROTO_PASSWORD unset; wrote .well-known, skipping record sync');
					return;
				}

				try {
					const session = await createSession(pds, handle, password);
					const posts = await readPosts();
					const site = `at://${did}/${PUBLICATION}/${publicationRkey}`;

					await putRecord(session, PUBLICATION, publicationRkey, {
						url: siteUrl,
						name: defaultTitle,
						description: defaultDesc,
						preferences: { showInDiscover: true }
					});

					const expected = new Map(posts.map((p) => [tidFromDate(p.publishedAt), p]));

					for (const rkey of await listRecordKeys(pds, did, DOCUMENT)) {
						if (!expected.has(rkey)) {
							await deleteRecord(session, DOCUMENT, rkey);
							logger.info(`deleted stale document ${rkey}`);
						}
					}

					for (const [rkey, post] of expected) {
						await putRecord(session, DOCUMENT, rkey, {
							site,
							path: `/posts/${post.slug}/`,
							title: post.title,
							publishedAt: post.publishedAt.toISOString(),
							updatedAt: post.updatedAt.toISOString(),
							...(post.description ? { description: post.description } : {}),
							...(post.tags.length > 0 ? { tags: post.tags } : {})
						});
					}
					logger.info(`synced ${expected.size} documents to ${pds}`);
				} catch (err) {
					logger.warn(`record sync failed: ${(err as Error).message}`);
				}
			}
		}
	};
}
