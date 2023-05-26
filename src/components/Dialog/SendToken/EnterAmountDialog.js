import { useState } from 'react'
import PropTypes from 'prop-types'
import useTranslation from 'next-translate/useTranslation'
import clsx from 'clsx'

import Dialog from 'components/dialog'
import Button from 'components/button'

import stl from './EnterAmountDialog.module.scss'

const EnterAmountDialog = ({
  walletDetails = {},
  isOpen,
  close,
  next,
  customClass,
}) => {
  const { t } = useTranslation('shared-components')

  const [errorMessage, setErrorMessage] = useState('')
  const [sendAmount, setSendAmount] = useState(
    walletDetails.coinAmount?.toFixed(2)
  )

  const onClose = () => {
    close()
  }

  const onNext = () => {
    if (sendAmount) {
      if (sendAmount <= 0) {
        setErrorMessage('Please enter the amount greater than zero')
      } else if (
        parseFloat(sendAmount) > parseFloat(walletDetails.coinAmount)
      ) {
        setErrorMessage(t('dialog.remove-stake.please-enter-valid-amount'))
      } else {
        setErrorMessage('')
        const transferDetails = {
          ...walletDetails,
          sendAmount: Number(sendAmount),
          sendUsdAmount: Number(
            (sendAmount * walletDetails.usdAmount) / walletDetails.coinAmount
          ),
        }
        next(transferDetails)
      }
    } else {
      setErrorMessage(t('dialog.remove-stake.please-enter-amount'))
    }
  }

  const onChangeAmount = e => {
    setSendAmount(e.target.value)
  }

  const onMax = () => {
    setSendAmount(walletDetails.coinAmount?.toFixed(2))
  }

  return (
    <Dialog
      isOpen={isOpen}
      close={close}
      customClass={clsx(stl.enterAmountDialog, customClass)}
    >
      <Dialog.Header
        title={t('dialog.send-token.enter-amount')}
        close={close}
        customClass={stl.header}
        customIconClass={stl.icon}
      />
      <div className={stl.flexCenterCol}>
        <div className={stl.stepIndicator}>
          <div className={stl.currentStep} />
          <div className={stl.currentStep} />
          <div className={stl.pendingStep} />
        </div>
        <div className={stl.subTitle}>
          {t('dialog.send-token.how-much-to-send')}
        </div>
        <div className={stl.sendValue}>
          <div className={stl.inputField}>
            <input
              type="text"
              id="sendAmount"
              size={7}
              value={sendAmount}
              onChange={onChangeAmount}
            />
          </div>
          <div className={stl.verticalDivider}></div>
          <div className={stl.coinSymbol}>{walletDetails.coinSymbol}</div>
          <Button
            label={t('dialog.send-token.max')}
            color="whiteGreen"
            customClass={stl.secondaryButton}
            onClick={onMax}
          />
        </div>
        <div className={stl.divider}></div>

        <div className={stl.sendAmount}>
          {sendAmount &&
            (
              (sendAmount * walletDetails.usdAmount) /
              walletDetails.coinAmount
            )?.toFixed(2)}{' '}
          {t('dialog.send-token.usd')}
        </div>
        {errorMessage && <div className={stl.errorMessage}>{errorMessage}</div>}

        <div className={stl.availableBalanceContainer}>
          <div className={stl.balanceTitle}>
            {t('dialog.send-token.available-balance')}
          </div>
          <div className={stl.balanceValue}>
            {walletDetails.coinAmount?.toFixed(2)}{' '}
            <div className={stl.coinSymbol}>{walletDetails.coinSymbol}</div>
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
            label={t('dialog.send-token.next')}
            color="green"
            customClass={stl.firstButton}
            shadowColor="green"
            onClick={onNext}
          />
        </div>
      </div>
    </Dialog>
  )
}

EnterAmountDialog.propTypes = {
  walletDetails: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  customClass: PropTypes.string,
}

export default EnterAmountDialog
