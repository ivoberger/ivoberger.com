import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const blog = defineCollection({
	loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: './src/content/blog' }),
	schema: z.object({
		title: z.string(),
		excerpt: z.string(),
		publishDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		isFeatured: z.boolean().default(false),
		tags: z.array(z.string()).default([]),
		seo: z
			.object({
				image: z.object({ src: z.string(), alt: z.string().optional() }).optional()
			})
			.optional()
	})
});

export const collections = { blog };
