import path from "path";
import { writeFileSync, readFileSync } from "fs";

const cachePath = path.join(process.cwd(), ".next/cache/posts.json");

export const getPostsSpecFromFS = () =>
  JSON.parse(readFileSync(cachePath, "utf8"));

export const writePostsSpecToFS = (posts: PostSpec[]) => {
  writeFileSync(
    cachePath,
    JSON.stringify(
      posts
        .filter(({ data }) => !!data.slug)
        .reduce(
          (acc, { data: { slug, ...data }, filePath }) => ({
            ...acc,
            [slug!]: { filePath, data },
          }),
          {}
        )
    )
  );
};
