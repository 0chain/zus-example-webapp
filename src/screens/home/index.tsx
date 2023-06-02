import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { setWallet, createWallet } from "@zerochain/zus-sdk";

import Layout from "layouts/Layout";
import styles from "./Home.module.scss";
import { InfoBox } from "components/InfoBox";
import { Button } from "components/Button";
import { Modal } from "components/Modal";
import { Spinner } from "components/Spinner";
import { AppContext } from "components/App/App";
import { useRouter } from "next/router";

export default function CreateWallet() {
  const app = useContext(AppContext);
  const router = useRouter();

  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);

  const showModal1 = async () => {
    setModal1(true);
    await new Promise((res) => setTimeout(res, 2000));

    if (app.wallet) {
      setWallet(
        app.wallet.keys.walletId,
        app.wallet.keys.privateKey,
        app.wallet.keys.publicKey,
        app.wallet.mnemonic
      );
    } else {
      const newWallet = await createWallet();
      console.log("after create wallet", newWallet);
      app.saveWallet(newWallet);
      setWallet(
        newWallet.keys.walletId,
        newWallet.keys.privateKey,
        newWallet.keys.publicKey,
        newWallet.mnemonic
      );
    }

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

            <Button size="large" fullWidth={true} onClick={() => showModal1()}>
              {app.wallet ? "Set Wallet" : "Create Wallet"}
            </Button>
          </InfoBox>
        </div>
      </Layout>

      {modal1 && (
        <Modal>
          <Spinner />
          <h4>
            <b>Creating Allocation</b>
          </h4>
        </Modal>
      )}

      {modal2 && (
        <Modal title="Success" closeFunc={closeModal2}>
          <Image src="/success-icon.svg" height="72" width="72" alt="" />
          <p>Allocation is created successfully</p>
          <Button size="large" onClick={() => router.push("/welcome")}>
            Ok
          </Button>
        </Modal>
      )}
    </>
  );
}
