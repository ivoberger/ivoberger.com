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
import Link from "next/link";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
  meta: { title, author, cover, publishDate, readTime, tags },
  content,
}) => {
  return (
    <div>
      <header>
        <div className="max-h-cover text-center text-white overflow-hidden relative">
          <div className="max-w-xl md:max-w-3xl xl:max-w-4xl text-center px-6 absolute z-10 mx-auto bottom-0 inset-x-0 pb-16">
            <p className="uppercase text-sm">{readTime}</p>
            <h1>{title}</h1>
            <p>{publishDate}</p>
          </div>
          <img src={cover} alt="Post cover" />
        </div>
        <nav className="group absolute top-0 left-0 m-4">
          <Link href="/">
            <button className="rounded-full transition duration-500 py-2 px-5 bg-gray-100-t border border-gray-100-t group-hover:border-green-500">
              <span className="transition-all duration-500 font-sans text-gray-800 group-hover:text-black">
                <FontAwesomeIcon
                  className="transition-all duration-500 group-hover:text-green-500 group-hover:-ml-1 group-hover:mr-1"
                  icon={faArrowLeft}
                />{" "}
                Home
              </span>
            </button>
          </Link>
        </nav>
      </header>
      <article
        className="max-w-2xl md:max-w-3xl xl:max-w-4xl mx-auto px-6 sm:px-12 pt-16 border-b border-green-500 pb-10 mb-16 text-gray-700 text-lg"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </div>
  );
};

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
