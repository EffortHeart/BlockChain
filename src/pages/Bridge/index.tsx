import React, { useCallback, useContext, useState, useEffect, useMemo } from 'react'
import * as Sentry from '@sentry/react'
import AppBody from '../AppBody'
import { SwapPoolTabs } from '../../components/NavigationTabs'
import CurrencyInputPanel from '../../components/CurrencyInputPanel'
import { Currency, TokenAmount, ChainId } from '@fuseio/fuse-swap-sdk'
import { currencyId } from '../../utils/currencyId'
import {
  useBridgeActionHandlers,
  useBridgeState,
  useDerivedBridgeInfo,
  useBridgeStatus,
  useDetectBridgeDirection,
  BridgeDirection,
  useDefaultsFromURLSearch,
  useAddBridgeTransaction,
  useUnclaimedAmbBridgeTransaction,
  useUnclaimedNativeBridgeTransaction
} from '../../state/bridge/hooks'
import { Field } from '../../state/bridge/actions'
import { maxAmountSpend } from '../../utils/maxAmountSpend'
import { AutoColumn, ColumnCenter } from '../../components/Column'
import { Wrapper, Logo, ArrowWrapper, Loader, DestinationWrapper } from '../../components/bridge/styleds'
import { ArrowDown } from 'react-feather'
import { ThemeContext } from 'styled-components'
import { BottomGrouping } from '../../components/bridge/styleds'
import { ButtonLight, ButtonPrimary, ButtonError } from '../../components/Button'
import { DarkBlueCard } from '../../components/Card'
import ethLogo from '../../assets/images/ethereum-logo.png'
import fuseLogo from '../../assets/images/fuse-logo-wordmark.svg'
import bnbLogo from '../../assets/svg/bnb.svg'
import loader from '../../assets/svg/loader.svg'
import { useWalletModalToggle } from '../../state/application/hooks'
import { useApproveCallback, ApprovalState } from '../../hooks/useApproveCallback'
import { RowBetween } from '../../components/Row'
import { Dots } from '../Pool/styleds'
import { Text } from 'rebass'
import { useActiveWeb3React, useChain } from '../../hooks'
import { UNSUPPORTED_BRIDGE_TOKENS } from '../../constants'
import { TYPE } from '../../theme'
import UnsupportedBridgeTokenModal from '../../components/UnsupportedBridgeTokenModal'
import { useUserActionHandlers } from '../../state/user/hooks'
import fuseApi from '../../api/fuseApi'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../../state'
import { useTransactionAdder } from '../../state/transactions/hooks'
import BridgeDetails from '../../components/bridge/BridgeDetails'
import { getBridge, getApprovalAddress, supportRecipientTransfer, getBridgeType, isContract } from '../../utils'
import DestinationButton from '../../components/bridge/DestinationButton'
import FeeModal from '../../components/FeeModal'
import TokenMigrationModal from '../../components/TokenMigration'
import { WrappedTokenInfo } from '../../state/lists/hooks'
import AutoSwitchNetwork from '../../components/AutoSwitchNetwork'
import AddressInputPanel from '../../components/AddressInputPanel'
import { FUSE_CHAIN } from '../../constants/chains'
import useAddChain from '../../hooks/useAddChain'
import AddTokenToMetamaskModal from '../../components/AddTokenToMetamaskModal'
import MainCard from '../../components/MainCard'
import BridgeInfo from '../../components/bridge/BridgeInfo'
import { AppWrapper, AppWrapperInner } from '../../components/swap/styleds'
import ClaimAmbTransferModal from '../../components/ClaimAmbTransferModal'
import ClaimNativeTransferModal from '../../components/ClaimNativeTransferModal'
import { useAsyncMemo } from 'use-async-memo'

