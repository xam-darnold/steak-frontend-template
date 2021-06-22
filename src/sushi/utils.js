import BigNumber from 'bignumber.js'
import { ethers } from 'ethers'

BigNumber.config({
  EXPONENTIAL_AT: 1000,
  DECIMAL_PLACES: 80,
})

// const GAS_LIMIT = {
//   STAKING: {
//     DEFAULT: 200000,
//     SNX: 850000,
//   },
// }

export const getMasterChefAddress = (sushi) => {
  return sushi && sushi.steakHouseAddress
}

export const getSteakHouseAddress = (sushi) => {
  return sushi && sushi.steakHouseV2Address
}

export const getSushiAddress = (sushi) => {
  return sushi && sushi.steakAddress
}

export const getWethContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.weth
}

export const getMasterChefContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.masterChef
}

export const getSteakHouseContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.steakHouse
}

export const getSushiContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.sushi
}

export const getXSushiStakingContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.xsushiStaking
}

export const getiFUSDContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.ifusd
}

export const getRouterContract = (sushi) => {
  return sushi && sushi.contracts && sushi.contracts.router
}

export const getFarms = (sushi) => {
  return sushi
    ? sushi.contracts.pools.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: 'steak',
          earnTokenAddress: sushi.contracts.sushi.options.address,
          icon,
        }),
      )
    : []
}

export const getFarms2 = (sushi) => {
  return sushi
    ? sushi.contracts.pools2.map(
        ({
          pid,
          name,
          symbol,
          icon,
          tokenAddress,
          earnToken,
          tokenSymbol,
          tokenContract,
          lpAddress,
          lpContract,
        }) => ({
          pid,
          id: symbol,
          name,
          lpToken: symbol,
          lpTokenAddress: lpAddress,
          lpContract,
          tokenAddress,
          tokenSymbol,
          tokenContract,
          earnToken: earnToken,
          earnTokenAddress: sushi.contracts.sushi.options.address,
          icon,
        }),
      )
    : []
}

export const getPoolWeight = async (masterChefContract, pid) => {
  const { allocPoint } = await masterChefContract.methods.poolInfo(pid).call()
  const totalAllocPoint = await masterChefContract.methods
    .totalAllocPoint()
    .call()
  return new BigNumber(allocPoint).div(new BigNumber(totalAllocPoint))
}

export const getPoolWeight2 = async (masterChefContract, pid) => {
  let poolWeight = [new BigNumber(0), new BigNumber(0), new BigNumber(0), new BigNumber(0), new BigNumber(0)]
  //!Parallelize this
  const { AllocPoints } = await masterChefContract.methods
    .getPoolInfo(pid)
    .call()
  const totalAllocPoint = await Promise.all([
    masterChefContract.methods.totalAllocPoints(0).call(),
    masterChefContract.methods.totalAllocPoints(1).call(),
    masterChefContract.methods.totalAllocPoints(2).call(),
    masterChefContract.methods.totalAllocPoints(3).call(),
    masterChefContract.methods.totalAllocPoints(4).call(),
  ])
  for (let i = 0; i < poolWeight.length; i++) {
    if (totalAllocPoint[i] > 0 && AllocPoints[i] > 0) {
      poolWeight[i] = new BigNumber(AllocPoints[i] / totalAllocPoint[i])
    }
  }
  return poolWeight
}

export const getEarned = async (masterChefContract, pid, account) => {
  return masterChefContract.methods.pendingSteak(pid, account).call()
}

export const getEarned2 = async (masterChefContract, pid, account) => {
  return masterChefContract.methods.pendingRewards(pid, account).call()
}

export const getFUSDPrice = async (sushi) => {
  const fusdAddress = '0xad84341756bf337f5a0164515b1f6f993d194e1f'
  const usdcAddress = '0x04068da6c83afcfa0e13ba15a6696662335d5b75'
  const fusd = await sushi.contracts.router.methods
    .getAmountsOut('1000000000000000000', [fusdAddress, usdcAddress])
    .call()
  let fusdPrice = new BigNumber(fusd[1])
    .div(new BigNumber(10).pow(6))
    .toFormat(2)
  return fusdPrice
}

export const getSteakPrice = async (sushi) => {
  const steakAddress = '0x05848B832E872d9eDd84AC5718D58f21fD9c9649'
  const fusdAddress = '0xad84341756bf337f5a0164515b1f6f993d194e1f'
  const usdcAddress = '0x04068da6c83afcfa0e13ba15a6696662335d5b75'
  const steak = await sushi.contracts.router.methods
    .getAmountsOut('1000000000000000000', [
      steakAddress,
      fusdAddress,
      usdcAddress,
    ])
    .call()
  let steakPrice = new BigNumber(steak[2])
    .div(new BigNumber(10).pow(6))
    .toFormat(2)
  return steakPrice
}

export const getTotalLPWethValue = async (
  masterChefContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call()

  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()

  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight(masterChefContract, pid),
  }
}

