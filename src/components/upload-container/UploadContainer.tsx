import { useDispatch } from 'react-redux'

import { IconUpload } from 'components/IconUpload'

import { bulkUploadFnc } from 'store/object'
import { generateRandomString } from 'lib/utils'

import stl from './UploadContainer.module.scss'

const UploadContainer = () => {
  const dispatch = useDispatch()

  const handleUpload = e => {
    const { files = [] } = e.target
    if (!files.length) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      dispatch(
        bulkUploadFnc({
          file,
          path: `/${file.name}`,
          fileId: generateRandomString(),
        })
      )
    }
  }

  return (
    <div className={stl.container}>
      <div className={stl.halfCol}>
        <IconUpload
          type="image"
          label="Upload image"
          changeFunc={handleUpload}
        />
      </div>

      <div className={stl.halfCol}>
        <IconUpload
          type="document"
          label="Upload document"
          changeFunc={handleUpload}
        />
      </div>
    </div>
  )
}

export default UploadContainer
