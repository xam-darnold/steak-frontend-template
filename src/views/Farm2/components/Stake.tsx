import BigNumber from 'bignumber.js'
import React, { useCallback, useState } from 'react'
import styled from 'styled-components'
import { Contract } from 'web3-eth-contract'
import Button from '../../../components/Button'
import Card from '../../../components/Card'
import CardContent from '../../../components/CardContent'
import CardIcon from '../../../components/CardIcon'
import IconButton from '../../../components/IconButton'
import { AddIcon } from '../../../components/icons'
import Label from '../../../components/Label'
import Value from '../../../components/Value'
import Spacer from '../../../components/Spacer'
import useAllowance2 from '../../../hooks/useAllowance2'
import useApprove2 from '../../../hooks/useApprove2'
import useModal from '../../../hooks/useModal'
import useStake2 from '../../../hooks/useStake2'
import useStakedBalance2 from '../../../hooks/useStakedBalance2'
import useTokenBalance from '../../../hooks/useTokenBalance'
import useUnstake2 from '../../../hooks/useUnstake2'
import { getBalanceNumber } from '../../../utils/formatBalance'
import DepositModal from './DepositModal'
import WithdrawModal from './WithdrawModal'
import cow from '../../../assets/img/cow_icons/peggy.png'

interface StakeProps {
  lpContract: Contract
  pid: number
  tokenName: string
}

const Stake: React.FC<StakeProps> = ({ lpContract, pid, tokenName }) => {
  const [requestedApproval, setRequestedApproval] = useState(false)

  const allowance = useAllowance2(lpContract)
  const { onApprove } = useApprove2(lpContract)


  const tokenBalance = useTokenBalance(lpContract.options.address)
  const stakedBalance = useStakedBalance2(pid)
  //const masterChefBalance = useMasterChefBalance(lpContract.options.address)

  // TODO: Figure out a good way to display percentageOfPool for a user, possibily introduce a hover addition when hovering over stakedBalance
  //const percentageOfStake = (getBalanceNumber(stakedBalance) / getBalanceNumber(masterChefBalance)) * 100
  //console.log(percentageOfStake)

  const { onStake } = useStake2(pid)
  const { onUnstake } = useUnstake2(pid)

  const [onPresentDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={onStake}
      tokenName={tokenName}
    />,
  )

  const [onPresentWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={onUnstake}
      tokenName={tokenName}
    />,
  )

  const handleApprove = useCallback(async () => {
    try {
      setRequestedApproval(true)
      const txHash = await onApprove()
      // user rejected tx or didn't go thru
      if (!txHash) {
        setRequestedApproval(false)
      }
    } catch (e) {
      console.log(e)
    }
  }, [onApprove, setRequestedApproval])

  return (
    <Card>
      <CardContent>
        <StyledCardContentInner>
          <StyledCardHeader>
            <CardIcon><img src={cow} width={45} alt="cow_image" /></CardIcon>
            <Spacer />
            <Label text={`${tokenName} Tokens Staked`} />
            <Value value={getBalanceNumber(stakedBalance)} />
          </StyledCardHeader>
          <StyledCardActions>
            {!allowance.toNumber() ? (
              <Button
                disabled={requestedApproval}
                onClick={handleApprove}
                text={`Approve ${tokenName}`}
              />
            ) : (
              <>
                <Button
                  disabled={stakedBalance.eq(new BigNumber(0))}
                  text="Unstake"
                  onClick={onPresentWithdraw}
                />
                <StyledActionSpacer />
                <IconButton onClick={onPresentDeposit}>
                  <AddIcon />
                </IconButton>
              </>
            )}
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

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
`

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

export default Stake
