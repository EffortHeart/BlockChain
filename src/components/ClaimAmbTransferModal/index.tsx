import React, { useEffect, useMemo, useState } from 'react'
import { ReactComponent as BridgeIcon } from '../../assets/svg/bridge-icon2.svg'
import { getMessageFromTxHash, getStatusFromTxHash } from '../../graphql/queries'
import { getForeignAmbSubgraph, getHomeAmbSubgraph } from '../../graphql/utils'
import { useActiveWeb3React } from '../../hooks'
import { TYPE } from '../../theme'
import { getChainIds, getForeignAmbAddress, getForeignAmbContract, packSignatures } from '../../utils'
import { AutoColumn } from '../Column'
import { NETWORK_LABELS } from '../Header'
import Modal from '../Modal'
import { RowCenter } from '../Row'
import { ButtonPrimary } from '../Button'
import { useTransactionAdder } from '../../state/transactions/hooks'
import { useBridgeActionHandlers } from '../../state/bridge/hooks'
import { BridgeTransaction } from '../../state/bridge/reducer'

interface ClaimAmbTransferModalProps {
  isOpen: boolean
  onDismiss: () => void
  bridgeTransaction: BridgeTransaction
}

export default function ClaimAmbTransferModal({
  isOpen,
  onDismiss,
  bridgeTransaction: { homeTxHash, bridgeDirection }
}: ClaimAmbTransferModalProps) {
  const { chainId, account, library } = useActiveWeb3React()
  const [message, setMessage] = useState<any>(null)
  const [executionStatus, setExecutionStatus] = useState<any>(false)

  const chains = useMemo(() => getChainIds(bridgeDirection), [bridgeDirection])
  const foreignAmbAddress = useMemo(() => getForeignAmbAddress(bridgeDirection), [bridgeDirection])

  const addTransaction = useTransactionAdder()
  const { onSetCurrentBridgeTransaction, onFinalizeBridgeTransaction } = useBridgeActionHandlers()

  useEffect(() => {
    async function getMessage() {
      const msg = await getMessageFromTxHash(homeTxHash, getHomeAmbSubgraph(bridgeDirection))
      if (msg && msg.signatures) {
        setMessage(msg)
      }
    }

    let intervalId: any

    if (homeTxHash && !message) {
      intervalId = setInterval(getMessage, 5000)
    }

    return () => clearInterval(intervalId)
  }, [bridgeDirection, message, homeTxHash])

  useEffect(() => {
    async function getStatus() {
      if (message && message.msgId) {
        const status = await getStatusFromTxHash(message.msgId, getForeignAmbSubgraph(bridgeDirection))
        if (status) {
          setExecutionStatus(status)
        }
      }
    }

    getStatus()
  }, [bridgeDirection, message])

  async function onClaim() {
    if (!library || !account || !message || !foreignAmbAddress || !homeTxHash || executionStatus) return
    try {
      const foreignAmb = getForeignAmbContract(foreignAmbAddress, library, account)
      const response = await foreignAmb.executeSignatures(message.msgData, packSignatures(message.signatures))

      addTransaction(response, {
        summary: 'Claimed bridge tokens'
      })

      setMessage(null)
      setExecutionStatus(false)
      onSetCurrentBridgeTransaction(null)
      onFinalizeBridgeTransaction(homeTxHash, response.hash)
      onDismiss()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Modal isOpen={isOpen} onDismiss={onDismiss}>
      <AutoColumn gap="md" style={{ padding: '20px', width: '100%' }}>
        <TYPE.mediumHeader fontWeight={500} textAlign="center" paddingBottom="1rem">
          Claim your tokens
        </TYPE.mediumHeader>
        <RowCenter>
          <BridgeIcon width="120px" />
        </RowCenter>
        <RowCenter>
          {chains ? (
            chainId === chains.foreignChain ? (
              <>
                {message ? (
                  !executionStatus ? (
                    <ButtonPrimary onClick={() => onClaim()}>Claim</ButtonPrimary>
                  ) : (
                    <TYPE.body fontSize={18} fontWeight={500}>
                      Already executed
                    </TYPE.body>
                  )
                ) : (
                  <TYPE.body fontSize={18} fontWeight={500}>
                    Waiting for signatures
                  </TYPE.body>
                )}
              </>
            ) : (
              <TYPE.body fontSize={18} fontWeight={500}>
                Switch to {NETWORK_LABELS[chains.foreignChain]}
              </TYPE.body>
            )
          ) : (
            <TYPE.body fontSize={18} fontWeight={500}></TYPE.body>
          )}
        </RowCenter>
      </AutoColumn>
    </Modal>
  )
}
