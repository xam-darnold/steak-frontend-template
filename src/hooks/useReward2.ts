import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { harvest, getMasterChefContract } from '../sushi/utils'

const useReward = (pid: number) => {
  const { account } = useWallet()
  const sushi = useSushi()
  const masterChefContract = getMasterChefContract(sushi)

  //! Changed dependenciees from sushi to masteerChefContract
  const handleReward = useCallback(async () => {
    const txHash = await harvest(masterChefContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, masterChefContract])

  return { onReward: handleReward }
}

export default useReward
