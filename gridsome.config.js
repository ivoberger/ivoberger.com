module.exports = {
  siteName: "Homepage & Blog",
  siteDescription: "Ivo Berger's Homepage & Personal Blog",
  siteUrl: "https://ivoberger.com",
  titleTemplate: `%s | Ivo Berger`,
  icon: "src/favicon.png",

  transformers: {
    remark: {
      externalLinksTarget: "_blank",
      externalLinksRel: ["nofollow", "noopener", "noreferrer"],
      plugins: [
        [
          "gridsome-plugin-remark-shiki",
          {
            theme: "min-light"
          }
        ],
        ["gridsome-plugin-remark-youtube"],
        ["gridsome-plugin-remark-twitter"]
      ]
    }
  },

  plugins: [
    {
      use: "@gridsome/source-filesystem",
      options: {
        path: "content/posts/**/*.md",
        typeName: "Post",
        refs: {
          tags: {
            typeName: "Tag",
            create: true
          },
          author: {
            typeName: "Author",
            create: true
          }
        }
      }
    },
    // {
    //   use: "@gridsome/plugin-google-analytics",
    //   options: {
    //     id: "UA-135446199-1"
    //   }
    // },
    {
      use: "@gridsome/plugin-sitemap",
      options: {
        cacheTime: 600000 // default
      }
    },
    {
      use: "gridsome-plugin-rss",
      options: {
        contentTypeName: "Post",
        feedOptions: {
          title: "Ivo's Blog",
          feed_url: "https://ivoberger.com/feed.xml",
          site_url: "https://ivoberger.com"
        },
        feedItemOptions: node => ({
          title: node.title,
          description: node.description,
          url: "https://ivoberger.com/" + node.slug,
          author: node.author,
          date: node.date
        }),
        output: {
          dir: "./static",
          name: "feed.xml"
        }
      }
    }
  ],

  templates: {
    Post: "/:slug",
    Tag: "/tag/:id",
    Author: "/author/:id"
  },

  chainWebpack: config => {
    config.module
      .rule("css")
      .oneOf("normal")
      .use("postcss-loader")
      .tap(options => {
        options.plugins.unshift(
          ...[
            require("postcss-import"),
            require("postcss-nested"),
            require("tailwindcss")
          ]
        );

        if (process.env.NODE_ENV === "production") {
          options.plugins.push(
            ...[
              require("@fullhuman/postcss-purgecss")({
                content: ["src/assets/**/*.css", "src/**/*.vue", "src/**/*.js"],
                extractors: [
                  {
                    extractor: content =>
                      content.match(/[A-Za-z0-9-_:\/]+/g) || [],
                    extensions: ["css", "vue", "js"]
                  }
                ],
                whitelistPatterns: [/shiki/]
              })
            ]
          );
        }
        return options;
      });
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule.use("vue-svg-loader").loader("vue-svg-loader");
  }
};
