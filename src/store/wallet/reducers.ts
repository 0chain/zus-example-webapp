const initialState = {
  list: [],
  temp: {
    keys: {},
    mnemonic: "",
  },
  activeWalletId: "",
};

export function walletReducer(state = initialState, action) {
  switch (action.type) {
    case "CREATE_WALLET_SUCCESS":
      return {
        ...state,
        list: [...state.list, action.payload],
        activeWalletId: action.payload.id,
      };

    default:
      return state;
  }
}
