import { Currency, Pair } from '@fuseio/fuse-swap-sdk'
import React, { useState, useContext, useCallback } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { darken } from 'polished'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import CurrencySearchModal from '../SearchModal/CurrencySearchModal'
import CurrencyLogo from '../CurrencyLogo'
import DoubleCurrencyLogo from '../DoubleLogo'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
import { Input as NumericalInput } from '../NumericalInput'
import { ReactComponent as DropDown } from '../../assets/images/dropdown.svg'

import { useActiveWeb3React } from '../../hooks'
import { useTranslation } from 'react-i18next'
import { getCurrencySymbol } from '../../utils'

const InputRow = styled.div<{ selected: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  padding: ${({ selected }) => (selected ? '0.75rem 0.5rem 0.75rem 1rem' : '0.75rem 0.75rem 0.75rem 1rem')};
`

const CurrencySelect = styled.button<{ selected: boolean }>`
  align-items: center;
  height: 2.2rem;
  font-size: 20px;
  font-weight: 500;
  background: linear-gradient(90deg, hsla(247,96%,61%,1) , hsla(188,100%,64%,1));
  color: white;
  border-radius: 999px;
  outline: none;
  cursor: pointer;
  user-select: none;
  border: none;
  padding: 0 0.5rem;
  svg path {
    stroke: white;
    stroke-width: 1.5px;
  }
  :focus,
  :hover {
    background-color: ${({ selected, theme }) => (selected ? darken(0.02, theme.bg1) : darken(0.02, theme.bg7))};
    color: #ffffff;
    svg path {
      stroke: #ffffff;
      stroke-width: 1.5px;
    }
  }
`

const LabelRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  color: ${({ theme }) => theme.text1};
  font-size: 0.75rem;
  line-height: 1rem;
  padding: 0.75rem 1rem 0 1rem;
  span:hover {
    cursor: pointer;
    color: ${({ theme }) => darken(0.2, theme.text2)};
  }
`

const Aligner = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const StyledDropDown = styled(DropDown) <{ selected: boolean }>`
  margin: 0 0.25rem 0 0.5rem;
  height: 35%;
`

const InputPanel = styled.div<{ hideInput?: boolean }>`
  ${({ theme }) => theme.flexColumnNoWrap}
  position: relative;
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  /* background-color: ${({ theme }) => theme.bg2}; */
  z-index: 1;
`

const Container = styled.div<{ hideInput: boolean }>`
  border-radius: ${({ hideInput }) => (hideInput ? '8px' : '20px')};
  /* background-color: ${({ theme }) => theme.secondary4}; */
  background-color: #ede9f7;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
`

const StyledTokenName = styled.span<{ active?: boolean }>`
  ${({ active }) => (active ? '  margin: 0 0.25rem 0 0.25rem;' : '  margin: 0 0.25rem 0 0.25rem;')}
  font-size: 16px;
  font-weight: 400;
`

const StyledBalanceMax = styled.button`
  height: 28px;
  background-color: ${({ theme }) => theme.bg7};
  border: 0px solid;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  margin-right: 0.5rem;
  color: ${({ theme }) => theme.text1};
  :hover {
    border: 1px solid ${() => darken(0.05, '#3b3e48')};
    background-color: ${({ theme }) => darken(0.05, theme.bg7)};
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    margin-right: 0.5rem;
  `};
`

interface CurrencyInputPanelProps {
  value: string
  bridge?: boolean
  onUserInput: (value: string) => void
  onMax?: () => void
  showMaxButton: boolean
  label?: string
  onCurrencySelect?: (currency: Currency) => void
  currency?: Currency | null
  disableCurrencySelect?: boolean
  hideBalance?: boolean
  pair?: Pair | null
  hideInput?: boolean
  otherCurrency?: Currency | null
  id: string
  showCommonBases?: boolean
  showETH?: boolean
  listType?: CurrencyListType
}

export default function CurrencyInputPanel({
  value,
  onUserInput,
  onMax,
  showMaxButton,
  label = 'Input',
  onCurrencySelect,
  currency,
  disableCurrencySelect = false,
  hideBalance = false,
  pair = null, // used for double token logo
  hideInput = false,
  otherCurrency,
  id,
  showCommonBases,
  showETH = true,
  listType = 'Swap'
}: CurrencyInputPanelProps) {
  const { t } = useTranslation()

  const [modalOpen, setModalOpen] = useState(false)
  const { account, chainId } = useActiveWeb3React()
  const selectedCurrencyBalance = useCurrencyBalance(account ?? undefined, currency ?? undefined)
  const theme = useContext(ThemeContext)

  const handleDismissSearch = useCallback(() => {
    setModalOpen(false)
  }, [setModalOpen])

  return (
    <InputPanel id={id}>
      <Container hideInput={hideInput}>
        {!hideInput && (
          <LabelRow>
            <RowBetween>
              <TYPE.body color="#7e6e9d" fontWeight={500} fontSize={16}>
                {label}
              </TYPE.body>
              {account && (
                <TYPE.body
                  onClick={onMax}
                  color={theme.text2}
                  fontWeight={500}
                  fontSize={14}
                  style={{ display: 'inline', cursor: 'pointer' }}
                >
                  {!hideBalance && !!currency && selectedCurrencyBalance
                    ? 'Balance: ' + selectedCurrencyBalance?.toSignificant(6)
                    : ' -'}
                </TYPE.body>
              )}
            </RowBetween>
          </LabelRow>
        )}
        <InputRow style={hideInput ? { padding: '0', borderRadius: '8px' } : {}} selected={disableCurrencySelect}>
          {!hideInput && (
            <>
              <NumericalInput
                className="token-amount-input"
                value={value}
                onUserInput={val => {
                  onUserInput(val)
                }}
              />
              {account && currency && showMaxButton && label !== 'To' && (
                <StyledBalanceMax onClick={onMax}>MAX</StyledBalanceMax>
              )}
            </>
          )}
          <CurrencySelect
            selected={!!currency}
            className="open-currency-select-button"
            onClick={() => {
              if (!disableCurrencySelect) {
                setModalOpen(true)
              }
            }}
          >
            <Aligner>
              {pair ? (
                <DoubleCurrencyLogo currency0={pair.token0} currency1={pair.token1} size={24} margin={true} />
              ) : currency ? (
                <CurrencyLogo currency={currency} size={'24px'} />
              ) : null}
              {pair ? (
                <StyledTokenName className="pair-name-container">
                  {pair?.token0.symbol}:{pair?.token1.symbol}
                </StyledTokenName>
              ) : (
                <StyledTokenName className="token-symbol-container" active={Boolean(currency && currency.symbol)}>
                  {(currency && currency.symbol && currency.symbol.length > 20
                    ? currency.symbol.slice(0, 4) +
                    '...' +
                    currency.symbol.slice(currency.symbol.length - 5, currency.symbol.length)
                    : getCurrencySymbol(currency, chainId)) || t('selectToken')}
                </StyledTokenName>
              )}
              {!disableCurrencySelect && <StyledDropDown selected={!!currency} />}
            </Aligner>
          </CurrencySelect>
        </InputRow>
      </Container>
      {!disableCurrencySelect && onCurrencySelect && (
        <CurrencySearchModal
          isOpen={modalOpen}
          onDismiss={handleDismissSearch}
          onCurrencySelect={onCurrencySelect}
          selectedCurrency={currency}
          otherSelectedCurrency={otherCurrency}
          showCommonBases={showCommonBases}
          showETH={showETH}
          listType={listType}
        />
      )}
    </InputPanel>
  )
}
