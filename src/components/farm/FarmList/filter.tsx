import React from 'react'
import styled from 'styled-components'
import { darken } from 'polished'
import { BINANCE_CHAIN_ID, ETHEREUM_CHAIN_ID, FUSE_CHAIN_ID } from '../../../connectors'
import fuseLogo from '../../../assets/svg/logos/fuse-small-logo.svg'
import ethereumLogo from '../../../assets/svg/logos/ethereum-small-logo.svg'
import binanceLogo from '../../../assets/svg/logos/binance-small-logo.svg'
import { useHistory } from 'react-router-dom'

const Container = styled('div')`
  border-radius: 5px;
`
const activeClassName = 'active'

const Button = styled('div').attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: center;
  justify-content: center;
  height: 45px;
  border-radius: 100px;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  font-size: 14px;
  width: 8rem;
  position: relative;
  margin: 6px 5px 6px 5px;
  z-index: 100;
  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.text1)};
  }
  &.${activeClassName} {
    .Textname{
      color:white !important;
    }
    border: none;
    text-align: center;
    background: linear-gradient(90deg, hsla(247,96%,61%,1) , hsla(188,100%,64%,1));
    border-radius: 15px;
  }
`
const LogoIcon = styled.img`
  padding: 0 5px;
  height: 26px;
`

const LogoText = styled.small`
  font-size: 15px;
  line-height: 15px;
  display: flex;
  color: #8a778f;
  align-items: center;
`
const ButtonWrapper = styled.div`
  display: flex;
  position: relative;
  margin: 5px 0;
  background: #ede9f7;
  border-radius: 20px;
  :after {
    background:linear-gradient(90deg, hsla(247,96%,61%,1) , hsla(188,100%,64%,1)); 
    content: '';
    position: absolute;
    border-radius: 20px;
    width: 99.75%;
    top: 0;
    bottom: 0;
    left: -1.15px;
    padding: 2px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`

const SubTitle = styled.small`
  font-weight: normal;
  color:#797494;
`
const Wrapper = styled.div`
  margin-top: 20px;
`

export default function Filter({ networkId }: { networkId: number }) {
  const history = useHistory()

  const selectNetwork = (network: number) => {
    history.push(`/farm/${network}`)
  }

  return (
    <Container>
      <Wrapper>
        <SubTitle>Showing pools on</SubTitle>
        <ButtonWrapper>
          <Button className={networkId === FUSE_CHAIN_ID ? 'active' : ''} onClick={() => selectNetwork(FUSE_CHAIN_ID)}>
            <LogoIcon src={fuseLogo}></LogoIcon>
            <LogoText className='Textname'>Fuse</LogoText>
          </Button>
          <Button
            className={networkId === BINANCE_CHAIN_ID ? 'active' : ''}
            onClick={() => selectNetwork(BINANCE_CHAIN_ID)}
          >
            <LogoIcon src={binanceLogo}></LogoIcon>
            <LogoText className='Textname'>BSC</LogoText>
          </Button>
          <Button
            className={networkId === ETHEREUM_CHAIN_ID ? 'active' : ''}
            onClick={() => selectNetwork(ETHEREUM_CHAIN_ID)}
          >
            <LogoIcon src={ethereumLogo}></LogoIcon>
            <LogoText className='Textname'>Ethereum</LogoText>
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </Container>
  )
}
