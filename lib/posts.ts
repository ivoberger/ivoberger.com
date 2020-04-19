import path from "path";
import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import matter from "gray-matter";
import readingTime from "reading-time";
import { format } from "date-fns";
import { readdirSync, readFileSync } from "fs";

import { getPostsSpecFromFS } from "./cache";

export const getPost = async (slug: string) => {
  const unifiedProcessor = unified().use(markdown).use(remark2rehype).use(html);

  const { filePath, data } = getPostsSpecFromFS()[slug];

  const { content } = matter(readFileSync(filePath, "utf8"));

  let postContent = "";
  unifiedProcessor.process(content, function (err, file) {
    err && console.error(err);
    postContent = String(file);
  });
  return {
    meta: {
      ...data,
      publishDate: format(new Date(data.date), "do 'of' MMMM, yyyy"),
      readTime: readingTime(content).text,
    },
    content: postContent,
  };
};

export const getAllPosts: () => Promise<PostSpec[]> = () => {
  const postsDirectory = path.join(process.cwd(), "data/posts");
  const filenames = readdirSync(postsDirectory);

  return Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = readFileSync(filePath, "utf8");

      const { data } = matter(fileContents);

      return { data, filePath };
    })
  );
};