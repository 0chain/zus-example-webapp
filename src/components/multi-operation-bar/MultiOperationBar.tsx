import PropTypes from 'prop-types'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'

import FullModal from 'components/full-modal'
import Button from 'components/Button'

import CrossIcon from 'assets/svg/cross.svg'
import DeleteIcon from 'assets/svg/delete.svg'
import DownloadIcon from 'assets/svg/download.svg'

import {
  selectMultiFiles,
  selectMultiFilesList,
  addSelectedFiles,
  removeSelectedFiles,
  clearSelectedFiles,
} from 'store/object'

import stl from './MultiOperationBar.module.scss'

const MultiOperationBar = ({ files = [], customClass }) => {
  const dispatch = useDispatch()

  const multiSelectionEnabled = useSelector(selectMultiFiles)
  const selectedFiles = useSelector(selectMultiFilesList)

  const filesIds = files.map(file => file.lookup_hash)
  const allFilesSelected = filesIds.length === selectedFiles.length

  const selectionButtonText = files.length
    ? allFilesSelected
      ? 'Deselect All'
      : 'Select All'
    : 'Select All'

  const handleFileSelection = () => {
    if (filesIds.length !== selectedFiles.length)
      filesIds.forEach(
        id => !selectedFiles.includes(id) && dispatch(addSelectedFiles(id))
      )
    else filesIds.map(id => dispatch(removeSelectedFiles(id)))
  }

  return (
    <FullModal
      isOpen={multiSelectionEnabled}
      close={close}
      customClass={stl.wrapper}
    >
      <div className={clsx(stl.operationBar, customClass)}>
        <div className={clsx(stl.section, stl.status)}>
          <span>
            {selectedFiles.length === 1
              ? '1 File Selected'
              : `${selectedFiles.length} Files Selected`}
          </span>
        </div>
        <div className={clsx(stl.section, stl.btnContainer)}>
          <Button theme="outline" onClick={handleFileSelection}>
            <span>{selectionButtonText}</span>
          </Button>

          <Button
            theme="outline"
            onClick={() => console.log('clicked...')}
            disabled={!selectedFiles.length}
          >
            <DownloadIcon />
            <span>Download</span>
          </Button>

          <Button
            theme="outline"
            onClick={() => console.log('clicked...')}
            disabled={!selectedFiles.length}
          >
            <DeleteIcon />
            <span>Delete</span>
          </Button>
        </div>

        <div className={stl.section}>
          <button
            className={stl.closeBtn}
            onClick={() => dispatch(clearSelectedFiles(!!selectedFiles.length))}
          >
            <CrossIcon width={14} height={14} />
          </button>
        </div>
      </div>
    </FullModal>
  )
}

MultiOperationBar.propTypes = {
  files: PropTypes.array,
  customClass: PropTypes.string,
}

export default MultiOperationBar
