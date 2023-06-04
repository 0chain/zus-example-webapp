import PropTypes from 'prop-types'
import clsx from 'clsx'

import DocumentIcon from 'assets/svg/document.svg'
import MoreIcon from 'assets/svg/more.svg'

import { bytesToString } from 'lib/utils'

import stl from './Tile.module.scss'

const Tile = ({ file, customClass }) => {
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
        <button className={stl.iconBtn}>{<MoreIcon />}</button>
      </div>
    </div>
  )
}

Tile.propTypes = {
  file: PropTypes.object.isRequired,
  customClass: PropTypes.string,
}

export default Tile
