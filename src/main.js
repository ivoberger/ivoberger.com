import DefaultLayout from "~/layouts/Default.vue";

import "typeface-catamaran";
import "typeface-source-serif-pro";
import "typeface-cousine";
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function(Vue, { head }) {
  Vue.component("Layout", DefaultLayout);

  head.htmlAttrs = { lang: "en", class: "h-full" };
  head.bodyAttrs = { class: "antialiased font-serif" };
}
