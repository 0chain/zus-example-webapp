import { useEffect } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import clsx from "clsx";

import { Header } from "components/Header";
import { Sidebar } from "components/Sidebar";
import {
  SidebarContext,
  useSidebarContext,
} from "components/Sidebar/useSidebarContext";

import { selectActiveWallet } from "store/wallet";

import styles from "./LayoutDashboard.module.scss";

const LayoutDashboard = ({ children }) => {
  const router = useRouter();

  const wallet = useSelector(selectActiveWallet);

  useEffect(() => {
    if (!wallet.id) router.push("/");
  }, [router, wallet.id]);

  const { sidebarActive, toggleSidebar } = useSidebarContext();
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
  );
};

LayoutDashboard.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LayoutDashboard;
