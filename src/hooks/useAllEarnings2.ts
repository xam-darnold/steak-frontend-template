import { useCallback, useEffect, useState } from 'react'
import { provider } from 'web3-core'

import BigNumber from 'bignumber.js'
import { useWallet } from 'use-wallet'

import { getEarned, getSteakHouseContract, getFarms2 } from '../sushi/utils'
import useSushi from './useSushi'
import useBlock from './useBlock'

const useAllEarnings = () => {
  const [balances, setBalance] = useState([] as Array<BigNumber>)
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const farms = getFarms2(sushi)
  const steakHouseContract = getSteakHouseContract(sushi)
  const block = useBlock()

  const fetchAllBalances = useCallback(async () => {
    const balances: Array<BigNumber> = await Promise.all(
      farms.map(({ pid }: { pid: number }) =>
        getEarned(steakHouseContract, pid, account),
      ),
    )
    setBalance(balances)
  }, [account, steakHouseContract, farms])

  useEffect(() => {
    if (account && steakHouseContract && sushi) {
      fetchAllBalances()
    }
  }, [account, block, steakHouseContract, setBalance, sushi, fetchAllBalances])

  return balances
}

export default useAllEarnings
