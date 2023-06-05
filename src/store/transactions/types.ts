import { createActionTypes } from 'lib'

export const GET_LATEST_TXNS = 'GET_LATEST_TXNS'
export const GET_LATEST_TXNS_REQUEST = 'GET_LATEST_TXNS_REQUEST'
export const GET_LATEST_TXNS_SUCCESS = 'GET_LATEST_TXNS_SUCCESS'
export const GET_LATEST_TXNS_ERROR = 'GET_LATEST_TXNS_ERROR'

export default createActionTypes([GET_LATEST_TXNS])
