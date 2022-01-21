import { Web3Provider, JsonRpcProvider } from '@ethersproject/providers'
import { InjectedConnector } from '@web3-react/injected-connector'
import { WalletConnectConnector } from '@fuseio/web3-react-walletconnect-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { PortisConnector } from '@web3-react/portis-connector'

import { FortmaticConnector } from './Fortmatic'
import { NetworkConnector } from './NetworkConnector'
import { unwrapOrThrow } from '../utils'

export const NETWORK_URL = process.env.REACT_APP_NETWORK_URL
const FORMATIC_KEY = process.env.REACT_APP_FORTMATIC_KEY
const PORTIS_ID = process.env.REACT_APP_PORTIS_ID
const WALLETCONNECT_BRIDGE = process.env.REACT_APP_WALLETCONNECT_BRIDGE

export const FUSE_CHAIN_ID: number = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1')
export const ETHEREUM_CHAIN_ID = parseInt(unwrapOrThrow('ETHEREUM_CHAIN_ID'))
export const BINANCE_CHAIN_ID = parseInt(unwrapOrThrow('BINANCE_CHAIN_ID'))
const ETHEREUM_NETWORK_URL = unwrapOrThrow('ETHEREUM_NETWORK_URL')
const BINANCE_NETWORK_URL = unwrapOrThrow('BINANCE_NETWORK_URL')

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

if (typeof BINANCE_NETWORK_URL === 'undefined') {
  throw new Error('REACT_APP_BINANCE_NETWORK_URL must be a defined environment variable')
}

export const network = new NetworkConnector({
  urls: { [FUSE_CHAIN_ID]: NETWORK_URL }
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

function buildNetworkLibrary(url: string, chainId: number) {
  const network = new NetworkConnector({
    urls: { [chainId]: url }
  })
  return new Web3Provider(network.provider as any)
}

export const getChainNetworkLibrary = (chainId: number) => {
  switch (chainId) {
    case ETHEREUM_CHAIN_ID:
      return buildNetworkLibrary(ETHEREUM_NETWORK_URL, chainId)
    case BINANCE_CHAIN_ID:
      return buildNetworkLibrary(BINANCE_NETWORK_URL, chainId)
    default:
      // fuse network library
      return getNetworkLibrary()
  }
}

export const fuseReadProvider = new JsonRpcProvider(NETWORK_URL)

export const injectedSupportedChainIds = [ETHEREUM_CHAIN_ID, 122, BINANCE_CHAIN_ID]

export const injected = new InjectedConnector({
  supportedChainIds: injectedSupportedChainIds
})

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: {
    [ETHEREUM_CHAIN_ID]: ETHEREUM_NETWORK_URL,
    [FUSE_CHAIN_ID]: NETWORK_URL,
    [BINANCE_CHAIN_ID]: BINANCE_NETWORK_URL
  },
  bridge: WALLETCONNECT_BRIDGE,
  qrcode: true
})

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: FORMATIC_KEY ?? '',
  chainId: 1
})

// mainnet only
export const portis = new PortisConnector({
  dAppId: PORTIS_ID ?? '',
  networks: [1]
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: ETHEREUM_NETWORK_URL,
  appName: 'Fuse.fi',
  appLogoUrl: 'images/192x192_App_Icon.png',
  supportedChainIds: [122, 1, 56]
})
