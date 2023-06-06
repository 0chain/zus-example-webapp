import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'

import { ContentBox } from 'components/ContentBox'
import LayoutDashboard from 'layouts/LayoutDashboard'
// import { ProgressBar } from "components/ProgressBar";
// import Button from "components/Button";

import { getBalance, getUSDRate } from '@zerochain/zus-sdk'
import { selectActiveWallet } from 'store/wallet'
import { getLatestTxns } from 'store/transactions'
import { getNetwork } from 'store/zerochain'

import styles from './Bolt.module.scss'

const tokenToZcn = (token: number = 0): number =>
  parseFloat((token / Math.pow(10, 10)).toString())

export default function Bolt() {
  const [balance, setBalance] = useState(0)
  const [zcnUsdRate, setZcnUsdRate] = useState(0.14)

  const perPage = 5

  const [currentPage, setCurrentPage] = useState(1)
  const [txnsCount, setTxnsCount] = useState(20)
  const [transactions, setTransactions] = useState([])

  const dispatch = useDispatch()

  const pages = useMemo(() => {
    return Array.from(Array(Math.ceil(transactions.length / perPage)).keys())
  }, [transactions.length])

  const activeWallet = useSelector(selectActiveWallet)

  const getSetBalance = useCallback(async () => {
    const walletWalance: typeof activeWallet = await getBalance(activeWallet.id)

    const balance = tokenToZcn(
      walletWalance.balance ? walletWalance.balance : 0
    )
    const availableBalance =
      Math.floor(balance * Math.pow(10, 3)) / Math.pow(10, 3)
    setBalance(availableBalance)
  }, [activeWallet.id])

  const getUsdZcnRate = async () => {
    const rate = await getUSDRate('zcn')
    setZcnUsdRate(rate)
  }
  useEffect(() => {
    dispatch(getNetwork())
    getSetBalance()
    getUsdZcnRate()
  }, [dispatch, getSetBalance])

  const itemsPerPage = 5

  const handleSetData = useCallback(async () => {
    const params = {
      offset: (currentPage - 1) * itemsPerPage,
      limit: itemsPerPage + 1,
      sort: 'desc',
      to_client_id: activeWallet?.id,
    }

    const { data }: any = await dispatch(getLatestTxns(params))

    if (!data) {
      setTransactions([])
    } else {
      if (data?.length > itemsPerPage) {
        setTxnsCount(currentPage * itemsPerPage + data?.length)
        data.pop()
      } else {
        setTxnsCount(currentPage * itemsPerPage)
      }
      setTransactions(data)
    }
  }, [activeWallet?.id, currentPage, dispatch])

  useEffect(() => {
    handleSetData()
  }, [handleSetData])

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
            {/* <Link href="#">View all</Link> */}
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
            {transactions?.length > 0
              ? transactions
                  // .slice(page * perPage, (page + 1) * perPage)
                  .map(e => (
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
                      <td>{new Date(e?.CreatedAt).toUTCString()}</td>
                    </tr>
                  ))
              : 'fetching..'}
          </tbody>
        </table>

        <ul className={styles.pagination}>
          <li className={styles.previous}>
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(value => value - 1)}
            >
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
              <button>{currentPage}</button>
            </li>
          ))}

          <li className={styles.next}>
            <button
              disabled={transactions?.length !== itemsPerPage} //can we improve this check? //we don't kmpw the total txns, so using this hack here
              onClick={() => setCurrentPage(value => value + 1)}
            >
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
