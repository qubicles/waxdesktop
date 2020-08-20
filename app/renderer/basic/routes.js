/* eslint flowtype-errors/show-errors: 0 */
import React from 'react'
import {
  HashRouter,
  Route,
  Switch
} from 'react-router-dom'

import BasicVoter from '../../shared/containers/BasicVoter'
import ColdWallet from '../../shared/containers/ColdWallet'
import Welcome from '../../shared/containers/Welcome'
import Dashboard from '../../shared/components/v2/Dashboard/Dashboard'
// import MarketPlace from '../../shared/components/v2/MarketPlace/Marketplace'
import { withSideBar } from '../../shared/components/v2/hoc/withSideBar'

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/dashboard" component={withSideBar(Dashboard)} />
      {/* <Route exact path="/marketplace" component={withSideBar(MarketPlace)} /> */}
      <Route exact path="/coldwallet" component={ColdWallet} />
      <Route exact path="/voter" component={BasicVoter} />
    </Switch>
  </HashRouter>
)
