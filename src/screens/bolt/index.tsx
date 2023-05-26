import React, { useState, useEffect, useContext } from "react";
import { getBalance, getUSDRate } from "@zerochain/zus-sdk";
import Link from "next/link";
import Image from "next/image";

import styles from './Bolt.module.scss'
import { ContentBox } from "@/components/ContentBox";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { ProgressBar } from "@/components/ProgressBar";
import { AppContext } from "@/components/App/App";

export default function Bolt() {
  const app = useContext(AppContext);
  const [balance, setBalance] = useState(0);
  const [rate, setRate] = useState(0);

  const init = async () => {
    const activeBalance = await getBalance(app.wallet.keys.walletId);
    setBalance(activeBalance.balance / Math.pow(10, 10));
    const fetchRate = await getUSDRate("zcn");
    setRate(fetchRate);
  }
  
  useEffect(() => {
    if(app.wallet) {
      console.log('Selected Wallet', app.wallet);
      init();
    }
  }, [app.wallet]);

  return (
    <LayoutDashboard>
      <ContentBox>
        <div className={styles.balanceWrapper}>
          <p>Available Balance</p>
          <h1 className={styles.value}>
            <b>{Math.floor(balance * Math.pow(10, 3)) / Math.pow(10, 3)}</b>
            <small className={styles.unit}>ZCN</small>
          </h1>
          <small>1 ZCN = {rate.toFixed(5)}</small>

          <ProgressBar value="50%" labelLeft="Staked" labelRight="Available" theme="bolt"></ProgressBar>

          <div className={styles.balance}>
            <div>Total Balance</div>
            <div className={styles.total}>
              <span className={styles.currency}>$</span>
              {(balance * rate).toFixed(5)}
            </div>
          </div>
        </div>
      </ContentBox>

      <div>
        <div className={styles.widgetHeading}>
          <h6>Recent Transactions</h6>

          <div className={styles.right}>
            <Link href="#">View all</Link>
          </div>
        </div>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Transaction Hash</th>
              <th>Date (UT)</th>
            </tr>
          </thead>
          <tbody>
            {/* {transactions.slice(page * perPage, (page + 1) * perPage).map((e) => (
              <tr key={e.hash}>
                <td className={styles.hash}>
                  {e.hash}
                  <button onClick={() => {
                    navigator.clipboard.writeText(e.hash);
                  }}>
                    <Image src="/icons/icon-document.svg" height={17} width={17} alt="" />
                  </button>
                </td>
                <td>{e.date.toUTCString()}</td>
              </tr>
            ))} */}
          </tbody>
        </table>

        <ul className={styles.pagination}>
          <li className={styles.previous}>
            <button>
              <Image src="/icons/icon-caret-left.svg" height={10} width={10} alt="" />
              Previous
            </button>
          </li>
          
          {/* {pages.map((e, i) => (
          <li>
            <button key={i} onClick={() => setPage(e)}>{e+1}</button>
          </li>
          ))} */}
          
          <li className={styles.next}>
            <button >
              Next
              <Image src="/icons/icon-caret-right.svg" height={10} width={10} alt="" />
            </button>
          </li>
        </ul>
      </div>
    </LayoutDashboard>
  );
}