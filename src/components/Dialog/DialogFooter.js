import PropTypes from 'prop-types'
import clsx from 'clsx'

import Button from 'components/button'

import PlusIcon from 'assets/svg/vult/plus.svg'

import stl from './Dialog.module.scss'

const DialogFooter = ({
  customClass,
  cancelButtonLabel = 'Cancel',
  actionButtonLabel,
  leftButtonOnClick,
  cancelButtonOnClick,
  actionButtonOnClick,
  leftButtonIcon = <PlusIcon />,
  leftButtonLabel = 'Create Folder',
  leftButtonClass,
  cancelButtonColor = 'white',
  primaryBtnShadow,
  cancelBtnShadow,
  actionButtonColor = 'blue',
  actionButtonClass,
  cancelButtonClass,
  hideLeftButtonContainer = false,
}) => (
  <div className={clsx(stl.footer, customClass)}>
    {!hideLeftButtonContainer && (
      <div className={clsx(stl.w50, stl.flexStart)}>
        {leftButtonOnClick && (
          <button
            className={clsx(stl.leftButton, leftButtonClass)}
            onClick={leftButtonOnClick}
          >
            {leftButtonIcon}
            <div className={stl.leftButtonText}>{leftButtonLabel}</div>
          </button>
        )}
      </div>
    )}
    <div className={clsx(stl.w50, stl.flexEnd)}>
      {cancelButtonOnClick && (
        <Button
          color={cancelButtonColor}
          label={cancelButtonLabel}
          onClick={cancelButtonOnClick}
          shadowColor={cancelBtnShadow}
          customClass={clsx(
            stl.footerButton,
            stl.defaultMarginRight,
            cancelButtonClass
          )}
        />
      )}
      {actionButtonOnClick && (
        <Button
          name="action-btn"
          color={actionButtonColor}
          label={actionButtonLabel}
          onClick={actionButtonOnClick}
          shadowColor={primaryBtnShadow}
          customClass={clsx(stl.footerButton, actionButtonClass)}
        />
      )}
    </div>
  </div>
)

DialogFooter.propTypes = {
  customClass: PropTypes.string,
  cancelButtonLabel: PropTypes.string,
  actionButtonLabel: PropTypes.string,
  leftButtonOnClick: PropTypes.func,
  cancelButtonOnClick: PropTypes.func,
  actionButtonOnClick: PropTypes.func,
  leftButtonIcon: PropTypes.node,
  leftButtonLabel: PropTypes.string,
  leftButtonClass: PropTypes.string,
  cancelButtonColor: PropTypes.string,
  primaryBtnShadow: PropTypes.string,
  cancelBtnShadow: PropTypes.string,
  actionButtonColor: PropTypes.string,
  actionButtonClass: PropTypes.string,
  cancelButtonClass: PropTypes.string,
  hideLeftButtonContainer: PropTypes.bool,
}

export default DialogFooter
