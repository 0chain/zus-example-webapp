import React from "react";
import LayoutDashboard from "layouts/LayoutDashboard";
import { ContentBox } from "components/ContentBox";
import styles from "./Details.module.scss";
import { configJson } from "constant/config";

const NetworkDetails = () => {
  const details = [
    {
      label: "Url",
      value: configJson.blockWorker,
    },
    {
      label: "0Box Url",
      value: configJson.zboxHost,
    },
  ];

  return (
    <LayoutDashboard>
      <ContentBox>
        <div className={styles.wrapper}>
          <h1>
            <b>Network Details</b>
          </h1>

          <div className={styles.list}>
            <h6>Details</h6>

            <div className={styles.items}>
              {details.map((item) => {
                return (
                  <div key={item.label} className={styles.item}>
                    <div className={styles.label}>{item.label}:</div>
                    <div className={styles.value}>{item.value}</div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className={styles.list}>
            <h6>Change Network</h6>

            <div className={styles.items}>
              <div className={styles.item}>
                <div className={styles.label}>Change Network</div>
                <div className={styles.value}>
                  <form>
                    <select defaultValue="demo.zus.network">
                      <option value="demo.zus.network">Demo</option>
                      <option value="dev.zus.network">Dev</option>
                      <option value="testnet.testnet-0chain.net">
                        Testnet
                      </option>
                    </select>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentBox>
    </LayoutDashboard>
  );
};

export default NetworkDetails;
