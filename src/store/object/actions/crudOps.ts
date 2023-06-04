import { bulkUpload } from '@zerochain/zus-sdk'

import types from '../types'

import { requestActionTypes } from 'store/api-utils'
import { selectActiveAllocation } from 'store/allocation'

import { getParentPath, getPercentage, normalizedPath as nP } from 'lib/utils'

export const bulkUploadFnc = props => async (dispatch, getState) => {
  const actionTypes = requestActionTypes(types.UPLOAD_OBJECT)
  dispatch({ type: actionTypes.request })

  const { file, path, fileId, lookupHash } = props
  const state = getState()

  const tCommon = {
    fileId,
    fileName: file.name,
    path: path + file.name,
    parent_path: getParentPath(path),
    lookup_hash: lookupHash,
  }
  const nCommon = {
    id: fileId,
    fileName: file.name,
    filePath: path,
    read: false,
    lookup_hash: lookupHash,
  }

  const allocation = selectActiveAllocation(state)
  const allocationId = allocation.id

  const shouldEncrypt = nP(path).startsWith('/Encrypted')

  const uploadProgress = (totalBytes, completedBytes, error) => {
    if (error) return console.log(error, 'error')

    const progress = getPercentage(completedBytes, totalBytes)
    dispatch({
      type: types.SET_UPLOAD_PROGRESS,
      payload: { progress, lookupHash },
    })
  }

  const options = [
    {
      allocationId,
      remotePath: path,
      file,
      thumbnailBytes: null,
      encrypt: shouldEncrypt,
      webstreaming: true,
      isUpdate: false,
      isRepair: false,
      numBlocks: 100,
      callback: uploadProgress,
    },
  ]

  try {
    const res = await bulkUpload(options)
    const data = res[0]
    if (data.error) throw new Error(data.error)

    // const toast = {
    //   ...tCommon,
    //   path: getParentPath(path),
    //   status: 'success',
    //   message: `Uploading ${file.name} completed successfully`,
    // }

    // const notification = {
    //   ...nCommon,
    //   type: 'FILE_UPLOAD_SUCCESS',
    //   date: new Date().toISOString(),
    // }

    // await dispatch(listObjects(nP(getParentPath(path))))
    setTimeout(() => {
      dispatch({ type: actionTypes.success })

      // dispatch(
      //   updateAction({
      //     toast,
      //     notification,
      //     type: 'upload',
      //     mimetype: file.type,
      //   })
      // )
    }, 1500)

    return data
  } catch (error) {
    if (error.message.includes('Max size reached')) {
      dispatch({
        type: actionTypes.error,
        message: "You don't have enough space to upload files",
      })

      // dispatch(
      //   updateAction({
      //     toast: {
      //       ...tCommon,
      //       status: 'error',
      //       message: 'Not enough space to upload files',
      //     },
      //     notification: {
      //       ...nCommon,
      //       type: 'FILE_UPLOAD_FAILED',
      //       date: new Date().toISOString(),
      //     },
      //     isError: true,
      //     type: 'upload',
      //     mimetype: file.type,
      //   })
      // )

      return { error: "You don't have enough space to upload files" }
    }

    const toast = {
      ...tCommon,
      status: 'error',
      message: `Uploading ${file.name} failed`,
    }

    const notification = {
      ...nCommon,
      type: 'FILE_UPLOAD_FAILED',
      date: new Date().toISOString(),
    }

    // dispatch(
    //   updateAction({
    //     toast,
    //     notification,
    //     isError: true,
    //     type: 'upload',
    //     mimetype: file.type,
    //   })
    // )

    dispatch({
      type: actionTypes.error,
      message: 'Error uploading file, please try again in a few moments',
      payload: error,
    })

    return { error }
  }
}
