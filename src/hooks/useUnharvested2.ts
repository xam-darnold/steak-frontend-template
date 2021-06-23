import { useContext } from 'react'
import { Context2 as FarmsContext2 } from '../contexts/Farms2'

const useUnharvested = () => {
  const { unharvested } = useContext(FarmsContext2)
  return unharvested
}

export default useUnharvested
