import React from "react";
import PropTypes from "prop-types";
import { Card, Image, Divider, Tab, Button, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Balance from "../Dashboard/Balance/Balance";
import "./Apps.global.css";
import RecentlyApps from "./RecentlyApps/RecentlyApps";
import DecentralizedApps from "./DecentralizedApps/DecentralizedApps";
import DashboardTokenModal from "../Dashboard/Modals/TokenModal/DashboardTokenModal";
import ResourcesModal from "../Dashboard/Modals/ResourcesModal/ResourcesModal";
import CryptoModal from "../Dashboard/Modals/CryptoModal/CryptoModal";
import SwapTokenModal from "../Dashboard/Modals/SwapTokenModal/SwapTokenModal";
import BuyWaxModal from "../Dashboard/Modals/BuyWaxModal/BuyWaxModal";

import * as GlobalsActions from "../../../actions/globals";
import * as AccountActions from "../../../actions/accounts";
import * as SettingsActions from "../../../actions/settings";
import * as TransferActions from "../../../actions/transfer";
import * as ChainActions from "../../../actions/chain";
import * as WalletActions from "../../../actions/wallet";
import * as WalletsActions from "../../../actions/wallets";
import * as StakeActions from "../../../actions/stake";
import * as BuyRamActions from "../../../actions/system/buyram";
import * as SellRamActions from "../../../actions/system/sellram";
import StatsFetcher from "../../../utils/StatsFetcher";
import { isArray } from "util";


const initialState = {
  dashboardTokenModal: false,
  resourcesModal: false,
  cryptoModal: false,
  swapTokenModal: false,
  buyWaxModal: false,
};

class Apps extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount = async () => {
    const { actions, settings, chain, accounts, keys, wallets, wallet } = this.props;

    const {
      addCustomToken,
      getCustomTokensRemote,
      getCurrencyBalance,
      getAccount
    } = actions;

    if (settings.account) {
      getAccount(settings.account);
    }

    const remoteTokensResult = await getCustomTokensRemote();
    if (
      remoteTokensResult &&
      remoteTokensResult.payload &&
      isArray(remoteTokensResult.payload)
    ) {
      for (var i = 0; i < remoteTokensResult.payload.length; i++) {
        const remoteToken = remoteTokensResult.payload[i];
        if (
          remoteToken.chain.toUpperCase() == settings.blockchain.tokenSymbol
        ) {
          const tokenTracked = settings.customTokens.filter(
            t => t.split(":")[0] == remoteToken.account
          )[0];
          if (!tokenTracked) {
            await addCustomToken(remoteToken.account, remoteToken.symbol);
          }
        }
      }
    }

    getCurrencyBalance(settings.account);
  };

  toggleDashboardTokenModal = () => {
    const { dashboardTokenModal, resourcesModal } = this.state;
    this.setState({
      dashboardTokenModal: !dashboardTokenModal
    });
  };
  toggleResourcesModal = () => {
    const { resourcesModal } = this.state;
    this.setState({ resourcesModal: !resourcesModal });
  };
  toggleCryptoModal = () => {
    const { cryptoModal } = this.state;
    this.setState({ cryptoModal: !cryptoModal });
  };
  toggleSwapTokenModal = () => {
    const { swapTokenModal } = this.state;
    this.setState({ swapTokenModal: !swapTokenModal });
  };
  toggleBuyWaxModal = () => {
    const { buyWaxModal } = this.state;
    this.setState({ buyWaxModal: !buyWaxModal });
  };

  render() {
    const {
      dashboardTokenModal,
      resourcesModal,
      delegateModal,
      cryptoModal,
      swapTokenModal,
      importAccountModal,
      buyWaxModal,
      createAccountModal,
      sellAssetModal
    } = this.state;
    const {
      wallet,
      actions,
      history,
      location,
      settings,
      balances,
      globals,
      accounts,
      system,
      chain,
    } = this.props;

    const statsFetcher = new StatsFetcher(
      settings.account,
      balances,
      settings,
      null,
      null
    );

    return (
      <div className="dashboard-container">
        <div className="dashboard-body-section">
          <RecentlyApps />
          <DecentralizedApps />
        </div>
        <Balance 
          globals={globals}
          settings={settings}
          statsFetcher={statsFetcher}
          openTokenModal={this.toggleDashboardTokenModal}
          openResourcesModal={this.toggleResourcesModal}
          openDelegateModal={this.toggleDelegateModal}
          openCryptoModal={this.toggleCryptoModal}
          openSwapTokenModal={this.toggleSwapTokenModal}
          openBuyWaxModal={this.toggleBuyWaxModal}
        />
        {dashboardTokenModal && (
          <DashboardTokenModal
            closeModal={this.toggleDashboardTokenModal}
            modalOpen={dashboardTokenModal}
            history={history}
            actions={actions}
            location={location}
            settings={settings}
          />
        )}
        {resourcesModal && (
          <ResourcesModal
            closeModal={this.toggleResourcesModal}
            modalOpen={resourcesModal}
            history={history}
            actions={actions}
            location={location}
            accounts={accounts}
            settings={settings}
            globals={globals}
          />
        )}
        {cryptoModal && (
          <CryptoModal
            actions={actions}
            settings={settings}
            balances={balances}
            globals={globals}
            closeModal={this.toggleCryptoModal}
            modalOpen={cryptoModal}
            history={history}
            actions={actions}
            location={location}
          />
        )}
        {swapTokenModal && (
          <SwapTokenModal
            closeModal={this.toggleSwapTokenModal}
            modalOpen={swapTokenModal}
            history={history}
            actions={actions}
            location={location}
          />
        )}
        {buyWaxModal && (
          <BuyWaxModal
            closeModal={this.toggleBuyWaxModal}
            modalOpen={buyWaxModal}
            history={history}
            actions={actions}
            location={location}
          />
        )}
      </div>
    );
  }
}

Apps.propTypes = {};

Apps.defaultProps = {};

const mapStateToProps = state => {
  return {
    balances: state.balances,
    settings: state.settings,
    globals: state.globals,
    accounts: state.accounts,
    system: state.system,
    chain: state.chain,
    wallets: state.wallets,
    wallet: state.wallet,
    keys: state.keys,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...AccountActions,
        ...GlobalsActions,
        ...SettingsActions,
        ...TransferActions,
        ...ChainActions,
        ...WalletsActions,
        ...WalletActions,
        ...StakeActions,
        ...BuyRamActions,
        ...SellRamActions,
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Apps);
