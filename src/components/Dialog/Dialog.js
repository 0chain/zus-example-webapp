import { useEffect } from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import Modal from '../Modal2'
import DialogFooter from './DialogFooter'
import DialogHeader from './DialogHeader'

import stl from './Dialog.module.scss'

const Dialog = ({
  isOpen,
  close,
  closeOnClickAway,
  customClass,
  rounded,
  children,
  id,
  animation = 'bounce',
  theme = 'vult',
}) => {
  useEffect(() => {
    const handleEsc = e =>
      e.keyCode === 27 && !closeOnClickAway && isOpen && close()

    document.addEventListener('keydown', handleEsc)
    return () => document.removeEventListener('keydown', handleEsc)
  }, [close, closeOnClickAway, isOpen])

  return (
    <Modal isOpen={isOpen} close={close} closeOnClickAway={closeOnClickAway}>
      <div
        id={id}
        className={clsx(
          stl.content,
          customClass,
          animation && stl[animation],
          rounded && stl.rounded,
          stl[`${theme}Theme`]
        )}
      >
        {children}
      </div>
    </Modal>
  )
}

Dialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  closeOnClickAway: PropTypes.bool,
  customClass: PropTypes.string,
  rounded: PropTypes.bool,
  id: PropTypes.string,
  animation: PropTypes.oneOf([
    'blowUp',
    'bounce',
    'jump',
    'fallFromTop',
    'growFromBottom',
    'slideFromLeft',
    'slideFromRight',
    'rotateFromLeftTop',
    'rotateFromLeftBottom',
    'rotateFromRightTop',
    'rotateFromRightBottom',
  ]),
  theme: PropTypes.oneOf(['vult', 'blimp', 'bolt']),
}

export default Object.assign(Dialog, {
  Header: DialogHeader,
  Footer: DialogFooter,
})
