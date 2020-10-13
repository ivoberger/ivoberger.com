import React from "react";
import type { AppProps } from "next/app";

import "../css/index.css";
import "typeface-catamaran";
import "typeface-source-sans-pro";
import { Footer } from "components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}

export default MyApp;
