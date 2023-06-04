import React, { useMemo, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import styles from './Bolt.module.scss'
import { ContentBox } from 'components/ContentBox'
import LayoutDashboard from 'layouts/LayoutDashboard'
// import { ProgressBar } from "components/ProgressBar";
import Link from 'next/link'
import Image from 'next/image'

import { getBalance, getUSDRate } from '@zerochain/zus-sdk'

import { selectActiveWallet } from 'store/wallet'

// import { Button } from "components/Button";

const tokenToZcn = (token: number = 0): number =>
  parseFloat((token / Math.pow(10, 10)).toString())

export default function Bolt() {
  const [page, setPage] = useState(1)
  const [balance, setBalance] = useState(0)
  const [zcnUsdRate, setZcnUsdRate] = useState(0.14)
  const perPage = 5

  const state = useSelector(state => state)

  const transactions = [
    { hash: '169de9f0438b2cc7c8e1467cecbb7634', date: new Date() },
    { hash: '308097ddf0a90fbf48b01913a6986102', date: new Date() },
    { hash: '4281a4e9f4040ecb6cbcc15ee51a8a7b', date: new Date() },
    { hash: 'a4619264e742e4d3d36f27cf0fcf2b66', date: new Date() },
    { hash: '777d016de7b879e4d2742fe9b4b5d2df', date: new Date() },
    { hash: '5a9edf056804093ed4f5102be9d06ed3', date: new Date() },
    { hash: '9bb6e70aad0c3a6ef10e776b57011250', date: new Date() },
    { hash: '0b43f263582ed55334b9fe6ca41ac2a6', date: new Date() },
    { hash: '1ee69676e594484030c23f1317a04894', date: new Date() },
  ]

  const pages = useMemo(() => {
    return Array.from(Array(Math.ceil(transactions.length / perPage)).keys())
  }, [transactions.length])

  const activeWallet = useSelector(selectActiveWallet)

  const getSetBalance = async () => {
    const walletWalance: typeof activeWallet = await getBalance(
      '615b065dbfa3e6a115efb1a118f645146f1fbcc7b7a3227fcbc1c701c7f15ed5'
    )

    //  await  getBalance(activeWallet.id);
    const balance = tokenToZcn(
      walletWalance.balance ? walletWalance.balance : 0
    )
    const availableBalance =
      Math.floor(balance * Math.pow(10, 3)) / Math.pow(10, 3)
    setBalance(availableBalance)
  }

  const getUsdZcnRate = async () => {
    const rate = await getUSDRate('zcn') //here's the problem
    console.log(rate, 'rate')
    setZcnUsdRate(0.135)
  }
  useEffect(() => {
    getSetBalance()
    getUsdZcnRate()
  }, [])
  return (
    <LayoutDashboard>
      <ContentBox>
        <div className={styles.balanceWrapper}>
          <p>Available Balance</p>
          <h1 className={styles.value}>
            <b>{balance}</b>
            <small className={styles.unit}>ZCN</small>
          </h1>
          <small>1 ZCN = {zcnUsdRate}</small>

          {/* <ProgressBar
            value="50%"
            labelLeft="Staked"
            labelRight="Available"
            theme="bolt"
          ></ProgressBar> */}

          <div className={styles.balance}>
            <div>Total Balance</div>
            <div className={styles.total}>
              <span className={styles.currency}>$</span>
              {(balance * zcnUsdRate).toFixed(5)}
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
            {transactions.slice(page * perPage, (page + 1) * perPage).map(e => (
              <tr key={e.hash}>
                <td className={styles.hash}>
                  {e.hash}
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(e.hash)
                    }}
                  >
                    <Image
                      src="/icons/icon-document.svg"
                      height={17}
                      width={17}
                      alt=""
                    />
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
              <Image
                src="/icons/icon-caret-left.svg"
                height={10}
                width={10}
                alt=""
              />
              Previous
            </button>
          </li>

          {pages.map(e => (
            <li key={e}>
              <button onClick={() => setPage(e)}>{e + 1}</button>
            </li>
          ))}

          <li className={styles.next}>
            <button>
              Next
              <Image
                src="/icons/icon-caret-right.svg"
                height={10}
                width={10}
                alt=""
              />
            </button>
          </li>
        </ul>
      </div>
    </LayoutDashboard>
  )
}
