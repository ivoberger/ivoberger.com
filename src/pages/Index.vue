<template>
  <Layout class="bg-white">
    <main>
      <header>
        <div
          class="max-w-xl md:max-w-3xl xl:max-w-4xl mx-auto text-center px-6 py-10 md:py-32 border-b border-green-500"
        >
          <h1 class="text-4xl sm:text-5xl md:text-6xl font-sans font-bold mb-1">
            <g-link to="/" class="text-black">Ivo Berger</g-link>
          </h1>
          <h5 class="text-xl sm:text-2xl md:text-2xl font-sans mb-1">
            <g-link
              to="/about"
              class="text-gray-600 hover:border-gray-400 border-b border-transparent transition-border-color"
            >About me</g-link>
          </h5>
          <!-- <p
            class="text-gray-700 text-lg sm:text-3xl mt-4"
          >Posts on anything I find interesting, helpful or exciting</p>-->
        </div>
      </header>
      <section>
        <post-item v-for="edge in $page.posts.edges" :key="edge.node.id" :post="edge.node" />
      </section>
      <pagination :info="$page.posts.pageInfo" v-if="$page.posts.pageInfo.totalPages > 1" />
      <site-footer class="py-8 sm:py-16" />
    </main>
  </Layout>
</template>

<script>
import config from "~/.temp/config.js";
import SiteFooter from "@/components/Footer";
import PostItem from "@/components/PostItem";
import Pagination from "@/components/Pagination";

export default {
  components: {
    PostItem,
    Pagination,
    SiteFooter
  },
  metaInfo() {
    return {
      title: this.config.siteName,
      meta: [
        { property: "og:type", content: "website" },
        { property: "og:title", content: this.config.siteName },
        { property: "og:description", content: this.config.siteDescription },
        { property: "og:url", content: this.config.siteUrl },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: this.config.siteName },
        { name: "twitter:description", content: this.config.siteDescription }
      ]
    };
  },
  computed: {
    config() {
      return config;
    }
  }
};
</script>

<page-query>
  query Home ($page: Int) {
    posts: allPost (page: $page, perPage: 6) @paginate {
      totalCount
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          id
          title
          datetime: date (format: "YYYY-MM-DD HH:mm:ss")
          content
          excerpt
          description
          path
          cover
          tags {
            id
            title
            path
          }
        }
      }
    }
  }
</page-query>

