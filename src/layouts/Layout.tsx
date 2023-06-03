import { useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";

import { selectActiveWallet } from "store/wallet";

import styles from "./Layout.module.scss";

const Layout = ({ children }) => {
  const router = useRouter();

  const wallet = useSelector(selectActiveWallet);

  useEffect(() => {
    if (wallet.id) router.push("/welcome");
    else if (router.asPath === "/welcome") router.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, wallet.id]);

  return (
    <div className={styles.siteWrapper}>
      <div className={styles.contentWrapper}>{children}</div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
