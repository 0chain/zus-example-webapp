import types from './types'

import { sharderEndpoints, basicReqWithDispatch } from 'store/api-utils'
import { getRandomArrayElement } from 'lib/utils'

export const getLatestTxns = params => async (dispatch, getState) => {
  const { sharders } = getState().zerochain.network
console.log('usama', sharders)
  if (!(sharders && sharders?.length))
    return { error: 'Unable to get sharders', data: undefined }
  const url = getRandomArrayElement(sharders)



  const { error, data } = await basicReqWithDispatch({
    url: url + sharderEndpoints.GET_TRANSACTIONS,
    baseType: types.GET_LATEST_TXNS,
    params,
    options: { method: 'GET' },
    dispatch,
  })

  return { error, data }
}
