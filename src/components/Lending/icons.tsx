import weth from '../../assets/svg/pairs/weth.svg'
import wbtc from '../../assets/svg/pairs/wbtc.svg'
import usdc from '../../assets/svg/pairs/usdc.svg'
import fuse from '../../assets/svg/pairs/fuse.svg'
import fusd from '../../assets/svg/fuse-dollar.svg'
import busd from '../../assets/svg/pairs/busd.svg'

import styled from 'styled-components'
import React from 'react'
import { FUSE_FUSD, FUSE_BUSD, FUSE_USDC, FUSE_WBTC, FUSE_WETH, NATIVE_ADDRESS } from '../../constants'

interface LendingIconProps {
  address: string
}

export default function LendingIcon({ address }: LendingIconProps) {
  const IconMap = {
    [FUSE_WBTC.address]: wbtc,
    [FUSE_WETH.address]: weth,
    [FUSE_USDC.address]: usdc,
    [NATIVE_ADDRESS]: fuse,
    [FUSE_FUSD.address]: fusd,
    [FUSE_BUSD.address]: busd
  }

  const NameMap = {
    [FUSE_WBTC.address]: 'WBTC',
    [FUSE_WETH.address]: 'WETH',
    [FUSE_USDC.address]: 'USDC',
    [NATIVE_ADDRESS]: 'FUSE',
    [FUSE_FUSD.address]: 'fUSD',
    [FUSE_BUSD.address]: 'BUSD'
  }

  const Container = styled.div`
    display: flex;
    cursor: pointer;
    align-items: center;
    > img {
      height: 32px;
      margin-right: 12px;
    }
    > span {
      line-height: 50px;
      font-size: 16px;
      font-weight: 400;
    }
  `

  return (
    <Container>
      <img src={IconMap[address]} alt="" />
      <span>{NameMap[address]}</span>
    </Container>
  )
}
