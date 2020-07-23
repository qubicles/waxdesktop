// @flow
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import Welcome from "../components/Welcome"
import Pin from "../components/v2/Pin/Pin"

import * as SettingsActions from "../actions/settings"
import * as ValidateActions from "../actions/validate"
import * as WalletActions from "../actions/wallet"

class WelcomeContainer extends Component {
  props: Props

  componentDidMount() {
    // const {
    //   actions,
    //   history,
    //   settings,
    //   validate,
    //   wallet
    // } = this.props
    // const {
    //   setWalletMode
    // } = actions
    // setWalletMode(settings.walletMode)
    // switch (settings.walletMode) {
    //   case 'cold': {
    //     if (settings.walletInit && wallet.data) {
    //       history.push('/coldwallet')
    //     }
    //     break
    //   }
    //   default: {
    //     if (validate.NODE !== 'SUCCESS' && settings.node) {
    //       const { validateNode } = actions
    //       validateNode(settings.node)
    //     }
    //     break
    //   }
    // }
  }

  componentWillReceiveProps(nextProps) {
    // const { actions, history, settings, validate, wallet } = this.props
    // if (validate.NODE !== "SUCCESS" && nextProps.validate.NODE === "SUCCESS") {
    //   if (settings.walletInit) {
    //     history.push("/voter")
    //   } else if (!!wallet.account && !!wallet.data && wallet.version === 1) {
    //     // If a wallet account + data exists and the wallet is V1, update init flag and proceed.
    //     actions.setSetting("walletInit", true)
    //     history.push("/voter")
    //   }
    // }

  }

  onUserLogin = () => {
    // const { history } = this.props
    // history.push('/dashboard')
    console.log('USER LOGGED IN')
  }

  render() {
    const { wallet, actions } = this.props
    return (
      <Pin
        enterPinScreen={wallet.pin !== ""}
        wallet={wallet}
        actions={actions}
        onUserLogin={this.onUserLogin}
      />
    )
  }
}

function mapStateToProps(state) {
  return {
    wallet: state.wallet
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...WalletActions
      },
      dispatch
    )
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(WelcomeContainer)
)
