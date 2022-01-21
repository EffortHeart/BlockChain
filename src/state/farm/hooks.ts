import dayjs from 'dayjs'
import { ethers } from 'ethers'
import { useEffect, useMemo, useState } from 'react'
import { getChainNetworkLibrary } from '../../connectors'
import { useActiveWeb3React } from '../../hooks'
import { tryFormatAmount, tryFormatDecimalAmount } from '../../utils'
import { getProgram } from '../../utils/farm'
import axios from 'axios'
import { Farm, FARMS_CONTRACTS_URL } from '../../constants/farms'
import { useToken } from '../../hooks/Tokens'
import { useTokenBalance } from '../wallet/hooks'
import { tryParseAmount } from '../swap/hooks'
import BigNumber from 'bignumber.js'
import { useBlockNumber } from '../application/hooks'
import { TokenAmount } from '@fuseio/fuse-swap-sdk'

let networkContracts: { [key: string]: Farm } | null = null

async function fetchFarm(farm?: Farm, account?: string) {
  if (!farm) return

  const { contractAddress, rewards, LPToken, networkId, type, pairName } = farm

  const accountAddress = account || ethers.constants.AddressZero
  const networkLibrary = getChainNetworkLibrary(networkId)
  const rewardProgram = getProgram(contractAddress, networkLibrary.provider, type)
  const stats = await rewardProgram.getStats(accountAddress, LPToken, networkId, rewards)
  const [totalStaked] = await rewardProgram.getStakerInfo(accountAddress, rewards[0])
  const stakingTimes = await rewardProgram.getStakingTimes(rewards[0])
  const isExpired = stakingTimes.end < dayjs().unix()
  const durationInDays = stakingTimes.duration / 86400
  const totalRewards = tryFormatAmount(stats.rewardsInfo[0].totalRewards, 18) ?? 0
  const rewardsUSDPerDay = stats.rewardsInfo[0].totalRewardsInUSD / durationInDays
  const rewardsPerDay = Number(totalRewards) / durationInDays

  return {
    contractAddress,
    rewards,
    LPToken,
    networkId,
    pairName,
    totalStaked,
    isExpired,
    rewardsUSDPerDay,
    rewardsPerDay,
    ...stats,
    ...stakingTimes
  }
}

async function fetchNetworksContracts() {
  const {
    data: { contracts }
  } = await axios.get(FARMS_CONTRACTS_URL)

  networkContracts = Object.assign({}, ...Object.values(contracts), contracts?.bsc?.pancake)
  if (networkContracts) {
    const multiContracts = Object.values(networkContracts).filter((contract: any) => contract.type === 'multi')
    return multiContracts
  } else {
    return []
  }
}

async function fetchFarms(account?: string) {
  try {
    const multiContracts = await fetchNetworksContracts()
    return await Promise.all(Object.values(multiContracts).map((farm: any) => fetchFarm(farm, account)))
  } catch (error) {
    console.error(error)
    return []
  }
}

export function useFarm(farmAddress: string) {
  const { account } = useActiveWeb3React()
  const [farm, setFarm] = useState(null)
  const blockNumber = useBlockNumber()

  useEffect(() => {
    async function fetchFarmInfo() {
      if (networkContracts === null) {
        await fetchNetworksContracts()
      }

      if (networkContracts && networkContracts[farmAddress]) {
        const farm = await fetchFarm(networkContracts[farmAddress], account ?? undefined)
        if (farm) setFarm(farm)
      }
    }

    fetchFarmInfo()
  }, [account, farmAddress, blockNumber])

  return farm
}

export function useFarms() {
  const { account } = useActiveWeb3React()
  const [farms, setFarms] = useState<any>([])
  const [isLoading, setLoading] = useState<any>(true)

  useEffect(() => {
    setLoading(true)
    fetchFarms(account ?? undefined).then(data => {
      setLoading(false)
      setFarms(data)
    })
  }, [account])

  return [farms, isLoading]
}

export function useDepositDerivedInfo(farm?: Farm, typedValue?: string) {
  const { account } = useActiveWeb3React()

  const token = useToken(farm?.LPToken)
  const tokenBalance = useTokenBalance(account ?? undefined, token ?? undefined)

  const parsedAmount = tryParseAmount(typedValue, token ?? undefined)
  const time = farm?.end ? farm?.end - dayjs().unix() : '0'
  const rewardRate = farm?.rewardsInfo ? farm?.rewardsInfo[0].rewardRate : '0'

  const rewardsPerToken = useMemo(() => {
    if (farm) {
      return new BigNumber(time)
        .multipliedBy(rewardRate)
        .dividedBy(new BigNumber(farm?.globalTotalStake ?? '0').plus(parsedAmount?.toSignificant() ?? '0'))
        .toString()
    }
    return '0'
  }, [farm, parsedAmount, rewardRate, time])

  const estimatedReward = useMemo(() => {
    return new BigNumber(rewardsPerToken)
      .multipliedBy(new BigNumber(parsedAmount?.raw.toString() ?? '0').plus(farm?.totalStaked ?? '0'))
      .toFixed(6)
  }, [farm, parsedAmount, rewardsPerToken])

  return {
    tokenBalance,
    parsedAmount,
    rewardsPerToken,
    estimatedReward
  }
}

export function useWithdrawDerivedInfo(farm?: Farm, typedValue?: string) {
  const token = useToken(farm?.LPToken)

  const parsedTotalStaked = tryFormatAmount(farm?.totalStaked, 18)
  const parsedAmount = tryParseAmount(typedValue, token ?? undefined)
  const accuruedRewards = farm?.rewardsInfo ? tryFormatDecimalAmount(farm?.rewardsInfo[0].accuruedRewards, 18, 2) : '0'
  const hasAccuruedRewards = Number(accuruedRewards) > 0

  const lpTokenAmount = useMemo(() => {
    if (!token || !farm) return
    return new TokenAmount(token, farm.totalStaked ?? '')
  }, [farm, token])

  return {
    parsedTotalStaked,
    parsedAmount,
    accuruedRewards,
    hasAccuruedRewards,
    lpTokenAmount
  }
}
