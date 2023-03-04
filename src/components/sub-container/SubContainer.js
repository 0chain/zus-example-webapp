import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./SubContainer.module.scss";

const SubContainer = ({ title, content }) => {
  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.label)}>
        <span className={clsx(styles.label1)}>{title}</span>
        <span className={clsx(styles.label2)}>{content}</span>
      </div>
    </div>
  );
};

SubContainer.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
};

export default SubContainer;