export default function Bridge() {
  const { account, chainId, library } = useActiveWeb3React()
  const theme = useContext(ThemeContext)
  const dispatch = useDispatch<AppDispatch>()
  const { addChain, isAddChainEnabled } = useAddChain()

  const {
    inputCurrencyId: defaultInputCurrencyId,
    sourceChain,
    amount,
    recipient: defaultRecipient
  } = useDefaultsFromURLSearch()

  const [selectedBridgeDirection, setSelectedBridgeDirection] = useState<BridgeDirection | undefined>()
  const bridgeDirection = useDetectBridgeDirection(selectedBridgeDirection)

  const [migrationCurrency, setMigrationCurrency] = useState<Currency | undefined>()

  const {
    independentField,
    typedValue,
    recipient,
    currentAmbBridgeTransaction,
    currentNativeBridgeTransaction
  } = useBridgeState()

  const {
    currencies,
    currencyBalances,
    parsedAmounts,
    inputError,
    bridgeTransactionStatus,
    inputCurrencyId
  } = useDerivedBridgeInfo(bridgeDirection)

  const { [Field.INPUT]: inputCurrency } = currencies

  const bridgeStatus = useBridgeStatus(bridgeTransactionStatus)

  const { updateCompletedBridgeTransfer } = useUserActionHandlers()

  const {
    onFieldInput,
    onSelectBridgeDirection,
    onSelectCurrency,
    onSetRecipient,
    onSetCurrentBridgeTransaction
  } = useBridgeActionHandlers()

  // unsupportedBridge modal
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const [feeModalOpen, setFeeModalOpen] = useState(false)

  const [migrateModalOpen, setMigrateModalOpen] = useState(false)

  const [addTokenModalOpen, setAddTokenModalOpen] = useState(false)

  const [claimTransferModalOpen, setClaimTransferModalOpen] = useState(false)

  const formattedAmounts = {
    [independentField]: typedValue
  }

  const maxAmounts: { [field in Field]?: TokenAmount } = [Field.INPUT].reduce((accumulator, field) => {
    return {
      ...accumulator,
      [field]: maxAmountSpend(currencyBalances[field])
    }
  }, {})

  const atMaxAmounts: { [field in Field]?: TokenAmount } = [Field.INPUT].reduce((accumulator, field) => {
    return {
      ...accumulator,
      [field]: maxAmounts[field]?.equalTo(parsedAmounts[field] ?? '0')
    }
  }, {})

  const toggleWalletModal = useWalletModalToggle()

  const { isHome, isEtheruem, isBsc } = useChain()

  const approvalAddress = getApprovalAddress(inputCurrencyId, bridgeDirection)

  const [approval, approveCallback] = useApproveCallback(parsedAmounts[Field.INPUT], approvalAddress)

  const addTransaction = useTransactionAdder()

  const addBridgeTransaction = useAddBridgeTransaction()

  const supportRecipient = useMemo(() => {
    return supportRecipientTransfer(inputCurrencyId, bridgeDirection) && !isHome
  }, [bridgeDirection, inputCurrencyId, isHome])

  async function onTransfer() {
    if (!chainId || !library || !account || !inputCurrency?.symbol || !bridgeDirection) return

    try {
      const { [Field.INPUT]: parsedAmountInput } = parsedAmounts

      if (!parsedAmountInput || !inputCurrencyId) {
        return
      }

      const Bridge = getBridge(inputCurrencyId, bridgeDirection)

      if (!Bridge) return

      const bridge = new Bridge(
        inputCurrencyId,
        inputCurrency.symbol,
        parsedAmountInput,
        library,
        chainId,
        account,
        dispatch,
        isHome,
        addTransaction,
        recipient
      )

      const response = await bridge?.executeTransaction()
      if (response) {
        if (isEtheruem || isBsc) {
          await fuseApi.fund(account)
        }

        if (bridgeDirection === BridgeDirection.FUSE_TO_ETH) {
          const bridgeType = getBridgeType(inputCurrencyId, bridgeDirection)
          const bridgeTransaction = {
            homeTxHash: response.hash,
            bridgeDirection,
            bridgeType
          }
          addBridgeTransaction(bridgeTransaction)
          onSetCurrentBridgeTransaction(bridgeTransaction)
          setClaimTransferModalOpen(true)
        }

        onSetRecipient('')
        updateCompletedBridgeTransfer()
        setAddTokenModalOpen(true)
      }

      onFieldInput('')
    } catch (error) {
      if (error?.code !== 4001) {
        Sentry.captureException(error, {
          tags: {
            section: 'Bridge'
          }
        })

        console.log(error)
      }
    }
  }

  const handleDestinationSelect = useCallback(
    (bridgeDirection: BridgeDirection) => {
      setSelectedBridgeDirection(bridgeDirection)
      onSelectBridgeDirection(bridgeDirection)
      // reset currency on bridge selection
      onSelectCurrency('')
    },
    [onSelectBridgeDirection, onSelectCurrency]
  )

  const handleInputCurrencySelect = useCallback(
    (inputCurrency: Currency) => {
      if (inputCurrency.symbol && UNSUPPORTED_BRIDGE_TOKENS.includes(inputCurrency.symbol)) {
        setModalOpen(true)
        return
      }

      const token = inputCurrency instanceof WrappedTokenInfo ? inputCurrency : undefined

      if (token?.isDeprecated) {
        setMigrationCurrency(inputCurrency)
        setMigrateModalOpen(true)
        return
      }

      onSelectCurrency(currencyId(inputCurrency))
    },
    [onSelectCurrency]
  )

  const isAccountContract = useAsyncMemo(() => {
    if (!library || !account) return null
    return isContract(library, account)
  }, [library, account])

  // check if we have unconfirmed transactions
  const unclaimedAmbTransaction = useUnclaimedAmbBridgeTransaction()
  useEffect(() => {
    if (unclaimedAmbTransaction) {
      onSetCurrentBridgeTransaction(unclaimedAmbTransaction)
      setClaimTransferModalOpen(true)
    }
  }, [onSetCurrentBridgeTransaction, unclaimedAmbTransaction])

  const unclaimedNativeBridgeTransaction = useUnclaimedNativeBridgeTransaction()
  useEffect(() => {
    if (unclaimedNativeBridgeTransaction) {
      onSetCurrentBridgeTransaction(unclaimedNativeBridgeTransaction)
      setClaimTransferModalOpen(true)
    }
  }, [onSetCurrentBridgeTransaction, unclaimedNativeBridgeTransaction])

  // set defaults from url params

  useEffect(() => {
    onSelectCurrency(defaultInputCurrencyId)
  }, [defaultInputCurrencyId, onSelectCurrency])

  useEffect(() => {
    if (amount) onFieldInput(amount)
  }, [amount, onFieldInput])

  useEffect(() => {
    if (defaultRecipient && supportRecipient) onSetRecipient(defaultRecipient)
  }, [defaultRecipient, onSetRecipient, supportRecipient])

  return (
    <>
      <AppBody>
        <AppWrapper>
          <AppWrapperInner>
            <SwapPoolTabs active={'bridge'} />
            <MainCard>
              <Wrapper id="bridge-page">
                <AutoSwitchNetwork chainId={sourceChain} />
                <UnsupportedBridgeTokenModal isOpen={modalOpen} setIsOpen={setModalOpen} />
                <FeeModal isOpen={feeModalOpen} onDismiss={() => setFeeModalOpen(false)} />
                <TokenMigrationModal
                  token={migrationCurrency}
                  isOpen={migrateModalOpen}
                  onDismiss={() => setMigrateModalOpen(false)}
                  listType="Bridge"
                />
                <AddTokenToMetamaskModal
                  isOpen={addTokenModalOpen}
                  setIsOpen={setAddTokenModalOpen}
                  currency={inputCurrency}
                />
                {currentAmbBridgeTransaction && (
                  <ClaimAmbTransferModal
                    isOpen={claimTransferModalOpen}
                    onDismiss={() => setClaimTransferModalOpen(false)}
                    bridgeTransaction={currentAmbBridgeTransaction}
                  />
                )}
                {currentNativeBridgeTransaction && (
                  <ClaimNativeTransferModal
                    isOpen={claimTransferModalOpen}
                    onDismiss={() => setClaimTransferModalOpen(false)}
                    bridgeTransaction={currentNativeBridgeTransaction}
                  />
                )}
                {isHome && (
                  <AutoColumn gap="md">
                    <TYPE.mediumHeader color='#7a7193' fontSize={16}>
                      Select Destination
                    </TYPE.mediumHeader>
                    <DestinationWrapper>
                      <DestinationButton
                        text="Ethereum"
                        logoSrc={ethLogo}
                        color={theme.ethereum}
                        colorSelect="rgba(98, 126, 234, 0.2)"
                        selectedBridgeDirection={bridgeDirection}
                        bridgeDirection={BridgeDirection.FUSE_TO_ETH}
                        handleClick={handleDestinationSelect}
                      />
                      <TYPE.body fontSize={14} color='#7a7193' fontWeight={500}>
                        or
                      </TYPE.body>
                      <DestinationButton
                        text="Binance Smart Chain"
                        logoSrc={bnbLogo}
                        color={theme.binance}
                        colorSelect="rgba(243, 186, 47, 0.2)"
                        selectedBridgeDirection={bridgeDirection}
                        bridgeDirection={BridgeDirection.FUSE_TO_BSC}
                        handleClick={handleDestinationSelect}
                      />
                    </DestinationWrapper>
                  </AutoColumn>
                )}
                <AutoColumn gap={'md'}>
                  <TYPE.mediumHeader color='#7a7193' fontSize={16}>
                    Select Currency
                  </TYPE.mediumHeader>
                  <CurrencyInputPanel
                    bridge={true}
                    label="Amount"
                    value={formattedAmounts[Field.INPUT]}
                    onUserInput={onFieldInput}
                    onCurrencySelect={handleInputCurrencySelect}
                    onMax={() => {
                      onFieldInput(maxAmounts[Field.INPUT]?.toExact() ?? '')
                    }}
                    currency={currencies[Field.INPUT]}
                    showMaxButton={!atMaxAmounts[Field.INPUT]}
                    id="bridge-input-token"
                    showETH={isHome || isBsc}
                    listType="Bridge"
                  />
                </AutoColumn>
                {recipient && supportRecipient && (
                  <AutoColumn gap="md" style={{ marginTop: '1rem' }}>
                    <AddressInputPanel
                      id="recipient"
                      value={recipient}
                      onChange={onSetRecipient}
                      readOnly
                      chainId={ChainId.FUSE}
                    />
                  </AutoColumn>
                )}
                {!isHome && (
                  <>
                    <ColumnCenter>
                      <ArrowWrapper>
                        <ArrowDown size="16" color={theme.text2} />
                      </ArrowWrapper>
                    </ColumnCenter>
                    <DarkBlueCard>
                      <Logo src={fuseLogo} alt="fuse logo" />
                    </DarkBlueCard>
                  </>
                )}
                <BottomGrouping>
                  {!account ? (
                    isAddChainEnabled ? (
                      <ButtonLight onClick={() => addChain(FUSE_CHAIN)}>Switch to Fuse</ButtonLight>
                    ) : (
                      <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
                    )
                  ) : (
                    <AutoColumn gap={'md'}>
                      {(approval === ApprovalState.NOT_APPROVED || approval === ApprovalState.PENDING) && (
                        <RowBetween>
                          <ButtonPrimary
                            onClick={approveCallback}
                            disabled={approval === ApprovalState.PENDING}
                            width="100%"
                          >
                            {approval === ApprovalState.PENDING ? (
                              <Dots>Approving {currencies[Field.INPUT]?.symbol}</Dots>
                            ) : (
                              'Approve ' + currencies[Field.INPUT]?.symbol
                            )}
                          </ButtonPrimary>
                        </RowBetween>
                      )}
                      <ButtonError
                        id="bridge-transfer-button"
                        onClick={onTransfer}
                        disabled={
                          approval !== ApprovalState.APPROVED || !!inputError || !!bridgeStatus || isAccountContract
                        }
                        error={
                          approval !== ApprovalState.APPROVED || (!bridgeStatus && !!inputError) || isAccountContract
                        }
                      >
                        {bridgeStatus ? (
                          <>
                            <Loader src={loader} />
                            <Text fontSize={16} fontWeight={500}>
                              {bridgeStatus}
                            </Text>
                          </>
                        ) : (
                          <Text fontSize={16} fontWeight={500}>
                            {inputError ?? 'Transfer'}
                          </Text>
                        )}
                      </ButtonError>
                    </AutoColumn>
                  )}
                </BottomGrouping>
                {isAccountContract && (
                  <TYPE.main fontSize={14} fontWeight={400} color="#FF6871" marginTop="16px">
                    Important! - We currently dont support bridge transactions sent from a wallet contract (like
                    FuseCash). Your funds are probably going to get lost if you transfer.
                  </TYPE.main>
                )}
                {bridgeDirection === BridgeDirection.FUSE_TO_ETH && (
                  <TYPE.main fontSize={14} fontWeight={400} color="#FF6871" marginTop="16px">
                    Important! - Ethereum claim fees apply and will be paid by the user, be aware of the gas costs
                  </TYPE.main>
                )}
                <BridgeInfo />
              </Wrapper>
            </MainCard>
            <BridgeDetails
              inputCurrencyId={inputCurrencyId}
              inputAmount={parsedAmounts[Field.INPUT]}
              bridgeDirection={bridgeDirection}
            />
          </AppWrapperInner>
        </AppWrapper>
      </AppBody>
    </>
  )
}
