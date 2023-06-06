import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Dialog from 'components/dialog'

import { selectActiveWallet } from 'store/wallet'
import { sendTransaction } from '@zerochain/zus-sdk'

import stl from './SendTokenDialog.module.scss'

const SendTokenDialog = ({ close, setIsSuccess, setIsError }) => {
  const [amount, setAmount] = useState('')
  const [clientID, setClientID] = useState('')

  const wallet = useSelector(selectActiveWallet)

  const sendTransactionClick = async () => {
    const fromWallet = {
      id: wallet?.keys?.walletId,
      public_key: wallet?.keys?.publicKey,
      secretKey: wallet?.keys?.privateKey,
    }
    try {
      await sendTransaction(fromWallet, clientID, parseInt(amount), '')
    } catch (error) {
      console.log(error)
      setIsError(true)
      close()
      return
    }

    setIsSuccess(true)
    close()
  }

  return (
    <Dialog theme="bolt" close={close} isOpen>
      <Dialog.Header title="Send ZCN"></Dialog.Header>
      <input
        id="clientID"
        name="clientID"
        value={clientID}
        onChange={e => setClientID(e.target.value)}
        placeholder="Client ID"
        className={stl.textInputBox}
      />
      <br />
      <input
        id="amount"
        name="amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Amount"
        className={stl.textInputBox}
      />

      <Dialog.Footer
        actionButtonLabel="Send"
        actionButtonOnClick={sendTransactionClick}
        cancelButtonOnClick={close}
        cancelButtonLabel="Cancel"
        theme="bolt"
      ></Dialog.Footer>
    </Dialog>
  )
}

export default SendTokenDialog
