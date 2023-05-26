import PropTypes from 'prop-types'
import clsx from 'clsx'

import Modal from 'components/modal'
import ToastBox from './ToastBox'

import stl from './Toast.module.scss'

const Toast = ({
  isOpen,
  setIsOpen,
  message,
  children,
  customIcon,
  style,
  type,
  customClass,
}) => {
  setIsOpen &&
    setTimeout(() => {
      setIsOpen(false)
    }, 5000)

  return (
    <Modal
      isOpen={isOpen}
      closeOnClickAway={false}
      customClass={stl.cleanBg}
      close={() => setIsOpen(false)}
    >
      <ToastBox
        message={message}
        type={type}
        style={style}
        customClass={clsx(stl.toast, customClass)}
        customIcon={customIcon}
      >
        {children}
      </ToastBox>
    </Modal>
  )
}

Toast.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  setIsOpen: PropTypes.func,
  message: PropTypes.string,
  children: PropTypes.node,
  style: PropTypes.object,
  type: PropTypes.oneOf([
    'success',
    'error',
    'info',
    'upload',
    'download',
    'loading',
    'custom',
  ]),
  customIcon: PropTypes.object,
  customClass: PropTypes.string,
}

export default Toast
