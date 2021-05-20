import React, { useState } from 'react'
import Button from '../../../components/Button'
import useRewardsAll from '../../../hooks/useRewardsAll'

const Harvest: React.FC = () => {
    const [pendingTx, setPendingTx] = useState(false)
    const { onReward } = useRewardsAll()

  return (
    <Button
    text={pendingTx ? 'Collecting STEAK' : 'Harvest ALL Rewards'}
    onClick={async () => {
        setPendingTx(true)
        await onReward()
        setPendingTx(false)
      }}
    />      
  )
}

export default Harvest