import { getAllPosts, getPost, writePostsSpecToFS } from "lib";
import type { GetStaticProps, GetStaticPaths } from "next";

import React from "react";
import { HomeButton, Body } from "components";
import Image from "next/image";
import { NextSeo } from "next-seo";
import { useUrl, seoData, defaultSection } from "utils";

type PostProps = {
  meta: PostMetadata;
  content: string;
};

const Post: React.FC<PostProps> = ({
  meta: { title, cover, date, published, readTime, description, tags, author },
  content,
}) => {
  const { url, resolvedPath } = useUrl(cover);

  return (
    <div itemScope itemType="https://schema.org/TechArticle">
      <NextSeo
        {...seoData}
        title={title}
        description={description}
        additionalMetaTags={[
          ...seoData.additionalMetaTags!,
          { name: "image", content: resolvedPath ?? "" },
          { name: "keywords", content: tags?.join(",") ?? "" },
        ]}
        canonical={url}
        openGraph={{
          ...seoData.openGraph,
          title,
          url,
          description,
          type: "article",
          images: resolvedPath
            ? [{ url: resolvedPath, alt: "Article Cover" }]
            : undefined,
          article: {
            publishedTime: date,
            authors: [author],
            section: defaultSection,
            tags,
          },
        }}
      />
      <header>
        <div className="relative overflow-hidden text-center text-white max-h-cover min-h-cover">
          <div className="absolute inset-x-0 bottom-0 z-10 max-w-xl px-6 pb-16 mx-auto text-center md:max-w-3xl xl:max-w-4xl text-shadow-lg">
            <p className="text-sm uppercase">{readTime}</p>
            <h1 itemProp="name">{title}</h1>
            <p itemProp="datePublished">{published}</p>
          </div>
          {cover && (
            <Image
              className="filter-blur"
              src={cover}
              alt="Post cover"
              width={1600}
              height={900}
              layout="responsive"
            />
          )}
        </div>
        <HomeButton />
        <meta itemProp="description" content={description} />
        <meta itemProp="image" content={resolvedPath} />
      </header>
      <Body className="text-lg text-gray-700 dark:text-gray-200 border-b border-lime-500">
        <article
          className="mb-10"
          itemProp="articleBody"
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
        {/* TODO: re-enable once tag pages are implemented
       <footer>
        <Tags tags={tags} />
      </footer> */}
      </Body>
    </div>
  );
};

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
