import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { useApproveCallback, ApprovalState } from '../../../hooks/useApproveCallback'
import { useActiveWeb3React } from '../../../hooks'
import { ButtonError, ButtonLight, ButtonPrimary } from '../../Button'
import { useTransactionAdder } from '../../../state/transactions/hooks'
import { RowBetween } from '../../Row'
import Percentage from './percentage'
import FarmInfoCard from './farmInfoCard'
import { getProgram } from '../../../utils/farm'
import { Farm } from '../../../constants/farms'
import { tryFormatDecimalAmount } from '../../../utils'
import { useWalletModalToggle } from '../../../state/application/hooks'
import { useDepositDerivedInfo } from '../../../state/farm/hooks'

const Container = styled('div')`
  text-align: left;
  display: flex;
  flex-wrap: wrap;
  width: 402px;
  max-width: 100%;
  margin: 0 auto;

  > div {
    width: 100%;
  }
`

const Wrapper = styled('div')`
  display: flex;
  flex: wrap;
  margin: auto;
  width: 80%;
  margin-bottom: 4px;
  overflow: hidden;
  text-align: left;
  justify-content: flex-end;
`

const InputWrapper = styled('div')`
  display: flex;
  flex: wrap;
  margin: auto;
  border-radius: 12px;
  margin-bottom: 8px;
  padding: 0 16px;
  border: 2px solid white;
  height: 48px;
  width: 80%;
  overflow: hidden;
  text-align: left;
  justify-content: flex-end;

  > span {
    margin: auto;
  }

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 0;
  `}
`
const Input = styled('input')`
  display: flex;
  flex: 1;
  font-size: 16px;
  background: none;
  border: none;
  color: white;

  :focus {
    outline: none;
  }
`
const Text = styled('div')`
  display: flex;
  justify-content: flex-end;
  padding-right: 10px;
  text-align: right;
  color: #b5b9d3;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
`

const Balance = styled('div')`
  display: flex;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  line-height: 18px;
`

export default function Deposit({ farm }: { farm?: Farm }) {
  const { account, library } = useActiveWeb3React()
  const [typedValue, setTypedValue] = useState('')
  const { tokenBalance, parsedAmount, estimatedReward } = useDepositDerivedInfo(farm, typedValue)

  const pairSymbol = farm?.token0?.symbol + '-' + farm?.token1?.symbol

  const [approval, approveCallback] = useApproveCallback(parsedAmount, farm?.contractAddress)

  const toggleWalletModal = useWalletModalToggle()

  const addTransaction = useTransactionAdder()

  const deposit = useCallback(async () => {
    if (!farm || !library || !parsedAmount || !account) return

    const rewardProgram = getProgram(farm?.contractAddress, library?.provider, farm?.type)
    const response = await rewardProgram.deposit(parsedAmount.raw.toString(), account)
    const formattedReponse = { ...response, hash: response.transactionHash }

    addTransaction(formattedReponse, {
      summary: `Deposited ${pairSymbol} farm`
    })

    setTypedValue('')
  }, [account, addTransaction, library, pairSymbol, parsedAmount, farm])

  return (
    <Container>
      <Wrapper>
        <Text>Balance</Text>{' '}
        {tokenBalance && (
          <Balance>
            <span>{tokenBalance?.toSignificant(6)} </span> &nbsp; <span>{pairSymbol}</span>
          </Balance>
        )}
      </Wrapper>
      <InputWrapper>
        <Input
          type="text"
          name="withdrawLP"
          id="withdrawal"
          value={typedValue}
          placeholder="0"
          onChange={e => setTypedValue(e.target.value)}
          pattern="^[0-9]*[.,]?[0-9]*$"
        />
        <span>{pairSymbol}</span>
      </InputWrapper>

      <Percentage selectPerecentage={setTypedValue} tokenAmount={tokenBalance} />

      <FarmInfoCard
        title="Estimated Rewards"
        content="Your estimated rewards reflect the amount of $FUSE you are expected to receive by the end of the program assuming there are no changes in deposits"
        value={tryFormatDecimalAmount(estimatedReward, 18)}
      />
      {!account ? (
        <ButtonLight onClick={toggleWalletModal}>Connect Wallet</ButtonLight>
      ) : (
        <>
          {(approval === ApprovalState.NOT_APPROVED || approval === ApprovalState.PENDING) && (
            <RowBetween marginBottom={20}>
              <ButtonPrimary onClick={approveCallback} disabled={approval === ApprovalState.PENDING}>
                {approval === ApprovalState.PENDING ? <span>Approving</span> : 'Approve '}
              </ButtonPrimary>
            </RowBetween>
          )}
          <ButtonError onClick={() => deposit()} disabled={approval !== ApprovalState.APPROVED}>
            Deposit
          </ButtonError>
        </>
      )}
    </Container>
  )
}
