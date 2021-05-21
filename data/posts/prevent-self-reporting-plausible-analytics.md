---
title: The easy way to prevent self-reporting with Plausible Analytics
description: A quick guide on how to exclude yourself from analytics on all branch deploys, PR previews etc. when using Plausible Analytics. The fix is very simple and works on any host (Netlify, Vercel, Firebase etc.).
published: 2021-05-22
tags:
  - analytics
  - plausible
  - guide
  - netlify
  - vercel
---

Analytics are an essential tool for any site-owner, but for them to be useful they need to be accurate.

During development you'll be looking at your site a lot, including at deploy previews to make sure everything looks and works alright before publishing changes. Conventional analytics solutions such as Google Analytics have built-in checks to prevent your own page-view from showing up in your stats, but they're also heavy, require cookie banners and collect way too much data. Plausible Analytics is a privacy first analytics tool and that's what I use for my site. The Plausible blog has an [in-depth comparison](https://plausible.io/vs-google-analytics) to Google Analytics (and a generally [great blog](https://plausible.io/blog)) if you want to learn more.

## The Problem

[Plausible Analytics is made by 2 people](https://plausible.io/about) and a fairly new tool. It currently only prevents counting of your own page views on `localhost`. Visits to your production deploy as well as any views on branch deploys get counted as long as the `data-domain` on the script tag that loads Plausible is correct. For smaller sites like mine with [less than a 100 daily views](https://plausible.io/ivoberger.com) it can lead to a lot of extra visitors and page views.

## Imperfect Solutions

The Plausible Docs have some guidance on how to exclude yourself from analytics. One option is to [set a local storage flag](https://plausible.io/docs/excluding-localstorage), the other is to [add the analytics script to your AdBlock](https://plausible.io/docs/excluding) lists.

The problem with the first approach is that you have to do it for every subdomain (like the branch deploys that [Netlify](https://www.netlify.com/) and [Vercel](https://vercel.com/) provide your with automagically) and it still counts the first visit since you can't set the flag until after the first page load.

The second solution requires you to have an ad blocker and if you're [using a proxy to get more accurate stats](https://plausible.io/docs/proxy/introduction) the blocking rules get a lot more complicated and you still have to set it up on each browser you test with.

## The Simple Solution

Simply omit the `data-domain` attribute on your script tag and set the `onload` attribute to `this.setAttribute('data-domain',window.location.host)` instead. This way if you're on some preview domain like `some-random-number--your-site-name.netlify.app` it'll set your `data-domain` to that subdomain and the analytics event won't be counted since the domain is unknown to Plausible.

You can load the Plausible script directly from [plausible.io](http://plausible.io) or [through a proxy](https://plausible.io/docs/proxy/introduction). Here are the full script tags for both setups. Since [my blog](https://ivoberger.com) is hosted on Netlify I am [proxying it using Netlify Redirects](https://plausible.io/docs/proxy/guides/netlify).

Remember to load the correct script for your use-case if you're using extensions like [outbound link tracking](https://plausible.io/docs/outbound-link-click-tracking)

### Load from plausible.io

```html
<script
	async
	defer
	src="https://plausible.io/js/plausible.js"
	onload="this.setAttribute('data-domain',window.location.host)"
></script>
```

### Load through Proxy

Use this if you're [proxying the script and API events through your own domain](https://plausible.io/docs/proxy/introduction) to get more accurate stats.

```html
<script
	async
	defer
	src="/js/script.js"
	onload="this.setAttribute('data-domain',window.location.host)"
></script>
```

## Wrap

And that's it. A simple solution fire-and-forget solution. Just beware that this won't work if you want to count visitors on subdomain towards your main domain. In that case you'll either need to modify the `onload` callback to handle that case or just [add it as a separate page in Plausible](https://plausible.io/docs/add-website). Plausible billing works completely off total page view over all your sites, so there's so extra cost to extra sites.
