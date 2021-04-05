---
title: How to use Vercel Analytics with SvelteKit
description: Vercel Analytics is a service tracking your website's real-world performance and is available for free if you're deploying on Vercel. This post explains how to use the service with Svelte(Kit) as there is no official support (yet).
published: 2021-04-04
tags:
  - analytics
  - javascript
  - svelte
  - vercel
  - web
---

I recently migrated my [website](http://ivoberger.com) from Next.js to [SvelteKit](https://kit.svelte.dev/) as it reached public beta and I've been meaning to try Svelte for a while now. I've been using [Vercel Analytics](https://vercel.com/docs/analytics) since it was introduced alongside [Next.js 10](https://nextjs.org/blog/next-10) in October 2020 to track my site's real-world performance and wanted keep using it with SvelteKit but (to no ones surprise) there's no official integration (yet).

## What is Vercel Analytics?

Vercel Analytics is a tool to track your website's [Web Vitals](https://web.dev/vitals/) on user's devices. You can always run Lighthouse or [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights) to test your site but since it runs on your (or Google's) machine it might not reflect real-world actual user experience.

Vercel Analytics fixes that issue by collecting vitals from your actual users and laying them out in a simple dashboard. It also calculates and overall metric called the _Real Experience Score_, which is a number on a scale from 0 to 100 that summarizes the collected web vitals.

## What is SvelteKit?

From the [website](https://kit.svelte.dev/):

> SvelteKit is a framework for building web applications of all sizes, with a beautiful development experience and flexible filesystem-based routing.

In a nutshell, it is for Svelte what Next.Js is for React: a framework that makes it easy to build a SEO friendly page by making server-side rendering, static site generation, code-splitting and routing a seamless experience.

It has recently been [promoted to public beta](https://svelte.dev/blog/sveltekit-beta) and now has enough documentation to get started. You should be able to follow this article even if you never used Svelte or SvelteKit but it'll be easier if your at least somewhat familiar with it.

## Vercel Analytics + SvelteKit

Vercel Analytics has no support for SvelteKit and likely won't anytime soon (it's very new after all).

So how can we make it work anyways?

[Vercel's docs](https://vercel.com/docs/analytics) list official support for Gatsby and Nuxt.js (Static Site Generators for React and Vue), through open-source plugins. So I simply checked the [source of the Gatsby plugin](https://github.com/vercel/gatsby-plugin-vercel/blob/main/src/web-vitals.js) and adapted it to work in SvelteKit.

Let's start by looking at what data Vercel expect and where to send it to.

The Analytics endpoint ([`http://vitals.vercel-insights.com/v1/vitals`](http://vitals.vercel-insights.com/v1/vitals)) expects a `POST` body as follows:

```json
{
	"dsn": "vercel analytics ID",
	"id": "metric ID",
	"name": "metric name",
	"value": "metric value",
	"page": "name of the page, /blog/[slug]",
	"href": "full URL, location.href",
	"speed": "connection speed, navigator.connection.effectiveType"
}
```

Let's break down what these values are and how to get them.

### dsn

The DSN is an identifier telling Vercel what site the submitted data belongs to. It is available during the build process on the Vercel platform as an environment variable `VERCEL_ANALYTICS_ID`.

### Metric

The aforementioned plugins both use Google's [`web-vitals`](https://github.com/GoogleChrome/web-vitals/) JavaScript library to do the actual measurements and supply us with the contents for `id`, `name` and `value`.

### Page

The page is the route with unresolved route parameters. For example a blog might at `/blog` with the posts being at `/blog/[slug]`.

### URL

The `href` key simply contains the pages URL. Together with `page` this information helps you to distinguish between issues caused by your general page setup (if the score for a whole route is bad) or just by some large embed that only appears in a single post (if the route looks good but a specific URL is problematic).

### Speed

Lastly the `speed` key tells Vercel what kind of connection the user uses. It can be retrieved from `navigator.connection.effectiveType` (see [MDN](https://developer.mozilla.org/en-US/docs/Web/API/NetworkInformation/effectiveType) for details). We'll need to check if the browser supports it though as it's an experimental API and as of now only supported by Chromium based browsers.

## Implementation

Now that we know what and where to send our metrics, let's see how we can replicate the Gatsby and Nuxt plugin functionality in SvelteKit.

First of all, the plugins work a bit differently: the Gatsby plugin sends the metric only on the initial page load (see [here](https://github.com/vercel/gatsby-plugin-vercel/blob/main/src/gatsby-browser.js)) while the Nuxt module seems to be reporting on page load and on every route change (see [here](https://github.com/nuxt-community/web-vitals-module/blob/main/src/runtime/vitals.client.js)).

Vercels docs state that metric are collected in initial page load and not for client-side transitions (see [here](https://vercel.com/docs/analytics#how-the-data-points-are-tracked)), so that's what we'll implement for SvelteKit.

### Getting the Analytics ID

The Analytics ID is provided when your app builds on Vercel. It's supplied through the environment as the variable`VERCEL_ANALYTICS_ID`. To be able to access it at runtime I had to add 2 lines to my `svelte.config.cjs` so it gets replaced at runtime:

```jsx
const sveltePreprocess = require('svelte-preprocess');
const staticAdapter = require('@sveltejs/adapter-static');
const pkg = require('./package.json');

/** @type {import('@sveltejs/kit').Config} */
module.exports = {
	// Consult https://github.com/sveltejs/svelte-preprocess
	// for more information about preprocessors
	preprocess: sveltePreprocess({
		replace: [
			// this will allow us to use is in the code as import.meta.env.VERCEL_ANALYTICS_ID
			['import.meta.env.VERCEL_ANALYTICS_ID', JSON.stringify(process.env.VERCEL_ANALYTICS_ID)]
		]
	}),
	kit: {
		adapter: staticAdapter(),
		vite: {
			ssr: {
				noExternal: Object.keys(pkg.dependencies || {})
			}
		}
	}
};
```

I first tried using it by adding an `.env` file and then accessing it through [Vite's built-in support](https://vitejs.dev/guide/env-and-mode.html#env-files) (Vite is the build tool used by SvelteKit), but as there's an [issue with that in SvelteKit](https://github.com/sveltejs/kit/issues/720) I opted for the `replace` config above. I adopted the `import.meta.env.VERCEL_ANALYTICS_ID` syntax from the Vite docs, but you can really replace it with whatever suits you, just make sure to also change it in the following snippet accordingly.

### Triggering the Report

We want to trigger the vitals reporting on the initial page load but not for client-side routing. SvelteKit has the concept of [Layouts](https://kit.svelte.dev/docs#layouts), which are meant to hold common UI and functionality for all pages.

To trigger the reporting we'll call a helper (which will be implemented in the next section) in Svelte's `onMount` lifecycle function:

```tsx
import { onMount } from 'svelte';
import { webVitals } from '$lib/webvitals';

let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID as string;
export let path: string;
export let params: Record<string, string>;

onMount(() => {
	if (analyticsId) webVitals({ path, params, analyticsId });
});
```

In addition to the above we need another server-side `script` block which is responsible for retrieving the page path and params in the [`load`](https://kit.svelte.dev/docs#loading) function:

```tsx
import type { Load } from '@sveltejs/kit';
export const load: Load = async ({ page: { path, params } }) => ({
	props: {
		params,
		path
	}
});
```

The reasoning for doing it server-side is that the only way to get that data client-side is to subscribe to the [`page` store](https://kit.svelte.dev/docs#modules-app-stores) and populate the `page` and `params` variables from that:

```tsx
import { onMount } from 'svelte';
import { page } from '$app/stores';
import { webVitals } from '$lib/webvitals';

let analyticsId = import.meta.env.VERCEL_ANALYTICS_ID as string;
let path: string;
let params: Record<string, string>;

page.subscribe((page) => {
	path = page.path;
	params = page.params;
});

onMount(() => {
	if (analyticsId) webVitals({ path, params, analyticsId });
});
```

Since my website is entirely statically generated I went with the server-side approach to minimize the amount of client-side JavaScript. See [here](https://github.com/ivoberger/ivoberger.com/blob/b27ccad2b6d2e5a3108e50385ec52c3a745258c8/src/routes/%24layout.svelte) for a full example.

### Implementing webVitals

Lets see what calling`webVitals` actually does. The function is in `src/lib/webvitals.ts` which SvelteKit makes available as `$lib/webvitals` as seen in the previous snippet.

The `webVitals` function itself is quite simple. It registers a callback for all 4 metrics we want to track using the `web-vitals` library. It takes the options we've gathered in the previous sections. The code is wrapped in a `try-catch` block so fails silently if something goes wrong and doesn't cause issues for the actual page.

```tsx
import { getCLS, getFCP, getFID, getLCP, getTTFB } from 'web-vitals';

type AnalyticsOptions = {
	params: Record<string, string>;
	path: string;
	analyticsId: string;
	debug?: true;
};

export function webVitals(options: AnalyticsOptions): void {
	try {
		getFID((metric) => sendToAnalytics(metric, options));
		getTTFB((metric) => sendToAnalytics(metric, options));
		getLCP((metric) => sendToAnalytics(metric, options));
		getCLS((metric) => sendToAnalytics(metric, options));
		getFCP((metric) => sendToAnalytics(metric, options));
	} catch (err) {
		console.error('[Analytics]', err);
	}
}
```

Most of the work happens in `sendToAnalytics`:

```tsx
import type { Metric } from 'web-vitals';

function sendToAnalytics(metric: Metric, options: AnalyticsOptions) {
	const page = Object.entries(options.params).reduce(
		(acc, [key, value]) => acc.replace(value, `[${key}]`),
		options.path
	);

	const body = {
		dsn: options.analyticsId,
		id: metric.id,
		page,
		href: location.href,
		event_name: metric.name,
		value: metric.value.toString(),
		speed: getConnectionSpeed()
	};

	if (options.debug) {
		console.log('[Analytics]', metric.name, JSON.stringify(body, null, 2));
	}

	const blob = new Blob([new URLSearchParams(body).toString()], {
		// This content type is necessary for `sendBeacon`:
		type: 'application/x-www-form-urlencoded'
	});
	if (navigator.sendBeacon) {
		navigator.sendBeacon(vitalsUrl, blob);
	} else {
		fetch(vitalsUrl, {
			body: blob,
			method: 'POST',
			credentials: 'omit',
			keepalive: true
		});
	}
}
```

Let's break it down, starting with this:

```tsx
const page = Object.entries(options.params).reduce(
	(acc, [key, value]) => acc.replace(value, `[${key}]`),
	options.path
);
```

Here we're extracting the route from the `page` and `params` options since SvelteKit doesn't supply that at the moment. We're looping through all `params` and replacing that part in the `path` with the parameter name wrapped in brackets. This turns for example a path of `/blog/my-first-post` with params `{ slug: 'my-first-post' }` into the route `/blog/[slug]`.

Next we need to build the request body:

```tsx
const body = {
	dsn: options.analyticsId,
	id: metric.id,
	page,
	href: location.href,
	event_name: metric.name,
	value: metric.value.toString(),
	speed: getConnectionSpeed()
};
```

We're just taking all the gathered values and dropping them into an object. we'll later use as the `POST` body.

In the next step that object is prepared for for sending it off:

```tsx
const blob = new Blob([new URLSearchParams(body).toString()], {
	// This content type is necessary for `sendBeacon`:
	type: 'application/x-www-form-urlencoded'
});
```

The `body` object is converted into a Blob and with a data type of `application/x-www-form-urlencoded`. This is taken from the plugin source [here](https://github.com/vercel/gatsby-plugin-vercel/blob/main/src/web-vitals.js#L61-L64).

The last step is to check if the browser's navigator support the [sendBeacon API](https://developer.mozilla.org/en-US/docs/Web/API/Navigator/sendBeacon) and send the data using that or falling back to a simple `fetch`:

```tsx
if (navigator.sendBeacon) {
	navigator.sendBeacon(vitalsUrl, blob);
} else {
	fetch(vitalsUrl, {
		body: blob,
		method: 'POST',
		credentials: 'omit',
		keepalive: true
	});
}
```

The `fetch` parameters are again taken from the Gatsby plugin. [Click here](https://github.com/ivoberger/ivoberger.com/blob/b27ccad2b6d2e5a3108e50385ec52c3a745258c8/src/lib/webvitals.ts) for the full source.

Now you can build your SvelteKit site, deploy it on Vercel and still use Vercel Analytics to track your page's performance on user's devices.

If you've never used Vercel Analytics you'll have to activate first in the Vercel Console. You can do that in the "Analytics" tab in your project.

And that's all there is to it. Thanks for reading!
