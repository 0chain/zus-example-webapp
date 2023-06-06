import initialState from './initialState'

import { createActionTypes } from 'lib'
import { Types } from 'store/api-utils'

export const UPLOAD_OBJECT = 'UPLOAD_OBJECT'
export const SET_UPLOAD_PROGRESS = 'SET_UPLOAD_PROGRESS'
export const SET_ALL_FILES = 'SET_ALL_FILES'
export const LIST_OBJECTS = 'LIST_OBJECTS'
export const GET_PATH_FILES = 'GET_PATH_FILES'
export const DOWNLOAD_OBJECT = 'DOWNLOAD_OBJECT'
export const PLAY_VIDEO = 'PLAY_VIDEO'
export const PAUSE_VIDEO = 'PAUSE_VIDEO'
export const ADD_VIDEO_LOADING = 'ADD_VIDEO_LOADING'
export const REMOVE_VIDEO_LOADING = 'REMOVE_VIDEO_LOADING'
export const CLEAR_ALL_VIDEO_LOADINGS = 'CLEAR_ALL_VIDEO_LOADINGS'
export const ADD_TEMP_IMAGE_URL = 'ADD_TEMP_IMAGE_URL'
export const REMOVE_TEMP_IMAGE_URL = 'REMOVE_TEMP_IMAGE_URL'
export const CLEAR_ALL_TEMP_IMAGE_URLS = 'CLEAR_ALL_TEMP_IMAGE_URLS'

export const types: Types = createActionTypes([
  UPLOAD_OBJECT,
  SET_UPLOAD_PROGRESS,
  SET_ALL_FILES,
  LIST_OBJECTS,
  GET_PATH_FILES,
  DOWNLOAD_OBJECT,
  PLAY_VIDEO,
  PAUSE_VIDEO,
  ADD_VIDEO_LOADING,
  CLEAR_ALL_VIDEO_LOADINGS,
  ADD_TEMP_IMAGE_URL,
  REMOVE_TEMP_IMAGE_URL,
  CLEAR_ALL_TEMP_IMAGE_URLS,
])

export type ObjectState = typeof initialState

export default types
