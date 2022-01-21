import { Contract } from '@ethersproject/contracts'
import { useEffect, useState } from 'react'
import { OptionalMethodInputs } from '../state/multicall/hooks'

export default function useContractCallStatic(
  contract: Contract | null | undefined,
  methodName: string,
  inputs?: OptionalMethodInputs
) {
  const [result, setResult] = useState()

  useEffect(() => {
    if (contract) {
      contract.callStatic[methodName](inputs).then(result => setResult(result))
    }
  }, [contract, inputs, methodName])

  return result
}
