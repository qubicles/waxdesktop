import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Tab, Table, Image, Header, Card, Button } from "semantic-ui-react";
import { forEach } from 'lodash';
import { Decimal } from 'decimal.js';

import NFTPane from "./NFTPanes";

import NFTPane from "./NFTPanes";

import "./TabPanes.global.css";

class TabPanes extends React.Component {
  getPanes() {
    const { settings } = this.props
    const tokensPane = {
      menuItem: "Tokens",
      render: () => (
        <Tab.Pane attached={false}>
          <Table className="tokens-table">
            <TokenBalance {...this.props} />
          </Table>
        </Tab.Pane>
      )
    };

    const nftsPane = {
      menuItem: "NFTS",
      render: () => <NFTPane settings={settings}/>
    };
    return [tokensPane, nftsPane];
  }

  render() {
    return (
      <Tab menu={{ secondary: true, pointing: true }} panes={this.getPanes()} />
    );
  }
}

class TokenBalance extends React.Component {
  getBalance = (base) => {
    const {
      globals
    } = this.props;

    if (globals.pricefeed && globals.pricefeed.CUSD) {
      const tokenPrice = globals.pricefeed.CUSD.find(item => item.base === base);
      return tokenPrice ? tokenPrice.price : 0;
    }
  }

  render() {
    const { settings, globals, balances, statsFetcher } = this.props;
    const { tokens, totalTokens } = statsFetcher.fetchAll();

    let coreTokenInfo = globals.remotetokens && globals.remotetokens.filter((t) => t.symbol == settings.blockchain.tokenSymbol)[0];
    let coreTokenName = settings.blockchain.tokenSymbol;
    if (coreTokenInfo)
      coreTokenName = coreTokenInfo.name;
    else
      coreTokenInfo = { logo: null };

    const coreTokenBalance = tokens[settings.account] ? tokens[settings.account][settings.blockchain.tokenSymbol] : 0;
    const coreTokenUSDBalance = coreTokenBalance * this.getBalance(settings.blockchain.tokenSymbol);

    const rows = [
      (
        <Table.Row className="token-wrap" key={settings.blockchain.tokenSymbol}>
          <Table.Cell>
            <Image
              src={coreTokenInfo.logo}
            />
          </Table.Cell>
          <Table.Cell className="token-des">
            <div className="des-title">
              <Header as="h3">{coreTokenName}</Header>
              <Header as="h5">{coreTokenBalance && coreTokenBalance.toFixed(2)}</Header>
            </div>
          </Table.Cell>
          <Table.Cell className="des-price">${coreTokenUSDBalance && coreTokenUSDBalance.toFixed(2)}</Table.Cell>
        </Table.Row>
      )];

    const watchedTokens = (settings.customTokens) ? settings.customTokens.map((token) => token.split(':')[1]) : [];

    forEach(tokens[settings.account], (amount, token) => {
      if (token.toUpperCase() === settings.blockchain.tokenSymbol || watchedTokens.indexOf(token) === -1 || amount < 0.0002) return;
      // let tokenInfo = globals.remotetokens && globals.remotetokens.filter((t) => t.symbol == token && t.chain.toUpperCase() == settings.blockchain.tokenSymbol)[0];
      let tokenInfo = globals.remotetokens && globals.remotetokens.filter((t) => t.symbol == token)[0];

      let tokenName = token;
      let contract = 'unknown';
      let precision = {
        [token]: 4
      };
      if (tokenInfo)
        tokenName = tokenInfo.name;
      else
        tokenInfo = { logo: null };
      const tokenBalance = amount * this.getBalance(token.symbol);

      rows.push((<Table.Row className="token-wrap" key={token}>
        <Table.Cell>
          <Image
            src={tokenInfo.logo}
          />
        </Table.Cell>
        <Table.Cell className="token-des">
          <div className="des-title">
            <Header as="h3">{tokenName}</Header>
            <Header as="h5">{amount}</Header>
          </div>
        </Table.Cell>
        <Table.Cell className="des-price">${tokenBalance.toFixed(2)}</Table.Cell>
      </Table.Row>))

    })
    return <Table.Body>
      {rows}
    </Table.Body>
  }
}

const mapStateToProps = (state) => {
  return {
    balances: state.balances,
    settings: state.settings,
    globals: state.globals
  };
}

export default connect(mapStateToProps, null)(TabPanes);
