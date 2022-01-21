import React from 'react'
import styled from 'styled-components'
import { useLastTruthy } from '../../hooks/useLast'
import { AdvancedSwapDetails, AdvancedSwapDetailsProps } from './AdvancedSwapDetails'

const AdvancedDetailsFooter = styled.div<{ show: boolean }>`
  margin-top: 1rem;
  padding: 1rem;
  background: #242637;
  width: 100%;
  border-radius: 1rem;
  color: ${({ theme }) => theme.text2};
  z-index: -1;

  transform: ${({ show }) => (show ? 'translateY(0%)' : 'translateY(-100%)')};
  transition: transform 300ms ease-in-out;
`

export default function AdvancedSwapDetailsDropdown({ trade, ...rest }: AdvancedSwapDetailsProps) {
  const lastTrade = useLastTruthy(trade)

  return (
    <AdvancedDetailsFooter show={Boolean(trade)}>
      <AdvancedSwapDetails {...rest} trade={trade ?? lastTrade ?? undefined} />
    </AdvancedDetailsFooter>
  )
}
