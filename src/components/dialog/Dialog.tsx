import React from 'react'
import clsx from 'clsx'

import { Modal } from 'components/Modal'
import DialogFooter from './DialogFooter'
import DialogHeader from './DialogHeader'

import stl from './Dialog.module.scss'

function Dialog({
  close,
  rounded,
  children,
  id,
  animation = 'bounce',
  theme = 'vult',
  customClass,
}) {
  return (
    <Modal title="" closeFunc={close}>
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

export default Object.assign(Dialog, {
  Header: DialogHeader,
  Footer: DialogFooter,
})
