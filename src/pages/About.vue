<template>
  <Layout>
    <main>
      <header class="max-w-xl md:max-w-2xl xl:max-w-3xl mx-auto text-center px-6 pt-24">
        <h1 class="text-4xl sm:text-5xl md:text-6xl font-sans font-bold mb-1">About</h1>
        <p
          class="text-grey-dark text-lg sm:text-2xl"
        >Hey, I'm Ivo and I love writing software that improves lives.</p>
      </header>
      <nav class="absolute top-0 left-0 z-20 mt-6 ml-6">
        <g-link
          to="/"
          class="text-gray-900 border-gray-400 text-sm border opacity-75 hover:opacity-100 rounded-full px-4 py-2 transition-opacity"
        >&larr; Home</g-link>
      </nav>
      <article
        class="max-w-xl md:max-w-2xl xl:max-w-3xl mx-auto px-6 sm:px-12 pt-16 border-b border-gray-300 pb-10 mb-16"
      >
        <div class="markdown text-lg leading-normal text-gray-700">
          <p>
            I have experience developing for
            <font-awesome :icon="['fab', 'android']" class="mr-1" />in Kotlin and cross-platform using Flutter & Dart.
            From my bachelor's thesis and subsequent paper I gathered basic machine learning skills in
            <font-awesome :icon="['fab', 'python']" class="mr-1" />using NumPy, pandas and Keras.
            Furthermore I've done web development with
            <font-awesome :icon="['fab', 'react']" class="mr-1" />and
            <font-awesome :icon="['fab', 'vuejs']" class="mr-1" />(this page is made with
            <a href="https://gridsome.org/">Gridsome</a>), resulting in some
            <font-awesome :icon="['fab', 'js']" class="mr-1" />/TypeScript experience as well rudimentary HTML and CSS knowledge.
            As working student I wrote Perl scripts and for
          </p>
          <p>
            I won't give you some cheesy crap about how I'm passionate about great software or making the world a better place.
            I want my work to have meaning and how I see that meaning can only come from improving other people's lives,
            be that directly by making useful apps or through tools that help other developers and businesses.
            <br />Resulting from that I care about sustainable business practices to keep this planet inhabitable.
            While no single country, company or person can save our planet I strongly believe in everybodies responsibility to to their part.
          </p>
        </div>
      </article>
      <site-footer class="pb-8 sm:pb-10" />
    </main>
  </Layout>
</template>

<script>
import config from "~/.temp/config.js";
import SiteFooter from "~/components/Footer";
import TensorFlowLogo from "~/assets/icons/tensorflow.svg";

export default {
  components: {
    TensorFlowLogo,
    SiteFooter
  },
  metaInfo() {
    const title = "About";
    const description = "Introduction to me and my blog.";
    return {
      title: title,
      meta: [
        {
          key: "description",
          name: "description",
          content: description
        },

        { property: "og:type", content: "article" },
        { property: "og:title", content: title },
        {
          property: "og:description",
          content: description
        },
        { property: "og:url", content: `${this.config.siteUrl}/about/` },
        { property: "og:image", content: "/images/bleda-card.png" },

        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        {
          name: "twitter:description",
          content: description
        },
        { name: "twitter:site", content: "@__I__V__O_" },
        { name: "twitter:creator", content: "@__I__V__O_" },
        { name: "twitter:image", content: "/images/bleda-card.png" }
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
