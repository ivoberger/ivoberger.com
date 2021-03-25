type PostData = {
	meta: PostMetadata;
	content: string;
};

type PostMetadata = {
	title: string;
	author: string;
	description: string;
	cover?: string;
	date: string;
	published: string;
	readTime: string;
	tags: string[];
	slug?: string;
};

type PostSpec = {
	data: PostMetadata;
	filePath: string;
};
