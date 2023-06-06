import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'

import Tile from 'components/tile'
import UploadContainer from 'components/upload-container'
import Button from 'components/Button'
import FilesViewer from 'components/files-viewer'

import ImageIcon from 'assets/svg/image-icon.svg'
import PageIcon from 'assets/svg/page.svg'

import { bulkUploadFnc } from 'store/object'

import stl from './Files.module.scss'

const Files = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { file: fileQuery } = router.query

  // @ts-ignore
  const { allFiles = [] } = useSelector(state => state.object)

  const handleUpload = e => {
    const { files = [] } = e.target
    if (!files.length) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      dispatch(bulkUploadFnc({ file, path: `/${file.name}` }))
    }
  }

  const file =
    fileQuery &&
    allFiles.find(file => file.type === 'f' && file.lookup_hash === fileQuery)

  return allFiles.length > 0 ? (
    <div className={stl.filesWrapper}>
      <input
        type="file"
        id="image-upload"
        multiple
        accept="image/*"
        onChange={handleUpload}
      />
      <input
        type="file"
        id="doc-upload"
        multiple
        accept={`application/pdf,
  application/vnd.ms-powerpoint,
  application/vnd.openxmlformats-officedocument.presentationml.presentation,
  application/vnd.ms-excel,
  application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
  application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document,
  text/csv`}
        onChange={handleUpload}
      />

      <div className={stl.head}>
        <h2>Files</h2>

        <div className={stl.btnsBox}>
          <Button
            theme="outline"
            onClick={() => document.getElementById('image-upload').click()}
          >
            <ImageIcon /> Upload Image
          </Button>
          <Button
            theme="outline"
            onClick={() => document.getElementById('doc-upload').click()}
          >
            <PageIcon /> Upload Document
          </Button>
        </div>
      </div>

      {allFiles.map((file, i) => (
        <Tile key={i} file={file} />
      ))}

      <FilesViewer isOpen={!!file} files={allFiles} />
    </div>
  ) : (
    <UploadContainer />
  )
}

export default Files
