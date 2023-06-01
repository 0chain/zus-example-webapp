import React from 'react'
import LayoutDashboard from '@/layouts/LayoutDashboard'
import { ContentBox } from '@/components/ContentBox'
import styles from './Details.module.scss'

const AllocationDetails = () => {
  const details = [
    {
      label: "Allocation ID",
      value: "5ababb1e99fe08e44b9843a0a365a83"
    },
    {
      label: "Expiration Date",
      value: "13 May 2023"
    },
    {
      label: "Size",
      value: "214.7 MB"
    },
    {
      label: "Used Size",
      value: "Zero KB"
    }
  ]

  const shardDetails = [
    {
      label: "Data Shards",
      value: "2"
    },
    {
      label: "Parity Shards",
      value: "2"
    },
    {
      label: "Number of Writes",
      value: "0"
    },
    {
      label: "Number of Reads",
      value: "0"
    },
    {
      label: "Number of Failed Challenges",
      value: "0"
    },
    {
      label: "Latest Closed Challenge",
      value: ""
    }
  ]

  return (
    <LayoutDashboard>
      <ContentBox>
        <div className={styles.wrapper}>
          <h1><b>Allocation Details</b></h1>

          <div className={styles.list}>
            <h6>Details</h6>

            <div className={styles.items}>
              {details.map((item) => {
                return (
                  <div className={styles.item}>
                    <div className={styles.label}>{item.label}:</div>
                    <div className={styles.value}>{item.value}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className={styles.list}>
            <h6>Shards and Challenges</h6>

            <div className={styles.items}>
              {shardDetails.map((item) => {
                return (
                  <div className={styles.item}>
                    <div className={styles.label}>{item.label}:</div>
                    <div className={styles.value}>{item.value}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </ContentBox>
    </LayoutDashboard>
  )
}

export default AllocationDetails