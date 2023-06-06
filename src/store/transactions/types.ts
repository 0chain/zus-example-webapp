import { createActionTypes } from 'lib'
import { Types } from 'store/api-utils'

export const GET_LATEST_TXNS = 'GET_LATEST_TXNS'

const types: Types = createActionTypes([GET_LATEST_TXNS])

export default types
