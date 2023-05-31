import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useTranslation from 'next-translate/useTranslation'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import Dialog from 'components/dialog'
import Button from 'components/button'
import Toast from 'components/toast'

import { selectActiveWallet, getBalance } from 'store/wallet'
import { getBlobbers, selectZcnPrice } from 'store/zerochain'
import { tokenToZcn, isWalletID } from 'lib/utils'

import stl from './SendTokenDialog.module.scss'

const SendTokenDialog = ({ isOpen, close: onClose, next, customClass, id }) => {
  const { t } = useTranslation('shared-components')
  const dispatch = useDispatch()
  const [address, setAddress] = useState()
  const [showErrorToast, setShowErrorToast] = useState(false)

  const activeWallet = useSelector(selectActiveWallet)
  const activeBalance = useSelector(({ wallet }) => wallet.activeBalance)
  const zcnPrice = useSelector(selectZcnPrice)

  const walletDetails = {
    coinAmount: tokenToZcn(activeBalance.balance),
    coinSymbol: 'ZCN',
    usdAmount: Number(zcnPrice),
  }

  useEffect(() => {
    if (activeWallet.id) {
      dispatch(getBalance())
      dispatch(getBlobbers())
    }
  }, [activeWallet.id, dispatch])

  const nextStep = () => {
    const isValid = isWalletID(address)
    if (isValid) {
      next(walletDetails, address)
      setAddress('')
    } else {
      setShowErrorToast(true)
    }
  }

  return (
    <Dialog
      id={id}
      isOpen={isOpen}
      close={() => {
        onClose()
        setAddress('')
      }}
      customClass={clsx(stl.sendTokenDialog, customClass)}
    >
      <Dialog.Header
        title={t('dialog.send-token.send-token')}
        close={() => {
          onClose()
          setAddress('')
        }}
        customClass={stl.header}
        customIconClass={stl.icon}
      />
      <div className={stl.flexCenterCol}>
        <div className={stl.stepIndicator}>
          <div className={stl.currentStep} />
          <div className={stl.pendingStep} />
          <div className={stl.pendingStep} />
        </div>
        <div className={stl.walletAddressContainer}>
          <div className={stl.addressDetailsContainer}>
            <div className={stl.addressLabel}>
              {t('dialog.send-token.from')}
            </div>
            <div className={stl.myWalletContent} data-testid="fromAddress">
              {t('dialog.send-token.my-wallet')} (
              {walletDetails.coinAmount?.toFixed(2)} {walletDetails.coinSymbol})
            </div>
          </div>
        </div>
        <div className={stl.walletAddressContainer}>
          <div className={stl.inputField}>
            <input
              type="text"
              id="searchAddress"
              size={48}
              placeholder={t('dialog.send-token.paste-an-address')}
              data-testid="searchAddress"
              value={address}
              onChange={event => setAddress(event.target.value)}
            />
          </div>
        </div>
        <div className={stl.buttonContainer}>
          <Button
            label={t('dialog.send-token.cancel')}
            color="whiteGreen"
            customClass={stl.firstButton}
            onClick={() => {
              onClose()
              setAddress('')
            }}
          />
          <Button
            disabled={!address}
            label={t('dialog.send-token.next')}
            color="green"
            customClass={stl.firstButton}
            shadowColor="green"
            onClick={nextStep}
          />
        </div>
      </div>
      {showErrorToast && (
        <Toast
          type="error"
          customClass={stl.confirmationToast}
          isOpen={showErrorToast}
          setIsOpen={setShowErrorToast}
        >
          <>
            <p>{t('dialog.send-token.please-enter-valid-address')}</p>
          </>
        </Toast>
      )}
    </Dialog>
  )
}

SendTokenDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  next: PropTypes.func.isRequired,
  customClass: PropTypes.string,
  id: PropTypes.string,
}

export default SendTokenDialog
