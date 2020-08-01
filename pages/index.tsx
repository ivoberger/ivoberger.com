import { getAllPosts } from "lib";
import { compareDesc } from "date-fns";

import React from "react";
import Link from "next/link";
import Head from "next/head";
import type { GetStaticProps } from "next";
import { Header } from "components";

const PostInfo: React.FC<PostMetadata> = ({
  title,
  date,
  description,
  tags,
  slug,
}) => (
  <div className="py-4 text-center border-b border-green-300 group sm:py-10">
    <Head>
      <title>Ivo's Website</title>
      <meta name="description" content={description} />
    </Head>
    <header className="mb-8 ">
      <time className="mb-2 text-xs text-gray-700 uppercase">{date}</time>
      <Link href="/posts/[slug]" as={`/posts/${slug}`}>
        <a>
          <h3 className="my-0 mb-1">{title}</h3>
        </a>
      </Link>
      <p className="text-sm leading-normal text-gray-700 sm:text-base">
        {tags.length && (
          <>
            in{" "}
            <Link href="/tag/[tag]}" as={`/tag/${tags[0]}`}>
              <a className="text-gray-700 capitalize transition duration-500 border-b border-transparent hover:border-gray-400">
                {tags[0]}
              </a>
            </Link>
          </>
        )}
      </p>
    </header>
    <p className="px-2 text-lg leading-normal text-gray-700 sm:px-4 md:px-10">
      {description}
    </p>
  </div>
);

type HomeProps = { posts: PostMetadata[] };

const Home: React.FC<HomeProps> = ({ posts }) => (
  <>
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
