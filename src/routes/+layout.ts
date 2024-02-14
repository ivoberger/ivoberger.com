import type { LayoutLoad } from './$types';
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';

export const prerender = true;

export const load: LayoutLoad = async ({ url, params }) => ({
	params,
	path: url.pathname
});

injectSpeedInsights();
