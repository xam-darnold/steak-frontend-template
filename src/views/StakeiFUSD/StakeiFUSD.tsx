import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import Spacer from '../../components/Spacer'
import useSushi from '../../hooks/useSushi'
import { getContract } from '../../utils/erc20'
import UnstakeiFUSD from './components/UnstakeiFUSD'
import StakeFUSD from './components/StakeFUSD'

import { contractAddresses } from '../../sushi/lib/constants'
import { getiFUSDSupply, getiFUSDShareValue } from '../../sushi/utils'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from '../../utils/formatBalance'
import { grey } from '../../theme/colors'
import Button from '../../components/Button'

const StakeiFUSD: React.FC = () => {
  const { tokenAddress, steakAddress, fusdAddress } = {
    tokenAddress: contractAddresses.ifusd[250],
    steakAddress: contractAddresses.steak[250],
    fusdAddress: contractAddresses.fusd[250],
  }

  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [iFusdShareValue, setiFusdShareValue] = useState<BigNumber>()

  const sushi = useSushi()
  const { ethereum } = useWallet()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchTotalSupplyIFUSDShareValue() {
      const supply = await getiFUSDSupply(sushi)
      const share = await getiFUSDShareValue(sushi)
      setTotalSupply(supply)
      setiFusdShareValue(share)
    }
    if (sushi) {
      fetchTotalSupplyIFUSDShareValue()
    }
  }, [sushi, setTotalSupply, setiFusdShareValue])

  const lpContract = useMemo(() => {
    debugger
    return getContract(ethereum as provider, tokenAddress)
  }, [ethereum, tokenAddress])

  return (
    <>
      <StyledFarm>
        <StyledLink
          target="_blank"
          href={`https://swap.spiritswap.finance/#/swap?inputCurrency=${steakAddress}&outputCurrency=${fusdAddress}`}
        >
          {' '}
          <Button text="Buy FUSD" />
        </StyledLink>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <UnstakeiFUSD lpContract={lpContract} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <StakeFUSD />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <StyledInfo>
          {iFusdShareValue
            ? `${getBalanceNumber(iFusdShareValue)} FUSD per iFUSD`
            : 'Locked'}
        </StyledInfo>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo style={{ color: grey[900] }}>
              -xSTEAK holders earn 20% of ALL farming rewards -You will earn a
              portion of the fees based on the amount of iFUSD held relative the
              weight of the staking. <br />
              -iFUSD can be minted by staking FUSD.
              <br />
              -To redeem FUSD staked plus fees convert iFUSD back to FUSD.{' '}
              <br />
              {totalSupply
                ? `-There are currently ${getBalanceNumber(
                    totalSupply,
                  )} iFUSD in existence.`
                : ''}
            </StyledInfo>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
      </StyledFarm>
    </>
  )
}

const StyledFarm = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  margin-top: 20px;
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
const StyledLink = styled.a`
  position: relative;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  margin-bottom: 10px;
`

const StyledInfo = styled.h3`
  font-family: 'Krona One', monospace;
  color: ${(props) => props.theme.color.grey[400]};
  background: ${(props) => props.theme.color.grey[200]};
  border: 1px solid ${(props) => props.theme.color.grey[300]}ff;
  border-radius: 12px;
  box-shadow: inset 1px 1px 0px ${(props) => props.theme.color.grey[100]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 10px;
  text-align: left;
`

export default StakeiFUSD
