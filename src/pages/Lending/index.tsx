import React, { useEffect, useState } from 'react'
import AppBody from '../AppBody'
import styled from 'styled-components'
import Lending from '../../components/Lending'

const Wrapper = styled('div')`
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding-left: 5%;
  padding-right: 5%;
  text-align: left;
  z-index: 3;
  margin-bottom: 20px;
  > span {
    width: 500px;
  }
`

const Text = styled('div')`
  width: 545px;
  max-width: 100%;
  color: #7870a2;
`

export default function LendingPage() {
  const [isLoaded, setLoaded] = useState(false)
  useEffect(() => {
    setLoaded(true)
  }, [isLoaded])

  if (isLoaded) {
    return (
      <AppBody>
        <Wrapper>
          <Text>
            {' '}
            <h1>Fuse Lending</h1>
            <span>
              Fuse Lending in partnership with ola.finance allows Fusefi users to borrow or lend their favorite assets
              with more rewards and lending assets added on a regular basis. Use with fuse.cash for the best experience.
            </span>{' '}
          </Text>
          <Lending />
        </Wrapper>
      </AppBody>
    )
  }

  return <p>Loading Fuse Lending Programmes</p>
}
