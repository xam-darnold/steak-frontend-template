import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { stake, getSteakHouseContract } from '../sushi/utils'

const useStake2 = (pid: number) => {
  const { account } = useWallet()
  const sushi = useSushi()

  const handleStake = useCallback(
    async (amount: string) => {
      const txHash = await stake(
        getSteakHouseContract(sushi),
        pid,
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, pid, sushi],
  )

  return { onStake: handleStake }
}

export default useStake2
