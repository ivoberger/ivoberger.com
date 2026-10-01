import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = ({ params }) =>
	params.path === 'script.js'
		? fetch('https://cloud.umami.is/script.js')
		: new Response(null, { status: 404 });

export const POST: APIRoute = ({ params, request }) => {
	if (params.path !== 'api/send') {
		return new Response(null, { status: 404 });
	}
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
