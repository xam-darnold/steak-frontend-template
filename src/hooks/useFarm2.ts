import { useContext } from 'react'
import { Context2 as FarmsContext2, Farm2 } from '../contexts/Farms2'

const useFarm2 = (id: string): Farm2 => {
  const { farms } = useContext(FarmsContext2)
  const farm = farms.find((farm) => farm.id === id)
  return farm
}

export default useFarm2
