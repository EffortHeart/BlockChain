import React from 'react'
import styled from 'styled-components'
import telegram from '../../assets/svg/telegram.svg'
import twitter from '../../assets/svg/twitter.svg'
import github from '../../assets/svg/github.svg'

import { ExternalLink } from '../../theme'

const Container = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  background-color: #232638;
  z-index: 100;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    display: none;
  `}
}
`

const SocialBar = styled.div`
  display: flex;
  color: white;
  text-align: right;
  justify-content: flex-end;
  align-items: center;
  padding-right: 32px;
`

const Item = styled(ExternalLink)`
  color: ${({ theme }) => theme.text2};
  padding: 4px 0;

  :hover {
    color: ${({ theme }) => theme.text1};
    cursor: pointer;
    text-decoration: none;
  }

  :not(:last-child) {
    margin-right: 8px;
  }
`

export default function Footer() {
  return (
    <Container>
      <SocialBar>
        <Item id="link" href="https://v1.fuseswap.com">
          Use V1
        </Item>
        <Item id="link" href="https://github.com/fuseio">
          <img src={github} alt="Github icon" />
        </Item>
        <Item id="link" href="https://t.me/fuse_fi">
          <img src={telegram} alt="Telegram icon" />
        </Item>
        <Item id="link" href="https://twitter.com/Fuse_Fi">
          <img src={twitter} alt="Twitter icon" />
        </Item>
      </SocialBar>
    </Container>
  )
}
