import React, { useContext, useState } from 'react'
import styles from './Sidebar.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../Button'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import { ROUTES } from '../../constant/routes'
import { SidebarContext } from './useSidebarContext'
import { AppContext } from "@/components/App/App";
import Modal from '../Modal2'
import LoadingBox from '../loading-box'
import Input from '../Input'

// const SendTokenDialog = dynamic(() => import('../Dialog/SendToken'))
// const EnterAmountDialog = dynamic(() => import('../Dialog/SendToken/EnterAmountDialog'))
// const ConfirmTransactionDialog = dynamic(() => import('../Dialog/SendToken/ConfirmTransactionDialog'))

const siteMenu = [
  {
    'label': 'Bolt',
    'href': ROUTES.bolt,
    'activeIcon': '/bolt-icon-2.svg',
    'inactiveIcon': '/bolt-icon-1.svg',
    'iconWidth': 32
  },
  {
    'label': 'Vult',
    'href': ROUTES.vult,
    'activeIcon': '/vult-icon-2.svg',
    'inactiveIcon': '/vult-icon-1.svg',
    'iconWidth': 27
  },
];

const navMenu = [
  {
    'label': 'Wallet Details',
    'href': ROUTES.walletDetails,
    'inactiveIcon': '/icons/icon-wallet-line.png',
    'iconWidth': 18
  },
  {
    'label': 'Allocation Details',
    'href': ROUTES.allocationDetails,
    'inactiveIcon': '/icons/icon-piechart-line.svg',
    'iconWidth': 20
  },

  {
    'label': 'Network Details',
    'href': ROUTES.networkDetails,
    'inactiveIcon': '/icons/icon-network-line.svg',
    'iconWidth': 22
  },
];

