import { useSelector } from 'react-redux'

import Tile from 'components/tile'
import UploadContainer from 'components/upload-container'

import stl from './Files.module.scss'

const Files = () => {
  const { allFiles = [] } = useSelector(state => state.object)

  return allFiles.length > 0 ? (
    <div className={stl.filesWrapper}>
      {allFiles.map((file, i) => (
        <Tile key={i} file={file} />
      ))}
    </div>
  ) : (
    <UploadContainer />
  )
}

export default Files
