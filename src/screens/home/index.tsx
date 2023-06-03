import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getBalance, getFaucetToken } from "@zerochain/zus-sdk";

import Layout from "layouts/Layout";
import { InfoBox } from "components/InfoBox";
import { Button } from "components/Button";
import { Modal } from "components/Modal";
import { Spinner } from "components/Spinner";

import { createWalletFunc, selectActiveWallet } from "store/wallet";
import { createAllocationFunc } from "store/allocation";

import styles from "./Home.module.scss";

export default function CreateWallet() {
  const router = useRouter();
  const dispatch = useDispatch();

  const wallet = useSelector(selectActiveWallet);

  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("Creating Wallet...");

  const handleCreateAccount = async () => {
    setIsLoading(true);
    await dispatch(createWalletFunc());

    const balanceObj = await getBalance(wallet.id);
    console.log(balanceObj, "balanceObj");

    setLoadingMsg("Creating Allocation..."); // @todo: implement this
    const faucet = await getFaucetToken();
    console.log(faucet, "faucet");
    await dispatch(createAllocationFunc());
    // pull 50 zcn from faucet
    // call create allocation

    setShowSuccessDialog(false);
    setIsLoading(true);
  };

  return (
    <>
      <Layout>
        {!wallet.id && (
          <div className={styles.createWalletWrapper}>
            <figure className={styles.logo}>
              <Image src="/zus-logo.png" width="124" height="45" alt="" />
            </figure>

            <InfoBox className="createWallet">
              <h3>Create your wallet to start staking and earning!</h3>
              <p>
                You will need to create a wallet to start staking and earning
                rewards. You can create a wallet by clicking the button below.
              </p>

              <Button
                size="large"
                fullWidth={true}
                onClick={handleCreateAccount}
              >
                Create Wallet
              </Button>
            </InfoBox>
          </div>
        )}
      </Layout>

      {isLoading && (
        <Modal>
          <Spinner />
          <h4>
            <b>{loadingMsg}</b>
          </h4>
        </Modal>
      )}

      {showSuccessDialog && (
        <Modal title="Success" closeFunc={() => setShowSuccessDialog(false)}>
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
