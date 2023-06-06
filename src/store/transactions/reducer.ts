import types from './types'

const initialState = {
  transactions: [],
}

export function transactionsListReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case types.GET_LATEST_TXNS_REQUEST: {
      const transactions = []
      return { ...state, transactions }
    }
    case types.GET_LATEST_TXNS_SUCCESS: {
      return { ...state, transactions: payload }
    }
    case types.GET_LATEST_TXNS_ERROR: {
      return { ...state }
    }
    default:
      return state
  }
}
