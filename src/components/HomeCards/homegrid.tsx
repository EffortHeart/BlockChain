import React from 'react'
import styled from 'styled-components'
import Prices from './prices'
import News from './news'

const Grid = styled.div`
  display: grid;
  height: 100%;
  grid-template-columns: minmax(0, 1fr);
  grid-template-areas: 'nav' 'footer';
  grid-template-rows: 30% 70%;
`

const Nav = styled.div`
  background-color: #7e57c2;
  grid-area: nav;
`

const Footer = styled.div`
  background-color: #7e57c2;
  grid-area: footer;
`

export default function HomeGrid() {
  return (
    <Grid>
      <Nav>
        <Prices />
      </Nav>
      <Footer>
        <News />
      </Footer>
    </Grid>
  )
}
