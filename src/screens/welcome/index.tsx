import React from "react";
import Link from "next/link";
import Layout from "layouts/Layout";
import styles from "./Welcome.module.scss";
import Image from "next/image";
import { IconBox } from "components/IconBox";

import { ROUTES } from "constant/routes";

export default function Home() {
  const actions = [
    {
      label: "Wallet Details",
      url: ROUTES.walletDetails,
      icon: "/icons/icon-wallet-solid.svg",
    },
    {
      label: "Allocation Details",
      url: ROUTES.allocationDetails,
      icon: "/icons/icon-piechart-solid.svg",
      iconSize: "31",
    },
    {
      label: "Network Details",
      url: ROUTES.networkDetails,
      icon: "/icons/icon-network-solid.svg",
      iconSize: "28",
    },
  ];

  return (
    <Layout>
      <div className={styles.welcomeWrapper}>
        <h4 className={styles.welcomeMessage}>
          Hello <span>John!</span>
        </h4>

        <div className={styles.flex}>
          {actions.map((item) => {
            return (
              <div key={item.label}>
                <IconBox
                  icon={item.icon}
                  url={item.url}
                  iconSize={item.iconSize}
                >
                  {item.label}
                </IconBox>
              </div>
            );
          })}
        </div>

        <div className={styles.flex}>
          <div className={styles.logo}>
            <Link href="/bolt">
              <Image src="/bolt-logo.png" width="178" height="75" alt="" />
            </Link>
          </div>

          <div className={styles.logo}>
            <Link href="/vult">
              <Image src="/vult-logo.png" width="180" height="72" alt="" />
            </Link>
          </div>
        </div>

        <footer>
          <span>Powered by</span>{" "}
          <Image src="/zus-logo.svg" height="66" width="66" alt="" />
        </footer>
      </div>
    </Layout>
  );
}
