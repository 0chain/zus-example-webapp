import React, { useMemo, useState } from "react";
import styles from './Bolt.module.scss'
import { ContentBox } from "@/components/ContentBox";
import LayoutDashboard from "@/layouts/LayoutDashboard";
import { ProgressBar } from "@/components/ProgressBar";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/Button";

export default function Bolt() {
  const [page, setPage] = useState(1);
  const perPage = 5;
  
  const transactions = [
    { hash: "169de9f0438b2cc7c8e1467cecbb7634", date: new Date() },
    { hash: "308097ddf0a90fbf48b01913a6986102", date: new Date() },
    { hash: "4281a4e9f4040ecb6cbcc15ee51a8a7b", date: new Date() },
    { hash: "a4619264e742e4d3d36f27cf0fcf2b66", date: new Date() },
    { hash: "777d016de7b879e4d2742fe9b4b5d2df", date: new Date() },
    { hash: "5a9edf056804093ed4f5102be9d06ed3", date: new Date() },
    { hash: "9bb6e70aad0c3a6ef10e776b57011250", date: new Date() },
    { hash: "0b43f263582ed55334b9fe6ca41ac2a6", date: new Date() },
    { hash: "1ee69676e594484030c23f1317a04894", date: new Date() },
  ]

  const pages = useMemo(() => {
    return Array.from(Array(Math.ceil(transactions.length / perPage)).keys());
  }, [transactions.length])

  return (
    <LayoutDashboard>
      <ContentBox>
        <div className={styles.balanceWrapper}>
          <p>Available Balance</p>
          <h1 className={styles.value}>
            <b>1000.00</b>
            <small className={styles.unit}>ZCN</small>
          </h1>
          <small>1 ZCN = 0.193456</small>

          <ProgressBar value="50%" labelLeft="Staked" labelRight="Available" theme="bolt"></ProgressBar>

          <div className={styles.balance}>
            <div>Total Balance</div>
            <div className={styles.total}>
              <span className={styles.currency}>$</span>
              1000.00
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
            {transactions.slice(page * perPage, (page + 1) * perPage).map((e) => (
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
            ))}
          </tbody>
        </table>

        <ul className={styles.pagination}>
          <li className={styles.previous}>
            <button>
              <Image src="/icons/icon-caret-left.svg" height={10} width={10} alt="" />
              Previous
            </button>
          </li>
          
          {pages.map((e) => (
          <li>
            <button onClick={() => setPage(e)}>{e+1}</button>
          </li>
          ))}
          
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