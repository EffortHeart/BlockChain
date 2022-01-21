import { SingleRewardProgram, MultiRewardProgram } from '@fuseio/earn-sdk'

export const getProgram = (contract: string, library: any, type: string) => {
  if (type === 'single') {
    return new SingleRewardProgram(contract, library)
  } else {
    return new MultiRewardProgram(contract, library)
  }
}
