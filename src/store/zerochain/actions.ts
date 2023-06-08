import { DNS_NETWORK } from './types'

import { basicReqWithDispatch } from 'store/api-utils'

export const getNetwork = () => async (dispatch, getState) => {
  // const { domain } = getState().user
  const domain = 'demo.zus.network'
  const { error, data }: any = await basicReqWithDispatch({
    url: domain.startsWith('http')
      ? `${domain}/network`
      : `https://${domain}/dns/network`,
    baseType: DNS_NETWORK,
    options: { method: 'GET' },
    dispatch,
  })
  return { error, data }
}
