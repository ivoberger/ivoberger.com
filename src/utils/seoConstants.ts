export const defaultAuthor = 'Ivo Berger';
export const defaultSection = 'Programming';

export const rootUrl = 'ivoberger.com';
const title = "Ivo's Coding Blog";
const description = 'Technical articles about everything related to programming';

export const seoData = {
	title,
	titleTemplate: `%s | ${title}`,
	description,
	canonical: rootUrl,
	additionalMetaTags: [{ name: 'color-scheme', content: 'dark light' }],
	openGraph: {
		url: rootUrl,
		title,
		type: 'website',
		description,
		locale: 'en_US',
		site_name: title,
		profile: {
			firstName: 'Ivo',
			lastName: 'Berger',
			username: 'ivoberger',
			gender: 'male'
		}
	},
	twitter: { handle: '@__I__V__O__' }
};
