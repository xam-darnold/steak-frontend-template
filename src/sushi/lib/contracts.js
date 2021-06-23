import BigNumber from 'bignumber.js/bignumber'
import ERC20Abi from './abi/erc20.json'
import SteakHouseAbi from './abi/SteakHouse.json'
import SteakHouseV2Abi from './abi/SteakHouseV2.json'
import SteakAbi from './abi/SteakToken.json'
import xSteakAbi from './abi/xSTEAK.json'
import UNIV2PairAbi from './abi/uni_v2_lp.json'
import UNIV2Router from './abi/SpiritRouter.json'
import iFUSD from './abi/iFUSD.json'
import FUSD from './abi/fusd.json'
import {
  supportedPools,
} from './constants.js'
import {
  contractAddresses,
  SUBTRACT_GAS_LIMIT,
  supportedPools2,
} from './constants2.js'
import * as Types from './types.js'

export class Contracts {
  constructor(provider, networkId, web3, options) {
    this.web3 = web3
    this.defaultConfirmations = options.defaultConfirmations
    this.autoGasMultiplier = options.autoGasMultiplier || 1.5
    this.confirmationType =
      options.confirmationType || Types.ConfirmationType.Confirmed
    this.defaultGas = options.defaultGas
    this.defaultGasPrice = options.defaultGasPrice

    this.sushi = new this.web3.eth.Contract(SteakAbi.abi)
    this.masterChef = new this.web3.eth.Contract(SteakHouseAbi.abi)
    this.steakHouse = new this.web3.eth.Contract(SteakHouseV2Abi.abi)
    this.xsushiStaking = new this.web3.eth.Contract(xSteakAbi.abi)
    this.weth = new this.web3.eth.Contract(FUSD)
    this.ifusd = new this.web3.eth.Contract(iFUSD.abi)
    this.router= new this.web3.eth.Contract(UNIV2Router)

    this.pools = supportedPools.map((pool) =>
      Object.assign(pool, {
        lpAddress: pool.lpAddresses[networkId],
        tokenAddress: pool.tokenAddresses[networkId],
        lpContract: new this.web3.eth.Contract(UNIV2PairAbi),
        tokenContract: new this.web3.eth.Contract(ERC20Abi),
      }),
    )

    this.pools2 = supportedPools2.map((pool) =>
    Object.assign(pool, {
      lpAddress: pool.lpAddresses[networkId],
      tokenAddress: pool.tokenAddresses[networkId],
      lpContract: new this.web3.eth.Contract(UNIV2PairAbi),
      tokenContract: new this.web3.eth.Contract(ERC20Abi),
    }),
  )

    this.setProvider(provider, networkId)
    this.setDefaultAccount(this.web3.eth.defaultAccount)
  }

  setProvider(provider, networkId) {
    const setProvider = (contract, address) => {
      contract.setProvider(provider)
      if (address) contract.options.address = address
      else console.error('Contract address not found in network', networkId)
    }

    setProvider(this.sushi, contractAddresses.steak[networkId])
    setProvider(this.masterChef, contractAddresses.steakHouse[networkId])
    setProvider(this.steakHouse, contractAddresses.steakHouseV2[networkId])
    setProvider(this.xsushiStaking, contractAddresses.xSteak[networkId])
    setProvider(this.weth, contractAddresses.wftm[networkId])
    setProvider(this.ifusd, contractAddresses.ifusd[networkId])
    setProvider(this.router, contractAddresses.router[networkId])

    this.pools.forEach(
      ({ lpContract, lpAddress, tokenContract, tokenAddress }) => {
        setProvider(lpContract, lpAddress)
        setProvider(tokenContract, tokenAddress)
      },
    )

    this.pools2.forEach(
      ({ lpContract, lpAddress, tokenContract, tokenAddress }) => {
        setProvider(lpContract, lpAddress)
        setProvider(tokenContract, tokenAddress)
      },
    )
  }

  setDefaultAccount(account) {
    this.sushi.options.from = account
    this.masterChef.options.from = account
  }

