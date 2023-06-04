import React, { useContext } from 'react'
import styles from './Sidebar.module.scss'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../Button'
import clsx from 'clsx'
import { useRouter } from 'next/router'

import { ROUTES } from '../../constant/routes'

const siteMenu = [
  {
    label: 'Bolt',
    href: ROUTES.bolt,
    activeIcon: '/bolt-icon-2.svg',
    inactiveIcon: '/bolt-icon-1.svg',
    iconWidth: 32,
  },
  {
    label: 'Vult',
    href: ROUTES.vult,
    activeIcon: '/vult-icon-2.svg',
    inactiveIcon: '/vult-icon-1.svg',
    iconWidth: 27,
  },
]

const navMenu = [
  {
    label: 'Wallet Details',
    href: ROUTES.walletDetails,
    inactiveIcon: '/icons/icon-wallet-line.png',
    iconWidth: 18,
  },
  {
    label: 'Allocation Details',
    href: ROUTES.allocationDetails,
    inactiveIcon: '/icons/icon-piechart-line.svg',
    iconWidth: 20,
  },

  {
    label: 'Network Details',
    href: ROUTES.networkDetails,
    inactiveIcon: '/icons/icon-network-line.svg',
    iconWidth: 22,
  },
]

export default function Sidebar() {
  const router = useRouter()

  const isActive = path => router.pathname === path

  return (
    <div className={styles.siteSidebar}>
      <div className={styles.sidebarTop}>
        <ul className={clsx(styles.nav, styles.siteNav)}>
          {siteMenu.map(item => {
            return (
              <li
                className={isActive(item.href) ? styles.active : ''}
                key={item.label}
              >
                <Link href={item.href}>
                  <figure>
                    <Image
                      src={
                        isActive(item.href)
                          ? item.activeIcon
                          : item.inactiveIcon
                      }
                      width={item.iconWidth}
                      height={item.iconWidth}
                      alt={item.label}
                    />
                  </figure>

                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>

        <hr className={styles.ruler} />

        <ul className={styles.nav}>
          {navMenu.map(item => {
            return (
              <li key={item.label}>
                <Link href={item.href}>
                  <figure>
                    <Image
                      src={item.inactiveIcon}
                      width={item.iconWidth}
                      height={item.iconWidth}
                      alt={item.label}
                    />
                  </figure>

                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>

      <div className={styles.sidebarBottom}>
        <Button theme="bolt" onClick={() => {}}>
          Send
          <figure>
            <Image
              src="/icons/icon-arrow-right.svg"
              width="16"
              height="16"
              alt=""
            />
          </figure>
        </Button>

        <Button theme="bolt" onClick={() => {}}>
          Receive
          <figure>
            <Image
              src="/icons/icon-arrow-left.svg"
              width="16"
              height="16"
              alt=""
            />
          </figure>
        </Button>

        <Button theme="bolt" onClick={() => {}}>
          Faucet
          <figure>
            <Image src="/icons/icon-faucet.svg" width="20" height="20" alt="" />
          </figure>
        </Button>
      </div>
    </div>
  )
}
