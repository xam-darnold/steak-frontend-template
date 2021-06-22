import { useCallback, useEffect, useState } from 'react'

import BigNumber from 'bignumber.js'
import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { getAllowance } from '../utils/erc20'
import { getSteakHouseContract } from '../sushi/utils'

const useAllowance2 = (lpContract: Contract) => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const steakHouseContract = getSteakHouseContract(sushi)

  const fetchAllowance = useCallback(async () => {
    const allowance = await getAllowance(
      lpContract,
      account,
      steakHouseContract.options.address,
    )
    setAllowance(new BigNumber(allowance))
  }, [account, steakHouseContract, lpContract])


  useEffect(() => {
    if (account && steakHouseContract && lpContract) {
      fetchAllowance()
    }
    let refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, steakHouseContract, lpContract, fetchAllowance])

  return allowance
}

export default useAllowance2
