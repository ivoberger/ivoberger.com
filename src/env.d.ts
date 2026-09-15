/// <reference types="astro/client" />

declare module 'cloudflare:workers' {
	export const env: Record<string, string | undefined>;
}
