import React from 'react'
import styled from 'styled-components'
import { darken, lighten } from 'polished'

import { RowBetween } from '../Row'
import { ChevronDown } from 'react-feather'
import { Button as RebassButton, ButtonProps } from 'rebass/styled-components'

const Base = styled(RebassButton) <{
  padding?: string
  width?: string
  borderRadius?: string
  altDisabledStyle?: boolean
}>`
  height: 48px;
  width: ${({ width }) => (width ? width : '100%')};
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  border-radius: 12px;
  border-radius: ${({ borderRadius }) => borderRadius && borderRadius};
  outline: none;
  border: 1px solid transparent;
  color: white;
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:disabled {
    cursor: auto;
  }

  > * {
    user-select: none;
  }
`

export const ButtonPrimary = styled(Base)`
  background: linear-gradient(90deg, hsla(247,96%,61%,1) , hsla(188,100%,64%,1));
  color: black;
  border:1px solid cyan;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.primary1)};
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.primary1)};
    background-color: ${({ theme }) => darken(0.1, theme.primary1)};
  }
  &:disabled {
    background-color: ${({ theme, altDisabledStyle }) => (altDisabledStyle ? theme.primary1 : theme.bg3)};
    color: ${({ theme, altDisabledStyle }) => (altDisabledStyle ? 'white' : theme.text6)};
    cursor: auto;
    box-shadow: none;
      nsparent;
    outline: none;
    opacity: ${({ altDisabledStyle }) => (altDisabledStyle ? '0.7' : '1')};
  }
`

export const ButtonLight = styled(Base)`
  border-radius: 12px;
  color: white;
  font-size: 18px;
  background: linear-gradient(90deg, hsla(247,96%,61%,1) , hsla(188,100%,64%,1));
  border: 1px solid cyan;
  :disabled {
    cursor: not-allowed;
    :hover {
      box-shadow: none;
      outline: none;
    }
  }
`

export const ButtonGray = styled(Base)`
  background-color: ${({ theme, disabled }) => !disabled && darken(0.05, theme.bg2)};
  color: ${({ theme }) => theme.text2};
  font-size: 14px;
  font-weight: 500;
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme, disabled }) => !disabled && darken(0.05, theme.bg2)};
    background-color: ${({ theme, disabled }) => !disabled && darken(0.05, theme.bg2)};
  }
  &:hover {
    background-color: ${({ theme }) => theme.bg3};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme, disabled }) => !disabled && darken(0.1, theme.bg2)};
    background-color: ${({ theme, disabled }) => !disabled && darken(0.1, theme.bg2)};
  }
`

export const ButtonSecondary = styled(Base)`
  background-color: ${({ theme }) => theme.bg7};
  color: ${({ theme }) => theme.text7};
  font-size: 16px;
  border-radius: 999px;
  padding: ${({ padding }) => (padding ? padding : '10px')};

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.bg7)};
    background-color: ${({ theme }) => darken(0.05, theme.bg7)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.bg7)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.bg7)};
    background-color: ${({ theme }) => darken(0.05, theme.bg7)};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.primary5};
    opacity: 50%;
    cursor: auto;
  }
`
export const ButtonTertiary = styled(Base)`
  border: 2px solid ${({ theme }) => theme.secondary4};
  color: ${({ theme }) => theme.bg7};
  font-size: 14px;
  font-weight: 500;
  background: #dde2fe;
  border-radius: 999px;
  padding: ${({ padding }) => (padding ? padding : '6px')};
  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.bg7)};
    background-color: ${({ theme }) => darken(0.05, theme.bg7)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.bg7)};
    color: white;
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.bg7)};
    background-color: ${({ theme }) => darken(0.05, theme.bg7)};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.primary5};
    opacity: 50%;
    cursor: auto;
  }
`

export const ButtonPink = styled(Base)`
  background-color: ${({ theme }) => theme.primary1};
  color: white;

  &:focus {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.05, theme.primary1)};
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:hover {
    background-color: ${({ theme }) => darken(0.05, theme.primary1)};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${({ theme }) => darken(0.1, theme.primary1)};
    background-color: ${({ theme }) => darken(0.1, theme.primary1)};
  }
  &:disabled {
    background-color: ${({ theme }) => theme.primary1};
    opacity: 50%;
    cursor: auto;
  }
`

