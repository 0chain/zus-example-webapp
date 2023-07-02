import types from './types'

const initialState = {
  list: [],
  activeWalletId: '',
  balance: 0,
}

const testWallet = {
  id: '1746b06bb09f55ee01b33b5e2e055d6cc7a900cb57c0a3a5eaabb8a0e7745802',
  name: '7b6ba....3a78d',
  keys: {
    publicKey:
      '7b630ba670dac2f22d43c2399b70eff378689a53ee03ea20957bb7e73df016200fea410ba5102558b0c39617e5afd2c1843b161a1dedec15e1ab40543a78a518',
    privateKey:
      'c06b6f6945ba02d5a3be86b8779deca63bb636ce7e46804a479c50e53c864915',
  },
  mnemonic:
    'cactus panther essence ability copper fox wise actual need cousin boat uncover ride diamond group jacket anchor current float rely tragic omit child payment',
  version: '1.0',
  creationDate: 1688319115172,
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

    case types.SET_TEST_WALLET:
      return {
        ...state,
        list: [testWallet],
        activeWalletId: testWallet.id,
      }

    default:
      return state
  }
}
