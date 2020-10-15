// @flow
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import Pin from "../components/v2/Pin/Pin"

import * as WalletActions from "../actions/wallet"
import * as WalletsActions from "../actions/wallets"
import * as SettingsActions from "../actions/settings"
import * as ValidateActions from "../actions/validate"
import * as GlobalsActions from "../actions/globals"

class WelcomeContainer extends Component {
  componentDidMount() {
    const { actions, wallets } = this.props
    const activeAccount = wallets.filter(acc => acc.status === 'active')
    // actions.removeAllAccounts()
    // actions.setSetting('node', 'https://api.wax.alohaeos.com');
    // actions.setSetting('account', 'mj1ai.waa');
    // actions.validateNode('https://api.wax.alohaeos.com');
    actions.setSetting('node', 'https://api.eos.miami');
    actions.setSetting('account', (activeAccount[0] && activeAccount[0].value) || '');
    actions.validateNode('https://api.eos.miami');
    actions.setSetting('blockchain', { tokenSymbol: "TLOS" });
  }

  onUserLogin = () => {
    const { history } = this.props
    history.push("/dashboard")
  }

  getInitialCustomTokens = async () => {
    const {
      actions: { getCustomTokensRemote, setSetting }
    } = this.props;

    let tokens = [];

    const remoteTokensResult = await getCustomTokensRemote();
    if (remoteTokensResult && remoteTokensResult.payload && isArray(remoteTokensResult.payload)) {
      for (var i = 0; i < remoteTokensResult.payload.length; i++) {
        const remoteToken = remoteTokensResult.payload[i];
        const name = [remoteToken.account.toLowerCase(), remoteToken.symbol.toUpperCase()].join(':');
        if (name && name.length > 0) {
          tokens.push(name);
          tokens = new Set(tokens.filter((e) => e));
        }
      };
    }

    setSetting('customTokens', Array.from(tokens))

  }

  render() {
    const { wallet, actions, history, location } = this.props

    return (
      <Pin
        wallet={wallet}
        actions={actions}
        history={history}
        location={location}
        onUserLogin={this.onUserLogin}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    wallet: state.wallet,
    settings: state.settings,
    wallets: state.wallets
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...WalletActions,
        ...WalletsActions,
        ...SettingsActions,
        ...ValidateActions,
        ...GlobalsActions,
        ...WalletsActions
      },
      dispatch
    )
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer)
)
