import React from 'react'
import styled from 'styled-components'
import { Route, Switch, useRouteMatch } from 'react-router-dom'
import { useWallet } from 'use-wallet'

import steakhouse from '../../assets/img/steakhouse.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import WalletProviderModal from '../../components/WalletProviderModal'

import useModal from '../../hooks/useModal'

import Farm from '../Farm'

import FarmCards from './components/FarmCards'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  const { account } = useWallet()
  const [onPresentWalletProviderModal] = useModal(<WalletProviderModal />)
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={steakhouse} width={300} alt="butcher_256" />}
                subtitle="Welcome to the Steakhouse! Earn Steak with iFUSD and LP tokens"
                title="Pick Your Cut of Meat"
              />
              <StyledLink
                target="_blank"
                href="https://swap.spiritswap.finance/#/add/0xe9e7cea3dedca5984780bafc599bd69add087d56/0xAd84341756Bf337f5a0164515b1f6F993D194E1f"
              >
                {' '}
                <Button
                  text="Provide Liquidity"
                />
              </StyledLink>
              {/* <div
                style={{
                  alignItems: 'center',
                  marginBottom: '2%'
                }}
              >
                Note: Current APY includes 2/3rd STEAK emission that is locked for 6 months.
              </div> */}
              <FarmCards />
            </Route>
            <Route path={`${path}/:farmId`}>
              <Farm />
            </Route>
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <Button
              onClick={onPresentWalletProviderModal}
              text="🔓 Unlock Wallet"
            />
          </div>
        )}
      </Page>
    </Switch>
  )
}

const StyledLink = styled.a`
  position: relative;
  &:hover {
    color: ${(props) => props.theme.color.grey[500]};
  }
  margin-bottom: 20px;
`
export default Farms
