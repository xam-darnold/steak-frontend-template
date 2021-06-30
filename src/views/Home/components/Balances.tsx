import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
// import SteakIcon from '../../../components/SteakIcon'
import useAllEarnings2 from '../../../hooks/useAllEarnings2'
import useAllStakedValue2 from '../../../hooks/useAllStakedValue2'
// import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useSushi from '../../../hooks/useSushi'
import {
  getSushiAddress,
  getSushiSupply,
  getFUSDPrice,
  getiFUSDPrice,
  getSteakPrice,
  getTotalXSteakValue,
  getSushiContract,
  getXSushiStakingContract,
  getTotalFUSDValue,
  getiFUSDContract,
  getWethContract
} from '../../../sushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { contractAddresses } from '../../../sushi/lib/constants'

const PendingRewards: React.FC = (sushi) => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings2()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning[0])
      .div(new BigNumber(10).pow(18))
      .toNumber()
  }

  // const [farms] = useFarms()
  // const allStakedValue = useAllStakedValue()

  // if (allStakedValue && allStakedValue.length) {
  //   const sumWeth = farms.reduce(
  //     (c, { id }, i) => c + (allStakedValue[i].totalWethValue.toNumber() || 0),
  //     0,
  //   )
  // }

  useEffect(() => {
    setStart(end)
    setEnd(sumEarning)
  }, [sumEarning, end])

  return (
    <span
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'right bottom',
        transition: 'transform 0.5s',
        display: 'inline-block',
      }}
    >
      <CountUp
        start={start}
        end={end}
        decimals={end < 0 ? 4 : end > 1e5 ? 0 : 3}
        duration={1}
        onStart={() => {
          setScale(1.25)
          setTimeout(() => setScale(1), 600)
        }}
        separator=","
      />
    </span>
  )
}