  async callContractFunction(method, options) {
    const {
      confirmations,
      confirmationType,
      autoGasMultiplier,
      ...txOptions
    } = options

    if (!this.blockGasLimit) {
      await this.setGasLimit()
    }

    if (!txOptions.gasPrice && this.defaultGasPrice) {
      txOptions.gasPrice = this.defaultGasPrice
    }

    if (confirmationType === Types.ConfirmationType.Simulate || !options.gas) {
      let gasEstimate
      if (
        this.defaultGas &&
        confirmationType !== Types.ConfirmationType.Simulate
      ) {
        txOptions.gas = this.defaultGas
      } else {
        try {
          console.log('estimating gas')
          gasEstimate = await method.estimateGas(txOptions)
        } catch (error) {
          const data = method.encodeABI()
          const { from, value } = options
          const to = method._parent._address
          error.transactionData = { from, value, data, to }
          throw error
        }

        const multiplier = autoGasMultiplier || this.autoGasMultiplier
        const totalGas = Math.floor(gasEstimate * multiplier)
        txOptions.gas =
          totalGas < this.blockGasLimit ? totalGas : this.blockGasLimit
      }

      if (confirmationType === Types.ConfirmationType.Simulate) {
        let g = txOptions.gas
        return { gasEstimate, g }
      }
    }

    if (txOptions.value) {
      txOptions.value = new BigNumber(txOptions.value).toFixed(0)
    } else {
      txOptions.value = '0'
    }

    const promi = method.send(txOptions)

    const OUTCOMES = {
      INITIAL: 0,
      RESOLVED: 1,
      REJECTED: 2,
    }

    let hashOutcome = OUTCOMES.INITIAL
    let confirmationOutcome = OUTCOMES.INITIAL

    const t =
      confirmationType !== undefined ? confirmationType : this.confirmationType

    if (!Object.values(Types.ConfirmationType).includes(t)) {
      throw new Error(`Invalid confirmation type: ${t}`)
    }

    let hashPromise
    let confirmationPromise

    if (
      t === Types.ConfirmationType.Hash ||
      t === Types.ConfirmationType.Both
    ) {
      hashPromise = new Promise((resolve, reject) => {
        promi.on('error', (error) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.REJECTED
            reject(error)
            const anyPromi = promi
            anyPromi.off()
          }
        })

        promi.on('transactionHash', (txHash) => {
          if (hashOutcome === OUTCOMES.INITIAL) {
            hashOutcome = OUTCOMES.RESOLVED
            resolve(txHash)
            if (t !== Types.ConfirmationType.Both) {
              const anyPromi = promi
              anyPromi.off()
            }
          }
        })
      })
    }

    if (
      t === Types.ConfirmationType.Confirmed ||
      t === Types.ConfirmationType.Both
    ) {
      confirmationPromise = new Promise((resolve, reject) => {
        promi.on('error', (error) => {
          if (
            (t === Types.ConfirmationType.Confirmed ||
              hashOutcome === OUTCOMES.RESOLVED) &&
            confirmationOutcome === OUTCOMES.INITIAL
          ) {
            confirmationOutcome = OUTCOMES.REJECTED
            reject(error)
            const anyPromi = promi
            anyPromi.off()
          }
        })

        const desiredConf = confirmations || this.defaultConfirmations
        if (desiredConf) {
          promi.on('confirmation', (confNumber, receipt) => {
            if (confNumber >= desiredConf) {
              if (confirmationOutcome === OUTCOMES.INITIAL) {
                confirmationOutcome = OUTCOMES.RESOLVED
                resolve(receipt)
                const anyPromi = promi
                anyPromi.off()
              }
            }
          })
        } else {
          promi.on('receipt', (receipt) => {
            confirmationOutcome = OUTCOMES.RESOLVED
            resolve(receipt)
            const anyPromi = promi
            anyPromi.off()
          })
        }
      })
    }

    if (t === Types.ConfirmationType.Hash) {
      const transactionHash = await hashPromise
      if (this.notifier) {
        this.notifier.hash(transactionHash)
      }
      return { transactionHash }
    }

    if (t === Types.ConfirmationType.Confirmed) {
      return confirmationPromise
    }

    const transactionHash = await hashPromise
    if (this.notifier) {
      this.notifier.hash(transactionHash)
    }
    return {
      transactionHash,
      confirmation: confirmationPromise,
    }
  }

  async callConstantContractFunction(method, options) {
    const m2 = method
    const { blockNumber, ...txOptions } = options
    return m2.call(txOptions, blockNumber)
  }

  async setGasLimit() {
    const block = await this.web3.eth.getBlock('latest')
    this.blockGasLimit = block.gasLimit - SUBTRACT_GAS_LIMIT
  }
}
