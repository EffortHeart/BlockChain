import { diffTokenLists, TokenList } from '@fuseio/token-lists'
import React, { useCallback, useMemo, useContext } from 'react'
import ReactGA from 'react-ga4'
import { useDispatch } from 'react-redux'
import { Text } from 'rebass'
import styled, { ThemeContext } from 'styled-components'
import { AppDispatch } from '../../state'
import { useRemovePopup } from '../../state/application/hooks'
import { acceptListUpdate } from '../../state/lists/actions'
import { TYPE } from '../../theme'
import listVersionLabel from '../../utils/listVersionLabel'
import { ButtonTertiary } from '../Button'
import { AutoColumn } from '../Column'
import { AutoRow } from '../Row'

export const Item = styled('li')`
  cursor: pointer;
  color: ${({ theme }) => theme.secondary4};
  font-size: 14px;
  font-weight: 500;
`
export const Flex = styled('div')`
  display: flex;
  justify-content: flex-end;
`

const List = styled.ul`
  margin-top: 0;
  padding-left: 25px;
`

const Button = styled(ButtonTertiary)`
  padding: 7.5px 14px;
  height: 32px;
`

export default function ListUpdatePopup({
  popKey,
  listUrl,
  oldList,
  newList,
  auto,
  listType
}: {
  popKey: string
  listUrl: string
  oldList: TokenList
  newList: TokenList
  auto: boolean
  listType: CurrencyListType
}) {
  const removePopup = useRemovePopup()
  const removeThisPopup = useCallback(() => removePopup(popKey), [popKey, removePopup])
  const dispatch = useDispatch<AppDispatch>()
  const theme = useContext(ThemeContext)

  const handleAcceptUpdate = useCallback(() => {
    if (auto) return
    ReactGA.event({
      category: 'Lists',
      action: 'Update List from Popup',
      label: listUrl
    })
    dispatch(acceptListUpdate({ url: listUrl, listType }))
    removeThisPopup()
  }, [auto, dispatch, listUrl, removeThisPopup, listType])

  const { added: tokensAdded, changed: tokensChanged, removed: tokensRemoved } = useMemo(() => {
    return diffTokenLists(oldList.tokens, newList.tokens)
  }, [newList.tokens, oldList.tokens])
  const numTokensChanged = useMemo(
    () =>
      Object.keys(tokensChanged).reduce((memo, chainId: any) => memo + Object.keys(tokensChanged[chainId]).length, 0),
    [tokensChanged]
  )

  return (
    <AutoRow>
      <AutoColumn style={{ flex: '1' }} gap="8px">
        {auto ? (
          <TYPE.body fontWeight={500}>
            The token list &quot;{oldList.name}&quot; has been updated to{' '}
            <strong>{listVersionLabel(newList.version)}</strong>.
          </TYPE.body>
        ) : (
          <>
            <div>
              <Text color={theme.secondary4} fontSize={'14px'} lineHeight={'18px'} fontWeight={500}>
                An update is available for the token list &quot;{oldList.name}&quot; (
                {listVersionLabel(oldList.version)} to {listVersionLabel(newList.version)}).
              </Text>
              <List>
                {tokensAdded.length > 0 ? (
                  <Item>
                    {tokensAdded.map((token, i) => (
                      <React.Fragment key={`${token.chainId}-${token.address}`}>
                        {token.symbol}
                        {i === tokensAdded.length - 1 ? null : ', '}
                      </React.Fragment>
                    ))}{' '}
                    added
                  </Item>
                ) : null}
                {tokensRemoved.length > 0 ? (
                  <Item>
                    {tokensRemoved.map((token, i) => (
                      <React.Fragment key={`${token.chainId}-${token.address}`}>
                        <strong title={token.address}>{token.symbol}</strong>
                        {i === tokensRemoved.length - 1 ? null : ', '}
                      </React.Fragment>
                    ))}{' '}
                    removed
                  </Item>
                ) : null}
                <Item>{numTokensChanged > 0 ? <li>{numTokensChanged} tokens updated</li> : null}</Item>
              </List>
            </div>
            <Flex>
              <div style={{ marginRight: 12 }}>
                <Button onClick={handleAcceptUpdate} width={'auto'}>
                  Accept
                </Button>
              </div>
              <div>
                <Button onClick={removeThisPopup} width={'auto'}>
                  Dismiss
                </Button>
              </div>
            </Flex>
          </>
        )}
      </AutoColumn>
    </AutoRow>
  )
}
