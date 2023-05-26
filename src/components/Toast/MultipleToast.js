import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import clsx from 'clsx'

import Modal from 'components/modal'
import ToastBox from './ToastBox'

import stl from './Toast.module.scss'

import { selectFileOps } from 'store/object'
import { generateRandomString } from 'lib/utils'

const RenderToast = ({ toastArray }) => {
  return toastArray.map((toast, i) => {
    const timeout =
      toast.setIsOpenFn && setTimeout(() => toast.setIsOpenFn(false), 5000)
    toast.setIsOpenFn && timeout()

    return (
      <div className={stl.toastItem} key={i}>
        <Modal
          isOpen={true}
          closeOnClickAway={false}
          customClass={clsx(stl.cleanBg, stl.toastList)}
          close={() => toast.setIsOpenFn(false)}
          selector="#toasts"
        >
          <ToastBox
            style={{ marginBottom: `${i * 100}px` }} // @todo: fix by calculating height of toast box
            type={toast.type}
            variant={toast.variant}
            message={toast.message}
            onClick={toast?.onClick}
            link={toast?.link}
            id={toast?.id || generateRandomString()}
            closeable={toast?.closeable}
            customIcon={toast.customIcon}
            customClass={toast.customClass}
          >
            {toast.children}
          </ToastBox>
        </Modal>
      </div>
    )
  })
}

const MultipleToast = ({ toastDetails }) => {
  const filesOps = useSelector(selectFileOps)

  const defaultToastDetails = []

  for (const file of filesOps) {
    const { operation, status, type: typeProp, message } = file

    const type =
      operation === 'upload'
        ? 'upload'
        : operation === 'download'
        ? 'download'
        : status || typeProp

    defaultToastDetails.push({
      ...file,
      isOpen: true,
      type,
      message,
    })
  }

  return toastDetails ? (
    <RenderToast toastArray={toastDetails} />
  ) : (
    <RenderToast toastArray={defaultToastDetails} />
  )
}

MultipleToast.propTypes = {
  toastDetails: PropTypes.array,
}

export default MultipleToast
