import { useState } from 'react'
import { useDispatch } from 'react-redux'

import Dialog from 'components/dialog'

import { getFaucetToken } from '@zerochain/zus-sdk'
import { getBalanceFunc } from 'store/wallet'

import stl from './FaucetTokenDialog.module.scss'

const FaucetTokenDialog = ({ close, setIsSuccess, setIsError }) => {
  const dispatch = useDispatch()

  const [amount, setAmount] = useState(10)

  const onFaucet = async () => {
    try {
      await getFaucetToken(amount)
      await dispatch(getBalanceFunc())
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
    <Dialog theme="bolt" close={close} isOpen customClass={stl.faucetDialog}>
      <Dialog.Header title="Faucet Tokens"></Dialog.Header>

      <input
        id="amount"
        name="amount"
        type="number"
        value={amount}
        onChange={e => setAmount(Number(e.target.value))}
        placeholder="Amount"
        className={stl.textInputBox}
      />

      <Dialog.Footer
        actionButtonLabel="Faucet"
        actionButtonOnClick={onFaucet}
        cancelButtonOnClick={close}
        cancelButtonLabel="Cancel"
        theme="bolt"
      ></Dialog.Footer>
    </Dialog>
  )
}

export default FaucetTokenDialog
