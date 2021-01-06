import { getAllPosts } from "lib";
import { compareDesc } from "date-fns";

import React from "react";
import Link from "next/link";
import Head from "next/head";
import type { GetStaticProps } from "next";
import { Header } from "components";
import { NextSeo } from "next-seo";

const PostInfo: React.FC<PostMetadata> = ({
  title,
  published,
  description,
  slug,
}) => (
  <div className="py-4 text-center border-b border-lime-300 group sm:py-10 text-gray-700 dark:text-gray-300">
    <header className="mb-8 ">
      <time className="mb-2 text-xs uppercase">{published}</time>
      <Link href="/posts/[slug]" as={`/posts/${slug}`}>
        <a>
          <h3 className="my-0 mb-1">{title}</h3>
        </a>
      </Link>
      {/*
      TODO: re-enable once tag pages are implemented
       <p className="text-sm leading-normal sm:text-base">
        {tags.length && (
          <>
            in{" "}
            <Link href="/tag/[tag]}" as={`/tag/${tags[0]}`}>
              <a className="capitalize transition duration-500 border-b border-transparent hover:border-gray-400">
                {tags[0]}
              </a>
            </Link>
          </>
        )}
      </p> */}
    </header>
    <p className="px-2 text-lg leading-normal sm:px-4 md:px-10">
      {description}
    </p>
  </div>
);

type HomeProps = { posts: PostMetadata[] };

const Home: React.FC<HomeProps> = ({ posts }) => (
  <>
    <NextSeo
      title="Home"
      titleTemplate="%s | Ivo's Coding Blog"
      description="Coding Blog"
      additionalMetaTags={[{ name: "color-scheme", content: "dark light" }]}
    />
    <main className="container mx-auto">
      <Header title="Ivo Berger" subTitle="Stuff I Made" subTitleLink="about" />
      <section className="max-w-3xl px-6 mx-auto mb-10">
        {posts.map((post) => (
          <PostInfo key={post.title} {...post} />
        ))}
      </section>
    </main>
  </>
);

export const getStaticProps: GetStaticProps<HomeProps> = async () => ({
  props: {
    posts: (await getAllPosts())
      .map(({ data }) => data)
      .sort(({ date: dateA }, { date: dateB }) =>
        compareDesc(new Date(dateA), new Date(dateB))
      ),
  },
});

export default Home;
