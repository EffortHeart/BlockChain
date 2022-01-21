import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { darken, lighten } from 'polished'
import React, { useMemo } from 'react'
import { Activity } from 'react-feather'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import CoinbaseWalletIcon from '../../assets/images/coinbaseWalletIcon.svg'
import FortmaticIcon from '../../assets/images/fortmaticIcon.png'
import PortisIcon from '../../assets/images/portisIcon.png'
import WalletConnectIcon from '../../assets/images/walletConnectIcon.svg'
import ConnectStatus from '../../assets/images/walletStatus.svg'
import { fortmatic, injected, portis, walletconnect, walletlink } from '../../connectors'
import { NetworkContextName } from '../../constants'
import useENSName from '../../hooks/useENSName'
import { useHasSocks } from '../../hooks/useSocksBalance'
import { useWalletModalToggle } from '../../state/application/hooks'
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'
import { shortenAddress } from '../../utils'

import Loader from '../Loaders/default'

import { RowBetween } from '../Row'
import WalletModal from '../WalletModal'
import useAddChain from '../../hooks/useAddChain'
import { FUSE_CHAIN } from '../../constants/chains'
import { ReactComponent as Wallet } from '../../assets/svg/walletConnect.svg'

const IconWrapper = styled.div<{ size?: number; margin?: number }>`
  ${({ theme }) => theme.flexColumnNoWrap};
  align-items: center;
  justify-content: center;
  & > * {
    margin-right: ${({ margin }) => (margin ? margin + 'px' : '0px')};
    height: ${({ size }) => (size ? size + 'px' : '32px')};
    width: ${({ size }) => (size ? size + 'px' : '32px')};
  }
`

const Web3StatusGeneric = styled('div')`
  ${({ theme }) => theme.flexRowNoWrap}
  background: linear-gradient(90deg, hsla(247,96%,61%,1) , hsla(188,100%,64%,1));
  color: white;
  padding: 0px 11px 0px 11px;
  font-weight: 400;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  user-select: none;
  :focus {
    outline: none;
  }
  > span {
    padding: 0px 8px 0px 5px;
  }
  :hover,
  :focus {
    background: linear-gradient(93.58deg, #f3fc1f -105.35%, #3ad889 103.54%);
    > svg icon {
      stroke-width: 2px;
      fill: red;
      stroke: red;
    }
  }
`
const Web3StatusError = styled(Web3StatusGeneric)`
  background-color: ${({ theme }) => theme.red1};
  border: 1px solid ${({ theme }) => theme.red1};
  color: ${({ theme }) => theme.white};
  font-weight: 500;
`

const Web3StatusConnect = styled(Web3StatusGeneric) <{ faded?: boolean }>`
  font-weight: 500;
  height: 32px;
  & > * {
    stroke: black;
  }
  :hover,
  :focus {
    background-color: linear-gradient(93.58deg, #f3fc1f -105.35%, #3ad889 103.54%);
    color: white;
    & > * {
      stroke: white;
    }
  }
`

const Web3StatusConnected = styled(Web3StatusGeneric) <{ pending?: boolean }>`
  border: 2px solid #b5f043;
  border-radius: 5px;
  background: black;
  color: white;
  height: 32px;
  border-radius: 0px 5px 5px 0px;
  :hover,
  :focus {
    background-color: ${({ pending, theme }) => (pending ? darken(0.05, theme.primary1) : lighten(0.05, theme.bg2))};

    :focus {
      border: 1px solid ${({ pending, theme }) => (pending ? darken(0.1, theme.primary1) : darken(0.1, theme.bg3))};
    }
  }
`

const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 300;
  font-family: Inter;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
`

const NetworkIcon = styled(Activity)`
  margin-left: 0.25rem;
  margin-right: 0.5rem;
  width: 16px;
  height: 16px;
`

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

const SOCK = (
  <span role="img" aria-label="has socks emoji" style={{ marginTop: -4, marginBottom: -4 }}>
    🧦
  </span>
)

// eslint-disable-next-line react/prop-types
function StatusIcon({ connector }: { connector: AbstractConnector }) {
  if (connector === injected) {
    return (
      <IconWrapper size={12} margin={5}>
        <img src={ConnectStatus} alt={''} />
      </IconWrapper>
    )
  } else if (connector === walletconnect) {
    return (
      <IconWrapper size={16}>
        <img src={WalletConnectIcon} alt={''} />
      </IconWrapper>
    )
  } else if (connector === walletlink) {
    return (
      <IconWrapper size={16}>
        <img src={CoinbaseWalletIcon} alt={''} />
      </IconWrapper>
    )
  } else if (connector === fortmatic) {
    return (
      <IconWrapper size={16}>
        <img src={FortmaticIcon} alt={''} />
      </IconWrapper>
    )
  } else if (connector === portis) {
    return (
      <IconWrapper size={16}>
        <img src={PortisIcon} alt={''} />
      </IconWrapper>
    )
  }
  return null
}

function Web3StatusInner() {
  const { t } = useTranslation()
  const { account, connector, error } = useWeb3React()
  const { addChain, isAddChainEnabled } = useAddChain()

  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)

  const hasPendingTransactions = !!pending.length
  const hasSocks = useHasSocks()
  const toggleWalletModal = useWalletModalToggle()

  if (account) {
    return (
      <Web3StatusConnected id="web3-status-connected" onClick={toggleWalletModal} pending={hasPendingTransactions}>
        {hasPendingTransactions ? (
          <RowBetween>
            <Text>{pending?.length} Pending</Text> <Loader stroke="white" />
          </RowBetween>
        ) : (
          <>
            {hasSocks ? SOCK : null}
            <Text>{ENSName || shortenAddress(account)}</Text>
          </>
        )}
        {!hasPendingTransactions && connector && <StatusIcon connector={connector} />}
      </Web3StatusConnected>
    )
  } else if (error) {
    return error instanceof UnsupportedChainIdError && isAddChainEnabled ? (
      <Web3StatusConnect onClick={() => addChain(FUSE_CHAIN)}>
        <Text>Switch to Fuse</Text>
      </Web3StatusConnect>
    ) : (
      <Web3StatusError onClick={toggleWalletModal}>
        <NetworkIcon />
        <Text>Error</Text>
      </Web3StatusError>
    )
  } else {
    if (isAddChainEnabled) {
      return (
        <Web3StatusConnect onClick={() => addChain(FUSE_CHAIN)}>
          <Text>Switch to Fuse</Text>
        </Web3StatusConnect>
      )
    }

    return (
      <Web3StatusConnect id="connect-wallet" onClick={toggleWalletModal} faded={!account}>
        <Wallet /> <span>{t('Connect wallet')}</span>
      </Web3StatusConnect>
    )
  }
}

export default function Web3Status() {
  const { active, account } = useWeb3React()
  const contextNetwork = useWeb3React(NetworkContextName)

  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)
  const confirmed = sortedRecentTransactions.filter(tx => tx.receipt).map(tx => tx.hash)

  if (!contextNetwork.active && !active) {
    return null
  }

  return (
    <>
      <Web3StatusInner />
      <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
    </>
  )
}
