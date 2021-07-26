// @ts-nocheck
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import NewModal from '../../components/NewModal'
import tokens from '../../data/tokens.json'
import classNames from 'classnames'
import { useEffect } from 'react'
import wait from 'wait'
import { fromWei, toWei } from 'web3-utils'
import useSushi from '../../hooks/useSushi'
import { useWallet } from 'use-wallet'
import Web3 from 'web3'
import Page from '../../components/Page'
import ERC20 from '../../constants/abi/ERC20.json'
import UniV2Router from '../../sushi/lib/abi/UniV2Router.json'
import BigNumber from 'bignumber.js'
import peggy from '../../assets/img/cow_icons/peggy_head.png'


const IFUSD_ADDRESS = '0x9fC071cE771c7B27b7d9A57C32c0a84c18200F8a'
const WFTM_ADDRESS = '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83'

export default function CrossSwap() {
  const sushi = useSushi()
  const wallet = useWallet()

  const [status, setStatus] = useState<'idle' | 'loading'>('idle')
  const [slippage, setSlippage] = useState(0)
  const [fromInput, setFromInput] = useState<any>('')
  const [toInput, setToInput] = useState<any>('')
  const [fromToken, setFromToken] = useState<any>({})
  const [toToken, setToToken] = useState<any>({})

  const isDisabled = !toToken || !fromToken || !fromInput || !toInput

  const getAmountsOut = async (
    amount: number,
    dexAddress: string,
    path: string[],
  ) => {
    if (!amount || amount < 0) return 0
    const web3 = new Web3('https://rpc.ftm.tools')
    const contract = new web3.eth.Contract(UniV2Router, dexAddress)
    const amountsOut = await contract.methods.getAmountsOut(amount, path).call()
    return amountsOut[amountsOut.length - 1]
  }

  const getToPath = (token) => {
    if (token.token === 'STEAK') {
      return [token.address, IFUSD_ADDRESS, WFTM_ADDRESS]
    } else {
      return [token.address, WFTM_ADDRESS]
    }
  }

  const getFromPath = (token) => {
    if (token.token === 'STEAK') {
      return [WFTM_ADDRESS, IFUSD_ADDRESS, token.address]
    } else {
      return [WFTM_ADDRESS, token.address]
    }
  }

  const updateFromField = async (value: any) => {
    setFromInput(value)
    if (!value || value < 0) return setToInput(0)
    if (fromToken.address && toToken.address) {
      const firstDex = await getAmountsOut(
        new BigNumber(value).multipliedBy(10 ** fromToken.decimals).toString(),
        fromToken.dexAddress,
        getToPath(fromToken),
      )
      const secondDex = await getAmountsOut(
        firstDex,
        toToken.dexAddress,
        getFromPath(toToken),
      )
      const final = new BigNumber(secondDex)
        .dividedBy(new BigNumber(10).pow(toToken.decimals))
        .toFixed(2)
        .toString()

      setToInput(final)
    }
  }

  const updateToField = useCallback(
    async (value: any) => {
      setToInput(value)
      if (!value || value < 0) return setFromInput(0)
      if (fromToken.address && toToken.address) {
        const firstDex = await getAmountsOut(
          new BigNumber(value).times(10 ** toToken.decimals).toString(),
          toToken.dexAddress,
          getToPath(toToken),
        )

        const secondDex = await getAmountsOut(
          firstDex,
          fromToken.dexAddress,
          getFromPath(fromToken),
        )

        const final = new BigNumber(secondDex)
          .dividedBy(new BigNumber(10).pow(fromToken.decimals))
          .toFixed(2)
          .toString()

        setFromInput(final)
      }
    },
    [toToken, fromToken],
  )

  const crosSwap = async () => {
    setStatus('loading')
    try {
      if (!wallet.account) return alert('Please connect your Web3 Wallet!')

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
      if (fromToken.token === 'STEAK' || toToken.token === 'STEAK') {
        await sushi.contracts.crossSwap.methods[
          'crossSwap(address[],address[],address,address,uint256)'
        ](
          fromToken.token === 'STEAK'
            ? [fromToken.address, IFUSD_ADDRESS, WFTM_ADDRESS]
            : [fromToken.address, WFTM_ADDRESS],
          toToken.token === 'STEAK'
            ? [WFTM_ADDRESS, IFUSD_ADDRESS, toToken.address]
            : [WFTM_ADDRESS, toToken.address],
          fromToken.dexAddress,
          toToken.dexAddress,
          total,
        ).estimateGas({ from: wallet.account })

        await sushi.contracts.crossSwap.methods[
          'crossSwap(address[],address[],address,address,uint256)'
        ](
          fromToken.token === 'STEAK'
            ? [fromToken.address, IFUSD_ADDRESS, WFTM_ADDRESS]
            : [fromToken.address, WFTM_ADDRESS],
          toToken.token === 'STEAK'
            ? [WFTM_ADDRESS, IFUSD_ADDRESS, toToken.address]
            : [WFTM_ADDRESS, toToken.address],
          fromToken.dexAddress,
          toToken.dexAddress,
          total,
        ).send({ from: wallet.account })

        return
      }

      await sushi.contracts.crossSwap.methods[
        'crossSwap(address[],address[],address,address,uint256)'
      ](
        [fromToken.address, WFTM_ADDRESS],
        [WFTM_ADDRESS, toToken.address],
        fromToken.dexAddress,
        toToken.dexAddress,
        total,
      ).estimateGas({ from: wallet.account })

      await sushi.contracts.crossSwap.methods[
        'crossSwap(address[],address[],address,address,uint256)'
      ](
        [fromToken.address, WFTM_ADDRESS],
        [WFTM_ADDRESS, toToken.address],
        fromToken.dexAddress,
        toToken.dexAddress,
        total,
      ).send({ from: wallet.account })
    } catch (error) {
      console.log(error)
    }
    setStatus('idle')
  }

  useEffect(() => {
    if (toInput) updateToField(toInput)
  }, [toToken])

  useEffect(() => {
    updateFromField(fromInput)
  }, [fromToken])

  return (
    <Page>
      <div className="h-screen flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-gray-800 text-white rounded-2xl overflow-hidden shadow-2xl">
          <div className="border-b border-gray-700 p-2 px-6 bg-gray-900 flex items-center">
            <p className="opacity-50 flex-1 text-xs uppercase font-bold">
              CrossSwap
            </p>
            <img
              className={classNames(
                'w-6',
                status === 'loading' && 'animate-spin',
              )}
              src={peggy}
              alt=""
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
                <div className="flex space-x-1 overflow-auto whitespace-no-wrap hide-scroll-bars">
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
                <div className="flex space-x-1 overflow-auto whitespace-no-wrap hide-scroll-bars">
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
              {/* <p className="bg-black text-xs p-2 rounded text-white font-mono">
                <div className="flex">
                  <p className="flex-1">Slippage</p>
                  <p>{slippage || 'XX'}%</p>
                </div>
              </p> */}
              <button
                onClick={crosSwap}
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
      <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo>
              -xSTEAK holders earn 10% of all STEAK rewards from farms <br />
              -You will earn a portion of the fees based on the amount of xSTEAK
              held relative the weight of the staking. <br />
              -xSTEAK can be minted by staking STEAK. <br />
              To redeem STEAK staked plus fees convert xSTEAK back to STEAK.{' '}
            </StyledInfo>
          </StyledCardWrapper>
        </StyledCardsWrapper>
    </Page>
  )
}


const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`

const StyledInfo = styled.h3`
  font-family: 'Bebas Neue', monospace;
  color: ${(props) => props.theme.color.grey[400]};
  background: ${(props) => props.theme.color.grey[200]};
  border: 1px solid ${(props) => props.theme.color.grey[300]}ff;
  border-radius: 12px;
  box-shadow: inset 1px 1px 0px ${(props) => props.theme.color.grey[100]};
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 25px;
  font-weight: 400;
  padding: 10px;
  text-align: left;
`