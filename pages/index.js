import Head from "next/head";
import zus from "zus-sdk";

import styles from "../styles/Home.module.css";

export default function Home() {
  const message = zus.Greeter();
  return (
    <>
      <Head>
        <title>Zus Example Web App</title>
        <meta name="description" content="Zus Example Web App using JS SDK" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <h3>Zus Example Web App using JS SDK</h3>
          <p>{message}</p>
        </div>
      </main>
    </>
  );
}
