import { createContext } from 'react'
import { FarmsContext2 } from './types2'

const context2 = createContext<FarmsContext2>({
  farms: [],
  unharvested: 0,
})

export default context2
