import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned2, getSteakHouseContract } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useEarnings2 = (pid: number) => {
  const [balance, setBalance] = useState(new BigNumber(0))
  const {
    account,
  }: { account: string } = useWallet()
  const sushi = useSushi()
  const steakHouseContract = getSteakHouseContract(sushi)
  const block = useBlock()

  const fetchBalance = useCallback(async () => {
    const balance = await getEarned2(steakHouseContract, pid, account)
    setBalance(new BigNumber(balance))
  }, [account, steakHouseContract, pid])

  useEffect(() => {
    if (account && steakHouseContract && sushi) {
      fetchBalance()
    }
  }, [account, block, steakHouseContract, setBalance, sushi, fetchBalance])

  return balance
}

export default useEarnings2