export const getTotalLPWethValue2 = async (
  masterChefContract,
  wethContract,
  lpContract,
  tokenContract,
  pid,
) => {
  // Get balance of the token address
  const tokenAmountWholeLP = await tokenContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  const tokenDecimals = await tokenContract.methods.decimals().call()
  // Get the share of lpContract that masterChefContract owns
  const balance = await lpContract.methods
    .balanceOf(masterChefContract.options.address)
    .call()

  // Convert that into the portion of total lpContract = p1
  const totalSupply = await lpContract.methods.totalSupply().call()

  // Get total weth value for the lpContract = w1
  const lpContractWeth = await wethContract.methods
    .balanceOf(lpContract.options.address)
    .call()
  // Return p1 * w1 * 2
  const portionLp = new BigNumber(balance).div(new BigNumber(totalSupply))
  const lpWethWorth = new BigNumber(lpContractWeth)
  const totalLpWethValue = portionLp.times(lpWethWorth).times(new BigNumber(2))
  // Calculate
  const tokenAmount = new BigNumber(tokenAmountWholeLP)
    .times(portionLp)
    .div(new BigNumber(10).pow(tokenDecimals))

  const wethAmount = new BigNumber(lpContractWeth)
    .times(portionLp)
    .div(new BigNumber(10).pow(18))
  return {
    tokenAmount,
    wethAmount,
    totalWethValue: totalLpWethValue.div(new BigNumber(10).pow(18)),
    tokenPriceInWeth: wethAmount.div(tokenAmount),
    poolWeight: await getPoolWeight2(masterChefContract, pid),
  }
}

export const getTotalIFUSDValue = async (ifusdContract, masterChefContract) => {
  // Get ifusd steakhouse
  const ifusdAmount = new BigNumber(
    await ifusdContract.methods
      .balanceOf(masterChefContract.options.address)
      .call(),
  ).div(new BigNumber(10).pow(18))

  const ifusdShareValue = new BigNumber(
    await ifusdContract.methods.getShareValue().call(),
  ).div(new BigNumber(10).pow(18))

  const fusdAmount = ifusdAmount.times(ifusdShareValue)

  return {
    tokenAmount: ifusdAmount,
    wethAmount: fusdAmount,
    totalWethValue: fusdAmount,
    tokenPriceInWeth: fusdAmount,
    poolWeight: await getPoolWeight(masterChefContract, 0),
  }
}

export const getTotalXSteakValue = async (xSteakContract, steakContract) => {
  // Get ifusd steakhouse
  const steakAmount = new BigNumber(
    await steakContract.methods
      .balanceOf(xSteakContract.options.address)
      .call(),
  ).div(new BigNumber(10).pow(18))

  return steakAmount
}

export const approve = async (lpContract, masterChefContract, account) => {
  return lpContract.methods
    .approve(masterChefContract.options.address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const approveAddress = async (lpContract, address, account) => {
  return lpContract.methods
    .approve(address, ethers.constants.MaxUint256)
    .send({ from: account })
}

export const getSushiSupply = async (sushi) => {
  return new BigNumber(
    await sushi.contracts.sushi.methods
      .balanceOf(sushi.steakHouseAddress)
      .call(),
  )
}

export const getXSushiSupply = async (sushi) => {
  return new BigNumber(
    await sushi.contracts.xsushiStaking.methods.totalSupply().call(),
  )
}

export const getiFUSDSupply = async (sushi) => {
  return new BigNumber(await sushi.contracts.ifusd.methods.totalSupply().call())
}

export const getiFUSDShareValue = async (sushi) => {
  return new BigNumber(
    await sushi.contracts.ifusd.methods.getShareValue().call(),
  )
}

export const getXSteakShareValue = async (sushi) => {
  return new BigNumber(
    await sushi.contracts.xsushiStaking.methods.getShareValue().call(),
  )
}

export const stake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .deposit(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const unstake = async (masterChefContract, pid, amount, account) => {
  return masterChefContract.methods
    .withdraw(
      pid,
      new BigNumber(amount).times(new BigNumber(10).pow(18)).toString(),
    )
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
export const harvest = async (masterChefContract, pid, account) => {
  return masterChefContract.methods
    .deposit(pid, '0')
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const harvestAll = async (masterChefContract, pools, account) => {
  for (const pool of pools) {
    const pendingSteak = (
      await getStaked(masterChefContract, pool.pid, account)
    ).toNumber()
    if (pendingSteak > 0) {
      masterChefContract.methods
        .deposit(pool.pid, '0')
        .send({ from: account })
        .on('transactionHash', (tx) => {
          console.log(tx)
          return tx.transactionHash
        })
    }
  }
}

export const getStaked = async (masterChefContract, pid, account) => {
  try {
    const { amount } = await masterChefContract.methods
      .userInfo(pid, account)
      .call()
    return new BigNumber(amount)
  } catch {
    return new BigNumber(0)
  }
}

export const redeem = async (masterChefContract, account) => {
  let now = new Date().getTime() / 1000
  if (now >= 1597172400) {
    return masterChefContract.methods
      .exit()
      .send({ from: account })
      .on('transactionHash', (tx) => {
        console.log(tx)
        return tx.transactionHash
      })
  } else {
    alert('pool not active')
  }
}

export const deposit = async (contract, amount, account) => {
  debugger
  return contract.methods
    .deposit(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}

export const withdraw = async (contract, amount, account) => {
  return contract.methods
    .withdraw(new BigNumber(amount).times(new BigNumber(10).pow(18)).toString())
    .send({ from: account })
    .on('transactionHash', (tx) => {
      console.log(tx)
      return tx.transactionHash
    })
}
