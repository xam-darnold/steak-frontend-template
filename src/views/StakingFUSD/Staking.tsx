import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import fusd_ifusd from '../../assets/img/fusd-ifusd.png'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import StakeiFUSD from "../StakeiFUSD";

const Staking: React.FC = () => {
  const {path} = useRouteMatch()
  return (
    <Switch>
      <Page>
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={fusd_ifusd} height="250" width="250" alt="steakhouse_image" />}
                subtitle="Deposit fUSD for iFUSD."
                title="Interest-bearing fUSD!"
              />
            </Route>
            <StakeiFUSD/>
          </>
      </Page>
    </Switch>
  )
}

export default Staking
