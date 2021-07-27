// @ts-nocheck
import classNames from 'classnames'
import React, { useContext, useState } from 'react'
import Web3 from 'web3'
import { useWallet } from 'use-wallet'
import tokens from '../../data/tokens2.json'
import lptokens from '../../data/lptokens.json'
import useSushi from '../../hooks/useSushi'
import ERC20 from '../../constants/abi/ERC20.json'
import BigNumber from 'bignumber.js'
import { IFUSD_ADDRESS, WFTM_ADDRESS } from '../../constants/tokenAddresses'
import { CrossSwapContext } from '.'
import { toWei } from 'web3-utils'

export default function Zapper() {
  const wallet = useWallet()
  const sushi = useSushi()

  const { status, setStatus } = useContext(CrossSwapContext)

  const [fromInput, setFromInput] = useState<any>('')
  const [fromMax, setFromMax] = useState<number>(0)
  const [fromToken, setFromToken] = useState<any>({})
  const [toToken, setToToken] = useState<any>({})

  const isDisabled = !toToken || !fromToken || !fromInput

  const onSubmit = async () => {
    setStatus('loading')
    try {
      if (!wallet.account) {
        setStatus('idle')
        return alert('Please connect your wallet!')
      }
      const web3 = new Web3(wallet.ethereum)

      const fromTokenContract = new web3.eth.Contract(
        ERC20.abi,
        fromToken.address,
      )

      const allowance = await fromTokenContract.methods
        .allowance(wallet.account, sushi.crossSwapAddress)
        .call()

      const total =
        fromToken.token === 'USDC' || fromToken.token === 'fUSDT'
          ? fromInput * 10 ** 6
          : toWei(fromInput)

      if (allowance < total)
        await fromTokenContract.methods
          .approve(sushi.crossSwapAddress, total)
          .send({ from: wallet.account })

      const amount = new BigNumber(fromInput)
        .multipliedBy(10 ** fromToken.decimals)
        .toString()

      if (fromToken.token === 'STEAK') {
        await sushi.contracts.crossSwap.methods
          .zapInToken(
            fromToken.address,
            amount,
            toToken.address,
            toToken.dexAddress,
            wallet.account,
          )
          .send({ from: wallet.account })
      } else {
        await sushi.contracts.crossSwap.methods
          .customZapInToken(
            fromToken.address,
            amount,
            IFUSD_ADDRESS,
            toToken.address,
            toToken.dexAddress,
            wallet.account,
          )
          .send({ from: wallet.account })
      }
    } catch (error) {
      console.log(error)
    }
    setStatus('idle')
  }

  return (
    <>
      <div className="">
        <div className="p-6 border-b border-gray-700 flex w-full items-center space-x-8">
          <div className="flex-shrink-0">
            <div
              className="relative rounded-full w-20 h-20 bg-gray-200 shadow-2xl bg-center bg-cover"
              style={{
                backgroundImage: `url("${fromToken?.tokenImg}")`,
              }}
            >
              <div
                className="absolute rounded-full w-10 h-10 bottom-0 right-0 bg-gray-400 shadow-xl bg-center bg-cover"
                style={{
                  backgroundImage: `url("${fromToken?.dexImg}")`,
                }}
              />
            </div>
          </div>
          <div className="flex-1 space-y-2 overflow-hidden">
            <div className="flex-1 space-y-1">
              <label htmlFor="" className="text-xs flex items-center">
                <p className="flex-1 font-bold">From</p>
                <p className="opacity-50 font-mono">{fromToken?.swap}</p>
              </label>
              <div className="flex items-stretch items-center rounded border border-gray-700 w-full">
                <input
                  className="text-2xl p-2 flex-1 bg-transparent"
                  value={fromInput}
                  onChange={(e) => setFromInput(e.target.value)}
                  type="number"
                  placeholder="0.00"
                />
                {!!fromMax && (
                  <button
                    onClick={async () => setFromInput(fromMax)}
                    className="flex-stretch-1 text-xs font-bold p-4"
                  >
                    Max
                  </button>
                )}
              </div>
            </div>
            <div className="flex space-x-1 overflow-auto whitespace-no-wrap hide-scroll-bars">
              {tokens.map((token) => (
                <button
                  key={token.id}
                  onClick={() => setFromToken(token)}
                  type="button"
                  className={classNames(
                    'shadow-2xl hover:shadow transition ease-in-out duration-150 bg-black text-xs px-2 py-1 text-white rounded',
                    fromToken.token === token.token && 'bg-blue-500',
                  )}
                >
                  {token.token}
                </button>
              ))}
            </div>
            {/* <div>
              <p className="text-xs font-bold">
                Balance: {fromMax} {fromToken.token}
              </p>
            </div> */}
          </div>
        </div>
        <div className="p-6 border-b border-gray-700 flex w-full items-center space-x-8">
          <div className="flex-shrink-0">
            <div
              className="relative rounded-full w-20 h-20 bg-gray-200 shadow-2xl bg-center bg-cover"
              style={{
                backgroundImage: `url("${toToken?.tokenImg}")`,
              }}
            >
              <div
                className="absolute rounded-full w-10 h-10 bottom-0 right-0 bg-gray-400 shadow-xl bg-center bg-cover"
                style={{
                  backgroundImage: `url("${toToken?.dexImg}")`,
                }}
              />
            </div>
          </div>
          <div className="flex-1 space-y-2 overflow-hidden">
            <div className="flex-1 space-y-1">
              <label htmlFor="" className="text-xs flex items-center">
                <p className="flex-1 font-bold">To</p>
                <p className="opacity-50 font-mono">{toToken?.swap}</p>
              </label>
              {/* <div className="flex items-stretch items-center rounded border border-gray-700 w-full">
                <input
                  className="text-2xl p-2 flex-1 bg-transparent"
                  value={toInput}
                  onChange={(e) => updateToField(e.target.value)}
                  type="number"
                  placeholder="0.00"
                />
                {!!toMax && (
                  <button
                    onClick={async () => updateToField(toMax)}
                    className="flex-stretch-1 text-xs font-bold p-4"
                  >
                    Max
                  </button>
                )}
              </div> */}
            </div>
            <div className="flex flex-gap-1 flex-wrap hide-scroll-bars">
              {lptokens.map((token) => (
                <button
                  key={token.id}
                  onClick={() => setToToken(token)}
                  type="button"
                  className={classNames(
                    'shadow-2xl hover:shadow transition ease-in-out duration-150 bg-black text-xs px-2 py-1 text-white rounded',
                    toToken.token === token.token && 'bg-blue-500',
                  )}
                >
                  {token.token}
                </button>
              ))}
            </div>
            {/* <div>
              <p className="text-xs font-bold">
                Balance: {toMax} {toToken.token}
              </p>
            </div> */}
          </div>
        </div>
        <div className="p-6 space-y-2">
          {/* <p className="bg-black text-xs p-2 rounded text-white font-mono">
            <div className="flex">
              <p className="flex-1">Slippage</p>
              <p>{slippage || 'XX'}%</p>
            </div>
          </p> */}
          <button
            onClick={onSubmit}
            type="button"
            disabled={isDisabled}
            className={classNames(
              'bg-blue-500 w-full rounded text-white py-3 font-bold text-blue-200',
              isDisabled && 'opacity-50 cursor-not-allowed',
            )}
          >
            Zap!
          </button>
        </div>
      </div>
    </>
  )
}
