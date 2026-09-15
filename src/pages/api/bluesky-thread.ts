import type { APIRoute } from 'astro';
import { env } from 'cloudflare:workers';
import { rootUrl } from '../../consts';
import { normalize, resolveIdentity, createSession, searchThreadUri } from '../../lib/atproto';

export const prerender = false;

const FOUND_TTL = 60 * 60 * 24 * 7; // 1 week
const MISS_TTL = 60 * 60; // 1 hour

function json(data: unknown, maxAge: number): Response {
	return new Response(JSON.stringify(data), {
		headers: {
			'content-type': 'application/json',
			'cache-control': `public, max-age=${maxAge}`
		}
	});
}

export const GET: APIRoute = async ({ request, locals }) => {
	const raw = new URL(request.url).searchParams.get('url');
	if (!raw) {
		return json({ uri: null }, MISS_TTL);
	}
	const target = normalize(raw);
	if (target.split('/')[0] !== rootUrl) {
		return json({ uri: null }, MISS_TTL);
	}

	const cache =
		import.meta.env.PROD && typeof caches !== 'undefined'
			? (caches as unknown as { default: Cache }).default
			: undefined;
	const cached = await cache?.match(request);
	if (cached) {
		return cached;
	}

	const password = (env as { ATPROTO_PASSWORD?: string }).ATPROTO_PASSWORD;
	let uri: string | null = null;
	if (password) {
		try {
			const { pds } = await resolveIdentity(rootUrl);
			const session = await createSession(pds, rootUrl, password);
			uri = (await searchThreadUri(session, rootUrl, target)) ?? null;
		} catch {
			uri = null;
		}
	}

	const res = json({ uri }, uri ? FOUND_TTL : MISS_TTL);
	const cfContext = (locals as { cfContext?: { waitUntil(promise: Promise<unknown>): void } })
		.cfContext;
	if (cache && cfContext) {
		cfContext.waitUntil(cache.put(request, res.clone()));
	}
	return res;
};
