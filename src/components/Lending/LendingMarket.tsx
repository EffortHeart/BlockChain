import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import Icon from './icons'
import { Market } from '../../state/lending/hooks'
import { TBodyTd, TBodyTr } from '../Table'

const Link = styled.a`
  width: 90px;
  z-index: 1;
  font-weight: 500;
  line-height: 17px;
  padding: 7px;
  text-align: center;
  position: relative;
  display: inline-block;
  transform-origin: right top 0;
  border-radius: 12px;
  margin: auto;
  text-decoration: none;
  background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  :after {
    content: '';
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 2px;
    border-radius: 12px;
    background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%), #8f9197;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
  :hover {
    background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%), #8f9197;
    color: black;
    -webkit-background-clip: none;
    -webkit-text-fill-color: black;
  }
`

const ApyField = styled.div<{ background?: string }>`
  font-size: 16px;
  display: inline-block;
  padding: 5px 10px;
  text-align: center;
  color: black;
  margin: auto;
  border-radius: 999px;
  background: ${({ background }) => background};
`

const Text = styled.div`
  font-size: 14px;
  font-weight: 300;
`

const GreyText = styled.span`
  color: #a7a8af;
`

interface LendingMarketProps {
  market: Market
}

export default function LendingMarket({ market }: LendingMarketProps) {
  return (
    <TBodyTr>
      <TBodyTd>
        <Icon address={market.underlyingAssetAddress} />
      </TBodyTd>
      <TBodyTd>
        <Text>
          {numeral(market.liquidity).format('$0a')}
          <GreyText> USD</GreyText>
        </Text>
      </TBodyTd>
      <TBodyTd>
        <Text>
          {numeral(market.borrowBalance).format('$0a')}
          <GreyText> USD</GreyText>
        </Text>
      </TBodyTd>
      <TBodyTd>
        <ApyField background="linear-gradient(0deg, #d0f7d7, #d0f7d7)">
          {numeral(market.supplyApy).format('0.0000')}%
        </ApyField>
      </TBodyTd>
      <TBodyTd>
        <ApyField background="linear-gradient(0deg, #fdffb2, #fdffb2)">
          {numeral(market.borrowApy).format('0.0000')}%
        </ApyField>
      </TBodyTd>

      <TBodyTd>
        <Link
          target="_blank"
          href="https://app.ola.finance/networks/0x26a562B713648d7F3D1E1031DCc0860A4F3Fa340/markets"
          style={{ marginRight: '1rem' }}
        >
          Deposit
        </Link>
        <Link
          target="_blank"
          href="https://app.ola.finance/networks/0x26a562B713648d7F3D1E1031DCc0860A4F3Fa340/markets"
        >
          Borrow
        </Link>
      </TBodyTd>
    </TBodyTr>
  )
}
