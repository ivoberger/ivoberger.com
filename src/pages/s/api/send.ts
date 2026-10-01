import type { APIRoute } from 'astro';

export const prerender = false;

export const POST: APIRoute = ({ request }) => {
	const headers = new Headers({
		'content-type': 'application/json',
		'user-agent': request.headers.get('user-agent') ?? ''
	});
	const ip = request.headers.get('cf-connecting-ip');
	if (ip) {
		headers.set('x-forwarded-for', ip);
	}
	return fetch('https://gateway.umami.is/api/send', {
		method: 'POST',
		headers,
		body: request.body
	});
};
