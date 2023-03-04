import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

import styles from "./TextArea.module.scss";

const TextArea = ({
  id,
  title,
  value,
  setValue,
  errorMessage,
  ...inputProps
}) => {
  const handleOnChange = (e) => {
    // if (onChange) {
    //   onChange(e);
    // }

    if (setValue) {
      setValue(e.target.value);
    }
  };

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.inputLabel)}>
        <span>{title}</span>
      </div>
      <div className={clsx(styles.inputWrapper)}>
        <textarea
          id={id}
          value={value}
          onChange={(e) => handleOnChange(e)}
          {...inputProps}
        />
      </div>
      {errorMessage && (
        <span className={styles.error} data-testid="inputErrorMessage">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

TextArea.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  value: PropTypes.any,
  setValue: PropTypes.func,
  errorMessage: PropTypes.string,
};

export default TextArea;
