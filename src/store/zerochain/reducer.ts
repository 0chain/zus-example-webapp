import types from './types'

const initialState = {
    network: {},
}

export function zerochainReducer(state = initialState, action) {
    switch (action.type) {
      case types.DNS_NETWORK_SUCCESS:
        return { ...state, network: action.payload }
        
      default:
        return state
    }
}