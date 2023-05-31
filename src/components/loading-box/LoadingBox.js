import PropTypes from 'prop-types'
import clsx from 'clsx'

import stl from './LoadingBox.module.scss'

const LoadingBox = ({
  variant = 'light',
  title,
  label = 'This might take a few minutes.',
  customClass,
  spinnerAlternate,
  labelClass,
  titleClass,
  children,
}) => (
  <div
    className={clsx(
      stl.loadingBox,
      variant === 'light' && stl.light,
      customClass
    )}
  >
    {spinnerAlternate ? (
      <div>{spinnerAlternate}</div>
    ) : (
      <div className={stl.spinner}>
        <span />
      </div>
    )}
    {title && <h3 className={clsx(titleClass)}>{title}</h3>}
    <span className={clsx(stl.label, labelClass)}>{label}</span>
    {children}
  </div>
)

LoadingBox.propTypes = {
  variant: PropTypes.oneOf(['dark', 'light']),
  title: PropTypes.string,
  label: PropTypes.string,
  customClass: PropTypes.string,
  spinnerAlternate: PropTypes.string,
  children: PropTypes.node,
  labelClass: PropTypes.string,
  titleClass: PropTypes.string,
}

export default LoadingBox
