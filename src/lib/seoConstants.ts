export const defaultAuthor = 'Ivo Berger';

export const rootUrl = 'ivoberger.com';
const defaultTitle = "Ivo's Coding Blog";
const defaultDesc = 'Technical articles about everything related to programming';

export const seoData = ({
	title = defaultTitle,
	description = defaultDesc,
	canonical = rootUrl,
	type,
	author = defaultAuthor,
	tags = [],
	image
}: {
	title?: string;
	description?: string;
	canonical?: string;
	type?: string;
	author?: string;
	tags?: string[];
	image?: string;
}): {
	title: string;
	description: string;
	canonical: string;
	keywords: string;
	openGraph: {
		url: string;
		type: string;
		title: string;
		description: string;
		authors: string[];
		tags: string[];
	};
	twitter: { site: string; title: string; description: string; image?: string };
} => ({
	title: title === defaultTitle ? title : `${title} | ${defaultTitle}`,
	description,
	canonical,
	keywords: tags.join(','),
	openGraph: {
		url: canonical,
		title,
		type,
		description,
		authors: [author],
		tags
	},
	twitter: { site: '@__I__V__O__', title, description, image }
});
