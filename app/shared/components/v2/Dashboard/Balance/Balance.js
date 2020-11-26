import React, { Component } from "react";
import { Card, Image, Divider, Tab, Button, Dropdown, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Decimal } from 'decimal.js';
import { forEach } from 'lodash';

import * as GlobalsActions from "../../../../actions/globals";
import * as AccountActions from "../../../../actions/accounts";
import * as SettingsActions from "../../../../actions/settings";
import * as TransferActions from "../../../../actions/transfer";
import * as ChainActions from "../../../../actions/chain";
import * as WalletActions from "../../../../actions/wallet";
import * as WalletsActions from "../../../../actions/wallets";
import * as StakeActions from "../../../../actions/stake";
import * as BuyRamActions from "../../../../actions/system/buyram";
import * as SellRamActions from "../../../../actions/system/sellram";
import StatsFetcher from "../../../../utils/StatsFetcher";

import DashboardTokenModal from "../../Dashboard/Modals/TokenModal/DashboardTokenModal";
import ResourcesModal from "../../Dashboard/Modals/ResourcesModal/ResourcesModal";
import CryptoModal from "../../Dashboard/Modals/CryptoModal/CryptoModal";
import SwapTokenModal from "../../Dashboard/Modals/SwapTokenModal/SwapTokenModal";
import BuyWaxModal from "../../Dashboard/Modals/BuyWaxModal/BuyWaxModal";
import "./Balance.global.css"

const initialState = {
    dashboardTokenModal: false,
    resourcesModal: false,
    cryptoModal: false,
    swapTokenModal: false,
    buyWaxModal: false,
};

class Balance extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }
    getBalance = (base) => {
        const {
            globals
        } = this.props;

        if (globals.pricefeed && globals.pricefeed.CUSD) {
            const tokenPrice = globals.pricefeed.CUSD.find(item => item.base === base);
            return tokenPrice ? tokenPrice.price : 0;
        }
    }
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
        const {
            dashboardTokenModal,
            resourcesModal,
            cryptoModal,
            swapTokenModal,
            importAccountModal,
            buyWaxModal,
        } = this.state;
        const statsFetcher = new StatsFetcher(
            settings.account,
            balances,
            settings,
            null,
            null
        );
        const {
            tokens,
            totalTokens
        } = statsFetcher.fetchAll();

        const coreTokenBalance = tokens[settings.account] ? tokens[settings.account][settings.blockchain.tokenSymbol] : 0;
        let totalBalance = 0;
        if (coreTokenBalance) {
            totalBalance = coreTokenBalance * this.getBalance(settings.blockchain.tokenSymbol);
        }

        forEach(tokens[settings.account], (amount, token) => {
            totalBalance = totalBalance + amount * this.getBalance(token.symbol);
        });

        return (
            <div className="balance-section">
                <div className="balance-chart-container">
                    <div className="balance-total">
                        <h4>Total Balance</h4>
                        <div className="balance-percent">
                            +3.49%
                        </div>
                    </div>
                    <h2>${totalBalance.toFixed(2)}</h2>
                    <div className="chart-img">
                        <Image src={require('../../../../../renderer/assets/images/dashboard/Group1733.png')} />
                    </div>
                    <div className="chart-button-group">
                        <div className="chart-white-btn">1D</div>
                        <div className="chart-white-btn">1W</div>
                        <div className="chart-white-btn">1M</div>
                        <div className="chart-orange-btn">All</div>
                    </div>
                    <div className="send-btn-wrap">
                        <div className="dashboard-send-btn" onClick={this.toggleCryptoModal}>
                            <h3>Send</h3>
                            <Image src={require('../../../../../renderer/assets/images/dashboard/arrow1.png')} />
                        </div>
                    </div>
                    <div className="send-btn-wrap">
                        <div className="dashboard-send-btn" onClick={this.toggleDashboardTokenModal}>
                            <h3>Receive</h3>
                            <Image src={require('../../../../../renderer/assets/images/dashboard/iconfinder263.png')} />
                        </div>
                    </div>
                </div>
                <div className="balance-button-group">
                    <div className="balance-button-wrap" onClick={this.toggleBuyWaxModal}>
                        <div className="balance-button-title">
                            Buy WAX
                    </div>
                        <Image src={require('../../../../../renderer/assets/images/dashboard/credit-card2.png')} />
                    </div>
                    {/* <div className="balance-button-wrap">
                        <div className="balance-button-title" onClick={openSwapTokenModal}>
                            Swap Tokens
                        </div>
                        <Image src={require('../../../../../renderer/assets/images/dashboard/Group1734.png')} />
                    </div> */}
                    <div className="balance-button-wrap" onClick={this.toggleResourcesModal}>
                        <div className="balance-button-title">
                            Resources
                        </div>
                        <Image src={require('../../../../../renderer/assets/images/dashboard/Group15.png')} />
                    </div>
                </div>
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

Balance.propTypes = {};

Balance.defaultProps = {};

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

export default connect(mapStateToProps, mapDispatchToProps)(Balance);