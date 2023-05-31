import React, { useContext, useState } from 'react'
import styles from './Sidebar.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../Button'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import format from 'date-fns/format'

import { ROUTES } from '../../constant/routes'
import { SidebarContext } from './useSidebarContext'
import dynamic from 'next/dynamic'
import Modal from '../Modal2'

const SendTokenDialog = dynamic(() => import('../Dialog/SendToken'))
const EnterAmountDialog = dynamic(() => import('../Dialog/SendToken/EnterAmountDialog'))
const ConfirmTransactionDialog = dynamic(() => import('../Dialog/SendToken/ConfirmTransactionDialog'))

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

  const isActive = path => router.pathname === path

  // const [isSendOpen, setIsSendOpen] = useState(false)
  const [walletDetails, setWalletDetails] = useState({})
  const [selectedSenderAddress, setSelectedSenderAddress] = useState({})
  const [isSendTokenDialogOpen, setIsSendTokenDialogOpen] = useState(false)
  const [isEnterAmountDialogOpen, setIsEnterAmountDialogOpen] = useState(false)
  const closeEnterAmountDialogModal = () => setIsEnterAmountDialogOpen(false)
  const [selectedTransferDetails, setSelectedTransferDetails] = useState({})
  const [isConfirmTransactionDialogOpen, setIsConfirmTransactionDialogOpen] =
    useState(false)
  const closeConfirmTransactionDialogModal = () =>
    setIsConfirmTransactionDialogOpen(false)
  const [confirmedTransactionDetails, setConfirmedTransactionDetails] =
    useState({})
    const [showConfirmationToast, setShowConfirmationToast] = useState(false)


  const closeSendTokenDialogModal = () => setIsSendTokenDialogOpen(false)

  const handleSend = () => setIsSendTokenDialogOpen(true)
  const onSendTokenDialogNext = (walletDetails, address) => {
    setWalletDetails(walletDetails)
    setSelectedSenderAddress(address)
    setIsSendTokenDialogOpen(false)
    setIsEnterAmountDialogOpen(true)
  }

  const onEnterAmountDialogNext = transferDetails => {
    setSelectedTransferDetails(transferDetails)
    setIsEnterAmountDialogOpen(false)
    setIsConfirmTransactionDialogOpen(true)
  }

  const onConfirmTransactionDialogConfirm = (
    transactionDetails,
    responseData,
    responseError
  ) => {
    if (responseError) {
      // setShowErrorToast(true)
    } else {
      setConfirmedTransactionDetails({
        ...transactionDetails,
        transactionNumber: responseData.hash,
        transactionDate: format(
          new Date(responseData.creation_date * 1000),
          'MMM do, yyyy, h:mm aaa'
        ),
        status: 'layout.confirmed',
        ...responseData,
      })
      setTimeout(() => {
        // dispatch(getTxnByWalletId())
        setIsConfirmTransactionDialogOpen(false)
        // setShowConfirmationToast(true)
        alert('Transaction Sent')
      }, 1000)
      setTimeout(() => {
        // dispatch(getBalance())
      }, 2000)
    }
  }

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

      <div id='modal' />

      <SendTokenDialog
        isOpen={isSendTokenDialogOpen}
        close={closeSendTokenDialogModal}
        next={onSendTokenDialogNext}
        customClass={styles.sendTokenDialog}
        id="sendTokenDialog"
      />

      <EnterAmountDialog
        walletDetails={{
          ...walletDetails,
          sendAddress: selectedSenderAddress,
        }}
        isOpen={isEnterAmountDialogOpen}
        close={closeEnterAmountDialogModal}
        next={onEnterAmountDialogNext}
        customClass={styles.sendTokenDialog}
      />

      <ConfirmTransactionDialog
        walletDetails={selectedTransferDetails}
        isOpen={isConfirmTransactionDialogOpen}
        close={closeConfirmTransactionDialogModal}
        confirm={onConfirmTransactionDialogConfirm}
        customClass={styles.sendTokenDialog}
      />

      <div className={styles.sidebarBottom}>
        <Button size='large' theme="bolt" onClick={handleSend}>
          Send
          <figure>
            <Image src="/icons/icon-arrow-right.svg" width="16" height="16" alt="" />
          </figure>
        </Button>

        <Button size='large' theme="bolt">
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