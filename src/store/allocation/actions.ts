import { getAllocationBlobbers, listAllocations } from '@zerochain/zus-sdk'
import { CREATE_ALLOCATION, LIST_ALLOCATIONS } from './types'

import { requestActionTypes, RequestActionTypes } from 'store/api-utils'
import { createAllocationWithBlobbers } from '@zerochain/zus-sdk'

const getBlobberListForAllocation = async () => {
  const expiryDate = new Date()
  expiryDate.setDate(expiryDate.getDate() + 30)

  const preferredBlobberURLs = [
      'https://dev2.zus.network/blobber02',
      'https://dev1.zus.network/blobber02',
    ],
    dataShards = 2,
    parityShards = 2,
    size = 2 * 1073741824,
    expiry = Math.floor(expiryDate.getTime() / 1000),
    minReadPrice = 0,
    maxReadPrice = 184467440737095516,
    minWritePrice = 0,
    maxWritePrice = 184467440737095516

  //Call getAllocationBlobbers method
  const blobberList = await getAllocationBlobbers(
    preferredBlobberURLs,
    dataShards,
    parityShards,
    size,
    expiry,
    minReadPrice,
    maxReadPrice,
    minWritePrice,
    maxWritePrice
  )
  return blobberList
}

export const createAllocationFunc = () => async dispatch => {
  const actionType: RequestActionTypes = requestActionTypes(CREATE_ALLOCATION)
  dispatch({ type: actionType.request })

  const preferredBlobbers = await getBlobberListForAllocation()
  const expiry = new Date()
  expiry.setDate(expiry.getDate() + 30)

  //datashards, parityshards int, size, expiry int64,minReadPrice, maxReadPrice, minWritePrice, maxWritePrice int64, lock int64,preferredBlobberIds []string
  const config = {
    datashards: 2,
    parityshards: 2,
    size: 2 * 1073741824,
    expiry: Math.round(new Date().getTime() / 1000) + 2628000,
    minReadPrice: 0,
    maxReadPrice: 10000000000,
    minWritePrice: 0,
    maxWritePrice: 10000000000,
    lock: 5000000000,
    blobbers: preferredBlobbers,
  }

  try {
    const res = await createAllocationWithBlobbers(config)
    const data = await JSON.parse(res.transaction_output)

    dispatch({ type: actionType.success, payload: data })

    await dispatch(listAllocationsFunc())
  } catch (error) {
    dispatch({ type: actionType.error })
  }
}

export const listAllocationsFunc = () => async dispatch => {
  const actionType: RequestActionTypes = requestActionTypes(LIST_ALLOCATIONS)
  dispatch({ type: actionType.request })

  try {
    const list = await listAllocations()
    dispatch({ type: actionType.success, payload: list || [] })
  } catch (error) {
    dispatch({ type: actionType.error })
  }
}
