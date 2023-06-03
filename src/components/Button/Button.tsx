import React from 'react'
import styles from './Button.module.scss'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const Button = ({
  id,
  name,
  children,
  onClick,
  size,
  theme = 'default',
  fullWidth,
  disabled,
  disableBg,
}) => {
  return (
    <>
      <button
        id={id}
        type="submit"
        className={clsx(
          styles.btn,
          styles[size],
          styles[theme],
          disableBg && styles.transparent,
          fullWidth && styles.fullWidth
        )}
        disabled={disabled}
        onClick={onClick}
        name={name}
      >
        {children}
      </button>
    </>
  )
}

Button.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  size: PropTypes.string,
  theme: PropTypes.oneOf(['default', 'bolt', 'vult', 'white']),
  fullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  disableBg: PropTypes.bool,
}

export default Button
