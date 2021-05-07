import {useCallback} from 'react'

import useSushi from './useSushi'
import {useWallet} from 'use-wallet'

import {deposit, getiFUSDContract} from '../sushi/utils'

const useEnterFUSD = () => {
  const {account} = useWallet()
  const sushi = useSushi()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await deposit(
        getiFUSDContract(sushi),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, sushi],
  )

  return {onEnter: handle}
}

export default useEnterFUSD