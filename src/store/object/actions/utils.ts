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

export const setMultiSelection = isEnabled => async (dispatch, getState) => {
  const { multiSelect } = getState().object || {}

  dispatch({
    type: types.SET_MULTI_SELECTION,
    payload: { ...multiSelect, multiSelectionEnabled: isEnabled },
  })
}

export const addSelectedFiles = id => async (dispatch, getState) => {
  const { multiSelect } = getState().object || {}
  const { selectedFiles } = multiSelect

  dispatch({
    type: types.ADD_TO_MULTI_SELECTION,
    payload: {
      ...multiSelect,
      selectedFiles:
        id === undefined || selectedFiles.includes(id)
          ? selectedFiles
          : [...selectedFiles, id],
    },
  })
}

export const removeSelectedFiles = id => async (dispatch, getState) => {
  const { multiSelect } = getState().object || {}

  dispatch({
    type: types.REMOVE_FROM_MULTI_SELECTION,
    payload: {
      ...multiSelect,
      selectedFiles: multiSelect.selectedFiles.filter(f => f !== id),
    },
  })
}

export const clearSelectedFiles = selection => async dispatch =>
  dispatch({
    type: types.CLEAR_MULTI_SELECTION_LIST,
    payload: { multiSelectionEnabled: selection, selectedFiles: [] },
  })
