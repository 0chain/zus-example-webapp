import initialState from './initialState'

import { createActionTypes } from 'lib'
import { Types } from 'store/api-utils'

export const UPLOAD_OBJECT = 'UPLOAD_OBJECT'
export const SET_UPLOAD_PROGRESS = 'SET_UPLOAD_PROGRESS'
export const SET_ALL_FILES = 'SET_ALL_FILES'
export const LIST_OBJECTS = 'LIST_OBJECTS'
export const GET_PATH_FILES = 'GET_PATH_FILES'
export const DOWNLOAD_OBJECT = 'DOWNLOAD_OBJECT'

export const types: Types = createActionTypes([
  UPLOAD_OBJECT,
  SET_UPLOAD_PROGRESS,
  SET_ALL_FILES,
  LIST_OBJECTS,
  GET_PATH_FILES,
  DOWNLOAD_OBJECT,
])

export type ObjectState = typeof initialState

export default types
