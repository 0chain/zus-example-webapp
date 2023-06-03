import { useSelector } from 'react-redux'

import LayoutDashboard from 'layouts/LayoutDashboard'
import { ContentBox } from 'components/ContentBox'
import { ProgressBar } from 'components/ProgressBar'
import { IconUpload } from 'components/IconUpload'

import { selectActiveAllocation } from 'store/allocation'
import { bytesToString } from 'lib/utils'

import styles from './Vult.module.scss'

export default function Vult() {
  const allocation = useSelector(selectActiveAllocation)

  const totalStorage = allocation?.size
  const usedStorage = allocation?.stats?.used_size
  const usedPercentage = (usedStorage / totalStorage) * 100
  const storageString = bytesToString(totalStorage)
  const usageString = bytesToString(usedStorage)

  const expirationDate = allocation.expiration_date
    ? new Date(allocation?.expiration_date * 1000).toISOString()
    : new Date().toDateString()
  const expired = allocation?.expiration_date < new Date().getTime() / 1000

  return (
    <LayoutDashboard>
      <ContentBox>
        <div className={styles.wrapper}>
          <h1>
            <b>Allocation</b>
          </h1>
          <small>25/04/2023, 4:01 PM</small>

          <ProgressBar
            value={usedPercentage}
            labelLeft={`${usageString} KB used of ${storageString}`}
            theme="vult"
          />
        </div>
      </ContentBox>

      <div className={styles.container}>
        <div className={styles.halfCol}>
          <IconUpload type="image" label="Upload image" changeFunc={() => {}} />
        </div>

        <div className={styles.halfCol}>
          <IconUpload
            type="document"
            label="Upload document"
            changeFunc={() => {}}
          />
        </div>
      </div>
    </LayoutDashboard>
  )
}
