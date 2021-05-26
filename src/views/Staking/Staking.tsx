import React from 'react'
import {Route, Switch, useRouteMatch} from 'react-router-dom'
import butcher from '../../assets/img/butcher_knife.png'
import Page from '../../components/Page'
import PageHeader from '../../components/PageHeader'
import StakeXSushi from "../StakeXSushi";

const Staking: React.FC = () => {
  const {path} = useRouteMatch()
  return (
    <Switch>
      <Page>
          <>
            <Route exact path={path}>
              <PageHeader
                icon={<img src={butcher} height="120" width= "200" alt="steakhouse_image" />}
                subtitle="Stake STEAK to earn xSTEAK."
                title="Age Your STEAK!"
              />
            </Route>
            <StakeXSushi/>
          </>
      </Page>
    </Switch>
  )
}

export default Staking
