import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'

import application from './application/reducer'
import { updateVersion } from './global/actions'
import user from './user/reducer'
import transactions from './transactions/reducer'
import swap from './swap/reducer'
import mint from './mint/reducer'
import lists from './lists/reducer'
import burn from './burn/reducer'
import multicall from './multicall/reducer'
import bridge from './bridge/reducer'
import { BridgeTransactionStatus } from './bridge/actions'
import { Field } from './bridge/actions'

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists', 'bridge.bridgeTransactions']

const store = configureStore({
  reducer: {
    application,
    user,
    transactions,
    swap,
    mint,
    burn,
    multicall,
    lists,
    bridge
  },
  middleware: [...getDefaultMiddleware({ thunk: false, serializableCheck: false }), save({ states: PERSISTED_KEYS })],
  preloadedState: load({
    states: PERSISTED_KEYS,
    preloadedState: {
      bridge: {
        independentField: Field.INPUT,
        typedValue: '',
        [Field.INPUT]: {
          currencyId: ''
        },
        recipient: '',
        bridgeTransactionStatus: BridgeTransactionStatus.INITIAL,
        confirmations: 0,
        currentAmbBridgeTransaction: null,
        currentNativeBridgeTransaction: null,
        bridgeTransactions: []
      }
    }
  })
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
