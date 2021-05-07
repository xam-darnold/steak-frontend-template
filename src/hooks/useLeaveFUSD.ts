import {useCallback} from 'react'

import useSushi from './useSushi'
import {useWallet} from 'use-wallet'

import {withdraw, getiFUSDContract} from '../sushi/utils'

const useLeaveFUSD = () => {
  const {account} = useWallet()
  const sushi = useSushi()

  const handle = useCallback(
    async (amount: string) => {
      const txHash = await withdraw(
        getiFUSDContract(sushi),
        amount,
        account,
      )
      console.log(txHash)
    },
    [account, sushi],
  )

  return {onLeave: handle}
}

export default useLeaveFUSD