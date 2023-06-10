import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { init, setWallet } from '@zerochain/zus-sdk'

import { selectActiveWallet } from 'store/wallet'
import { config } from 'constant/config'
import { setWasmInitStatus } from 'store/zerochain'

const AppWrapper = ({ children }) => {
  const wallet = useSelector(selectActiveWallet)
  const dispatch = useDispatch()

  const isMounted = useRef(false)

  useEffect(() => {
    const initializeApp = async () => {
      dispatch(setWasmInitStatus(true))
      await init(config)
      dispatch(setWasmInitStatus(false))

      if (wallet.id) {
        await setWallet(
          wallet.id,
          wallet.keys.privateKey,
          wallet.keys.publicKey,
          wallet.mnemonic
        )
      }
    }

    if (isMounted.current) initializeApp()
    else isMounted.current = true
  }, [
    dispatch,
    wallet.id,
    wallet.keys.privateKey,
    wallet.keys.publicKey,
    wallet.mnemonic,
  ])

  return <>{children}</>
}

AppWrapper.propTypes = { children: PropTypes.any }

export default AppWrapper
