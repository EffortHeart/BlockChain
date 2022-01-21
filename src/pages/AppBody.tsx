import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'

export const Container = styled.div`
  height: 100%;
`

export const BodyWrapper = styled.div`
  margin: 0;
  min-height: 90.5%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const MobileNav = styled.div`
  display: block;
  @media (max-width: 1600) {
    display: none;
  }
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Header />
      <MobileNav />
      <BodyWrapper>{children}</BodyWrapper>
    </Container>
  )
}
