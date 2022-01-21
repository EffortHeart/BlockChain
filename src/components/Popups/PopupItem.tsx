import React, { useCallback, useEffect } from 'react'
import { X } from 'react-feather'
import { useSpring } from 'react-spring/web'
import styled from 'styled-components'
import { animated } from 'react-spring'
import { PopupContent } from '../../state/application/actions'
import { useRemovePopup } from '../../state/application/hooks'
import ListUpdatePopup from './ListUpdatePopup'
import TransactionPopup from './TransactionPopup'
import DeprecatedPopup from './DeprecatedPopup'

export const StyledClose = styled(X)`
  position: absolute;
  right: 10px;
  top: 10px;

  :hover {
    cursor: pointer;
  }
`
export const Popup = styled.div`
  display: inline-block;
  width: 100%;
  padding: 1em;
  background-color: #dde2fe;
  position: relative;
  border-radius: 10px;
  padding: 20px;
  padding-right: 35px;
  overflow: hidden;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-bottom: 20px;
  `}
`
const Fader = styled.div<{ color?: string }>`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 4px;
  background-color: ${({ color }) => (color ? color : null)};
`

const AnimatedFader = animated(Fader)

export default function PopupItem({
  removeAfterMs,
  content,
  popKey
}: {
  removeAfterMs: number | null
  content: PopupContent
  popKey: string
}) {
  const removePopup = useRemovePopup()
  const removeThisPopup = useCallback(() => removePopup(popKey), [popKey, removePopup])
  useEffect(() => {
    if (removeAfterMs === null) return undefined

    const timeout = setTimeout(() => {
      removeThisPopup()
    }, removeAfterMs)

    return () => {
      clearTimeout(timeout)
    }
  }, [removeAfterMs, removeThisPopup])

  let contentColor
  let popupContent
  if ('txn' in content) {
    const {
      txn: { hash, success, summary }
    } = content
    popupContent = <TransactionPopup hash={hash} success={success} summary={summary} />
    if (success) {
      contentColor = 'green'
    } else {
      contentColor = 'red'
    }
  } else if ('listUpdate' in content) {
    const {
      listUpdate: { listUrl, oldList, newList, auto, listType }
    } = content
    contentColor = 'blue'
    popupContent = (
      <ListUpdatePopup
        popKey={popKey}
        listUrl={listUrl}
        oldList={oldList}
        newList={newList}
        auto={auto}
        listType={listType}
      />
    )
  } else if ('deprecated' in content) {
    const {
      deprecated: { token, currency }
    } = content
    contentColor = 'red'
    popupContent = <DeprecatedPopup token={token} currency={currency} />
  }

  const faderStyle = useSpring({
    from: { width: '100%' },
    to: { width: '0%' },
    config: { duration: removeAfterMs ?? undefined }
  })

  return (
    <Popup>
      {removeAfterMs !== null ? <AnimatedFader style={faderStyle} color={contentColor} /> : null}
      {popupContent}
    </Popup>
  )
}
