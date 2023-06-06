import { zcnContracts } from '../../../lib/constants/zeroChain'

export const sharderEndpoints = {
  GET_TRANSACTIONS: `/v1/screst/${zcnContracts.storageSCAddress}/transactions`,
}
