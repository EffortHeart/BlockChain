import { createAction } from '@reduxjs/toolkit'
import { TokenList } from '@fuseio/token-lists'
import { Currency } from '@fuseio/fuse-swap-sdk'

export type PopupContent =
  | {
      txn: {
        hash: string
        success: boolean
        summary?: string
      }
    }
  | {
      listUpdate: {
        listUrl: string
        oldList: TokenList
        newList: TokenList
        auto: boolean
        listType: CurrencyListType
      }
    }
  | {
      deprecated: {
        token: string
        currency: Currency
      }
    }
export const updateBlockNumber = createAction<{ chainId: number; blockNumber: number }>('app/updateBlockNumber')
export const toggleWalletModal = createAction<void>('app/toggleWalletModal')
export const toggleSettingsMenu = createAction<void>('app/toggleSettingsMenu')
export const toggleNavMenu = createAction<void>('app/toggleNavMenu')
export const addPopup = createAction<{ key?: string; removeAfterMs?: number | null; content: PopupContent }>(
  'app/addPopup'
)
export const removePopup = createAction<{ key: string }>('app/removePopup')
