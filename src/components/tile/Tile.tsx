import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import clsx from 'clsx'

import DocumentIcon from 'assets/svg/document.svg'
import ViewFileIcon from 'assets/svg/view-file.svg'
import DownloadIcon from 'assets/svg/download.svg'

import { bytesToString } from 'lib/utils'

import stl from './Tile.module.scss'
import { downloadObject } from 'store/object'

const Tile = ({ file, customClass }) => {
  const dispatch = useDispatch()

  const handleDownload = async () => {
    await dispatch(
      downloadObject({
        path: file?.path || '',
        lookupHash: file?.lookup_hash || '',
        fileName: file?.name || '',
      })
    )
  }

  return (
    <div className={clsx(stl.tile, customClass)}>
      <div className={stl.left}>
        <div className={stl.icon}>
          <DocumentIcon />
        </div>
        <p className={stl.fileName}>{file.name}</p>
      </div>

      <div className={stl.right}>
        <span className={stl.size}>{bytesToString(file.size)}</span>
        <button className={stl.btn}>
          <ViewFileIcon /> View
        </button>
        <button className={stl.btn} onClick={handleDownload}>
          <DownloadIcon /> Download
        </button>
      </div>
    </div>
  )
}

Tile.propTypes = {
  file: PropTypes.object.isRequired,
  customClass: PropTypes.string,
}

export default Tile
