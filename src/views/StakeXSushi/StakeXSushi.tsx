import React, { useEffect, useMemo, useState } from 'react'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import Spacer from '../../components/Spacer'
import useSushi from '../../hooks/useSushi'
import { getContract } from '../../utils/erc20'
import UnstakeXSushi from './components/UnstakeXSushi'
import StakeSushi from './components/StakeSushi'
import { contractAddresses } from '../../sushi/lib/constants'
import { getXSushiSupply, getXSteakShareValue} from '../../sushi/utils'
import BigNumber from 'bignumber.js'
import { getBalanceNumber } from '../../utils/formatBalance'
import { grey } from "../../theme/colors"
import Button from "../../components/Button"

const StakeXSushi: React.FC = () => {
  const { tokenAddress, steakAddress, fusdAddress } = {
    tokenAddress: contractAddresses.xSteak[250],
    steakAddress: contractAddresses.steak[250],
    fusdAddress: contractAddresses.fusd[250],
  }

  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [xSteakShareValue, setxSteakShareValue] = useState<BigNumber>()

  const sushi = useSushi()
  const { ethereum } = useWallet()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    async function fetchTotalSupplyXSteakShare() {
      const supply = await getXSushiSupply(sushi)
      const share = await getXSteakShareValue(sushi)
      setTotalSupply(supply)
      setxSteakShareValue(share)
    }
    if (sushi) {
      fetchTotalSupplyXSteakShare()
    }
  }, [sushi, setTotalSupply, setxSteakShareValue])

  const lpContract = useMemo(() => {
    debugger
    return getContract(ethereum as provider, tokenAddress)
  }, [ethereum, tokenAddress])

  return (
    <>
      <StyledFarm>
      <StyledLink
                target="_blank"
                href={`https://swap.spiritswap.finance/#/swap?inputCurrency=${fusdAddress}&outputCurrency=${steakAddress}`}
              >
                {' '}
                <Button
                  text="Buy STEAK"
                />
              </StyledLink>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <UnstakeXSushi lpContract={lpContract} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <StakeSushi />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <StyledInfo style={{color: grey[900]}}>
        {xSteakShareValue ? `${getBalanceNumber(xSteakShareValue)} STEAK per xSTEAK` : 'Locked'} 
        </StyledInfo>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo>
               -xSTEAK holders earn 20% of all STEAK rewards from farms <br />
              -You will earn a portion of the fees based on the amount of
              xSTEAK held relative the weight of the staking. <br />
              -xSTEAK can be minted by staking STEAK. <br />
              To redeem STEAK staked plus fees convert xSTEAK back to STEAK. <br/>
              {' '}
              {totalSupply
                ? `-There are currently ${getBalanceNumber(
                    totalSupply,
                  )} xSTEAK in existence.`
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
  color: ${(props) => props.theme.color.grey[400]};
  font-size: 16px;
  font-weight: 400;
  margin: 0;
  padding: 10px;
  text-align: left;
`

export default StakeXSushi
