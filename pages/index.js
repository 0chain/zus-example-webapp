import React, { useState, useEffect } from "react";
import Head from "next/head";

import { init, setWallet, Greeter, listAllocations, getBalance } from "zus-sdk";

import styles from "../styles/Home.module.css";

export default function Home() {
  useEffect(() => {
    const loadData = async () => {
      //Initialize SDK
      await init();

      const wallet = {
        clientId:
          "5cd1d56a0842db11994ee2221f9f6468d36f9b89ba016880ac2598d214671012",
        privateKey:
          "6050f9a83bd8c15aa478d99c4dc2dd15a2f415c2b6f3d6e860bc8ab19ac92012",
        publicKey:
          "495cc7e63c3395d6afc632334a6fefcbdaca15e37da4f0416bc0d1b44ff4571a4d2a748307ca55c7439611148cbf18188a4eef3474b752fd64ded7fd02606c9f",
      };
      //Call setWallet method
      await setWallet(wallet.clientId, wallet.privateKey, wallet.publicKey);

      //Call Greeter method
      const greetMessage = Greeter("john doe");
      setMessage(greetMessage);

      //Call listAllocations method
      const allocations = await listAllocations();
      console.log("allocations", allocations);

      //Call getBalance method
      //await getBalance(wallet.clientId);
    };

    loadData();
  }, []);

  const [message, setMessage] = useState("");

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
