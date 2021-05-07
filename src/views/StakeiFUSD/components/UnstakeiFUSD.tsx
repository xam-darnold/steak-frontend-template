import React, { useState } from 'react'
import styled from 'styled-components'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import { getBalanceNumber } from '../../../utils/formatBalance'
import useTokenBalance from '../../../hooks/useTokenBalance'
import { Contract } from 'web3-eth-contract'
import useModal from '../../../hooks/useModal'
import WithdrawModal from './WithdrawModal'
import useLeaveFUSD from '../../../hooks/useLeaveFUSD'
import steak from '../../../assets/img/steak_icons/steak_purple.png'

interface HarvestProps {
  lpContract: Contract
}

const UnstakeiFUSD: React.FC<HarvestProps> = ({ lpContract }) => {
  const iFUSDBalance = useTokenBalance(lpContract.options.address)
  const [pendingTx, setPendingTx] = useState(false)

  const { onLeave } = useLeaveFUSD()

  const tokenName = 'iFUSD'

  const [onPresentLeave] = useModal(
    <WithdrawModal
      max={iFUSDBalance}
      onConfirm={onLeave}
      tokenName={tokenName}
    />,
  )

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon>
              <img src={steak} width={45} alt="steak_logo_64" />
            </CardIcon>
            <Value value={getBalanceNumber(iFUSDBalance)} />
            <Label text="iFUSD Tokens Available" />
          </StyledCardHeader>
          <StyledCardActions>
            <Button
              disabled={!iFUSDBalance.toNumber() || pendingTx}
              text={pendingTx ? 'Converting to FUSD' : 'Convert to FUSD'}
              onClick={async () => {
                setPendingTx(true)
                await onPresentLeave()
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

export default UnstakeiFUSD
