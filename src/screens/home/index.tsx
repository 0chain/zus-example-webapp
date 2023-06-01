import React, { useState, useEffect } from "react";
import clsx from 'clsx'
import Layout from "@/layouts/Layout";
import styles from "./Home.module.scss"

import Image from "next/image";
import { InfoBox } from "@/components/InfoBox";
import { Button } from "@/components/Button";
import { init, createWallet } from "@zerochain/zus-sdk";
import { Modal } from "@/components/Modal";
import { Spinner } from "@/components/Spinner";

export default function CreateWallet() {
  const configJson = {
    chainId: "0afc093ffb509f059c55478bc1a60351cef7b4e9c008a53a6cc8241ca8617dfe",
    signatureScheme: "bls0chain",
    minConfirmation: 50,
    minSubmit: 50,
    confirmationChainLength: 3,
    blockWorker: "https://dev.zus.network/dns",
    zboxHost: "https://0box.dev.zus.network",
    zboxAppType: "vult",
  };

  const config = [
    configJson.chainId,
    configJson.blockWorker,
    configJson.signatureScheme,
    configJson.minConfirmation,
    configJson.minSubmit,
    configJson.confirmationChainLength,
    configJson.zboxHost,
    configJson.zboxAppType,
  ];

  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);

  const initComp = async () => {
    await init(config);
  };

  useEffect(() => {
    initComp();
  }, []);

  const showModal1 = async () => {
    setModal1(true);
    await new Promise((res) => setTimeout(res, 2000));
    console.log("calling createWallet");
    const wallet = await createWallet();
    console.log("Wallet", wallet);
    setModal1(false);
    setModal2(true);
  };

  const closeModal2 = async () => {
    setModal2(false);
  };

  return (
    <>
      <Layout>
        <div className={styles.createWalletWrapper}>
          <figure className={styles.logo}>
            <Image src="/zus-logo.png" width="124" height="45" alt="" />
          </figure>

          <InfoBox className="createWallet">
            <h3>Create your wallet to start staking and earning!</h3>
            <p>
              Nulla Lorem mollit cupidadat irure. Laborum magna nulla duis
              ullamco cillum dolor. Nulla Lorem mollit cupidadat irure. Laborum
              magna nulla duis ullamco cillum dolor.
            </p>

            <button className={clsx('btn', styles.ctaBtn)} onClick={() => showModal1()}>Create Wallet</button>
          </InfoBox>
        </div>
      </Layout>

      {modal1 && (
        <Modal>
          <Spinner />
          <h4><b>Creating Allocation</b></h4>
        </Modal>
      )}

      {modal2 && (
        <Modal title="Success" closeFunc={closeModal2}>
          <Image src="/success-icon.svg" height="72" width="72" alt="" />
          <p>Allocation is created successfully</p>
          <Button url="/welcome" size="large">
            Ok
          </Button>
        </Modal>
      )}
    </>
  );
}
