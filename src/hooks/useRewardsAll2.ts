import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'

import { harvestAll, getMasterChefContract, getFarms } from '../sushi/utils'

const useRewardsAll = () => {
  const { account } = useWallet()
  const sushi = useSushi()
  const masterChefContract = getMasterChefContract(sushi)
  const farms = getFarms(sushi)

  //! Changed dependenciees from sushi to masteerChefContract
  const handleReward = useCallback(async () => {
    await harvestAll(masterChefContract, farms, account)
    // console.log(txHash)
    // return txHash
  }, [account, farms, masterChefContract])

  return { onReward: handleReward }
}

export default useRewardsAll