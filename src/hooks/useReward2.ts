import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { harvest, getSteakHouseContract } from '../sushi/utils'

const useReward2 = (pid: number) => {
  const { account } = useWallet()
  const sushi = useSushi()
  const steakHouseContract = getSteakHouseContract(sushi)

  //! Changed dependenciees from sushi to masteerChefContract
  const handleReward = useCallback(async () => {
    const txHash = await harvest(steakHouseContract, pid, account)
    console.log(txHash)
    return txHash
  }, [account, pid, steakHouseContract])

  return { onReward: handleReward }
}

export default useReward2
