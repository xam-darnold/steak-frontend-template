import React from 'react'
import styled from 'styled-components'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import steakhouse from '../../assets/img/steakhouse.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'

import Farm from '../Farm1'

import FarmCards from './components/FarmCards'

const Farms: React.FC = () => {
  const { path } = useRouteMatch()
  return (
    <Switch>
      <Page>
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={steakhouse} width={200} alt="butcher_256" />}
                subtitle="Welcome to the Steakhouse! Earn Steak with iFUSD and LP tokens"
                title="Pick Your Cut of Meat"
              />
              <StyledLink
                target="_blank"
                href="https://swap.spiritswap.finance/#/add/0xe9e7cea3dedca5984780bafc599bd69add087d56/0x9fC071cE771c7B27b7d9A57C32c0a84c18200F8a"
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
