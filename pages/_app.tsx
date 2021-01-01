import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import Head from "next/head";

import "../css/index.css";
import { Footer } from "components";

// fix for FontAwesome huge icons on page load
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  const [prismThemeLink, setPrismThemeLink] = useState("");
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      // dark mode
      setPrismThemeLink(
        "https://cdn.jsdelivr.net/gh/PrismJS/prism-themes/themes/prism-atom-dark.css"
      );
    } else {
      setPrismThemeLink(
        "https://cdn.jsdelivr.net/gh/PrismJS/prism-themes/themes/prism-ghcolors.css"
      );
    }
  }, []);
  return (
    <>
      <Head>
        <link href={prismThemeLink} rel="stylesheet" />
      </Head>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
