import React, { useContext, useMemo } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { Pair } from '@fuseio/fuse-swap-sdk'
import { Link } from 'react-router-dom'
import { SwapPoolTabs } from '../../components/NavigationTabs'

import Question from '../../components/QuestionHelper'
import FullPositionCard from '../../components/PositionCard'
import { useUserHasLiquidityInAllTokens } from '../../data/V1'
import { useTokenBalancesWithLoadingIndicator } from '../../state/wallet/hooks'
import { StyledInternalLink, TYPE, ExternalLink } from '../../theme'
import { Text } from 'rebass'
import { LightCard } from '../../components/Card'
import { RowBetween } from '../../components/Row'
import { ButtonPrimary } from '../../components/Button'
import { AutoColumn } from '../../components/Column'

import { useActiveWeb3React, useChain } from '../../hooks'
import { usePairs } from '../../data/Reserves'
import { toV2LiquidityToken, useTrackedTokenPairs } from '../../state/user/hooks'
import AppBody from '../AppBody'
import { AppWrapper, AppWrapperInner, Dots } from '../../components/swap/styleds'
import SwitchNetwork from '../../components/swap/SwitchNetwork'
import { UNDER_MAINTENANCE } from '../../constants'
import Maintenance from '../../components/swap/Maintenance'
import MainCard from '../../components/MainCard'

const DarkCard = styled(LightCard)`
  background:#ede9f7;
  border: 0;
  font-weight: 500;
`

export default function Pool() {
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()

  const { isHome } = useChain()

  // fetch the user's balances of all tracked V2 LP tokens
  const trackedTokenPairs = useTrackedTokenPairs()
  const tokenPairsWithLiquidityTokens = useMemo(
    () => trackedTokenPairs.map(tokens => ({ liquidityToken: toV2LiquidityToken(tokens), tokens })),
    [trackedTokenPairs]
  )
  const liquidityTokens = useMemo(() => tokenPairsWithLiquidityTokens.map(tpwlt => tpwlt.liquidityToken), [
    tokenPairsWithLiquidityTokens
  ])
  const [v2PairsBalances, fetchingV2PairBalances] = useTokenBalancesWithLoadingIndicator(
    account ?? undefined,
    liquidityTokens
  )

  // fetch the reserves for all V2 pools in which the user has a balance
  const liquidityTokensWithBalances = useMemo(
    () =>
      tokenPairsWithLiquidityTokens.filter(({ liquidityToken }) =>
        v2PairsBalances[liquidityToken.address]?.greaterThan('0')
      ),
    [tokenPairsWithLiquidityTokens, v2PairsBalances]
  )

  const v2Pairs = usePairs(liquidityTokensWithBalances.map(({ tokens }) => tokens))
  const v2IsLoading =
    fetchingV2PairBalances || v2Pairs?.length < liquidityTokensWithBalances.length || v2Pairs?.some(V2Pair => !V2Pair)

  const allV2PairsWithLiquidity = v2Pairs.map(([, pair]) => pair).filter((v2Pair): v2Pair is Pair => Boolean(v2Pair))

  const hasV1Liquidity = useUserHasLiquidityInAllTokens()

  if (UNDER_MAINTENANCE) {
    return <Maintenance />
  }

  if (!isHome) {
    return (
      <>
        <AppBody>
          <AppWrapper>
            <AppWrapperInner>
              <SwapPoolTabs active={'pool'} />
              <MainCard>
                <SwitchNetwork />
              </MainCard>
            </AppWrapperInner>
          </AppWrapper>
        </AppBody>
      </>
    )
  }

  return (
    <>
      <AppBody>
        <AppWrapper>
          <AppWrapperInner>
            <SwapPoolTabs active={'pool'} />
            <MainCard>
              <AutoColumn gap="lg" justify="center">
                <ButtonPrimary id="join-pool-button" as={Link} style={{ padding: 16 }} to="/add/FUSE">
                  <Text fontWeight={500} fontSize={18} color="white">
                    Add Liquidity
                  </Text>
                </ButtonPrimary>

                <AutoColumn gap="12px" style={{ width: '100%' }}>
                  <RowBetween padding={'0 8px'}>
                    <Text color='#7671a2' fontWeight={500}>
                      Your Liquidity
                    </Text>
                    <Question text="When you add liquidity, you are given pool tokens that represent your share. If you don’t see a pool you joined in this list, try importing a pool below." />
                  </RowBetween>

                  {!account ? (
                    <DarkCard padding="30px">
                      <TYPE.body color='#7671a2' fontSize={14} fontWeight="500" textAlign="center">
                        Connect to a wallet to view your liquidity.
                      </TYPE.body>
                    </DarkCard>
                  ) : v2IsLoading ? (
                    <DarkCard padding="30px">
                      <TYPE.body color='#7671a2' fontSize={14} fontWeight="500" textAlign="center">
                        <Dots>Loading</Dots>
                      </TYPE.body>
                    </DarkCard>
                  ) : allV2PairsWithLiquidity?.length > 0 ? (
                    <>
                      {allV2PairsWithLiquidity.map(v2Pair => (
                        <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                      ))}
                    </>
                  ) : (
                    <DarkCard padding="30px">
                      <TYPE.body color={theme.text2} fontSize={14} fontWeight="500" textAlign="center">
                        No liquidity found.
                      </TYPE.body>
                    </DarkCard>
                  )}

                  <div>
                    <Text textAlign="center" fontSize={14} style={{ color: '#7671a2', padding: '.5rem 0 .5rem 0' }}>
                      {hasV1Liquidity ? 'FuseFi V1 liquidity found!' : "Don't see a pool you joined?"}{' '}
                      <StyledInternalLink id="import-pool-link" to={hasV1Liquidity ? '/migrate/v1' : '/find'}>
                        {hasV1Liquidity ? <span style={{ color: '#3087d7' }}>Migrate now.</span> : <span style={{ color: '#3087d7' }}>Import it.</span>}
                      </StyledInternalLink>
                    </Text>
                    <Text textAlign="center" fontSize={14} style={{ color: '#7671a2' }}>
                      <ExternalLink
                        target="_blank"
                        href="https://docs.fuse.io/fuseswap/adding-liquidity"
                      >
                        <span style={{ color: '#3087d7' }}>Click here</span>
                      </ExternalLink>{' '}
                      to learn how to add liquidity
                    </Text>
                  </div>
                </AutoColumn>
              </AutoColumn>
            </MainCard>
          </AppWrapperInner>
        </AppWrapper>
      </AppBody>
    </>
  )
}
