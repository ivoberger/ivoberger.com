type PostMetadata = {
  title: string;
  author: string;
  description: string;
  cover?: string;
  date: string;
  readTime: string;
  tags: string[];
  slug?: string;
};

type PostSpec = {
  data: PostMetadata;
  filePath: string;
};
