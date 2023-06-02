import PropTypes from "prop-types";
import styles from "./LayoutDashboard.module.scss";
import React from "react";
import { Header } from "components/Header";
import { Sidebar } from "components/Sidebar";
import {
  SidebarContext,
  useSidebarContext,
} from "components/Sidebar/useSidebarContext";
import clsx from "clsx";

const LayoutDashboard = ({ children }) => {
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
