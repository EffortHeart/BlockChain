import { BridgeDirection } from '../state/bridge/hooks'
import { ethFuseAmbSubgraphClient, fuseEthAmbSubgraphClient } from './client'

export const getHomeAmbSubgraph = (bridgeDirection: BridgeDirection) => {
  if (bridgeDirection === BridgeDirection.FUSE_TO_ETH) {
    return fuseEthAmbSubgraphClient
  } else {
    return null
  }
}

export const getForeignAmbSubgraph = (bridgeDirection: BridgeDirection) => {
  if (bridgeDirection === BridgeDirection.FUSE_TO_ETH) {
    return ethFuseAmbSubgraphClient
  } else {
    return null
  }
}
