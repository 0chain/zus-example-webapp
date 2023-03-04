import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./Container.module.scss";

const Container = ({ title, subtitle, children }) => {
  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.label)}>
        <span className={clsx(styles.label1)}>{title}</span>
        <span className={clsx(styles.label2)}>{subtitle}</span>
      </div>
      {children}
    </div>
  );
};

Container.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

export default Container;
