import types from './types'

const initialState = {
  list: [],
  activeWalletId: '',
}

export function walletReducer(state = initialState, action) {
  switch (action.type) {
    case types.CREATE_WALLET_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        activeWalletId: action.payload.id,
      }

    default:
      return state
  }
}
