import { useState } from 'react'
// import { useDispatch } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import Dialog from 'components/dialog'
import Button from 'components/button'

import stl from './ConfirmTransactionDialog.module.scss'

const ConfirmTransactionDialog = ({
  walletDetails = {},
  isOpen,
  close,
  confirm,
  customClass,
}) => {
  const { t } = useTranslation('shared-components')
  // const dispatch = useDispatch()

  const [notes, setNotes] = useState()

  const onChangeNotes = e => {
    setNotes(e.target.value)
  }

  const onClose = () => {
    close()
  }

  const onConfirm = async () => {
    const transactionDetails = { ...walletDetails, notes }
    const { sendTransaction } = await import('store/transaction')
    // const { error, data } = await dispatch(sendTransaction(transactionDetails))
    // confirm(transactionDetails, data, error)
  }

  return (
    <Dialog
      isOpen={isOpen}
      close={close}
      customClass={clsx(stl.confirmTransactionDialog, customClass)}
    >
      <Dialog.Header
        title={t('dialog.send-token.confirm')}
        close={close}
        customClass={stl.header}
        customIconClass={stl.icon}
      />
      <div className={stl.flexCenterCol}>
        <div className={stl.stepIndicator}>
          <div className={stl.currentStep} />
          <div className={stl.currentStep} />
          <div className={stl.currentStep} />
        </div>
        <div className={stl.walletAddressContainer}>
          <div className={stl.addressDetailsContainer}>
            <div className={stl.addressLabel}>
              {t('dialog.send-token.send-token-to')}
            </div>

            <div className={stl.walletContent}>{walletDetails.sendAddress}</div>
          </div>
        </div>
        <div className={stl.walletAddressContainer}>
          <div className={stl.addressDetailsContainer}>
            <div className={stl.addressLabel}>
              {t('dialog.send-token.from')}
            </div>
            <div className={stl.myWalletContent}>
              {t('dialog.send-token.my-wallet')} (
              {walletDetails.coinAmount?.toFixed(2)}{' '}
              {t('dialog.send-token.zcn')})
            </div>
          </div>
        </div>
        <div className={stl.subTitle}>{t('dialog.send-token.amount')}</div>
        <div className={stl.sendAmount}>
          {walletDetails.sendAmount?.toFixed(2)}{' '}
          <div className={stl.coinSymbol}>{walletDetails.coinSymbol}</div>
        </div>
        <div className={stl.usdAmount}>
          {walletDetails.sendUsdAmount?.toFixed(2)} {t('dialog.send-token.usd')}
        </div>
        <div className={stl.walletAddressContainer}>
          <div className={stl.inputField}>
            <input
              type="text"
              id="notes"
              size={48}
              placeholder={t('dialog.send-token.add-notes')}
              onChange={onChangeNotes}
            />
          </div>
        </div>
        <div className={stl.buttonContainer}>
          <Button
            label={t('dialog.send-token.cancel')}
            color="whiteGreen"
            customClass={stl.firstButton}
            onClick={onClose}
          />
          <Button
            label={t('dialog.send-token.confirm')}
            color="green"
            customClass={stl.firstButton}
            shadowColor="green"
            onClick={onConfirm}
          />
        </div>
      </div>
    </Dialog>
  )
}

ConfirmTransactionDialog.propTypes = {
  walletDetails: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  customClass: PropTypes.string,
}

export default ConfirmTransactionDialog
