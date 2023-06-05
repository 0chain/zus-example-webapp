import React, { useState } from 'react'

import { Dialog } from 'components/dialog'

import { getFaucetToken } from '@zerochain/zus-sdk'

import stl from './FaucetTokenDialog.module.scss'

const FaucetTokenDialog = ({ close, setIsSuccess, setIsError }) => {
  const [amount, setAmount] = useState('')

  const onFaucet = async () => {
    try {
      await getFaucetToken(amount)
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
    <Dialog theme="bolt" close={close}>
      <Dialog.Header title="Faucet Tokens" close={close}></Dialog.Header>

      <input
        id="amount"
        name="amount"
        value={amount}
        onChange={e => setAmount(e.target.value)}
        placeholder="Amount"
        className={stl.textInputBox}
      />

      <Dialog.Footer
        actionButtonLabel="Faucet"
        actionButtonOnClick={onFaucet}
      ></Dialog.Footer>
    </Dialog>
  )
}

export default FaucetTokenDialog
