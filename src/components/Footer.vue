<template>
  <footer
    class="text-gray-700 text-sm leading-normal flex flex-wrap justify-between mx-auto max-w-3xl px-6 sm:px-12"
  >
    <div class="w-full sm:w-1/2 mb-4 sm:mb-0">
      <p>
        <a target="_blank" href="https://github.com/ivoberger">
          <font-awesome :icon="['fab', 'github']" class="mr-2" />
        </a>
        <a target="_blank" href="https://gitlab.com/ivoberger">
          <font-awesome :icon="['fab', 'gitlab']" class="mx-2" />
        </a>
        <a target="_blank" href="https://stackoverflow.com/users/8568922/ivo">
          <font-awesome :icon="['fab', 'stack-overflow']" class="mx-2" />
        </a>
        <a target="_blank" href="https://dev.to/iiiuminator">
          <font-awesome :icon="['fab', 'dev']" class="mx-2" />
        </a>
        <a target="_blank" href="https://twitter.com/__I__V__O__">
          <font-awesome :icon="['fab', 'twitter']" class="mx-2" />
        </a>
        <a target="_blank" href="https://www.linkedin.com/in/ivo-berger-00089b15b/">
          <font-awesome :icon="['fab', 'linkedin-in']" class="mx-2" />
        </a>
      </p>
      <p>
        <font-awesome :icon="['far', 'copyright']" class="mr-1" />2019 - present, Ivo Berger
      </p>
    </div>
    <div class="w-full sm:w-1/2">
      <nav>
        <ul class="flex sm:justify-end -mx-2">
          <li class="px-2">
            <g-link
              to="/"
              class="border-b border-transparent hover:border-gray-400 transition-border-color"
            >Home</g-link>
          </li>
          <li class="px-2">
            <g-link
              to="/about/"
              class="border-b border-transparent hover:border-gray-400 transition-border-color"
            >About</g-link>
          </li>
          <li class="px-2">
            <a
              href="/sitemap.xml"
              class="border-b border-transparent hover:border-gray-400 transition-border-color"
            >Sitemap</a>
          </li>
          <li class="px-2">
            <a
              href="/feed.xml"
              class="border-b border-transparent hover:border-gray-400 transition-border-color"
            >RSS Feed</a>
          </li>
        </ul>
      </nav>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  mounted() {
    (function(f, a, t, h, o, m) {
      a[h] =
        a[h] ||
        function() {
          (a[h].q = a[h].q || []).push(arguments);
        };
      (o = f.createElement("script")),
        (m = f.getElementsByTagName("script")[0]);
      o.async = 1;
      o.src = t;
      o.id = "fathom-script";
      m.parentNode.insertBefore(o, m);
    })(document, window, "//analytics.ivoberger.com/tracker.js", "fathom");
    fathom("set", "siteId", "IQHFL");
    fathom("trackPageview");
  }
};
</script>
