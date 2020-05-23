module.exports = {
  target: "serverless",
  pageExtensions: ["ts", "tsx", "md", "mdx"],
  experimental: {
    jsconfigPaths: true, // enables it for both jsconfig.json and tsconfig.json
  },
};
