import React from 'react'
import styled from 'styled-components'
import analytics from '../../assets/svg/analytics.svg'
import floater from '../../assets/svg/floater.svg'

const Container = styled.a`
  padding: 20px;
  position: relative;
  display: table;
  background: #202231;
  background-image: url(${analytics});
  background-repeat: no-repeat;
  background-size: contain;
  background-position: bottom;
  width: 100%;
  padding-bottom: 0px;
  border-radius: 16px;
  margin-bottom: 9px;
  position: relative;
  color: inherit; /* blue colors for links too */
  text-decoration: inherit; /* no underline */
  z-index: 100;
  :hover {
    background-color: #323752;
  }
`
const Title = styled.h2`
  font-size: 32px;
  font-weight: 600;
  font-style: normal;
  letter-spacing: normal;
  line-height: 1;
  color: #ffffff;
  margin: 0;
`

const Text = styled.p`
  font-size: 16px;
  color: #b5b9d3;
  margin-top: 8px;
  margin-bottom: 100px;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
`

export default function HomeAnalytics() {
  return (
    <Container href="https://info.fuseswap.com/" target="_blank">
      <Header>
        <Title>Analytics</Title>
        <img src={floater} alt="Click to open logo"></img>
      </Header>
      <Text>Track tokens, pairs and pools in real time</Text>
    </Container>
  )
}
