import React from 'react'
import styled from 'styled-components'
import { ReactComponent as Arrow } from '../../assets/svg/arrowLarge.svg'
import ArrowSkewed from '../../assets/svg/arrowSkewed.svg'
import FlashIcon from '../../assets/svg/flash.svg'

const Wrap = styled.a`
  height: 50%;
  width: 100%;
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
`

const Container = styled.div`
  padding: 16px;
  padding-top: 54px;
  padding-bottom: 54px;
  background: #242637;
  width: 100%;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  position: relative;
  :before {
    background: linear-gradient(-91.13deg, #f3fc1f -3.23%, #f3fc1f 26.69%, #3ad8a4 156.49%);
    content: '';
    position: absolute;
    border-radius: 20px;
    width: 99.75%;
    top: 0;
    bottom: 0;
    left: -0.15px;
    padding: 2px;
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: destination-out;
    mask-composite: exclude;
  }
`
const Title = styled.span`
  padding-right: 5px;
  font-family: Newake;
  font-style: normal;
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  text-align: center;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  background: linear-gradient(272.32deg, #f3fc1f 35.52%, #3ad889 118.98%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const Flash = styled.div`
  position: absolute;
  top: 1.25%;
  right: 2%;
`

const ArrowSkew = styled.div`
  position: absolute;
  bottom: -2%;
  left: 0;
`

const TextIcon = styled.div`
  text-align: center;
`

export default function HomeRewards() {
  return (
    <Wrap href="https://fuse.fi/" target="_blank">
      <Container>
        <Flash>
          {' '}
          <img src={FlashIcon} alt="Flash"></img>{' '}
        </Flash>
        <ArrowSkew>
          {' '}
          <img src={ArrowSkewed} alt="Arrow"></img>{' '}
        </ArrowSkew>
        <Title>Frictionless DEFI is coming</Title>
        <TextIcon>
          <Title>Join the waitlist </Title> <Arrow />
        </TextIcon>
      </Container>
    </Wrap>
  )
}
