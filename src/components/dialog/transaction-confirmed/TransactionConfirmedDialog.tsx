import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import Link from 'next/link'
import format from 'date-fns/format'

import Dialog from 'components/dialog'
import Button from 'components/Button'

import LinkingIcon from 'assets/svg/bolt/linking.svg'

import { getTxnByHash } from 'store/transactions'
import { getTransactionAmount, formatUUIDAddress } from 'lib/utils'
import { tokenToZcn } from 'lib/utils/token'

import stl from './TransactionConfirmedDialog.module.scss'

const TransactionConfirmedDialog = ({
  transactionDetails = {},
  isOpen,
  close,
  customClass,
  theme = 'bolt',
  zcnPrice,
}) => {
  const dispatch = useDispatch()
  const { activeWalletId } = useSelector(state => state.wallet)
  const [transactionInfo, setTransactionInfo] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  const txnHash = transactionDetails?.transactionNumber
  const atlusUrl = `https://demo.atlus.cloud`

  useEffect(() => {
    const loadData = async () => {
      if (txnHash) {
        setTransactionInfo({})
        const { data, error }: any = await dispatch(getTxnByHash(txnHash))
        if (data && !error) {
          const transactionAmount = getTransactionAmount(data)
          setTransactionInfo({
            coinAmount: transactionDetails.coinAmount,
            coinSymbol: 'ZCN',
            sendAmount: transactionAmount,
            sendUsdAmount: Number(transactionAmount * zcnPrice),
            sendAddress: data.to_client_id,
            clientId: data.client_id,
            notes: transactionDetails.notes,
            transactionNumber: txnHash,
            status: data.status === 1 ? 'Confirmed' : 'Failed',
            transactionDate: format(
              new Date(data.CreatedAt),
              'MMM dd, yyyy hh:mm aaa'
            ),
          })
        }
      }
      setIsLoading(false)
    }
    setIsLoading(true)
    setTimeout(() => {
      loadData()
    }, 3000)
  }, [dispatch, txnHash, transactionDetails, zcnPrice])

  const onClose = () => {
    close()
  }

  const headerTitle = `${'Confirmed'}#
  ${transactionDetails.transactionNumber}`
  return (
    <Dialog
      isOpen={isOpen}
      close={close}
      customClass={clsx(stl.transactionConfirmedDialog, customClass)}
      theme={theme}
    >
      <Dialog.Header
        title={headerTitle}
        customClass={stl.header}
        customIconClass={stl.icon}
        customTitleClass={stl.heading}
      />
      {isLoading ? (
        <div className={stl.flexCenterCol}>
          <div className={stl.loadingContainer}>Loading..</div>
        </div>
      ) : (
        <div className={stl.flexCenterCol}>
          {transactionInfo.notes && (
            <div className={stl.walletAddressContainer}>
              <div className={stl.notesDetailsContainer}>
                <div className={stl.columnLabel}>Notes</div>
                <div className={stl.columnContent}>{transactionInfo.notes}</div>
              </div>
            </div>
          )}
          <div className={stl.walletAddressContainer}>
            <div className={stl.leftContainer}>
              <div className={stl.columnLabel}>From</div>
              <div className={stl.columnContent}>
                {transactionInfo.clientId === activeWalletId
                  ? 'My Wallet'
                  : formatUUIDAddress(transactionInfo.clientId)}
              </div>
            </div>
            <div className={stl.rightContainer}>
              <div className={stl.columnLabel}>To</div>
              <div className={clsx(stl.columnContent, stl.walletAddress)}>
                {transactionInfo.sendAddress === activeWalletId
                  ? 'My Wallet'
                  : transactionInfo.sendAddress}
              </div>
            </div>
          </div>
          <div className={stl.walletAddressContainer}>
            <div className={stl.leftContainer}>
              <div className={stl.columnLabel}>Status</div>
              <div className={stl.columnContent}>{transactionInfo.status}</div>
            </div>
            <div className={stl.rightContainer}>
              <div className={stl.columnLabel}>Date</div>
              <div className={stl.columnContent}>
                {transactionInfo.transactionDate}
              </div>
            </div>
          </div>
          <div className={stl.subTitle}>Amount</div>
          <div className={stl.coinAmount}>
            {transactionInfo.sendAmount
              ? transactionInfo.sendAmount?.toFixed(2)
              : 0}{' '}
            <div className={stl.coinSymbol}>{transactionInfo.coinSymbol}</div>
          </div>
          <div className={stl.usdAmount}>
            {transactionInfo.sendUsdAmount
              ? transactionInfo.sendUsdAmount?.toFixed(2)
              : 0}{' '}
            USD
          </div>
          <Button theme="bolt" customClass={stl.firstButton}>
            <Link
              href={`${atlusUrl}/transaction-details/${transactionDetails.transactionNumber}`}
            >
              {/* <a target="_blank" rel="noreferrer"> */}
              <div className={stl.flexCenter}>
                <div className={stl.buttonIcon}>
                  <LinkingIcon height={18} />
                </div>
                <div>View On Explorer</div>
              </div>
              {/* </a> */}
            </Link>
          </Button>
          <Button theme="bolt" customClass={stl.firstButton} onClick={onClose}>
            Close
          </Button>
        </div>
      )}
    </Dialog>
  )
}

TransactionConfirmedDialog.propTypes = {
  transactionDetails: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  customClass: PropTypes.string,
  zcnPrice: PropTypes.number,
  theme: PropTypes.string,
}

export default TransactionConfirmedDialog
