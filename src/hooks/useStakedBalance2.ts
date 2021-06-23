import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getStaked2, getSteakHouseContract } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useStakedBalance2 = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const { account }: { account: string } = useWallet()
  const sushi = useSushi()
  const steakHouseContract = getSteakHouseContract(sushi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getStaked2(steakHouseContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, pid, steakHouseContract])

  useEffect(() => {
    if (account && sushi) {
      fetchBalance()
    }
  }, [account, pid, setBalance, block, sushi, fetchBalance])

  return balance
}

export default useStakedBalance2
