import { Contract } from 'web3-eth-contract'

export interface Farm2 {
  pid: number
  name: string
  lpToken: string
  lpTokenAddress: string
  lpContract: Contract
  tokenAddress: string
  tokenContract: Contract
  earnToken: string[]
  earnTokenAddress: string
  icon: React.ReactNode
  id: string
  tokenSymbol: string
}

export interface FarmsContext2 {
  farms: Farm2[]
  unharvested: number
}
