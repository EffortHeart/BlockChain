import { ApolloClient, gql } from '@apollo/client/core'
import { fuseswapSubgraphClient } from './client'
import { FACTORY_ADDRESS } from '../constants'

export const getFuseswapFactoryData = async () => {
  const result = await fuseswapSubgraphClient.query({
    query: gql`
      {
        uniswapFactory(id: "${FACTORY_ADDRESS}") {
          pairCount
          totalVolumeUSD
          totalLiquidityUSD
        }
      }
    `
  })

  return result?.data?.uniswapFactory
}

export const getMessageFromTxHash = async (txHash: string | undefined, subgraph: ApolloClient<any> | null) => {
  if (!subgraph || !txHash) return null

  const result = await subgraph.query({
    query: gql`
      {
        userRequestForSignatures(where: { txHash_contains: "${txHash}" }, first: 1) {
          recipient
          message {
            msgId
            msgData
            signatures
          }
        }
      }
    `,
    fetchPolicy: 'no-cache'
  })

  return result.data &&
    result.data.userRequestForSignatures &&
    result.data.userRequestForSignatures.length > 0 &&
    result.data.userRequestForSignatures[0].message
    ? {
        ...result.data.userRequestForSignatures[0].message,
        ...result.data.userRequestForSignatures[0]
      }
    : null
}

export const getUserRequestFromTxHash = async (txHash: string | undefined, subgraph: ApolloClient<any> | null) => {
  if (!subgraph || !txHash) return null

  const result = await subgraph.query({
    query: gql`
      {
        userRequestForSignatures(where: { txHash_contains: "${txHash}" }, first: 1) {
          message
          signatures
        }
      }
    `,
    fetchPolicy: 'no-cache'
  })

  return result.data &&
    result.data.userRequestForSignatures &&
    result.data.userRequestForSignatures.length > 0 &&
    result.data.userRequestForSignatures[0].signatures
    ? {
        ...result.data.userRequestForSignatures[0]
      }
    : null
}

export const getStatusFromTxHash = async (messageId: string, subgraph: ApolloClient<any> | null) => {
  if (!subgraph) return null

  const result = await subgraph.query({
    query: gql`
      {
        relayedMessages(where: { messageId_contains: "${messageId}" }, first: 1) {
          id
        }
      }
    `,
    fetchPolicy: 'no-cache'
  })

  return result.data && result.data.relayedMessages && result.data.relayedMessages.length > 0
    ? result.data.relayedMessages[0]
    : null
}

export const getNativeStatusFromTxHash = async (homeTxHash: string, subgraph: ApolloClient<any> | null) => {
  if (!subgraph) return null

  const result = await subgraph.query({
    query: gql`
      {
        relayedMessages(where: { homeTxHash_contains: "${homeTxHash}" }, first: 1) {
          id
        }
      }
    `,
    fetchPolicy: 'no-cache'
  })

  return result.data && result.data.relayedMessages && result.data.relayedMessages.length > 0
    ? result.data.relayedMessages[0]
    : null
}