export const ButtonOutlined = styled(Base)`
  border: 1px solid ${({ theme }) => theme.bg2};
  background-color: transparent;
  color: ${({ theme }) => theme.text1};

  &:focus {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:hover {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:active {
    box-shadow: 0 0 0 1px ${({ theme }) => theme.bg4};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

export const ButtonEmpty = styled(Base)`
  background-color: transparent;
  color: ${({ theme }) => theme.primary1};
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    background-color: ${({ theme }) => theme.advancedBG};
  }
  &:hover {
    background-color: ${({ theme }) => theme.advancedBG};
  }
  &:active {
    background-color: ${({ theme }) => theme.advancedBG};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

export const ButtonWhite = styled(Base)`
  border: 1px solid #edeef2;
  background-color: ${({ theme }) => theme.bg1};
  color: black;

  &:focus {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    box-shadow: 0 0 0 1pt ${darken(0.05, '#edeef2')};
  }
  &:hover {
    box-shadow: 0 0 0 1pt ${darken(0.1, '#edeef2')};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${darken(0.1, '#edeef2')};
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`

const ButtonConfirmedStyle = styled(Base)`
  background-color: ${({ theme }) => lighten(0.5, theme.green1)};
  color: ${({ theme }) => theme.green1};
  border: 1px solid ${({ theme }) => theme.green1};

  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`
export const ButtonPrimaryLightStyle = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  border: none;
  background-color: transparent;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => `${theme.primary1}36`};
  color: white;
  font-size: 1rem;
  font-weight: 500;
  margin-top: 1rem;
  padding: 0.15rem 1rem;
  border-radius: 12px;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => darken(0.03, `${theme.primary1}36`)};
  }

  svg {
    margin-top: 2px;
  }

  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
  margin: 0 0 0.5rem 0;
`}
`

export const ButtonErrorStyle = styled(Base)`
  background: transparent;
  border: 2px solid #9fa3c9;
  color: #9fa3c9 !important;

  :disabled {
    cursor: not-allowed;
  }
`

export function ButtonConfirmed({
  confirmed,
  altDisabledStyle,
  ...rest
}: { confirmed?: boolean; altDisabledStyle?: boolean } & ButtonProps) {
  if (confirmed) {
    return <ButtonConfirmedStyle {...rest} />
  } else {
    return <ButtonPrimary {...rest} altDisabledStyle={altDisabledStyle} />
  }
}

export function ButtonDark({ dark, ...rest }: { dark?: boolean } & ButtonProps) {
  if (dark) {
    return <ButtonGray {...rest} />
  } else {
    return <ButtonPrimary {...rest} />
  }
}

export function ButtonError({ error, ...rest }: { error?: boolean } & ButtonProps) {
  if (error) {
    return <ButtonErrorStyle {...rest} />
  } else {
    return <ButtonLight {...rest} />
  }
}

export function ButtonDropdown({ disabled = false, children, ...rest }: { disabled?: boolean } & ButtonProps) {
  return (
    <ButtonPrimary {...rest} disabled={disabled}>
      <RowBetween>
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
        <ChevronDown size={24} />
      </RowBetween>
    </ButtonPrimary>
  )
}

export function ButtonDropdownLight({ disabled = false, children, ...rest }: { disabled?: boolean } & ButtonProps) {
  return (
    <ButtonOutlined {...rest} disabled={disabled}>
      <RowBetween>
        <div style={{ display: 'flex', alignItems: 'center' }}>{children}</div>
        <ChevronDown size={24} />
      </RowBetween>
    </ButtonOutlined>
  )
}

export function ButtonRadio({ active, ...rest }: { active?: boolean } & ButtonProps) {
  if (!active) {
    return <ButtonWhite {...rest} />
  } else {
    return <ButtonPrimary {...rest} />
  }
}
