import PropTypes from 'prop-types'
import clsx from 'clsx'

import CloseBtnIconBolt from 'assets/svg/bolt/close-button.svg'
import BackButtonIcon from 'assets/svg/general/arrow-left.svg'

import stl from './Dialog.module.scss'

const DialogHeader = ({
  title,
  titleLeft = true,
  close,
  closeIcon,
  customClass,
  style,
  clearStyles,
  children,
  backBtnOnClick,
  backBtnIcon,
  customIconClass,
  customTitleClass,
}) => {
  return (
    <div
      className={clsx(
        !clearStyles && stl.header,
        titleLeft && stl.titleLeft,
        customClass
      )}
      style={style}
    >
      {children || (
        <>
          {(backBtnOnClick || backBtnIcon) && (
            <button className={stl.backBtn} onClick={backBtnOnClick}>
              {backBtnIcon || <BackButtonIcon />}
            </button>
          )}
          {close && (
            <button
              data-testid="dialogCloseButton"
              className={clsx(stl.closeButton, customIconClass)}
              onClick={close}
            >
              {closeIcon || <CloseBtnIconBolt />}
            </button>
          )}

          {title && (
            <h3
              data-testid="dialogTitle"
              className={clsx(stl.title, customTitleClass)}
            >
              {title}
            </h3>
          )}
        </>
      )}
    </div>
  )
}

DialogHeader.propTypes = {
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  titleLeft: PropTypes.bool,
  close: PropTypes.func,
  children: PropTypes.node,
  customClass: PropTypes.string,
  closeIcon: PropTypes.object,
  style: PropTypes.object,
  clearStyles: PropTypes.bool,
  backBtnIcon: PropTypes.node,
  backBtnOnClick: PropTypes.func,
  customIconClass: PropTypes.string,
  customTitleClass: PropTypes.string,
}

export default DialogHeader