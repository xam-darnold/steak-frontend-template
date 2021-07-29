import React from 'react'
import CrossSwap from './CrossSwap'
import Page from '../../components/Page'
import { useState } from 'react'
import Zapper from './Zapper'
import classNames from 'classnames'
import peggy from '../../assets/img/cow_icons/peggy_head.png'
import { createContext } from 'react'

export const CrossSwapContext = createContext({})

export default function CrossSwapPage() {
  const [status, setStatus] = useState<'idle' | 'loading'>('idle')
  const [tab, setTab] = useState<'crossswap' | 'zapper'>('crossswap')

  return (
    <CrossSwapContext.Provider value={{ status, setStatus }}>
      <Page>
        <div className="h-screen w-full flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-gray-800 text-white rounded-2xl overflow-hidden shadow-2xl">
            <div className="border-b border-gray-700 p-2 px-6 bg-gray-900 flex items-center space-x-2">
              <button
                onClick={() => setTab('crossswap')}
                type="button"
                className={classNames(
                  'text-left text-xs uppercase font-bold',
                  tab === 'crossswap' ? 'opacity-75' : 'opacity-25',
                )}
              >
                CrossSwap
              </button>
              <button
                onClick={() => setTab('zapper')}
                type="button"
                className={classNames(
                  'text-left text-xs uppercase font-bold',
                  tab === 'zapper' ? 'opacity-75' : 'opacity-25',
                )}
              >
                Zap
              </button>
              <div className="flex-1" />
              <img
                className={classNames(
                  'w-6',
                  status === 'loading' && 'animate-spin',
                )}
                src={peggy}
                alt=""
              />
            </div>
            {tab === 'crossswap' && <CrossSwap />}
            {tab === 'zapper' && <Zapper />}
          </div>
        </div>
      </Page>
    </CrossSwapContext.Provider>
  )
}
