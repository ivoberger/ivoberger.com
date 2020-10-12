import React from "react";
import type { AppProps } from "next/app";
import PlausibleProvider from "next-plausible";

import "../css/index.css";
import "typeface-catamaran";
import "typeface-source-sans-pro";
import { Footer } from "components";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PlausibleProvider domain="ivoberger.com">
      <Component {...pageProps} />
      <Footer />
    </PlausibleProvider>
  );
}

export default MyApp;
