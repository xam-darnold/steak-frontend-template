import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import Countdown, { CountdownRenderProps } from 'react-countdown'
import styled, { keyframes } from 'styled-components'
import { useWallet } from 'use-wallet'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Loader from '../../../components/Loader'
import Spacer from '../../../components/Spacer'
import { Farm2 } from '../../../contexts/Farms2'
import useAllStakedValue, {
  StakedValue,
} from '../../../hooks/useAllStakedValue2'
import useFarms2 from '../../../hooks/useFarms2'
import useSushi from '../../../hooks/useSushi'
import {
  getEarned,
  getMasterChefContract,
  getFUSDPrice,
  getiFUSDShareValue,
  getTokenPrice,
} from '../../../sushi/utils'
import { bnToDec } from '../../../utils'

interface FarmWithStakedValue extends Farm2, StakedValue {
  apr0: BigNumber
  apr1: BigNumber
  apr2: BigNumber
  apr3: BigNumber
  apr4: BigNumber
  tvl: BigNumber
}

const FarmCards: React.FC = () => {
  const [fusdPrice, setFusdPrice] = useState<BigNumber>()
  const [iFUSDShareValue, setiFUSDShareValue] = useState<BigNumber>()
  const [tsharePrice, setTsharePrice] = useState<BigNumber>()
  const [farms] = useFarms2()
  // console.log(farms)

  const stakedValue = useAllStakedValue()

  const sushiIndex = farms.findIndex(
    ({ tokenSymbol }) => tokenSymbol === 'STEAK',
  )

  const sushi = useSushi()

  const sushiPrice =
    sushiIndex >= 0 && stakedValue[sushiIndex]
      ? stakedValue[sushiIndex].tokenPriceInWeth
      : new BigNumber(0)

  useEffect(() => {
    async function fetchPrices() {
      const fusdInfo = await Promise.all([
        getFUSDPrice(sushi),
        getiFUSDShareValue(sushi),
        getTokenPrice(
          sushi,
          [
            '0x4cdf39285d7ca8eb3f090fda0c069ba5f4145b37',
            '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
            '0x04068da6c83afcfa0e13ba15a6696662335d5b75',
          ],
          2,
        ),
      ])

      setFusdPrice(new BigNumber(fusdInfo[0]))
      setiFUSDShareValue(fusdInfo[1].div(new BigNumber(10).pow(18)))
      setTsharePrice(new BigNumber(fusdInfo[2]))
    }
    if (sushi) {
      fetchPrices()
    }
  }, [sushi, setFusdPrice, setiFUSDShareValue])

  const SECONDS_PER_YEAR = new BigNumber(31536000)
  const SUSHI_PER_SECOND = new BigNumber(0.031)
  const REWARD1_PER_SECOND = new BigNumber(0.031)
  const REWARD2_PER_SECOND = new BigNumber(0.00000579)
  const REWARD3_PER_SECOND = new BigNumber(0.031)
  const REWARD4_PER_SECOND = new BigNumber(0.031)

  if (stakedValue[0] !== undefined) {
    // console.log(stakedValue[0].poolWeight.toString())
    // console.log(stakedValue[0].totalWethValue.toString())
    // console.log(stakedValue[1].totalWethValue.toString())
    // console.log(stakedValue[0].tokenAmount.toString())
    // console.log(stakedValue[0].wethAmount.toString())
  }

  const rows = farms.reduce<FarmWithStakedValue[][]>(
    (farmRows, farm, i) => {
      const farmWithStakedValue = {
        ...farm,
        ...stakedValue[i],
        apr0: stakedValue[i]
          ? sushiPrice
              .times(SUSHI_PER_SECOND)
              .times(SECONDS_PER_YEAR)
              .times(stakedValue[i].poolWeight[0])
              .div(stakedValue[i].totalWethValue)
          : null,
        apr1: stakedValue[i]
          ? sushiPrice
              .times(REWARD1_PER_SECOND)
              .times(SECONDS_PER_YEAR)
              .times(stakedValue[i].poolWeight[1])
              .div(stakedValue[i].totalWethValue)
          : null,
        apr2: stakedValue[i]
          ? tsharePrice
              .times(REWARD2_PER_SECOND)
              .times(SECONDS_PER_YEAR)
              .times(stakedValue[i].poolWeight[2])
              .div(stakedValue[i].totalWethValue)
          : null,
        apr3: stakedValue[i]
          ? sushiPrice
              .times(REWARD3_PER_SECOND)
              .times(SECONDS_PER_YEAR)
              .times(stakedValue[i].poolWeight[3])
              .div(stakedValue[i].totalWethValue)
          : null,
        apr4: stakedValue[i]
          ? sushiPrice
              .times(REWARD4_PER_SECOND)
              .times(SECONDS_PER_YEAR)
              .times(stakedValue[i].poolWeight[4])
              .div(stakedValue[i].totalWethValue)
          : null,
        tvl:
          stakedValue[i] && sushi
            ? fusdPrice
                .times(iFUSDShareValue)
                .times(stakedValue[i].totalWethValue)
            : null,
      }
      const newFarmRows = [...farmRows]
      if (newFarmRows[newFarmRows.length - 1].length === 3) {
        newFarmRows.push([farmWithStakedValue])
      } else {
        newFarmRows[newFarmRows.length - 1].push(farmWithStakedValue)
      }
      return newFarmRows
    },
    [[]],
  )
  // if (rows) {
  //   console.log(rows)
  // }

  // if (rows[0][0]) {
  //   if (rows[0][0] && sushi) {

  //     console.log(rows[0][0].tvl.toNumber())
  //   }
  // }

  return (
    <StyledCards>
      {!!rows[0].length ? (
        rows.map((farmRow, i) => (
          <StyledRow key={i}>
            {farmRow.map((farm, j) => (
              <React.Fragment key={j}>
                <FarmCard farm={farm} />
                {(j === 0 || j === 1) && <StyledSpacer />}
              </React.Fragment>
            ))}
          </StyledRow>
        ))
      ) : (
        <StyledLoadingWrapper>
          <Loader text="Massaging Cows..." />
        </StyledLoadingWrapper>
      )}
    </StyledCards>
  )
}

