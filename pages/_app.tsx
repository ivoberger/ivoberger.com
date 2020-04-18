import React from "react";
import type { AppProps } from "next/app";

import "../css/index.css";
import "typeface-catamaran";
import "typeface-source-sans-pro";
import "typeface-jetbrains-mono";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
