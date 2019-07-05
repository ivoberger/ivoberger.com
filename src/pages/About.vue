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
            My main area of expertise is development for
            <font-awesome :icon="['fab', 'android']" class="mr-1" />in Kotlin and cross-platform using Flutter & Dart,
            complete with CI/CD using
            <a
              target="_blank"
              href="https://circleci.com/"
            >CircleCI</a>,
            <a
              target="_blank"
              href="https://about.gitlab.com/product/continuous-integration/"
            >GitLab</a> and
            <a target="_blank" href="https://codemagic.io">Codemagic</a> and of course
            <a target="_blank" href="https://www.docker.com/">
              <font-awesome :icon="['fab', 'docker']" class="mr-1" />
            </a>.
            <br />From my bachelor's thesis and
            <a
              target="_blank"
              href="https://doi.org/10.1007/978-3-030-12786-2_6"
            >subsequent paper</a> I gathered basic machine learning skills in
            <font-awesome :icon="['fab', 'python']" class="mr-1" />using NumPy, pandas and Keras.
            Furthermore I've done web development with
            <font-awesome :icon="['fab', 'react']" class="mr-1" />and
            <font-awesome :icon="['fab', 'vuejs']" class="mr-1" />(this page is made with
            <a target="_blank" href="https://gridsome.org/">Gridsome</a>), resulting in some
            <font-awesome :icon="['fab', 'js']" class="mr-1" />/TypeScript experience as well as rudimentary HTML and CSS knowledge.
            <br />I've written my share of Perl backend scripts and I'm able to learn new concepts and languages fairly quickly.
          </p>
          <p>
            I read a lot on
            <a target="_blank" href="https:/medium.com/">
              <font-awesome :icon="['fab', 'medium-m']" class="mr-1" />
            </a>,
            <a target="_blank" href="https:/dev.to">
              <font-awesome :icon="['fab', 'dev']" class="mr-1" />
            </a> and tech news to keep up to date on new technology. I'm also Co-Founder and lead mobile developer at
            <a
              target="_blank"
              href="https://roadsml.com"
            >RoadsML</a>, a Finnish startup for crowdsourcing road condition data to improve the efficiency of the Finnish forestry industry and road maintenance.
          </p>
          <h3>Contact</h3>
          <p>
            For inquiries regarding RoadsML hit me up at my
            <a
              href="mailto:ivo.berger@roadsml.com"
            >company e-mail</a>, otherwise please use the form below.
          </p>
          <form
            class="w-full max-w-lg"
            action="https://getform.io/f/54670a34-2877-4cac-8676-68ab27ad83a3"
            name="contact"
            method="POST"
          >
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="message-name"
                >Your Name</label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="message-name"
                  type="text"
                  placeholder="Jane Doe"
                />
              </div>
              <div class="w-full md:w-1/2 px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="contact-email"
                >Your E-Mail</label>
                <input
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="contact-email"
                  type="email"
                  placeholder="jane.doe@example.com"
                />
              </div>
            </div>
            <div class="flex flex-wrap -mx-3 mb-6">
              <div class="w-full px-3">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="contact-message"
                >Your Message</label>
                <textarea
                  class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="contact-message"
                  type="text"
                />
              </div>
            </div>
            <div class="g-recaptcha" data-sitekey="6Lc3Q6wUAAAAANQ_gMH1wsWGEiE8PushTXc3uGKx"></div>
            <input
              class="flex-shrink-0 bg-green-500 hover:bg-green-700 border-green-500 hover:border-green-700 border-4 text-white py-1 px-2 rounded"
              type="submit"
              value="Send"
            />
          </form>
        </div>
      </article>
      <site-footer class="pb-8 sm:pb-10" />
    </main>
  </Layout>
</template>

<script>
import config from "~/.temp/config.js";
import SiteFooter from "~/components/Footer";

export default {
  components: {
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

<style>
a svg {
  @apply text-gray-700;
}
</style>

