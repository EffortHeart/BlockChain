export interface Farm {
  contractAddress: string
  LPToken: string
  type: string
  networkId: number
  pairName: string
  pairs: Array<string>
  rewards: Array<string>
  totalReward?: number
  reserve0?: string
  reserve1?: string
  token0?: {
    symbol: string
  }
  token1?: {
    symbol: string
  }
  rewardsInfo?: Array<any>
  totalStaked?: string
  globalTotalStake?: string
  start?: number
  duration?: number
  end?: number
  isExpired?: boolean
  rewardsPerDay?: number
  rewardsUSDPerDay?: number
}

export const FARM_REWARD_TOKENS = {
  rewardTokens: {
    '1': '0x970b9bb2c0444f5e81e9d0efb84c8ccdcdcaf84d',
    '56': '0x5857c96dae9cf8511b08cb07f85753c472d36ea3',
    '122': '0x0BE9e53fd7EDaC9F859882AfdDa116645287C629'
  }
}

export const FARMS_CONTRACTS_URL = 'https://raw.githubusercontent.com/fuseio/fuse-lp-rewards/master/config/default.json'
