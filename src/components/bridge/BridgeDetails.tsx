import React, { useContext } from 'react'
import styled, { ThemeContext } from 'styled-components'
import { RowBetween, RowFixed } from '../Row'
import { TYPE } from '../../theme'
import QuestionHelper from '../QuestionHelper'
import { CurrencyAmount } from '@fuseio/fuse-swap-sdk'
import { useBridgeFee, useCalculatedBridgeFee, BridgeDirection } from '../../state/bridge/hooks'
import { useCurrency } from '../../hooks/Tokens'

const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
  width: 100%;
  margin: auto;
  border-radius: 16px;
  color: ${({ theme }) => theme.text2};
  background-color: ${({ theme }) => theme.bg1};
  margin-top: 1rem;
  z-index: -1;
  display: ${({ show }) => (show ? 'flex' : 'none')};
  transition: transform 300ms ease-in-out;
`

function BridgeDetails({
  inputCurrencyId,
  inputAmount,
  bridgeDirection
}: {
  inputCurrencyId: string | undefined
  inputAmount: CurrencyAmount | undefined
  bridgeDirection: BridgeDirection | undefined
}) {
  const theme = useContext(ThemeContext)
  const currency = useCurrency(inputCurrencyId, 'Bridge')
  const fee = useBridgeFee(inputCurrencyId, bridgeDirection)
  const calculatedFee = useCalculatedBridgeFee(inputCurrencyId, inputAmount, bridgeDirection)

  const feePercentage = fee ? Number(fee) * 100 : 0
  const parsedCalculatedFee = calculatedFee ? Number(calculatedFee) : 0
  const show = parsedCalculatedFee > 0

  return (
    <AdvancedDetailsFooter show={show}>
      <RowBetween style={{ flexWrap: 'wrap', padding: '0.5rem 1rem' }}>
        <RowFixed>
          <TYPE.black fontSize={14} fontWeight={400} color={theme.text2}>
            Bridge Fee
          </TYPE.black>
          <QuestionHelper
            text={`Moving funds to mainnet requires ${feePercentage}% fee in order to cover  transaction and bridge maintenance costs`}
          />
        </RowFixed>
        <TYPE.black fontSize={14} color={theme.text1}>
          {`${calculatedFee} ${currency?.symbol} Fee (${feePercentage}%)`}
        </TYPE.black>
      </RowBetween>
    </AdvancedDetailsFooter>
  )
}

export default BridgeDetails
