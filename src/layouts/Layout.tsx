import PropTypes from 'prop-types'

import styles from './Layout.module.scss'

const Layout = ({ children }) => {
  return (
    <div className={styles.siteWrapper}>
      <div className={styles.contentWrapper}>{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
