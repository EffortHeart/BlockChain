import React, { ReactNode, useState } from 'react'
import styled from 'styled-components'
import Questionmark from '../../../assets/svg/questionmark-purple.svg'
import { ButtonPrimary } from '../../Button'
import Modal from '../../Modal'

const Icon = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background-color: #ffffff1a;
  height: 24px;
  width: 24px;
  cursor: pointer;

  > img {
    width: 16px;
    height: 16px;
  }
`
const Icon2 = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background-color: #ffffff1a;
  height: 48px;
  width: 48px;
  position: relative;
  cursor: pointer;

  > img {
    width: 30px;
    height: 30px;
  }
`

const Container = styled.div<{ width?: string }>`
  background: ${({ theme }) => theme.secondary4};
  border-radius: 16px;
  display: flex;
  padding: 16px;
  flex-direction: column;
  margin-bottom: 24px;
  width: ${({ width }) => (width ? width : '100%')};
  overflow: hidden;
  text-align: left;
  justify-content: flex-end;
  > p {
    color: #9fa3c9;
    font-size: 14px;
    margin: 2px;
    > span {
      font-size: 16px;
      color: white;
    }
  }
`
const Wrapper = styled.div`
  display: flex;
  width: 100%;
  text-align: center;
  justify-content: space-between;
  font-size: 14px;
  color: #9fa3c9;
  margin: 3px;
  position: relative;
`

export const StyledModal = styled.div`
  z-index: 100;
  padding: 24px;
  background: #242637;
  position: relative;
  margin: auto;
  border-radius: 12px;
`
export const Header = styled.div`
  border-radius: 8px 8px 0 0;
  display: flex;
  justify-content: space-between;
`

export const HeaderText = styled.div`
  color: #fff;
  align-self: center;
  color: lightgray;
`

export const Content = styled.div`
  padding-bottom: 15px;
  max-height: 30rem;
  overflow-x: hidden;
  overflow-y: auto;
  color: white;

  > h1 {
    font-size: 24px;
    font-weight: 600;
    text-align: left;
  }
  > p {
    font-size: 16px;
    font-weight: 400;
    text-align: left;
  }
`

const Item = styled('div')`
  display: flex;
  width: 100%;
  justify-content: flex-end;
  position: relative;
`

const TextWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
`

type FarmInfoCardProps = {
  title: string
  content?: string
  value?: ReactNode
  width?: string
  button?: ReactNode
}

export default function FarmInfoCard({ title, content, value, width, button }: FarmInfoCardProps) {
  const [isOpen, setOpen] = useState(false)
  return (
    <Container width={width}>
      <Wrapper>
        <span>Your {title}</span>
        {content && (
          <Icon
            onClick={() => {
              setOpen(true)
            }}
          >
            <img src={Questionmark} width="14px" height="14px" alt="Question icon"></img>
          </Icon>
        )}
      </Wrapper>
      <TextWrapper>
        <span>{value}</span>
        {button}
      </TextWrapper>
      <Modal
        maxHeight={90}
        isOpen={isOpen}
        onDismiss={() => {
          setOpen(false)
        }}
      >
        <Wrapper aria-modal aria-labelledby={'APY'} tabIndex={-1} role="dialog">
          <StyledModal>
            <Header>
              <HeaderText>
                <Item
                  onClick={() => {
                    setOpen(false)
                  }}
                >
                  <Icon2>
                    <img src={Questionmark} alt="Modal Icon"></img>
                  </Icon2>
                </Item>
              </HeaderText>
            </Header>
            <Content>
              <h1>What does &quot;{title}&quot; mean?</h1>
              <p>{content}</p>
            </Content>
            <ButtonPrimary
              onClick={() => {
                setOpen(false)
              }}
            >
              Done
            </ButtonPrimary>
          </StyledModal>
        </Wrapper>
      </Modal>{' '}
    </Container>
  )
}
