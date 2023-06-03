import { combineReducers } from 'redux'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

import { walletReducer } from 'store/wallet'
import { allocationReducer } from './allocation'

import { errorTypes, allTypes } from 'store/api-utils'

const appReducer = combineReducers({
  wallet: walletReducer,
  allocation: allocationReducer,
})

// @ts-ignore
const { CLEAR_STORE } = allTypes

const rootReducer = (state, action) => {
  if ([CLEAR_STORE].includes(action.type)) {
    storage.removeItem('persist:root')
    return appReducer(undefined, action)
  }

  return appReducer(state, action)
}

export type RootState = ReturnType<typeof rootReducer>

const persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['wallet', 'allocation'],
}

const reducer = persistReducer(persistConfig, rootReducer)
const ignoredActions = [
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  ...errorTypes,
]

export { reducer, ignoredActions }
