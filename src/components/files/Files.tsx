import { useSelector } from 'react-redux'

import UploadContainer from 'components/upload-container'

const Files = () => {
  const { allFiles = [] } = useSelector(state => state.object)

  return allFiles.length > 0 ? (
    allFiles.map((file, index) => (
      <div key={index}>
        <p>{file.name}</p>
      </div>
    ))
  ) : (
    <UploadContainer />
  )
}

export default Files
