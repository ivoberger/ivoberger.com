const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withMDX = require("@next/mdx")({
  extension: /\.mdx?$/,
});

module.exports = withBundleAnalyzer(
  withMDX({
    target: "serverless",
    pageExtensions: ["ts", "tsx", "md", "mdx"],
  })
);
