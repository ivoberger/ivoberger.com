import DefaultLayout from "~/layouts/Default.vue";

export default function(Vue, { head }) {
  Vue.component("Layout", DefaultLayout);

  head.htmlAttrs = { lang: "en", class: "h-full" };
  head.bodyAttrs = { class: "antialiased font-serif" };

  head.link.push({
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css?family=Fira+Sans:400,700%7CCardo"
  });
  head.script.push({
    src:
      "https://www.google.com/recaptcha/api.js?render=6Lc3Q6wUAAAAANQ_gMH1wsWGEiE8PushTXc3uGKx",
    body: true
  });
}
