const APPVIEW = 'https://public.api.bsky.app';

export interface Identity {
	did: string;
	pds: string;
}

export interface Session extends Identity {
	accessJwt: string;
}

export async function resolveIdentity(handle: string): Promise<Identity> {
	const res = await fetch(
		`${APPVIEW}/xrpc/com.atproto.identity.resolveHandle?handle=${encodeURIComponent(handle)}`
	);
	if (!res.ok) {
		throw new Error(`resolveHandle ${handle} -> ${res.status}`);
	}
	const { did } = (await res.json()) as { did: string };
	return { did, pds: await resolvePds(did) };
}

async function resolvePds(did: string): Promise<string> {
	const url = did.startsWith('did:web:')
		? `https://${did.slice('did:web:'.length)}/.well-known/did.json`
		: `https://plc.directory/${did}`;
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`${url} -> ${res.status}`);
	}
	const doc = (await res.json()) as { service?: Array<{ id: string; serviceEndpoint: string }> };
	const pds = doc.service?.find((s) => s.id.endsWith('#atproto_pds'))?.serviceEndpoint;
	if (!pds) {
		throw new Error(`no #atproto_pds service in DID document for ${did}`);
	}
	return pds;
}

const S32 = '234567abcdefghijklmnopqrstuvwxyz';
const CLOCK_ID = 3;

function s32(value: number, length: number): string {
	let out = '';
	let n = value;
	for (let i = 0; i < length; i++) {
		out = S32[n % 32] + out;
		n = Math.floor(n / 32);
	}
	return out;
}

// Deterministic TID from a date so the same post always maps to the same rkey.
export function tidFromDate(date: Date): string {
	return s32(date.getTime() * 1000, 11) + s32(CLOCK_ID, 2);
}

export const publicationRkey = tidFromDate(new Date('2020-01-01T00:00:00.000Z'));

export async function createSession(
	pds: string,
	identifier: string,
	password: string
): Promise<Session> {
	const res = await fetch(`${pds}/xrpc/com.atproto.server.createSession`, {
		method: 'POST',
		headers: { 'content-type': 'application/json' },
		body: JSON.stringify({ identifier, password })
	});
	if (!res.ok) {
		throw new Error(`createSession -> ${res.status} ${await res.text()}`);
	}
	const { did, accessJwt } = (await res.json()) as { did: string; accessJwt: string };
	return { did, pds, accessJwt };
}

export async function listRecordKeys(
	pds: string,
	did: string,
	collection: string
): Promise<Array<string>> {
	const keys: Array<string> = [];
	let cursor: string | undefined;
	do {
		const url = new URL(`${pds}/xrpc/com.atproto.repo.listRecords`);
		url.searchParams.set('repo', did);
		url.searchParams.set('collection', collection);
		url.searchParams.set('limit', '100');
		if (cursor) {
			url.searchParams.set('cursor', cursor);
		}
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`listRecords ${collection} -> ${res.status}`);
		}
		const body = (await res.json()) as { records: Array<{ uri: string }>; cursor?: string };
		for (const r of body.records) {
			keys.push(r.uri.split('/').pop()!);
		}
		cursor = body.cursor;
	} while (cursor);
	return keys;
}

export async function putRecord(
	session: Session,
	collection: string,
	rkey: string,
	record: Record<string, unknown>
): Promise<void> {
	const res = await fetch(`${session.pds}/xrpc/com.atproto.repo.putRecord`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${session.accessJwt}`
		},
		body: JSON.stringify({
			repo: session.did,
			collection,
			rkey,
			record: { $type: collection, ...record }
		})
	});
	if (!res.ok) {
		throw new Error(`putRecord ${collection}/${rkey} -> ${res.status} ${await res.text()}`);
	}
}

export async function deleteRecord(
	session: Session,
	collection: string,
	rkey: string
): Promise<void> {
	const res = await fetch(`${session.pds}/xrpc/com.atproto.repo.deleteRecord`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			authorization: `Bearer ${session.accessJwt}`
		},
		body: JSON.stringify({ repo: session.did, collection, rkey })
	});
	if (!res.ok) {
		throw new Error(`deleteRecord ${collection}/${rkey} -> ${res.status}`);
	}
}

export function normalize(url: string): string {
	try {
		const u = new URL(url);
		return (u.host.replace(/^www\./, '') + u.pathname).replace(/\/+$/, '');
	} catch {
		return url.replace(/\/+$/, '');
	}
}

const APPVIEW_PROXY = 'did:web:api.bsky.app#bsky_appview';

async function searchPostsByUrl(
	session: Session,
	author: string,
	url: string
): Promise<Array<{ uri: string; createdAt: string }>> {
	const endpoint = new URL(`${session.pds}/xrpc/app.bsky.feed.searchPosts`);
	endpoint.searchParams.set('q', url);
	endpoint.searchParams.set('author', author);
	endpoint.searchParams.set('url', url);
	endpoint.searchParams.set('limit', '100');
	const res = await fetch(endpoint, {
		headers: {
			authorization: `Bearer ${session.accessJwt}`,
			'atproto-proxy': APPVIEW_PROXY
		}
	});
	if (!res.ok) {
		throw new Error(`searchPosts -> ${res.status}`);
	}
	const body = (await res.json()) as {
		posts: Array<{ uri: string; record: { createdAt: string } }>;
	};
	return body.posts.map((p) => ({ uri: p.uri, createdAt: p.record.createdAt }));
}

export async function searchThreadUri(
	session: Session,
	author: string,
	normalizedTarget: string
): Promise<string | null | undefined> {
	try {
		const variants = [`https://${normalizedTarget}`, `https://www.${normalizedTarget}`];
		const results = (
			await Promise.all(variants.map((u) => searchPostsByUrl(session, author, u)))
		).flat();
		const oldest = results.reduce<{ uri: string; createdAt: string } | null>(
			(acc, p) => (!acc || p.createdAt < acc.createdAt ? p : acc),
			null
		);
		return oldest?.uri ?? null;
	} catch {
		return undefined;
	}
}
