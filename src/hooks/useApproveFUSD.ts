import {useCallback} from 'react'

import useSushi from './useSushi'
import {useWallet} from 'use-wallet'
import {provider} from 'web3-core'
import {
  approve,
  getWethContract,
  getiFUSDContract
} from '../sushi/utils'

const useApproveFUSD = () => {
  const {account}: { account: string; ethereum: provider } = useWallet()
  const sushi = useSushi()
  const lpContract = getWethContract(sushi)
  const contract = getiFUSDContract(sushi)

  const handleApprove = useCallback(async () => {
    try {
      const tx = await approve(lpContract, contract, account)
      return tx
    } catch (e) {
      return false
    }
  }, [account, lpContract, contract])

  return {onApprove: handleApprove}
}

export default useApproveFUSD