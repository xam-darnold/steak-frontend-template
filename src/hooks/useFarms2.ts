import { useContext } from 'react'
import { Context2 as FarmsContext2 } from '../contexts/Farms2'

const useFarms2 = () => {
  const { farms } = useContext(FarmsContext2)
  // console.log(farms)
  return [farms]
}

export default useFarms2
