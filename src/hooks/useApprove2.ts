import { useCallback } from 'react'

import useSushi from './useSushi'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import { Contract } from 'web3-eth-contract'

import { approve, getSteakHouseContract } from '../sushi/utils'

const useApprove2 = (lpContract: Contract) => {
  const { account }: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const steakHouseContract = getSteakHouseContract(sushi)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, steakHouseContract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, steakHouseContract])

  return { onApprove: handleApprove }
}

export default useApprove2
