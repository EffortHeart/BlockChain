import { ChainId } from '@fuseio/fuse-swap-sdk'
import React from 'react'
import styled from 'styled-components'
import { Text } from 'rebass'
import { useActiveWeb3React } from '../../hooks'
import { useETHBalances } from '../../state/wallet/hooks'
import { RowBetween } from '../Row'
import Web3Status from '../Web3Status'
import { getNativeCurrencySymbol } from '../../utils'
import { BINANCE_MAINNET_CHAINID, BINANCE_TESTNET_CHAINID } from '../../constants'
import { ReactComponent as MenuIcon } from '../../assets/svg/ham_menu.svg'
import { useToggleNavMenu } from '../../state/application/hooks'

const HeaderFrame = styled.div`
  padding-right: 2.6%;
  padding-top: 32px;
  width: 100%;
  top: 0;
  opacity: 0.85;
  z-index: 3;
  ${({ theme }) => theme.mediaWidth.upToMedium`
  padding-right:0px;
    width: calc(100%);
    margin-bottom: 2rem;
    position: relative;
  `};
`

const HeaderElement = styled.div`
  display: flex;
  align-items: center;
  margin: auto 1rem;
`

const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: linear-gradient(90deg, hsla(247,96%,61%,1) , hsla(188,100%,64%,1));
  border-radius: 5px;
  white-space: nowrap;
  width: 100%;
  :focus {
    border: 1px solid blue;
  }
`

const TestnetWrapper = styled.div`
  white-space: nowrap;
  width: fit-content;
  margin-left: 10px;
  pointer-events: auto;

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

const NetworkCard = styled('div')`
  height: 32px;
  border: 1px solid #808080;
  color: #808080;
  width: fit-content;
  font-size: 16px;
  line-height: 28px;
  margin-right: 10px;
  border-radius: 5px;
  padding: 1px 12px;
`

const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const BalanceText = styled(Text) <{ active: boolean }>`
  font-family: Inter;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  color: #000000;
  ${({ active }) => (active ? '  padding-right: 8px; padding-left: 8px;' : '')}
`

const StyledMenuIcon = styled(MenuIcon)`
  display: none;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    display: block;
    cursor: pointer;
  `}
`

export const NETWORK_LABELS: any = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.FUSE]: 'Fuse',
  [BINANCE_TESTNET_CHAINID]: 'Binance Testnet',
  [BINANCE_MAINNET_CHAINID]: 'Binance'
}
export default function Header() {
  const { account, chainId } = useActiveWeb3React()

  const toggleNavMenu = useToggleNavMenu()

  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']

  return (
    <HeaderFrame>
      <RowBetween style={{ alignItems: 'flex-start' }}>
        <HeaderElement>
          <StyledMenuIcon onClick={() => toggleNavMenu()} />
        </HeaderElement>
        <HeaderControls>
          <HeaderElement>
            <TestnetWrapper>
              {chainId && NETWORK_LABELS[chainId] && <NetworkCard>{NETWORK_LABELS[chainId]}</NetworkCard>}
            </TestnetWrapper>
            <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
              {chainId && account && userEthBalance ? (
                <BalanceText active={account ? true : false} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                  {userEthBalance?.toSignificant(4)} {getNativeCurrencySymbol(chainId)}
                </BalanceText>
              ) : (
                <BalanceText active={account ? true : false} fontWeight={500}>
                  {' '}
                  {account ? 'Loading..' : ''}
                </BalanceText>
              )}
              <Web3Status />
            </AccountElement>
          </HeaderElement>
        </HeaderControls>
      </RowBetween>
    </HeaderFrame>
  )
}
