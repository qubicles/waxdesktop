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
import MarketPlace from '../../shared/components/v2/MarketPlace/Marketplace'
import Apps from '../../shared/components/v2/Apps/Apps'
import Staking from '../../shared/components/v2/Staking/Staking'
import Guilds from '../../shared/components/v2/Guilds/Guilds'
import Advanced from '../../shared/components/v2/Advanced/Advanced'
import WalletSettings from '../../shared/components/v2/Advanced/WalletSettings/WalletSettings'
import CustomPermissions from '../../shared/components/v2/Advanced/CustomPermissions/CustomPermissions'
import WhiteListedApps from '../../shared/components/v2/Advanced/WhiteListedApps/WhiteListedApps'
import DelegatedResources from '../../shared/components/v2/Advanced/DelegatedResources/DelegatedResources'
import { withSideBar } from '../../shared/components/v2/hoc/withSideBar'

export default () => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Welcome} />
      <Route exact path="/dashboard" component={withSideBar(Dashboard)} />
      <Route exact path="/apps" component={withSideBar(Apps)} />
      <Route exact path="/marketplace" component={withSideBar(MarketPlace)} />
      <Route exact path="/staking" component={withSideBar(Staking)} />
      <Route exact path="/guilds" component={withSideBar(Guilds)} />
      <Route exact path="/advanced" component={withSideBar(Advanced)} />
      <Route exact path="/walletSettings" component={withSideBar(WalletSettings)} />
      <Route exact path="/customPermissions" component={withSideBar(CustomPermissions)} />
      <Route exact path="/whiteListedApps" component={withSideBar(WhiteListedApps)} />
      <Route exact path="/delegatedResources" component={withSideBar(DelegatedResources)} />
      <Route exact path="/coldwallet" component={ColdWallet} />
      <Route exact path="/voter" component={BasicVoter} />
    </Switch>
  </HashRouter>
)
