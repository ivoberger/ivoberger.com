<script lang="ts">
	import { onMount } from 'svelte';

	let { postUrl }: { postUrl: string } = $props();

	const APPVIEW = 'https://public.api.bsky.app';

	interface Author {
		handle: string;
		displayName?: string;
		avatar?: string;
	}
	interface Post {
		uri: string;
		author: Author;
		record: { text: string; createdAt: string };
		likeCount?: number;
		repostCount?: number;
		replyCount?: number;
	}
	interface ThreadNode {
		post: Post;
		replies?: Array<ThreadNode>;
	}
	interface Comment {
		post: Post;
		depth: number;
	}

	let status = $state<'loading' | 'ready' | 'empty'>('loading');
	let root = $state<Post | null>(null);
	let comments = $state<Array<Comment>>([]);

	async function discover(url: string): Promise<string | null> {
		try {
			const res = await fetch(`/api/bluesky-thread/?url=${encodeURIComponent(url)}`);
			if (!res.ok) {
				return null;
			}
			const data = (await res.json()) as { uri: string | null };
			return data.uri;
		} catch {
			return null;
		}
	}

	async function fetchThread(uri: string): Promise<ThreadNode | null> {
		try {
			const res = await fetch(
				`${APPVIEW}/xrpc/app.bsky.feed.getPostThread?uri=${encodeURIComponent(uri)}&depth=10`
			);
			if (!res.ok) {
				return null;
			}
			const { thread } = (await res.json()) as { thread: ThreadNode };
			return thread;
		} catch {
			return null;
		}
	}

	function flatten(nodes: Array<ThreadNode>, depth: number, out: Array<Comment>): void {
		for (const node of nodes) {
			if (!node?.post) {
				continue;
			}
			out.push({ post: node.post, depth });
			if (node.replies?.length) {
				flatten(node.replies, depth + 1, out);
			}
		}
	}

	function webUrl(uri: string): string {
		const parts = uri.split('/');
		return `https://bsky.app/profile/${parts[2]}/post/${parts[4]}`;
	}

	function when(iso: string): string {
		return new Date(iso).toLocaleDateString(undefined, {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}

	async function load(): Promise<void> {
		const uri = await discover(postUrl);
		if (!uri) {
			status = 'empty';
			return;
		}
		const thread = await fetchThread(uri);
		if (!thread) {
			status = 'empty';
			return;
		}
		const out: Array<Comment> = [];
		flatten(thread.replies ?? [], 0, out);
		comments = out;
		root = thread.post;
		status = 'ready';
	}

	onMount(load);
</script>

<section class="not-prose mt-24 border-t border-black/10 pt-8 dark:border-white/15">
	<div
		class="mb-4 flex items-center justify-between border-b border-black/10 pb-3 dark:border-white/15"
	>
		<h2 class="text-xl font-semibold">Comments</h2>
		{#if root}
			<a
				class="text-sm text-lime-600 hover:underline dark:text-lime-500"
				href={webUrl(root.uri)}
				target="_blank"
				rel="noopener noreferrer">Reply on Bluesky ↗</a
			>
		{/if}
	</div>

	{#if status === 'loading'}
		<p class="text-sm text-black/50 dark:text-white/50">
			Loading comments<span class="ellipsis"></span>
		</p>
	{:else if root}
		<div class="mb-6 flex gap-5 text-sm text-black/60 dark:text-white/60">
			<span
				><strong class="text-lime-600 dark:text-lime-500">{root.likeCount ?? 0}</strong> likes</span
			>
			<span
				><strong class="text-lime-600 dark:text-lime-500">{root.repostCount ?? 0}</strong> reposts</span
			>
			<span
				><strong class="text-lime-600 dark:text-lime-500">{root.replyCount ?? 0}</strong> replies</span
			>
		</div>

		{#if comments.length > 0}
			<ol class="space-y-4">
				{#each comments as { post, depth } (post.uri)}
					<li
						class="border-l-2 border-lime-600/30 pl-4 dark:border-lime-500/30"
						style={`margin-left:${Math.min(depth, 4) * 1.25}rem`}
					>
						<div class="flex items-center gap-2">
							<a
								class="flex items-center gap-2 font-medium hover:underline"
								href={`https://bsky.app/profile/${post.author.handle}`}
								target="_blank"
								rel="noopener noreferrer"
							>
								{#if post.author.avatar}
									<img
										class="h-6 w-6 rounded-full"
										src={post.author.avatar}
										alt=""
										loading="lazy"
									/>
								{/if}
								<span>{post.author.displayName || post.author.handle}</span>
								<span class="text-xs text-black/40 dark:text-white/40">@{post.author.handle}</span>
							</a>
							<a
								class="text-xs text-black/40 hover:underline dark:text-white/40"
								href={webUrl(post.uri)}
								target="_blank"
								rel="noopener noreferrer">· {when(post.record.createdAt)}</a
							>
						</div>
						<p class="mt-1 whitespace-pre-wrap text-black/80 dark:text-white/80">
							{post.record.text}
						</p>
						{#if post.likeCount}
							<span class="mt-1 inline-block text-xs text-black/40 dark:text-white/40"
								>♥ {post.likeCount}</span
							>
						{/if}
					</li>
				{/each}
			</ol>
		{:else}
			<p class="text-sm text-black/50 dark:text-white/50">
				No comments yet — be the first to reply.
			</p>
		{/if}
	{:else}
		<p class="text-sm text-black/50 dark:text-white/50">No comments yet.</p>
	{/if}
</section>

<style>
	.ellipsis::after {
		content: '';
		animation: ellipsis 1.4s steps(1, end) infinite;
	}
	@keyframes ellipsis {
		0% {
			content: '';
		}
		25% {
			content: '.';
		}
		50% {
			content: '..';
		}
		75% {
			content: '...';
		}
	}
</style>
