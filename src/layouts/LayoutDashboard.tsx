import { useEffect } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'

import { Header } from 'components/Header'
import { Sidebar } from 'components/Sidebar'
import {
  SidebarContext,
  useSidebarContext,
} from 'components/Sidebar/useSidebarContext'

import { selectActiveWallet } from 'store/wallet'
import { listAllocationsFunc } from 'store/allocation'

import styles from './LayoutDashboard.module.scss'

const LayoutDashboard = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const wallet = useSelector(selectActiveWallet)

  useEffect(() => {
    const loadAllocation = async () => {
      await dispatch(listAllocationsFunc())
    }

    if (wallet.id) loadAllocation()
    else router.push('/')
  }, [router, dispatch, wallet.id])

  const { sidebarActive, toggleSidebar } = useSidebarContext()
  return (
    <>
      <SidebarContext.Provider value={{ sidebarActive, toggleSidebar }}>
        <div
          className={clsx(styles.siteWrapper, {
            sidebarActive: sidebarActive,
          })}
        >
          <Header />
          <div className={styles.contentWrapper}>
            <Sidebar />

            <main className={styles.mainWrapper}>
              {sidebarActive} {toggleSidebar}
              {children}
            </main>
          </div>
        </div>
      </SidebarContext.Provider>
    </>
  )
}

LayoutDashboard.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutDashboard
