import React, { useCallback, useState } from 'react'
import Question from '../../assets/svg/questionmark-purple.svg'
import styled from 'styled-components'
import Tooltip from '../Tooltip'

const QuestionWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: none;
  outline: none;
  cursor: default;
  border-radius: 36px;
  background-color:#ede9f7;
  color: ${({ theme }) => theme.text2};

  :hover,
  :focus {
    opacity: 0.7;
  }
`

export default function QuestionHelper({ text }: { text: string }) {
  const [show, setShow] = useState<boolean>(false)

  const open = useCallback(() => setShow(true), [setShow])
  const close = useCallback(() => setShow(false), [setShow])

  return (
    <span style={{ marginLeft: 4 }}>
      <Tooltip text={text} show={show}>
        <QuestionWrapper onClick={open} onMouseEnter={open} onMouseLeave={close}>
          <img src={Question} alt="question icon" width={15} />
        </QuestionWrapper>
      </Tooltip>
    </span>
  )
}
