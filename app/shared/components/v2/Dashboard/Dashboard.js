import React from "react";
import PropTypes from "prop-types";
import { Divider, Tab, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import DashboardTokenModal from "./Modals/TokenModal/DashboardTokenModal";
import TabPanes from "./TabPanes/TabPanes";
import ResourcesModal from "./Modals/ResourcesModal/ResourcesModal";
import DelegateModal from "./Modals/DelegateModal/DelegateModal";
import CryptoModal from "./Modals/CryptoModal/CryptoModal";
import SwapTokenModal from "./Modals/SwapTokenModal/SwapTokenModal";
import ImportAccountModal from "./Modals/ImportAccountModal/ImportAccountModal";
import BuyWaxModal from "./Modals/BuyWaxModal/BuyWaxModal";
import CreateAccountModal from "./Modals/CreateAccountModal/CreateAccountModal";
import SellAssetModal from "./Modals/SellAssetModal/SellAssetModal";
import TrendingAssets from "./TrendingAssets/TrendingAssets";
import RecommendedApps from "./RecommendedApps/RecommendedApps";
import Balance from "./Balance/Balance";

import * as GlobalsActions from "../../../actions/globals";
import * as AccountActions from "../../../actions/accounts";
import * as SettingsActions from "../../../actions/settings";
import * as TransferActions from "../../../actions/transfer";
import * as ChainActions from "../../../actions/chain";
import * as WalletActions from "../../../actions/wallet";
import * as WalletsActions from "../../../actions/wallets";

import StatsFetcher from "../../../utils/StatsFetcher";
import { isArray } from "util";
import "./Dashboard.global.css";

const initialState = {
  dashboardTokenModal: false,
  resourcesModal: false,
  delegateModal: false,
  cryptoModal: false,
  swapTokenModal: false,
  importAccountModal: false,
  buyWaxModal: false,
  createAccountModal: false,
  sellAssetModal: false
};

class Home extends React.Component {
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
    const { account } = settings;
    // if(activeAccount.length == 0){
    //     actions.importWallet(
    //       settings.account,
    //       "active",
    //       false,
    //       false,
    //       "hot",
    //       chain.chain_id,
    //       pubkey
    //     );
      const activeAccount = wallets.filter(acc => acc.account == account)
      if(account != keys.account){
        actions.setWalletKey(
          activeAccount[0].data,
          wallet.pin,
          "hot",
          activeAccount[0].hash,
          "active"
        );
      } else if(keys.key){
        if(activeAccount.length == 0){
          actions.setWalletKey(
            keys.key,
            wallet.pin,
            "hot",
            keys.hash,
            "active"
          );
        }
      }
    // }
      actions.setSetting('walletInit', true);
      // actions.useWallet(settings.account, chain.chain_id, "active");
      
      actions.setWalletMode('hot');
      // actions.removeAllAccounts();
    
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
  toggleDelegateModal = () => {
    const { delegateModal } = this.state;
    this.setState({ delegateModal: !delegateModal });
  };
  toggleCryptoModal = () => {
    const { cryptoModal } = this.state;
    this.setState({ cryptoModal: !cryptoModal });
  };
  toggleSwapTokenModal = () => {
    const { swapTokenModal } = this.state;
    this.setState({ swapTokenModal: !swapTokenModal });
  };
  toggleImportAccountModal = () => {
    const { importAccountModal } = this.state;
    this.setState({ importAccountModal: !importAccountModal });
  };
  toggleBuyWaxModal = () => {
    const { buyWaxModal } = this.state;
    this.setState({ buyWaxModal: !buyWaxModal });
  };
  toggleCreateAccountModal = () => {
    const { createAccountModal } = this.state;
    this.setState({ createAccountModal: !createAccountModal });
  };
  toggleSellAssetModal = () => {
    const { sellAssetModal } = this.state;
    this.setState({ sellAssetModal: !sellAssetModal });
  };

  goStaking = () => {
    this.props.history.push("/advanced");
  };
  goApps = () => {
    this.props.history.push("/apps");
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
          <TrendingAssets history={history} />
          <RecommendedApps history={history} />
          <div className="token-ntfs-section">
            <div className="right-badge">
              <img
                src={require("../../../../renderer/assets/images/dashboard/Group1737.png")}
                onClick={this.goStaking}
              />
            </div>
            <TabPanes statsFetcher={statsFetcher} actions={actions} />
          </div>
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
          />
        )}
        <DelegateModal
          closeModal={this.toggleDelegateModal}
          modalOpen={delegateModal}
          history={history}
          actions={actions}
          location={location}
        />
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
        <ImportAccountModal
          closeModal={this.toggleImportAccountModal}
          modalOpen={importAccountModal}
          history={history}
          actions={actions}
          location={location}
        />
        {buyWaxModal && (
          <BuyWaxModal
            closeModal={this.toggleBuyWaxModal}
            modalOpen={buyWaxModal}
            history={history}
            actions={actions}
            location={location}
          />
        )}
        {createAccountModal && (
          <CreateAccountModal
            settings={settings}
            balances={balances}
            globals={globals}
            accounts={accounts}
            system={system}
            closeModal={this.toggleCreateAccountModal}
            modalOpen={createAccountModal}
            history={history}
            actions={actions}
            location={location}
          />
        )}
        <SellAssetModal
          closeModal={this.toggleSellAssetModal}
          modalOpen={sellAssetModal}
          history={history}
          actions={actions}
          location={location}
        />
      </div>
    );
  }
}

Home.propTypes = {};

Home.defaultProps = {};

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
        ...WalletActions
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export default connect(mapStateToProps)(Home)
