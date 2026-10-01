import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = () => fetch('https://cloud.umami.is/script.js');
