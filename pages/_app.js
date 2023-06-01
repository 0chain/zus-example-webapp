import "../src/styles/globals.scss";
import { App as MainApp } from "@/components/App/App";

export default function App({ Component, pageProps }) {
  return (
    <MainApp>
      <Component {...pageProps} />
    </MainApp>
  );
}
