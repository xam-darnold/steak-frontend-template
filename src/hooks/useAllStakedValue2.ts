import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import Web3 from 'web3'


import {
  getSteakHouseContract,
  getiFUSDContract,
  getFarms2,
  getTotalLPWethValue2
} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'
import useIntervalTrigger from './useIntervalTrigger'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber[]
}

const useAllStakedValue2 = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const [updateQueued, setUpdateQueued] = useState(true as boolean)
  const defaultProvider = new Web3('https://rpcapi.fantom.network')
  const sushi = useSushi()
  const farms = getFarms2(sushi)
  const steakHouseContract = getSteakHouseContract(sushi)
  const iFUSDContract = getiFUSDContract(sushi)
  const block = useBlock()
  const trigger = useIntervalTrigger(5000)

  const fetchAllStakedValue = useCallback(async () => {
    let balances: Array<StakedValue> = await Promise.all(
      farms.map(
        ({
          pid,
          lpContract,
          tokenContract,
        }: {
          pid: number
          lpContract: Contract
          tokenContract: Contract
        }) =>
          getTotalLPWethValue2(
            steakHouseContract,
            iFUSDContract,
            lpContract,
            tokenContract,
            pid,
          ),
      ),

    )

    setBalance(balances)
  }, [steakHouseContract, farms, iFUSDContract])

  useEffect(() => {
    setUpdateQueued(true)
  }, [trigger])

  useEffect(() => {
    if (defaultProvider && steakHouseContract && sushi && updateQueued) {
      fetchAllStakedValue()
      setUpdateQueued(false)
    }
  }, [defaultProvider, block, steakHouseContract, fetchAllStakedValue, sushi, updateQueued])

  return balances
}

export default useAllStakedValue2
