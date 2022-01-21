import React, { useRef, useContext, useState } from 'react'
import { Settings, X } from 'react-feather'
import styled from 'styled-components'
import { useUserSlippageTolerance, useExpertModeManager, useUserDeadline } from '../../state/user/hooks'
import TransactionSettings from '../TransactionSettings'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
import QuestionHelper from '../QuestionHelper'
import Toggle from '../Toggle'
import { ThemeContext } from 'styled-components'
import { ButtonError } from '../Button'
import { useSettingsMenuOpen, useToggleSettingsMenu } from '../../state/application/hooks'
import { Text } from 'rebass'
import Modal from '../Modal'
import { darken } from 'polished'

const StyledMenuIcon = styled(Settings)`
  height: 100%;
  width: 18%;
  padding: 10px;
  padding-right: 0px;
  padding-left: 0px;
  > * {
    stroke: white;
    stroke-width: 1px;
  }
`

const StyledCloseIcon = styled(X)`
  height: 20px;
  width: 20px;
  :hover {
    cursor: pointer;
  }

  > * {
    stroke: ${({ theme }) => theme.text3};
  }
`

const StyledMenuButton = styled.button`
  display: flex;
  justify-content: center;
  width: 100%;
  border: none;
  background-color: transparent;
  margin: -25px 0 0 0;
  padding: 0;
  >span{
    font-size: 25px;
    font-weight: bold;
    color: #7b6ea4;
  }
  svg path{
    stroke: white;
    stroke-width: 1px;
    margin-top: 2px;
  }
  :hover,
  :focus {
    cursor: pointer;
    outline: none;
  }
`
const EmojiWrapper = styled.div`
  position: absolute;
  bottom: -6px;
  right: 0px;
  font-size: 12px;
`

const StyledMenu = styled.div`
  height: 100%;
  width: 100%;
  height: 48px;
  bottom: 0;
  left: 0;
  border: none;
  text-align: left;
`

const MenuFlyout = styled.span`
  min-width: 100%;
  padding-left: 12px;
  padding-right: 12px;
  background-color: #e7fafe;
  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.01), 0px 4px 8px rgba(0, 0, 0, 0.04), 0px 16px 24px rgba(0, 0, 0, 0.04),
    0px 24px 32px rgba(0, 0, 0, 0.01);
  display: flex;
  flex-direction: column;
  font-size: 12px;
  position: absolute;
  bottom: 48px;
  right: 0rem;
  z-index: 100;
  box-shadow: -2px -4px 10px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: -2px -4px 10px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: -2px -4px 10px 0px rgba(0, 0, 0, 0.75);
  @media only screen and (max-width: 1300px) {
    padding: 1rem;
  }
`

const Break = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.bg3};
`

const ModalContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
  background-color: white;
  border-radius: 20px;
`

const ModalContentInnerWrapper = styled.div`
  padding: 2rem;
`

export default function SettingsTab() {
  const node = useRef<HTMLDivElement>()
  const open = useSettingsMenuOpen()
  const toggle = useToggleSettingsMenu()

  const theme = useContext(ThemeContext)
  const [userSlippageTolerance, setUserslippageTolerance] = useUserSlippageTolerance()

  const [deadline, setDeadline] = useUserDeadline()

  const [expertMode, toggleExpertMode] = useExpertModeManager()

  // show confirmation view before turning on
  const [showConfirmation, setShowConfirmation] = useState(false)

  return (
    // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
    <StyledMenu ref={node as any}>
      <Modal isOpen={showConfirmation} onDismiss={() => setShowConfirmation(false)} maxHeight={100}>
        <ModalContentWrapper>
          <RowBetween padding="1rem 2rem">
            <div />
            <Text fontWeight={500} fontSize={20} color='#7571a1'>
              Are you sure?
            </Text>
            <StyledCloseIcon onClick={() => setShowConfirmation(false)} />
          </RowBetween>
          <Break />
          <ModalContentInnerWrapper>
            <Text fontWeight={500} fontSize={20} marginBottom={16} color='#7571a1'>
              Expert mode turns off the confirm transaction prompt and allows high slippage trades that often result in
              bad rates and lost funds.
            </Text>
            <Text fontWeight={600} fontSize={20} marginBottom={16} color='#7571a1'>
              ONLY USE THIS MODE IF YOU KNOW WHAT YOU ARE DOING.
            </Text>
            <ButtonError
              error={true}
              padding={'12px'}
              onClick={() => {
                if (window.prompt(`Please type the word "confirm" to enable expert mode.`) === 'confirm') {
                  toggleExpertMode()
                  setShowConfirmation(false)
                }
              }}
            >
              <Text fontSize={14} fontWeight={500} color='#7571a1' id="confirm-expert-mode">
                Turn On Expert Mode
              </Text>
            </ButtonError>
          </ModalContentInnerWrapper>
        </ModalContentWrapper>
      </Modal>
      <StyledMenuButton onClick={toggle} id="open-settings-dialog-button">
        <span> Settings </span>
        {expertMode && (
          <EmojiWrapper>
            <span role="img" aria-label="wizard-icon">
              🧙
            </span>
          </EmojiWrapper>
        )}
      </StyledMenuButton>
      {open && (
        <MenuFlyout>
          <TransactionSettings
            rawSlippage={userSlippageTolerance}
            setRawSlippage={setUserslippageTolerance}
            deadline={deadline}
            setDeadline={setDeadline}
          />

          <RowBetween>
            <TYPE.black fontWeight={600} fontSize={14} color={theme.text2} style={{ marginTop: 12, marginBottom: 12 }}>
              Toggle Expert Mode
            </TYPE.black>
            <QuestionHelper text="Bypasses confirmation modals and allows high slippage trades. Use at your own risk." />
          </RowBetween>
          <Toggle
            id="toggle-expert-mode-button"
            isActive={expertMode}
            toggle={
              expertMode
                ? () => {
                  toggleExpertMode()
                  setShowConfirmation(false)
                }
                : () => {
                  toggle()
                  setShowConfirmation(true)
                }
            }
          />
        </MenuFlyout>
      )}
    </StyledMenu>
  )
}
