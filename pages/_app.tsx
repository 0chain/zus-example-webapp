import React from "react";
import "../src/styles/globals.scss";

import { App as MainApp } from "@/components/App/App";

export default function MyApp({ Component, pageProps }) {
  return (
    <MainApp>
      <Component {...pageProps} />
    </MainApp>
  );
}
