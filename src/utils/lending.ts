import { fuseReadProvider } from '../connectors'
import { COMPTROLLER_ADDRESS, COMPOUND_LENS_ADDRESS } from '../constants'
import COMPTROLLER_ABI from '../constants/abis/comptroller.json'
import COMPOUND_LENS_ABI from '../constants/abis/compoundLens.json'
import { getReadContract } from './index'

export async function getMarketAddresses() {
  const contract = getReadContract(COMPTROLLER_ADDRESS, COMPTROLLER_ABI, fuseReadProvider)
  const marketAddresses = await contract.getAllMarkets()

  return marketAddresses
}

export async function getMarketPrices(marketAddresses: Array<string>) {
  const contract = getReadContract(COMPOUND_LENS_ADDRESS, COMPOUND_LENS_ABI, fuseReadProvider)
  const marketPrices = await contract.cTokenUnderlyingPriceAll(marketAddresses)

  return marketPrices.reduce((memo: any, market: any) => {
    memo[market.cToken] = market.underlyingPrice
    return memo
  }, {})
}

export async function getMarketsData(marketAddresses: Array<string>) {
  const contract = getReadContract(COMPOUND_LENS_ADDRESS, COMPOUND_LENS_ABI, fuseReadProvider)
  const marketsData = await contract.callStatic.cTokenMetadataAll(marketAddresses)

  return marketsData.reduce((memo: any, market: any) => {
    memo[market.cToken] = market
    return memo
  }, {})
}
