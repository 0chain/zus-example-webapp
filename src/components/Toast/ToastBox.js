import { useState } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'

import TickCircleIcon from 'assets/svg/vult/success-tick-small.svg'
import ErrorInfoIcon from 'assets/svg/vult/error-circle.svg'
import InfoIcon from 'assets/svg/vult/info.svg'
import UploadIcon from 'assets/svg/vult/upload.svg'
import DownloadIcon from 'assets/svg/vult/download.svg'
import SpinnerIcon from 'assets/svg/vult/small-spinner.svg'
import WarningIcon from 'assets/svg/vult/warning.svg'
import CrossIcon from 'assets/svg/bolt/close-button.svg'

import { removeFileOperation } from 'store/object'

import stl from './Toast.module.scss'

const ToastBox = ({
  message = 'Toast Message',
  type = 'info',
  children,
  customIcon,
  onClick,
  link,
  id,
  closeable,
  style,
  customClass,
}) => {
  const [isMouseOnClose, setIsMouseOnClose] = useState(false)
  const router = useRouter()
  const dispatch = useDispatch()

  const icon =
    (type === 'success' && <TickCircleIcon />) ||
    (type === 'error' && <ErrorInfoIcon />) ||
    (type === 'info' && <InfoIcon />) ||
    (type === 'upload' && <UploadIcon />) ||
    (type === 'download' && <DownloadIcon />) ||
    (type === 'loading' && <SpinnerIcon />) ||
    (type === 'warning' && <WarningIcon />) ||
    (type === 'custom' && customIcon)

  return (
    <div
      onClick={() => {
        if (!isMouseOnClose) {
          link && router.push(link)
          onClick && onClick()
          dispatch(removeFileOperation(id))
        }
      }}
      id={id}
      style={style}
      className={clsx(
        stl.flexStart,
        stl.toastStyles,
        stl[type],
        (link || onClick) && stl.clickable,
        customClass
      )}
    >
      {icon && <div className={stl.icon}>{icon}</div>}
      {children || <p>{message}</p>}

      {closeable && (
        <button
          className={stl.close}
          onClick={() => dispatch(removeFileOperation(id))}
          onMouseEnter={() => setIsMouseOnClose(true)}
          onMouseLeave={() => setIsMouseOnClose(false)}
        >
          <CrossIcon />
        </button>
      )}
    </div>
  )
}

ToastBox.propTypes = {
  message: PropTypes.string,
  type: PropTypes.oneOf([
    'success',
    'error',
    'info',
    'upload',
    'download',
    'loading',
    'custom',
  ]),
  children: PropTypes.node,
  customIcon: PropTypes.node,
  onClick: PropTypes.func,
  link: PropTypes.string,
  id: PropTypes.string,
  closeable: PropTypes.bool,
  style: PropTypes.object,
  customClass: PropTypes.string,
}

export default ToastBox
