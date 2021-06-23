import React from 'react'
import styled from 'styled-components'
import { Route, Switch, useRouteMatch } from 'react-router-dom'

import steakhouse from '../../assets/img/steakhouse_icons/steakhouseV2.png'

import Button from '../../components/Button'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'

import Farm from '../Farm2'

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
              href="https://swap.spiritswap.finance/#/add/0xe9e7cea3dedca5984780bafc599bd69add087d56/0x9fc071ce771c7b27b7d9a57c32c0a84c18200f8a"
            >
              {' '}
              <Button text="Provide Liquidity" />
            </StyledLink>
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
