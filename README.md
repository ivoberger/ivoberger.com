# ivoberger.com

Personal blog and portfolio, built with [Astro](https://astro.build), TypeScript and TailwindCSS, statically generated and deployed on Cloudflare Workers.

Posts live as Markdown in `src/content/blog` (an Astro content collection) and are rendered to static HTML at build time.

## Develop

```bash
pnpm install
pnpm dev
```

## Build

```bash
pnpm build     # astro check && astro build -> ./dist
pnpm preview
```

Deployment serves `./dist` as static assets via `wrangler.jsonc`.
