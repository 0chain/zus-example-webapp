import types from '../types'
import { selectFiles } from '../selectors'

export const setAllFiles = () => async (dispatch, getState) => {
  const files = selectFiles(getState())

  dispatch({ type: types.SET_ALL_FILES, payload: files })
}