export default function Sidebar() {
  const router = useRouter()
  const { sidebarActive } = useContext(SidebarContext)
  const app = useContext(AppContext);

  const isActive = path => router.pathname === path

  const [isSendOpen, setIsSendOpen] = useState(false)
  const [isReceiveOpen, setIsReceiveOpen] = useState(false)
  const [loading, setLoading] = useState(false)


  const [receiverId, setReceiverId] = useState("")
  const [amount, setAmount] = useState(0)



  const handleSend = () => {
    setLoading(true)
  }

  const handleCopy = (value) => {
    const textArea = document.createElement('textarea')
    textArea.value = value

    document.body.appendChild(textArea)
    textArea.select()

    document.execCommand('copy')
    textArea.remove()
  }

  // const [selectedSenderAddress, setSelectedSenderAddress] = useState({})
  // const [selectedTransferDetails, setSelectedTransferDetails] = useState({})
  // const [confirmedTransactionDetails, setConfirmedTransactionDetails] = useState({})
  // const [showConfirmationToast, setShowConfirmationToast] = useState(false)
  // const [showErrorToast, setShowErrorToast] = useState(false)

  // const handleSend = () => setIsSendTokenDialogOpen(true)
  // const handleReceive = () => setIsReceiveTokenDialogOpen(true)

  // const onSendTokenDialogNext = (walletDetails, address) => {
  //   setWalletDetails(walletDetails)
  //   setSelectedSenderAddress(address)
  //   setIsSendTokenDialogOpen(false)
  //   setIsEnterAmountDialogOpen(true)
  // }

  // const onEnterAmountDialogNext = transferDetails => {
  //   setSelectedTransferDetails(transferDetails)
  //   setIsEnterAmountDialogOpen(false)
  //   setIsConfirmTransactionDialogOpen(true)
  // }

  // const onConfirmTransactionDialogConfirm = (
  //   transactionDetails,
  //   responseData,
  //   responseError
  // ) => {
  //   if (responseError) {
  //     setShowErrorToast(true)
  //   } else {
  //     setConfirmedTransactionDetails({
  //       ...transactionDetails,
  //       transactionNumber: responseData.hash,
  //       transactionDate: format(
  //         new Date(responseData.creation_date * 1000),
  //         'MMM do, yyyy, h:mm aaa'
  //       ),
  //       status: t('layout.confirmed'),
  //       ...responseData,
  //     })
  //     setTimeout(() => {
  //       dispatch(getTxnByWalletId())
  //       setIsConfirmTransactionDialogOpen(false)
  //       setShowConfirmationToast(true)
  //     }, 1000)
  //     setTimeout(() => {
  //       dispatch(getBalance())
  //     }, 2000)
  //   }
  // }

  // const viewTransaction = () => {
  //   console.log('confirmedTransactionDetails', confirmedTransactionDetails)
  //   setShowConfirmationToast(false)
  //   setIsTransactionConfirmedDialogOpen(true)
  // }

  return (
    <div className={styles.siteSidebar}>
      <div className={styles.sidebarTop}>
        <ul className={clsx(styles.nav, styles.siteNav)}>
          {
            siteMenu.map((item) => {
              return <li className={isActive(item.href) ? styles.active : ''} key={item.label}>
                <Link href={item.href}>
                  <figure>
                    <Image src={isActive(item.href) ? item.activeIcon : item.inactiveIcon} width={item.iconWidth} height={item.iconWidth} alt={item.label} />
                  </figure>

                  <span>{item.label}</span>
                </Link>
              </li>
            })
          }
        </ul>

        <Modal isOpen={isSendOpen} close={() => setIsSendOpen(false)} selector='#send-modal'>
          {loading ? <LoadingBox label='Making Transaction' /> : <div className={styles.sendTokenContainer}>
            <div className={styles.sendTokenheading}>
              <h2>Send Token</h2>
            </div>
            <div className={styles.sendTokenFormContainer}>
              <form className={styles.sendTokenForm}>
                <Input name='Receiver ID' title='Receiver ID' placeholder='Enter Client ID of Receiver' onChange={e => setReceiverId(e)} defaultValue={receiverId} />
                <Input name='Amount' title='Amount' placeholder='Enter Amount' onChange={e => setAmount(e)} defaultValue={receiverId} type='number' />
                <div className={styles.buttonArea}>
                  <button className={styles.endButton} type="button" onClick={handleSend}>
                    Send
                  </button>
                  {/* <button className={styles.cancelButton} type="button" onClick={() => setIsSendOpen(false)}>
                    Cancel
                  </button> */}
                </div>
              </form>
            </div>
          </div>}
        </Modal>

        <Modal isOpen={isReceiveOpen} close={() => setIsReceiveOpen(false)} selector='#send-modal'>
          <div className={styles.receiveModalContainer}>
            {app.wallet.id}
          </div>
          <button className={styles.copyButton} onClick={()=>handleCopy(app.wallet.id)}>

          </button>
        </Modal>

        <hr className={styles.ruler} />

        <ul className={styles.nav}>
          {
            navMenu.map((item) => {
              return <li key={item.label} className={isActive(item.href) ? styles.active : ''}>
                <Link href={item.href}>
                  <figure>
                    <Image src={item.inactiveIcon} width={item.iconWidth} height={item.iconWidth} alt={item.label} />
                  </figure>

                  <span>{item.label}</span>
                </Link>
              </li>
            })
          }
        </ul>
      </div>



      <div className={styles.sidebarBottom}>
        <Button size='large' theme="bolt" onClick={() => {
          setIsSendOpen(true)
        }}>
          Send
          <figure>
            <Image src="/icons/icon-arrow-right.svg" width="16" height="16" alt="" />
          </figure>
        </Button>

        <Button size='large' theme="bolt" onClick={() => setIsReceiveOpen(true)}>
          Receive
          <figure>
            <Image src="/icons/icon-arrow-left.svg" width="16" height="16" alt="" />
          </figure>
        </Button>

        <Button size='large' theme="bolt">
          Faucet
          <figure>
            <Image src="/icons/icon-faucet.svg" width="20" height="20" alt="" />
          </figure>
        </Button>
      </div>
    </div>
  )
}