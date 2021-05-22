type PostData = {
	meta: PostMetadata;
	content: string;
};

type PostMetadata = {
	title: string;
	author: string;
	description: string;
	cover?: string;
	updatedDate: string;
	publishedDate: string;
	publishedFormatted: string;
	readTime: string;
	tags: string[];
	slug: string;
};

type PostSpec = {
	meta: PostMetadata;
	content: string;
};
