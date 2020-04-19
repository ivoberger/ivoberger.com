import fs from "fs";
import path from "path";
import unified from "unified";
import markdown from "remark-parse";
import remark2rehype from "remark-rehype";
import html from "rehype-stringify";
import matter from "gray-matter";
import { format } from "date-fns";
import readingTime from "reading-time";

import React from "react";
import type { GetStaticProps, GetStaticPaths } from "next";
import { HomeButton, Tags } from "../../components";

type PostProps = {
  meta: {
    title: string;
    author: string;
    description: string;
    cover?: string;
    publishDate: string;
    readTime: string;
    tags: string[];
  };
  content: string;
};

const Post: React.FC<PostProps> = ({
  meta: { title, cover, publishDate, readTime, tags },
  content,
}) => (
  <>
    <header>
      <div className="relative overflow-hidden text-center text-white max-h-cover">
        <div className="absolute inset-x-0 bottom-0 z-10 max-w-xl px-6 pb-16 mx-auto text-center md:max-w-3xl xl:max-w-4xl text-shadow-lg">
          <p className="text-sm uppercase">{readTime}</p>
          <h1>{title}</h1>
          <p>{publishDate}</p>
        </div>
        <img
          className="filter-blur"
          style={{ transform: "scale(1.03)" }}
          src={cover}
          alt="Post cover"
        />
      </div>
      <nav className="absolute top-0 left-0 m-4 group">
        <HomeButton />
      </nav>
    </header>
    <main className="max-w-2xl px-6 pt-16 pb-10 mx-auto mb-16 text-lg text-gray-700 border-b border-green-500 md:max-w-3xl xl:max-w-4xl sm:px-12">
      <article
        className="mb-10"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      <footer>
        <Tags tags={tags} />
      </footer>
    </main>
  </>
);

export const getStaticProps: GetStaticProps<
  PostProps,
  { slug: string; filePath: string }
> = async ({ params: { slug } }) => {
  const unifiedProcessor = unified().use(markdown).use(remark2rehype).use(html);

  const postsTable = await JSON.parse(
    fs.readFileSync(path.join(process.cwd(), ".next/cache/posts.json"), "utf8")
  );
  const { filePath, data } = postsTable[slug];

  const { content } = matter(fs.readFileSync(filePath, "utf8"));

  let postContent;
  await unifiedProcessor.process(content, function (err, file) {
    postContent = String(file);
  });

  return {
    props: {
      meta: {
        ...data,
        publishDate: format(new Date(data.date), "dd MMMM, yyyy"),
        readTime: readingTime(content).text,
      },
      content: postContent,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), "data/posts");
  const filenames = fs.readdirSync(postsDirectory);

  const posts = await Promise.all(
    filenames.map(async (filename) => {
      const filePath = path.join(postsDirectory, filename);
      const fileContents = fs.readFileSync(filePath, "utf8");

      const { data } = matter(fileContents);

      return { data, filePath };
    })
  );

  fs.writeFileSync(
    path.join(process.cwd(), ".next/cache/posts.json"),
    JSON.stringify(
      posts.reduce(
        (acc, { data: { slug, ...data }, filePath }) => ({
          ...acc,
          [slug]: { filePath, data },
        }),
        {}
      )
    )
  );

  //   const postData = await import(`data/posts/${params.slug}.md`);
  return {
    paths: posts.map(({ data: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
};

export default Post;
