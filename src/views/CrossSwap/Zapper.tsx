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

      if (fromToken.token === 'STEAK') {
        await sushi.contracts.crossSwap.methods
        .customZapInToken(
          fromToken.address,
          total,
          IFUSD_ADDRESS,
          toToken.address,
          toToken.dexAddress,
          wallet.account,
        )
        .send({ from: wallet.account })
        await sushi.contracts.crossSwap.methods
          .zapInToken(
            fromToken.address,
            total,
            toToken.address,
            toToken.dexAddress,
            wallet.account,
          )
          .send({ from: wallet.account })
      } else {
        await sushi.contracts.crossSwap.methods
          .zapInToken(
            fromToken.address,
            total,
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
        <div className="flex items-center w-full p-6 space-x-8 border-b border-gray-700">
          <div className="flex-shrink-0">
            <div
              className="relative w-20 h-20 bg-gray-200 bg-center bg-cover rounded-full shadow-2xl"
              style={{
                backgroundImage: `url("${fromToken?.tokenImg}")`,
              }}
            >
              <div
                className="absolute bottom-0 right-0 w-10 h-10 bg-gray-400 bg-center bg-cover rounded-full shadow-xl"
                style={{
                  backgroundImage: `url("${fromToken?.dexImg}")`,
                }}
              />
            </div>
          </div>
          <div className="flex-1 space-y-2 overflow-hidden">
            <div className="flex-1 space-y-1">
              <label htmlFor="" className="flex items-center text-xs">
                <p className="flex-1 font-bold">From</p>
                <p className="font-mono opacity-50">{fromToken?.swap}</p>
              </label>
              <div className="flex items-stretch items-center w-full border border-gray-700 rounded">
                <input
                  className="flex-1 p-2 text-2xl bg-transparent"
                  value={fromInput}
                  onChange={(e) => setFromInput(e.target.value)}
                  type="number"
                  placeholder="0.00"
                />
                {!!fromMax && (
                  <button
                    onClick={async () => setFromInput(fromMax)}
                    className="p-4 text-xs font-bold flex-stretch-1"
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
        <div className="flex items-center w-full p-6 space-x-8 border-b border-gray-700">
          <div className="flex-shrink-0">
            <div
              className="relative w-20 h-20 bg-gray-200 bg-center bg-cover rounded-full shadow-2xl"
              style={{
                backgroundImage: `url("${toToken?.tokenImg}")`,
              }}
            >
              <div
                className="absolute bottom-0 right-0 w-10 h-10 bg-gray-400 bg-center bg-cover rounded-full shadow-xl"
                style={{
                  backgroundImage: `url("${toToken?.dexImg}")`,
                }}
              />
            </div>
          </div>
          <div className="flex-1 space-y-2 overflow-hidden">
            <div className="flex-1 space-y-1">
              <label htmlFor="" className="flex items-center text-xs">
                <p className="flex-1 font-bold">To</p>
                <p className="font-mono opacity-50">{toToken?.swap}</p>
              </label>
              {/* <div className="flex items-stretch items-center w-full border border-gray-700 rounded">
                <input
                  className="flex-1 p-2 text-2xl bg-transparent"
                  value={toInput}
                  onChange={(e) => updateToField(e.target.value)}
                  type="number"
                  placeholder="0.00"
                />
                {!!toMax && (
                  <button
                    onClick={async () => updateToField(toMax)}
                    className="p-4 text-xs font-bold flex-stretch-1"
                  >
                    Max
                  </button>
                )}
              </div> */}
            </div>
            <div className="flex flex-wrap flex-gap-1 hide-scroll-bars">
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
          {/* <p className="p-2 font-mono text-xs text-white bg-black rounded">
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
