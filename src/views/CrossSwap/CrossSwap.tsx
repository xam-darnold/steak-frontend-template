import React, { useState } from 'react'
import NewModal from '../../components/NewModal'
import tokens from '../../data/tokens.json'
import classNames from 'classnames'
import { useEffect } from 'react'
import wait from 'wait'

export default function CrossSwap() {
  const [status, setStatus] = useState<'idle' | 'loading'>('idle')
  const [slippage, setSlippage] = useState(0)
  const [fromInput, setFromInput] = useState<any>('')
  const [toInput, setToInput] = useState<any>('')
  const [fromToken, setFromToken] = useState<any>({})
  const [toToken, setToToken] = useState<any>({})

  const isDisabled = !toToken || !fromToken || !fromInput || !toInput

  const updateToField = (value: any) => {
    setToInput(value)
    const math = value * 0.123
    setFromInput(math)
  }

  const updateFromField = (value: any) => {
    setFromInput(value)
    const math = value * 300
    setToInput(math)
  }

  useEffect(() => {
    const loadData = async () => {
      setStatus('loading')
      try {
        // do some data loading here
        // for now, we are simulating 3 second delay
        await wait(3000)
      } catch (error) {
        console.log(error)
      }
      setStatus('idle')
    }
    loadData()
  }, [])

  const getSomeMoreData = async () => {
    setStatus('loading')
    try {
      // do some data loading here
      // for now, we are simulating 3 second delay
      await wait(3000)
    } catch (error) {
      console.log(error)
    }
    setStatus('idle')
  }

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="max-w-md w-full bg-gray-800 text-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="border-b border-gray-700 p-2 px-6 bg-gray-900 flex items-center">
            <p className="opacity-50 flex-1 text-xs uppercase">CrossSwap</p>
            <i
              className={classNames(
                'fas fa-piggy-bank',
                status === 'loading' && 'animate-spin',
              )}
            />
          </div>
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
              <div className="space-y-2 overflow-hidden">
                <div className="flex-1 space-y-1">
                  <label htmlFor="" className="text-xs flex items-center">
                    <p className="flex-1 font-bold">From</p>
                    <p className="opacity-50 font-mono">{fromToken?.swap}</p>
                  </label>
                  <input
                    value={fromInput}
                    onChange={(e) => updateFromField(e.target.value)}
                    className="bg-transparent p-2 text-2xl rounded border border-gray-700 w-full"
                    type="number"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex space-x-1 justify-end overflow-auto whitespace-no-wrap hide-scroll-bars">
                  {tokens.map((token) => (
                    <button
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
              <div className="space-y-2 overflow-hidden">
                <div className="flex-1 space-y-1">
                  <label htmlFor="" className="text-xs flex items-center">
                    <p className="flex-1 font-bold">To</p>
                    <p className="opacity-50 font-mono">{toToken?.swap}</p>
                  </label>
                  <input
                    value={toInput}
                    onChange={(e) => updateToField(e.target.value)}
                    className="bg-transparent p-2 text-2xl rounded border border-gray-700 w-full"
                    type="number"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex space-x-1 justify-end overflow-auto whitespace-no-wrap hide-scroll-bars">
                  {tokens.map((token) => (
                    <button
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
              </div>
            </div>
            <div className="p-6 space-y-2">
              <p className="bg-black p-6 rounded text-white font-mono">
                <div className="flex">
                  <p className="flex-1">Slippage</p>
                  <p>{slippage || 'XX'}%</p>
                </div>
              </p>
              <button
                type="button"
                disabled={isDisabled}
                className={classNames(
                  'bg-blue-500 w-full rounded text-white py-3 font-bold text-blue-200',
                  isDisabled && 'opacity-50 cursor-not-allowed',
                )}
              >
                Initiate CrossSwap
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
