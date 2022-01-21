import { useEffect, useState } from 'react'
import { useActiveWeb3React } from '.'
import { useAllSwapTokens } from './Tokens'
import { useTokenBalanceCallback } from '../state/wallet/hooks'
import { Currency } from '@fuseio/fuse-swap-sdk'
import { WrappedTokenInfo } from '../state/lists/hooks'

export const useDeprecated = () => {
  const { account } = useActiveWeb3React()
  const tokens = useAllSwapTokens()
  const balance = useTokenBalanceCallback()
  const [isDeprecated, setDeprecated] = useState(false)
  const [tokenDep, setTokenDep] = useState<Partial<WrappedTokenInfo>>()
  const [currencyDep, setCurrencyDep] = useState<Currency>()
  const [balanceDep, setBalance] = useState(0)
  useEffect(() => {
    if (account) {
      Object.keys(tokens).forEach(async key => {
        const wrappedToken = tokens[key] as WrappedTokenInfo
        const currencyDeprecated = tokens[key] as Currency
        if (wrappedToken.isDeprecated) {
          setBalance(await balance(wrappedToken))
          setCurrencyDep(currencyDeprecated)
          if (balanceDep > 0) {
            setDeprecated(true)
          } else {
            setDeprecated(false)
          }
          setTokenDep(wrappedToken as Currency)
        }
      })
    }
  })

  return {
    isDeprecated,
    tokenDep,
    currencyDep
  }
}
