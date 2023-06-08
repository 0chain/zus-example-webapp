import types from './types'

import { basicReqWithDispatch } from 'store/api-utils'

export const getNetwork = () => async (dispatch, getState) => {
  // const { domain } = getState().user
  const domain = 'test1.zus.network'
  const { error, data }: any = await basicReqWithDispatch({
    url: domain.startsWith('http')
      ? `${domain}/network`
      : `https://${domain}/dns/network`,
    baseType: types.DNS_NETWORK,
    options: { method: 'GET' },
    dispatch,
  })
  return { error, data }
}

export const setWasmInitStatus = status => ({
  type: types.SET_WASM_INIT_STATUS,
  payload: status,
})
