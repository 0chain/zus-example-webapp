import React from 'react'
import styles from './Button.module.scss'
import Link from 'next/link'
import PropTypes from 'prop-types'
import clsx from 'clsx'

const Button = ({
  children,
  url,
  size,
  theme
}) => {
  return (
    <Link href={url} className={clsx(styles.btn, styles[size], styles[theme])}>{children}</Link>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  url: PropTypes.string.isRequired,
  size: PropTypes.string,
  theme: PropTypes.string
}

export default Button;