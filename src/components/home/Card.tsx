import React from 'react'
import { animated } from 'react-spring'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: flex;
  flex-basis: 25%;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  align-items: flex-start;
  background: #fff;
  color: rgb(40, 13, 95);
  padding: 10px 16px;
  margin: 0 2.5px;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    margin: 0 0 1rem 0;
  `}
`

const ValueWrapper = styled.div`
  font-size: 24px;
  font-weight: 500;
`

const Value = styled(animated.h2)`
  display: inline-block;
  font-size:35px;
  color: rgb(40, 13, 95);
  margin: 0;
`

const ValueSuffix = styled.h2`
  display: inline-block;
  font-size: 24px;
  margin: 0;
  white-space: pre;
  color: #b5b9d3;
`

const Title = styled.p`
  font-size: 16px;
  margin: 0;
  color: rgb(122, 110, 170);
  margin-bottom: 34px;
`

type CardProps = {
  title: string
  value: string
  valueSuffix?: string
  valueDecimals?: number
}

export default function Card({ title, value, valueSuffix }: CardProps) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <ValueWrapper>
        <ValueSuffix>{valueSuffix}</ValueSuffix>
        <Value>{value}</Value>
      </ValueWrapper>
    </Wrapper>
  )
}