interface FarmCardProps {
  farm: FarmWithStakedValue
}

const FarmCard: React.FC<FarmCardProps> = ({ farm }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [startTime, setStartTime] = useState(0)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [harvestable, setHarvestable] = useState(0)

  const { account } = useWallet()
  const { lpTokenAddress } = farm
  const sushi = useSushi()

  const renderer = (countdownProps: CountdownRenderProps) => {
    const { hours, minutes, seconds } = countdownProps
    const paddedSeconds = seconds < 10 ? `0${seconds}` : seconds
    const paddedMinutes = minutes < 10 ? `0${minutes}` : minutes
    const paddedHours = hours < 10 ? `0${hours}` : hours
    return (
      <span style={{ width: '100%' }}>
        {paddedHours}:{paddedMinutes}:{paddedSeconds}
      </span>
    )
  }

  useEffect(() => {
    async function fetchEarned() {
      if (sushi) return
      const earned = await getEarned(
        getMasterChefContract(sushi),
        lpTokenAddress,
        account,
      )
      setHarvestable(bnToDec(earned))
    }
    if (sushi && account) {
      fetchEarned()
    }
  }, [sushi, lpTokenAddress, account, setHarvestable])

  const poolActive = true // startTime * 1000 - Date.now() <= 0
  return (
    <StyledCardWrapper>
      {farm.tokenSymbol === 'STEAK' && <StyledCardAccent />}
      <Card>
        <CardContent>
          <StyledContent>
            <CardIcon>
              <img src={farm.icon.toString()} width={45} alt="farm_icon" />
            </CardIcon>
            <StyledTitle>{farm.name}</StyledTitle>
            <StyledDetails>
              <StyledDetail>Deposit {farm.lpToken}</StyledDetail>
              <StyledDetail>Earn {farm.earnToken}</StyledDetail>
            </StyledDetails>
            <Spacer />
            <Button
              disabled={!poolActive}
              text={poolActive ? 'Select' : undefined}
              to={`/farms2/${farm.id}`}
            >
              {!poolActive && (
                <Countdown
                  date={new Date(startTime * 1000)}
                  renderer={renderer}
                />
              )}
            </Button>
            <StyledInsight>
            <div style={{margin: '0px'}}>
                <span>
                  {`TVL: ${farm.tvl
                    ? `$${farm.tvl
                        .toNumber()
                        .toLocaleString('en-US')
                        .slice(0, -1)}`
                    : 'Loading ...'}`}
                </span>
              </div>
              <div style={{margin: '0px'}}>
                <span>{`STEAK APR: ${
                  farm.apr0 && farm.apr0.toNumber() !== 0
                    ? `${farm.apr0
                        .times(new BigNumber(100))
                        .toNumber()
                        .toLocaleString('en-US')
                        .slice(0, -1)}%`
                    : farm.apr0
                    ? 'Not Incentivized'
                    : 'Loading ...'
                }`}</span>
              </div>
              <div style={{margin: '0px'}}>
                <span>
                  {`TSHARE APR: ${farm.apr2 && farm.apr2.toNumber() !== 0
                    ? `${farm.apr2
                        .times(new BigNumber(100))
                        .toNumber()
                        .toLocaleString('en-US')
                        .slice(0, -1)}%`
                    : farm.apr2
                    ? '0%'
                    : 'Loading ...'}`}
                </span>
              </div>
              {/* <span>
                {farm.tokenAmount
                  ? (farm.tokenAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                {farm.tokenSymbol}
              </span>
              <span>
                {farm.wethAmount
                  ? (farm.wethAmount.toNumber() || 0).toLocaleString('en-US')
                  : '-'}{' '}
                ETH
              </span> */}
            </StyledInsight>
          </StyledContent>
        </CardContent>
      </Card>
    </StyledCardWrapper>
  )
}

