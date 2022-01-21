import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { useTranslation } from 'react-i18next'
import { NavLink, Link as HistoryLink } from 'react-router-dom'

import { ArrowLeft } from 'react-feather'
import { RowBetween } from '../Row'
import QuestionHelper from '../QuestionHelper'

export const Wrapper = styled('div')`
  position: relative;
  margin-bottom: 15px;
  width: 100%;
  background: #fff;
  border-radius: 16px;
  /* -webkit-box-shadow: 9px 9px 0px 0px #000000, 8px 11px 0px 0px #000000; */
  /* box-shadow: 9px 9px 0px 0px #000000, 8px 11px 0px 0px #000000; */
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
      margin-left: 0;
  margin-right: 0;
  `}
`

const Tabs = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  border-radius: 3rem;
  justify-content: space-evenly;
`

const activeClassName = 'ACTIVE'

const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 48px;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text3};
  font-size: 16px;
  width: 100%;

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 500;
    color: ${({ theme }) => theme.text1};
    :before {
      content: '';
      position: absolute;
      width: 33.3%;
      top: 0;
      bottom: 0;
      border-radius: 16px;
      padding: 2px;
      background: linear-gradient(90deg, hsla(247,96%,61%,1) , hsla(188,100%,64%,1));
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: destination-out;
      mask-composite: exclude;
    }
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
`

const ActiveText = styled.div`
  font-weight: 500;
  font-size: 16px;
`

const StyledArrowLeft = styled(ArrowLeft)`
  color: ${({ theme }) => theme.text1};
`

export function SwapPoolTabs({ active }: { active: 'swap' | 'pool' | 'bridge' }) {
  const { t } = useTranslation()
  return (
    <Wrapper>
      <Tabs>
        <StyledNavLink id={`swap-nav-link`} to={'/swap'} isActive={() => active === 'swap'}>
          {t('swap')}
        </StyledNavLink>
        <StyledNavLink id={`pool-nav-link`} to={'/pool'} isActive={() => active === 'pool'}>
          {t('pool')}
        </StyledNavLink>
        <StyledNavLink id={`bridge-nav-link`} to={'/bridge'} isActive={() => active === 'bridge'}>
          Bridge
        </StyledNavLink>
      </Tabs>
    </Wrapper>
  )
}

export function FindPoolTabs() {
  return (
    <Tabs>
      <RowBetween style={{ margin: '16px 0 30px' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>Import Pool</ActiveText>
        <QuestionHelper text={"Use this tool to find pairs that don't automatically appear in the interface."} />
      </RowBetween>
    </Tabs>
  )
}

export function AddRemoveTabs({ adding }: { adding: boolean }) {
  return (
    <Tabs>
      <RowBetween style={{ margin: '15px 0' }}>
        <HistoryLink to="/pool">
          <StyledArrowLeft />
        </HistoryLink>
        <ActiveText>{adding ? 'Add' : 'Remove'} Liquidity</ActiveText>
        <QuestionHelper
          text={
            adding
              ? 'When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.'
              : 'Removing pool tokens converts your position back into underlying tokens at the current rate, proportional to your share of the pool. Accrued fees are included in the amounts you receive.'
          }
        />
      </RowBetween>
    </Tabs>
  )
}
