import types from './types'

const initialState = {
  list: [],
  activeWalletId: '',
  balance: 0,
}

export function walletReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_WALLET_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        activeWalletId: action.payload.id,
      }

    case types.GET_BALANCE_SUCCESS:
      return { ...state, balance: action.payload }

    default:
      return state
  }
}