const RainbowLight = keyframes`

	0% {
		background-position: 0% 50%;
	}
	50% {
		background-position: 100% 50%;
	}
	100% {
		background-position: 0% 50%;
	}
`

const StyledCardAccent = styled.div`
  background: linear-gradient(
    45deg,
    rgba(255, 0, 0, 1) 0%,
    rgba(255, 154, 0, 1) 10%,
    rgba(208, 222, 33, 1) 20%,
    rgba(79, 220, 74, 1) 30%,
    rgba(63, 218, 216, 1) 40%,
    rgba(47, 201, 226, 1) 50%,
    rgba(28, 127, 238, 1) 60%,
    rgba(95, 21, 242, 1) 70%,
    rgba(186, 12, 248, 1) 80%,
    rgba(251, 7, 217, 1) 90%,
    rgba(255, 0, 0, 1) 100%
  );
  background-size: 300% 300%;
  animation: ${RainbowLight} 2s linear infinite;
  border-radius: 12px;
  filter: blur(6px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`

const StyledCards = styled.div`
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`

const StyledLoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  justify-content: center;
`

const StyledRow = styled.div`
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  flex-flow: row wrap;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  position: relative;
`

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[600]};
  font-family: 'Orbitron', monospace;
  font-size: 24px;
  font-weight: 700;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`

const StyledSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledDetails = styled.div`
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.grey[400]};
`

const StyledInsight = styled.div`
  border-radius: 8px;
  background: #fffdfa;
  color: #aa9584;
  width: 100%;
  margin-top: 12px;
  line-height: 32px;
  font-size: 13px;
  border: 1px solid #e6dcd5;
  text-align: center;
  padding: 0 12px;
`

export default FarmCards
