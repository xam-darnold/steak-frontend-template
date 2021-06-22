import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { harvestAll, getSteakHouseContract, getFarms2 } from '../sushi/utils'

const useRewardsAll2 = () => {
  const { account } = useWallet()
  const sushi = useSushi()
  const steakHouseContract = getSteakHouseContract(sushi)
  const farms = getFarms2(sushi)

  const handleReward = useCallback(async () => {
    await harvestAll(steakHouseContract, farms, account)
    // console.log(txHash)
    // return txHash
  }, [account, farms, steakHouseContract])

  return { onReward: handleReward }
}

export default useRewardsAll2