import React from "react";
import type { AppProps } from "next/app";

import "../css/index.css";
import "typeface-catamaran";
import "typeface-source-serif-pro";
import { Footer } from "components";

// fix for Fontawesomes huge icons on page load
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