const Balances: React.FC = () => {
  const [totalSupply, setTotalSupply] = useState<BigNumber>()
  const [fusdPrice, setFusdPrice] = useState<BigNumber>()
  const [iFusdPrice, setiFusdPrice] = useState<BigNumber>()
  const [iFusdValue, setiFusdValue] = useState<BigNumber>()
  const [steakPrice, setSteakPrice] = useState<BigNumber>()
  const [xSteakValue, setxSteakValue] = useState<BigNumber>()
  const [marketCap, setMarketCap] = useState<BigNumber>()
  const sushi = useSushi()
  // console.log(sushi)
  const sushiBalance = useTokenBalance(getSushiAddress(sushi))
  const ifusdBalance = useTokenBalance(contractAddresses.ifusd[250])
  const steakContract = getSushiContract(sushi)
  const xsteakContract = getXSushiStakingContract(sushi)
  const fusdContract = getWethContract(sushi)
  const ifusdContract = getiFUSDContract(sushi)
  const { account }: { account: any } = useWallet()
  let farmIFusdValue: number = 0

  const stakedValue = useAllStakedValue2()

  if (stakedValue[0] !== undefined) {
    for (let i = 0; i < stakedValue.length; i++) {
      farmIFusdValue += stakedValue[i].totalWethValue.toNumber()
    }
  }

  useEffect(() => {
    async function fetchData() {
      const totalSteakHouseSupply = new BigNumber(3300000).times(
        new BigNumber(10).pow(18),
      ) //Initial Tokens sent to SteakHouse
      const balances = await Promise.all([
        getSushiSupply(sushi),
        getFUSDPrice(sushi),
        getSteakPrice(sushi),
        getiFUSDPrice(sushi),
        getTotalXSteakValue(xsteakContract, steakContract),
        getTotalFUSDValue(ifusdContract, fusdContract)
      ])
      const totalSupply = totalSteakHouseSupply.minus(balances[0])
      setTotalSupply(totalSupply)
      setFusdPrice(new BigNumber(balances[1]))
      setSteakPrice(new BigNumber(balances[2]))
      setiFusdPrice(new BigNumber(balances[3]))
      setxSteakValue(balances[4])
      setiFusdValue(balances[5])
    }
    if (sushi) {
      fetchData()
    }
  }, [
    sushi,
    setFusdPrice,
    setSteakPrice,
    setxSteakValue,
    setiFusdValue,
    steakContract,
    xsteakContract,
    fusdContract,
    ifusdContract
  ])

  useEffect(() => {
    async function getMarketCap() {
      if (steakPrice) {
        const market = new BigNumber(steakPrice).times(totalSupply)
        setMarketCap(market)
      }
    }
    if (sushi) {
      getMarketCap()
    }
  }, [sushi, steakPrice, totalSupply])

  return (
    <StyledWrapper>
      <StyledCard>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <div style={{ flex: 1 }}>
                <Label text="Your STEAK Balance" />
                <Value
                  value={!!account ? getBalanceNumber(sushiBalance) : 'Locked'}
                  decimals={2}
                />
                <Label text="Your iFUSD Balance" />
                <Value
                  value={!!account ? getBalanceNumber(ifusdBalance) : 'Locked'}
                  decimals={2}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          Pending harvest
          <FootnoteValue>
            <PendingRewards /> STEAK
          </FootnoteValue>
        </Footnote>
      </StyledCard>
      <Spacer />
      <StyledCard>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <div style={{ flex: 1 }}>
                <Label text="STEAK Price" />
                <Value
                  value={steakPrice ? '$' + steakPrice : 'Locked'}
                  decimals={2}
                />
                <Label text="fUSD Price" />
                <Value
                  value={fusdPrice ? '$' + fusdPrice : 'Locked'}
                  decimals={0}
                />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          TVL
          <FootnoteValue>
            {farmIFusdValue && xSteakValue && fusdPrice && steakPrice && iFusdValue && iFusdPrice
              ? `$${(
                  farmIFusdValue * iFusdPrice.toNumber() +
                  iFusdValue.toNumber() * fusdPrice.toNumber() +
                  xSteakValue.toNumber() * steakPrice.toNumber()
                )
                  .toLocaleString('en-US')
                  .slice(0, -1)}`
              : 'Locked'}
          </FootnoteValue>
        </Footnote>
      </StyledCard>
      <Spacer />
      <StyledCard>
        <CardContent>
          <Label text="Total STEAK Supply" />
          <Value
            value={totalSupply ? getBalanceNumber(totalSupply) : 'Locked'}
            decimals={0}
          />
          <Label text="Market Cap" />
          <Value
            value={
              marketCap
                ? `$${getBalanceNumber(marketCap)
                    .toLocaleString('en-US')
                    .slice(0, -4)}`
                : 'Locked'
            }
            decimals={0}
          />
        </CardContent>
        <Footnote>
          New rewards per second
          <FootnoteValue>0.031 STEAK</FootnoteValue>
        </Footnote>
      </StyledCard>
    </StyledWrapper>
  )
}

const Footnote = styled.div`
  font-family: 'Bebas Neue', monospace;
  font-size: 17px;
  padding: 8px 20px;
  color: ${(props) => props.theme.color.grey[400]};
  border-top: solid 1px ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Bebas Neue', monospace;
  float: right;
  font-size: 17px;
`
const StyledCard = styled.div`
  background: ${(props) => props.theme.color.grey[200]};
  border: 1px solid ${(props) => props.theme.color.grey[300]}ff;
  border-radius: 12px;
  box-shadow: inset 1px 1px 0px ${(props) => props.theme.color.grey[100]};
  display: flex;
  flex: 1;
  height: 252px;
  flex-direction: column;
`

const StyledWrapper = styled.div`
  font-family: 'Bebas Neue', monospace;
  font-size: 25px;
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  font-family: 'Bebas Neue', monospace;
  font-size: 25px;
  display: flex;
`

const StyledBalance = styled.div`
  font-family: 'Bebas Neue', monospace;
  font-size: 25px;
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances
