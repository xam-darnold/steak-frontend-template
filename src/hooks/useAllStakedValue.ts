import { useCallback, useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import { Contract } from 'web3-eth-contract'
import Web3 from 'web3'


import {
  getMasterChefContract,
  getWethContract,
  getiFUSDContract,
  getFarms,
  getTotalLPWethValue,
  getTotalIFUSDValue
} from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

export interface StakedValue {
  tokenAmount: BigNumber
  wethAmount: BigNumber
  totalWethValue: BigNumber
  tokenPriceInWeth: BigNumber
  poolWeight: BigNumber
}

const useAllStakedValue = () => {
  const [balances, setBalance] = useState([] as Array<StakedValue>)
  const [updateQueued, setUpdateQueued] = useState(true as boolean)
  const [updateIntervalId, setUpdateIntervalId] = useState(0 as number)
  const defaultProvider = new Web3('https://rpc.fantom.network/')
  const sushi = useSushi()
  const farms = getFarms(sushi)
  const masterChefContract = getMasterChefContract(sushi)
  const wethContract = getWethContract(sushi)
  const iFUSDContract = getiFUSDContract(sushi)
  const block = useBlock()

  const setupUpdateInterval = (intervalInMs: number) => {
    const intervalId = setInterval(async () => {
      setUpdateQueued(true)
    }, intervalInMs)
    setUpdateIntervalId(intervalId)
  }

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
          getTotalLPWethValue(
            masterChefContract,
            wethContract,
            lpContract,
            tokenContract,
            pid,
          ),
      ),

    )

    const iFUSDBalance = await getTotalIFUSDValue(iFUSDContract, masterChefContract)
    balances[0] = iFUSDBalance

    setBalance(balances)
  }, [masterChefContract, farms, wethContract, iFUSDContract])

  useEffect(() => {
    setupUpdateInterval(5000)

    return () => {
      clearInterval(updateIntervalId)
    }
  }, [])

  useEffect(() => {
    console.log("Trying to get all staked value")
    if (defaultProvider && masterChefContract && sushi && updateQueued) {
      fetchAllStakedValue()
      setUpdateQueued(false)
    }
  }, [defaultProvider, block, masterChefContract, fetchAllStakedValue, sushi, updateQueued])

  return balances
}

export default useAllStakedValue
