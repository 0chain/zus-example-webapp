import initialState from './initialState'

import { createActionTypes } from 'lib'
import { Types } from 'store/api-utils'

export const UPLOAD_OBJECT = 'UPLOAD_OBJECT'
export const SET_UPLOAD_PROGRESS = 'SET_UPLOAD_PROGRESS'

export const types: Types = createActionTypes([
  UPLOAD_OBJECT,
  SET_UPLOAD_PROGRESS,
])

export type ObjectState = typeof initialState

export default types
