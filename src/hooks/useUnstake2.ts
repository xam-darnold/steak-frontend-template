import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { unstake, getSteakHouseContract } from '../sushi/utils'

const useUnstake2 = (pid: number) => {
  const { account } = useWallet()
  const sushi = useSushi()
  const steakHouseContract = getSteakHouseContract(sushi)

  const handleUnstake = useCallback(
    async (amount: string) => {
      const txHash = await unstake(steakHouseContract, pid, amount, account)
      console.log(txHash)
    },
    [account, pid, steakHouseContract],
  )

  return { onUnstake: handleUnstake }
}

export default useUnstake2
