import React, { useState } from 'react'
import BigNumber from 'bignumber.js'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import useEarnings2 from '../../../hooks/useEarnings2'
import useReward2 from '../../../hooks/useReward2'
import { getBalanceNumber } from '../../../utils/formatBalance'
import steak from '../../../assets/img/steak_icons/steak_orange.png'

interface HarvestProps {
  pid: number
}

const Harvest: React.FC<HarvestProps> = ({ pid }) => {
  const earnings: BigNumber[] = useEarnings2(pid)
  console.log(earnings)
  const [pendingTx, setPendingTx] = useState(false)
  const { onReward } = useReward2(pid)

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon><img src={steak} width={45} alt="steak_logo_64"/></CardIcon>
            <Label text="STEAK Earned" />
            <Value value={getBalanceNumber(earnings[0])} />
            <Label text="BRAD Earned" />
            <Value value={getBalanceNumber(earnings[1])} />
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              disabled={getBalanceNumber(earnings[0]) === 0 || pendingTx}
              text={pendingTx ? 'Collecting STEAK' : 'Harvest'}
              onClick={async () => {
                setPendingTx(true)
                await onReward()
                setPendingTx(false)
              }}
            />
          </StyledCardActions>
        </StyledCardContentInner>
      </CardContent>
    </Card>
  )
}

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
`

// const StyledSpacer = styled.div`
//   height: ${(props) => props.theme.spacing[4]}px;
//   width: ${(props) => props.theme.spacing[4]}px;
// `

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Harvest
