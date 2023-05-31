import PropTypes from 'prop-types'

import Modal from '../Modal2'
import LoadingBox from './LoadingBox'

const LoadingBoxModal = ({
  isOpen,
  close = () => {},
  variant = 'dark',
  title,
  label = 'Creating account',
  customClass,
  closeOnClickAway = false,
  containerCustomClass,
  selector='#modal'
}) => (
  <Modal
    isOpen={isOpen}
    close={close}
    closeOnClickAway={closeOnClickAway}
    customClass={containerCustomClass}
    selector={selector}
  >
    <LoadingBox
      variant={variant}
      title={title}
      label={label}
      customClass={customClass}
    />
  </Modal>
)

LoadingBoxModal.propTypes = {
  isOpen: PropTypes.bool,
  close: PropTypes.func,
  variant: PropTypes.oneOf(['dark', 'light']),
  title: PropTypes.string,
  label: PropTypes.string,
  customClass: PropTypes.string,
  closeOnClickAway: PropTypes.bool,
  containerCustomClass: PropTypes.string,
}

export default LoadingBoxModal
