import React, { useState } from 'react'
import styled from 'styled-components'
import Modal from '../Modal'
import WhiteQuestionmarkIcon from '../../assets/svg/questionmark-white.svg'
import PurpleQuestionmarkIcon from '../../assets/svg/questionmark-purple.svg'
import Icon from '../../assets/svg/base.svg'
import InfoIcon from '../../assets/svg/infoBridge.svg'
import binance from '../../assets/svg/pairs/binance.svg'
import eth from '../../assets/svg/pairs/eth.svg'
import close from '../../assets/svg/close.svg'

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  background: ${({ color }) => color};
  border-radius: 12px;
  padding-bottom: 0px;
  font-size: 16px;
  line-height: 21px;
  font-weight: 500;
  justify-content: center;
`

export const Backdrop = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 500;
`

export const StyledModal = styled.div`
  z-index: 100;
  padding: 1rem;
  background: #242637;
  position: relative;
  margin: auto;
  border-radius: 12px;
`
export const Header = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
`

export const HeaderText = styled.div`
  display: flex;
  color: #fff;
  align-self: center;
  color: lightgray;
  > span {
    color: white;
    padding-left: 16px;
    font-size: 24px;
    font-weight: 500;
    line-height: 48px;
  }
`

export const Content = styled.div`
  padding-bottom: 15px;
  max-height: 30rem;
  > h1 {
    font-size: 24px;
    font-weight: 600;
  }
  > p {
    font-size: 14px;
    font-weight: 400;
    line-height: 21px;
  }
`

const Cards = styled('div')`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: auto;
  grid-gap: 1rem;
  margin-bottom: 24px;
`

const Card = styled('div')`
  padding: 19px 16px;
  border-radius: 12px;
  background: #393c56;
`
const Title = styled('div')`
  display: flex;
  width: 100%;
  text-align: center;
  position: relative;
  font-weight: 500;
  font-size: 24px;
  line-height: 24px;
  margin-bottom: 8px;

  > span {
    color: #b5b9d3;
  }
`
const Description = styled('div')`
  display: flex;
  width: 100%;
  text-align: center;
  position: relative;
  color: #b5b9d3;
  font-weight: 400;
  font-size: 16px;
`
const Chain = styled('div')`
  display: flex;
  align-items: center;
  margin-bottom: 12px;

  > span {
    font-weight: 500;
    font-size: 18px;
    margin-left: 8px;
  }
`

const InfoNotice = styled('div')`
  display: flex;
  flex-wrap: wrap;
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  width: 100%;
  text-align: center;
  position: relative;
  padding: 10px;
  background: #474b6b99;
  border-radius: 12px;
  margin-top: 12px;
  margin-bottom: 12px;
  > div {
    display: flex;
    width: 100%;
    padding-left: 7px;
    > span {
      padding-left: 5px;
      font-weight: 500;
      font-size: 16px;
      background: linear-gradient(90deg, #c2f6bf 0%, #f7fa9a 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  }
`

const InfoNoticeText = styled('div')`
  padding-bottom: 10px;
  padding-top: 7px;
  padding-left: 7px;
  width: 95%;
  text-align: left;
  font-size: 14px;
  line-height: 18px;
  font-weight: 400;
  > p {
    margin: 0;
  }
`

const Close = styled('div')`
  position: absolute;
  top: 4%;
  right: 4%;
  font-size: 22px;
  cursor: pointer;
`

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: center;
  margin-top: 16px;
  position: relative;

  > span {
    font-size: 14px;
    font-weight: 400;
    color: #9fa3c9;
    padding-left: 10px;
    cursor: pointer;
  }

  .purple-icon {
    display: block;
  }

  .white-icon {
    display: none;
  }

  :hover {
    > span {
      color: #7c7099;
    }

    .purple-icon {
      display: none;
    }

    .white-icon {
      display: block;
    }
  }
`

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #393c57;
  height: 24px;
  width: 24px;
  border-radius: 50%;
  cursor: pointer;
`

export default function BridgeInfo() {
  const [isOpen, setOpen] = useState(false)
  return (
    <Container>
      <Wrapper
        onClick={() => {
          setOpen(true)
        }}
      >
        <IconWrapper>
          <img className="purple-icon" src={PurpleQuestionmarkIcon} width="15px" height="15px" alt="Bridge Logo" />
          <img className="white-icon" src={WhiteQuestionmarkIcon} width="15px" height="15px" alt="Bridge Logo" />
        </IconWrapper>
        <span>Read about fees and minimum</span>
      </Wrapper>
      <Modal
        maxHeight={95}
        isOpen={isOpen}
        maxWidth="640px"
        onDismiss={() => {
          setOpen(false)
        }}
      >
        <StyledModal>
          <Header>
            <HeaderText>
              <img src={Icon} width="48px" height="48px" alt="Bridge Icon"></img>
              <span>Bridge Fees</span>
            </HeaderText>
          </Header>
          <Content>
            <Chain>
              <img src={eth} alt="ETH Icon" /> <span>Ethereum</span>
            </Chain>
            <Cards>
              <Card>
                <Title>Free</Title>
                <Description>Deposit Fee</Description>
              </Card>

              <Card>
                <Title>
                  0.05 <span>%</span>
                </Title>
                <Description>Withdrawal Fee</Description>
              </Card>
              <Card>
                <Title>
                  $1000 <span>&nbsp;USD</span>
                </Title>
                <Description>Withdrawal Minimum</Description>
              </Card>
            </Cards>
            <Chain>
              <img src={binance} alt="Binance Icon" /> <span>Binance</span>
            </Chain>
            <Cards>
              <Card>
                <Title>Free</Title>
                <Description>Deposit Fee</Description>
              </Card>
              <Card>
                <Title>
                  0.05 <span>%</span>
                </Title>
                <Description>Withdrawal Fee</Description>
              </Card>
              <Card>
                <Title>
                  $100 <span>&nbsp;USD</span>
                </Title>
                <Description>Withdrawal Minimum</Description>
              </Card>
            </Cards>

            <InfoNotice>
              <div>
                <img width="20px" src={InfoIcon} alt="Info Icon" />
                <span>Important</span>
              </div>
              <InfoNoticeText>
                Please note that there are minimum limits to bridge the tokens back from Fuse network to Ethereum
                network. This is due to the high gas fees on ethereum network.
              </InfoNoticeText>
            </InfoNotice>
            <Close
              onClick={() => {
                setOpen(false)
              }}
            >
              <img src={close} alt="close icon" />
            </Close>
          </Content>
        </StyledModal>
      </Modal>
    </Container>
  )
}
