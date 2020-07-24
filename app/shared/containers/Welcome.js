// @flow
import React, { Component } from "react"
import { bindActionCreators } from "redux"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import Pin from "../components/v2/Pin/Pin"

import * as WalletActions from "../actions/wallet"

class WelcomeContainer extends Component {
  onUserLogin = () => {
    const { history } = this.props
    history.push("/dashboard")
  }

  render() {
    const { wallet, actions } = this.props
    return (
      <Pin wallet={wallet} actions={actions} onUserLogin={this.onUserLogin} />
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
