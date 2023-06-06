import { bulkUpload, download } from '@zerochain/zus-sdk'

import types from '../types'
import { listObjectsFunc } from './getters'

import { requestActionTypes } from 'store/api-utils'
import { selectActiveAllocation } from 'store/allocation'

import {
  getParentPath,
  getPercentage,
  normalizedPath as nP,
  openSaveFileDialog,
} from 'lib/utils'

export const bulkUploadFnc = props => async (dispatch, getState) => {
  const actionTypes = requestActionTypes(types.UPLOAD_OBJECT)
  dispatch({ type: actionTypes.request })

  const { file, path, lookupHash } = props
  const state = getState()

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

    await dispatch(listObjectsFunc(nP(getParentPath(path))))
    dispatch({ type: actionTypes.success })

    return data
  } catch (error) {
    if (error.message.includes('Max size reached')) {
      dispatch({
        type: actionTypes.error,
        message: "You don't have enough space to upload files",
      })

      return { error: "You don't have enough space to upload files" }
    }

    dispatch({
      type: actionTypes.error,
      message: 'Error uploading file, please try again in a few moments',
      payload: error,
    })

    return { error }
  }
}

export const downloadObject = props => async (dispatch, getState) => {
  const actionTypes = requestActionTypes(types.DOWNLOAD_OBJECT)
  dispatch({ type: actionTypes.request })

  const { path = '', fileName = '', lookupHash, getDetails } = props

  const { activeAllocationId } = getState().allocation

  const callbackFuncName = 'downloadProgress'

  try {
    window[callbackFuncName] = (totalBytes, completedBytes, error) => {
      if (error) return console.log(error, 'error')

      const progress = getPercentage(completedBytes, totalBytes)
      dispatch({
        type: types.SET_DOWNLOAD_PROGRESS,
        payload: { progress, lookupHash },
      })
    }

    const file = await download(
      activeAllocationId,
      path,
      '',
      '',
      false,
      100,
      callbackFuncName
    )

    await dispatch({ type: actionTypes.success })
    const downloadData = file.fileName === '.' ? { ...file, fileName } : file
    !getDetails && openSaveFileDialog(downloadData)

    return { data: downloadData }
  } catch (error) {
    console.log(error, 'error')
    dispatch({
      type: actionTypes.error,
      message: 'Error downloading file, please try again in a few moments',
      payload: error,
    })

    return { error }
  }
}
