import React, { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import { provider } from 'web3-core'
import PageHeader from '../../components/PageHeader'
import Spacer from '../../components/Spacer'
import useFarm from '../../hooks/useFarm'
import { getContract } from '../../utils/erc20'
import Harvest from './components/Harvest'
import Stake from './components/Stake'

const Farm: React.FC = () => {
  //@ts-ignore
  const { farmId } = useParams()

  const { pid, lpToken, lpTokenAddress, earnToken, name, icon } = useFarm(
    farmId,
  ) || {
    pid: 0,
    lpToken: '',
    lpTokenAddress: '',
    tokenAddress: '',
    earnToken: '',
    name: '',
    icon: '',
  }

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const { ethereum } = useWallet()

  const lpContract = useMemo(() => {
    return getContract(ethereum as provider, lpTokenAddress)
  }, [ethereum, lpTokenAddress])

  const lpTokenName = useMemo(() => {
    return lpToken
  }, [lpToken])

  const earnTokenName = useMemo(() => {
    return earnToken.toUpperCase()
  }, [earnToken])

  return (
    <>
      <PageHeader
        icon={
          <img
            src={icon.toString()}
            height={120}
            width={120}
            alt="icon_image"
          />
        }
        subtitle={`Deposit ${lpTokenName}  Tokens and earn ${earnTokenName}`}
        title={name}
      />
      <StyledFarm>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo>
              10% of eligible rewards are sent back to xSTEAK holders
            </StyledInfo>
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest pid={pid} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake lpContract={lpContract} pid={pid} tokenName={lpToken} />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <StyledInfo>
              Every time you stake and unstake LP tokens, the contract will
              automatically harvest STEAK rewards for you!
            </StyledInfo>
          </StyledCardWrapper>
        </StyledCardsWrapper>
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
  margin-top: 20px;
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
  padding: 5px;
  text-align: center;
`

// const StyledLink = styled.a`
//   color: ${(props) => props.theme.color.red[500]};
//   padding-left: ${(props) => props.theme.spacing[3]}px;
//   padding-right: ${(props) => props.theme.spacing[3]}px;
//   text-decoration: none;
//   &:hover {
//     color: ${(props) => props.theme.color.grey[500]};
//   }
// `

export default Farm
