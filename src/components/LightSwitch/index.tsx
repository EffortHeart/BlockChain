import React from 'react'
import { Moon, Sun } from 'react-feather'
import { useDarkModeManager } from '../../state/user/hooks'
import styled from 'styled-components'

const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.text3};
  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    color: ${({ theme }) => theme.text1};
    background-color: ${({ theme }) => theme.bg4};
  }
`

export default function LightSwitch() {
  const [isDark, toggle] = useDarkModeManager()

  return <StyledMenuButton onClick={() => toggle()}>{isDark ? <Sun size={24} /> : <Moon size={24} />}</StyledMenuButton>
}
