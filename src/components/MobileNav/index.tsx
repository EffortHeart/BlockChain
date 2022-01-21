import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { useNavMenuOpen, useToggleNavMenu } from '../../state/application/hooks'
import { ReactComponent as CloseIcon } from '../../assets/svg/ham_menu_close.svg'
import { ReactComponent as HomeIcon } from '../../assets/svg/home.svg'
import { ReactComponent as BridgeIcon } from '../../assets/svg/bridge.svg'
import { ReactComponent as PoolIcon } from '../../assets/svg/pool.svg'
import { ReactComponent as SwapIcon } from '../../assets/svg/swap.svg'
import { ReactComponent as FarmIcon } from '../../assets/svg/farm.svg'
import { ReactComponent as LendingIcon } from '../../assets/svg/lending.svg'
import { ReactComponent as GovernanceIcon } from '../../assets/svg/governance_icon.svg'
import SettingsTab from '../Settings'
import { FUSE_CHAIN_ID } from '../../connectors'

const Wrapper = styled.div<{ isOpen: boolean }>`
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  background-color: #e7fafe;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 150;
`

const Header = styled.div`
  display: flex;
  height: 50px;
  padding-right: 20px;
  margin-bottom: 30px;
  justify-content: end;
  align-items: center;
`

const Body = styled.div`
  margin-bottom: 40px;
`

const Footer = styled.div`
  #open-settings-dialog-button {
    border-top: 0;
  }
`

const StyledCloseIcon = styled(CloseIcon)`
  cursor: pointer;
  margin-left: 21px;
`

const StyledLink = styled(Link)`
  display: inline-block;
  width: 100%;
  color: #b5b9d3;
  text-decoration: none;
  font-weight: 500;
`

const LinkContent = styled.div`
  display: flex;
  align-items: center;
  padding: 20px 40px;
  font-size: 25px;
  font-weight: bold;
  justify-content: center;
`

const IconWrapper = styled.div`
  display: inline-block;
  margin-right: 1rem;
  height: 20px;
  width: 20px;
  .ResIcon{
    color: red !important;
  }
`

const WhiteText = styled.span`
  color: white;
  font-size: 12px;
  margin-left: 5px;
`

export default function MobileNav() {
  const navMenuOpen = useNavMenuOpen()
  const toggleNavMenu = useToggleNavMenu()

  return (
    <Wrapper isOpen={navMenuOpen}>
      <Header>
        <StyledCloseIcon onClick={() => toggleNavMenu()} />
      </Header>
      <Body>
        <StyledLink to="/home" onClick={() => toggleNavMenu()}>
          <LinkContent>
            {/* <IconWrapper>
              <HomeIcon className='ResIcon' />
            </IconWrapper> */}
            Home
          </LinkContent>
        </StyledLink>
        <StyledLink to="/swap" onClick={() => toggleNavMenu()}>
          <LinkContent>
            {/* <IconWrapper>
              <SwapIcon />
            </IconWrapper> */}
            Swap
          </LinkContent>
        </StyledLink>
        <StyledLink to="/pool" onClick={() => toggleNavMenu()}>
          <LinkContent>
            {/* <IconWrapper>
              <PoolIcon />
            </IconWrapper> */}
            Pool
          </LinkContent>
        </StyledLink>
        <StyledLink to="/bridge" onClick={() => toggleNavMenu()}>
          <LinkContent>
            {/* <IconWrapper>
              <BridgeIcon />
            </IconWrapper> */}
            Bridge
          </LinkContent>
        </StyledLink>
        <StyledLink to={`/farm/${FUSE_CHAIN_ID}`} onClick={() => toggleNavMenu()}>
          <LinkContent>
            {/* <IconWrapper>
              <FarmIcon />
            </IconWrapper> */}
            Farm
          </LinkContent>
        </StyledLink>
        <StyledLink to="/lending" onClick={() => toggleNavMenu()}>
          <LinkContent>
            {/* <IconWrapper>
              <LendingIcon />
            </IconWrapper> */}
            Lending
          </LinkContent>
        </StyledLink>
        <StyledLink to="/governance" onClick={() => toggleNavMenu()}>
          <LinkContent>
            {/* <IconWrapper>
              <GovernanceIcon />
            </IconWrapper> */}
            Governance
          </LinkContent>
        </StyledLink>
      </Body>
      {/* <Footer>
        <SettingsTab />
      </Footer> */}
    </Wrapper>
  )
}
