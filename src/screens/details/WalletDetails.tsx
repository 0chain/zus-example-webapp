import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { AppContext } from "@/components/App/App";

import LayoutDashboard from "@/layouts/LayoutDashboard";
import { ContentBox } from "@/components/ContentBox";
import styles from "./Details.module.scss";

const WalletDetails = () => {
  const app = useContext(AppContext);

  useEffect(() => {
    if (app.wallet) {
      console.log("Selected Wallet", app.wallet);
    }
  }, [app.wallet]);

  return (
    <LayoutDashboard>
      <ContentBox>
        <div className={styles.wrapper}>
          <h1>
            <b>Wallet Details</b>
          </h1>

          <div className={styles.list}>
            <h6>Details</h6>

            <div className={styles.accordion}></div>
          </div>

          <div className={clsx(styles.list, styles.listJSON)}>
            <h6>JSON</h6>

            <pre>{JSON.stringify(app.wallet, null, 2)}</pre>
          </div>
        </div>
      </ContentBox>
    </LayoutDashboard>
  );
};

export default WalletDetails;
