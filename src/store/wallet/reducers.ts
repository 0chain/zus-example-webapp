import { CREATE_WALLET } from "./types";

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
    case CREATE_WALLET:
      return {
        ...state,
        list: [...state.list, action.payload],
      };

    default:
      return state;
  }
}
