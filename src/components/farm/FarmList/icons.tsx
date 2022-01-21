import styled from 'styled-components'
import React from 'react'
import wethfuse from '../../../assets/svg/pairs/WETH-FUSE.svg'
import goodusdc from '../../../assets/svg/pairs/G$-USDC.svg'
import fusdbnb from '../../../assets/svg/pairs/FUSD-BNB.svg'
import fusebnb from '../../../assets/svg/pairs/FUSE-BNB.svg'
import fusdfuse from '../../../assets/svg/pairs/FUSD-FUSE.svg'
import wbtcweth from '../../../assets/svg/pairs/WBTC-WETH.svg'
import daiusdt from '../../../assets/svg/pairs/DAI-USDT.svg'
import omusdc from '../../../assets/svg/pairs/OM-USDC.svg'
import usdcfuse from '../../../assets/svg/pairs/USDC-FUSE.svg'
import usdcusdt from '../../../assets/svg/pairs/USDC-USDT.svg'
import wethusdc from '../../../assets/svg/pairs/WETH-USDC.svg'
import linkweth from '../../../assets/svg/pairs/LINK-WETH.svg'
import grtweth from '../../../assets/svg/pairs/GRT-WETH.svg'
import dextfuse from '../../../assets/svg/pairs/DEXT-FUSE.svg'
import fuseBusd from '../../../assets/images/fuse-busd.png'
import fuseGooddollar from '../../../assets/svg/coins-pair-fuse-gooddollar.svg'

const Container = styled.div<{ height?: number }>`
  display: flex;
  :hover {
    text-decoration: underline;
  }
  > img {
    height: ${({ height }) => (height ? `${height}px` : '42px')};
    margin-right: 12px;
  }
  > span {
    cursor: pointer;
    line-height: 40px;
    font-size: 16px;
    font-weight: 400;
  }
`

type IconProps = {
  name: string
  pairName: string
  height?: number
}

export default function Icon({ name, pairName, height }: IconProps) {
  const FarmIcons: { [name: string]: any } = {
    'G$/USDC': goodusdc,
    'fUSD/BNB': fusdbnb,
    'KNC/USDC': fusdfuse,
    'fUSD/FUSE': fusdfuse,
    'WETH/FUSE': wethfuse,
    'ETH/FUSE': wethfuse,
    'WBTC/WETH': wbtcweth,
    'DAI/USDT': daiusdt,
    'OM/USDC': omusdc,
    'USDC/FUSE': usdcfuse,
    'USDC/USDT': usdcusdt,
    'WETH/USDC': wethusdc,
    'LINK/WETH': linkweth,
    'GRT/WETH': grtweth,
    'DEXT/FUSE': dextfuse,
    'FUSE/USDC': usdcfuse,
    'FUSE/BUSD': fuseBusd,
    'FUSE/BNB': fusebnb,
    'FUSE/G$': fuseGooddollar
  }

  return (
    <Container height={height}>
      <img src={FarmIcons[pairName]} alt={FarmIcons[pairName]} />
      <span>{name}</span>
    </Container>
  )
}
