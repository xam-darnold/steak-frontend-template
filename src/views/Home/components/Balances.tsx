import BigNumber from 'bignumber.js'
import React, { useEffect, useState } from 'react'
import CountUp from 'react-countup'
import styled from 'styled-components'
import { useWallet } from 'use-wallet'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import Label from '../../../components/Label'
import Spacer from '../../../components/Spacer'
import Value from '../../../components/Value'
// import SteakIcon from '../../../components/SteakIcon'
import useAllEarnings from '../../../hooks/useAllEarnings'
import useAllStakedValue from '../../../hooks/useAllStakedValue'
// import useFarms from '../../../hooks/useFarms'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useSushi from '../../../hooks/useSushi'
import { getSushiAddress, getSushiSupply, getFUSDPrice, getSteakPrice, getTotalXSteakValue, getSushiContract, getXSushiStakingContract} from '../../../sushi/utils'
import { getBalanceNumber } from '../../../utils/formatBalance'
import { contractAddresses } from '../../../sushi/lib/constants'


const PendingRewards: React.FC = (sushi) => {
  const [start, setStart] = useState(0)
  const [end, setEnd] = useState(0)
  const [scale, setScale] = useState(1)

  const allEarnings = useAllEarnings()
  let sumEarning = 0
  for (let earning of allEarnings) {
    sumEarning += new BigNumber(earning)
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
  const [steakPrice, setSteakPrice] = useState<BigNumber>()
  const [xSteakValue, setxSteakValue] = useState<BigNumber>()
  const [marketCap, setMarketCap] = useState<BigNumber>()
  const sushi = useSushi()
  // console.log(sushi)
  const sushiBalance = useTokenBalance(getSushiAddress(sushi))
  const ifusdBalance = useTokenBalance(contractAddresses.ifusd[250])
  const steakContract = getSushiContract(sushi)
  const xsteakContract = getXSushiStakingContract(sushi)
  const { account }: { account: any } = useWallet()
  let fusdValue: number = 0

  const stakedValue = useAllStakedValue()

  if(stakedValue[0] !== undefined) {
    for (let i = 0; i < stakedValue.length; i++) {
      fusdValue += stakedValue[i].totalWethValue.toNumber()
    }
  }



  useEffect(() => {
    async function fetchTotalSupply() {
      const totalSteakHouseSupply = (new BigNumber(3300000)).times(new BigNumber(10).pow(18)) //Initial Tokens sent to SteakHouse
      let supply = await getSushiSupply(sushi)
      supply = totalSteakHouseSupply.minus(supply)
      setTotalSupply(supply)
    }
    if (sushi) {
      fetchTotalSupply()
    }
  }, [sushi, setTotalSupply])

  useEffect(() => {
    async function fetchPrices() {
      const fusd = await getFUSDPrice(sushi)
      const steak = await getSteakPrice(sushi)
      const xsteak = await getTotalXSteakValue(xsteakContract, steakContract)
      console.log(xsteak.toNumber())
      setFusdPrice(new BigNumber(fusd))
      setSteakPrice(new BigNumber(steak))
      setxSteakValue(new BigNumber(xsteak))
    }
    if (sushi) {
      fetchPrices()
    }
  }, [sushi, setFusdPrice, setSteakPrice, setxSteakValue, steakContract, xsteakContract])

  useEffect(() => {
    async function getMarketCap() {
      const market = (new BigNumber(steakPrice)).times(totalSupply)
      setMarketCap(market)
    }
    if (sushi) {
      getMarketCap()
    }
  }, [sushi, steakPrice, totalSupply])

  return (
    <StyledWrapper>
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <div style={{ flex: 1 }}>
                <Label text="Your STEAK Balance" />
                <Value
                  value={!!account ? getBalanceNumber(sushiBalance) : 'Locked'}
                  decimals={2}
                />
                <Label text="STEAK Price" />
                <Value
                  value={steakPrice ? '$' + steakPrice : 'Locked'}
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
      </Card>
      <Spacer />
      <Card>
        <CardContent>
          <StyledBalances>
            <StyledBalance>
              <div style={{ flex: 1 }}>
                <Label text="Your iFUSD Balance" />
                <Value
                  value={!!account ? getBalanceNumber(ifusdBalance) : 'Locked'}
                  decimals={2}
                />
                <Label text="FUSD Price" />
                <Value 
                value={fusdPrice ? '$' + fusdPrice : 'Locked'}
               decimals={0}
               />
              </div>
            </StyledBalance>
          </StyledBalances>
        </CardContent>
        <Footnote>
          TVL:
          <FootnoteValue>
              {fusdValue && xSteakValue && fusdPrice && steakPrice ? `$${(fusdValue * fusdPrice.toNumber() + xSteakValue.toNumber() * steakPrice.toNumber()).toLocaleString('en-US').slice(0, -1)}` : "Pending ..."}
          </FootnoteValue>
        </Footnote>
      </Card>
      <Spacer />
      <Card>
        <CardContent>
          <Label text="Total STEAK Supply" />
          <Value
            value={totalSupply ? getBalanceNumber(totalSupply) : 'Locked'}
            decimals={0}
          />
          <Label text="Market Cap" />
          <Value 
            value={marketCap ?  getBalanceNumber(marketCap) : 'Locked'}
            decimals={0}
            prefix='$'
          />
        </CardContent>
        <Footnote>
          New rewards per second
          <FootnoteValue>0.496 STEAK</FootnoteValue>
        </Footnote>
      </Card>
    </StyledWrapper>
  )
}

const Footnote = styled.div`
  font-family: 'Krona One', monospace;
  font-size: 12px;
  padding: 8px 20px;
  color: ${(props) => props.theme.color.grey[400]};
  border-top: solid 1px ${(props) => props.theme.color.grey[300]};
`
const FootnoteValue = styled.div`
  font-family: 'Krona One', monospace;
  float: right;
  font-size: 10px;
`

const StyledWrapper = styled.div`
  font-family: 'Krona One', monospace;
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: stretch;
  }
`

const StyledBalances = styled.div`
  font-family: 'Krona One', monospace;
  display: flex;
`

const StyledBalance = styled.div`
  font-family: 'Krona One', monospace;
  align-items: center;
  display: flex;
  flex: 1;
`

export default Balances
