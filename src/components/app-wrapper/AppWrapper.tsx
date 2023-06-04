import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { init, setWallet } from '@zerochain/zus-sdk'

import { selectActiveWallet } from 'store/wallet'
import { config } from 'constant/config'

const AppWrapper = ({ children }) => {
  const wallet = useSelector(selectActiveWallet)

  useEffect(() => {
    const initializeApp = async () => {
      await init(config)
      await setWallet(
        wallet.id,
        wallet.keys.privateKey,
        wallet.keys.publicKey,
        wallet.mnemonic
      )
    }

    console.log('hello')

    initializeApp()
  }, [wallet])

  return <>{children}</>
}

AppWrapper.propTypes = { children: PropTypes.any }

export default AppWrapper
