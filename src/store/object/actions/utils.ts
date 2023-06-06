import types from '../types'
import { selectFiles } from '../selectors'

export const setAllFiles = () => async (dispatch, getState) => {
  const files = selectFiles(getState())

  dispatch({ type: types.SET_ALL_FILES, payload: files })
}

export const addTempImageUrl = (id, url) => async (dispatch, getState) => {
  const { tempImageUrls = {} } = getState().object || {}

  dispatch({
    type: types.ADD_TEMP_IMAGE_URL,
    payload: { ...tempImageUrls, [id]: url },
  })
}

export const removeTempImageUrl = id => async (dispatch, getState) => {
  const { tempImageUrls = {} } = getState().object || {}

  delete tempImageUrls[id]

  dispatch({
    type: types.REMOVE_TEMP_IMAGE_URL,
    payload: tempImageUrls,
  })
}

export const clearTempImageUrls = () => async dispatch =>
  dispatch({ type: types.CLEAR_ALL_TEMP_IMAGE_URLS })
