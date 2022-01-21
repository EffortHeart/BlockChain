import React from 'react'
import styled from 'styled-components'
import News from '../News/index'

const Grid = styled('div')`
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  flex-wrap: wrap;
  z-index: 100;
  height: 100%;
`

const Wrapper = styled('div')`
  width: 100%;
`

const Item = styled('div')`
  background: #202231;
  border-radius: 10px;
  height: 100%;
  overflow: hidden;
`

export default function HomeNewsTweet() {
  return (
    <Grid>
      <Wrapper>
        <Item>
          <News />
        </Item>
      </Wrapper>
    </Grid>
  )
}
