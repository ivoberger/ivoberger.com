import { getAllPosts, getPost, writePostsSpecToFS } from "lib";

import React from "react";
import type { GetStaticProps, GetStaticPaths } from "next";
import { HomeButton, Tags, Body } from "components";

type PostProps = {
  meta: PostMetadata;
  content: string;
};

const Post: React.FC<PostProps> = ({
  meta: { title, cover, date, readTime, tags },
  content,
}) => (
  <>
    <header>
      <div className="relative overflow-hidden text-center text-white max-h-cover">
        <div className="absolute inset-x-0 bottom-0 z-10 max-w-xl px-6 pb-16 mx-auto text-center md:max-w-3xl xl:max-w-4xl text-shadow-lg">
          <p className="text-sm uppercase">{readTime}</p>
          <h1>{title}</h1>
          <p>{date}</p>
        </div>
        <img
          className="filter-blur"
          style={{ transform: "scale(1.03)" }}
          src={cover}
          alt="Post cover"
        />
      </div>
      <HomeButton />
    </header>
    <Body className="text-lg text-gray-700 border-b border-green-500">
      <article
        className="mb-10"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
      <footer>
        <Tags tags={tags} />
      </footer>
    </Body>
  </>
);

export const getStaticProps: GetStaticProps<
  PostProps,
  { slug: string }
> = async ({ params }) => ({
  props: await getPost(params?.slug ?? ""),
});

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = await getAllPosts();
  writePostsSpecToFS(posts);

  return {
    paths: posts.map(({ data: { slug } }) => ({ params: { slug } })),
    fallback: false,
  };
};

export default Post;
