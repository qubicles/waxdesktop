import React, { Component } from "react";

// import "./Balance.global.css";
import { Image, Header } from "semantic-ui-react";
import { Decimal } from 'decimal.js';
import { forEach } from 'lodash';

export default class Balance extends Component {
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
        const {
            globals,
            settings,
            statsFetcher,
            openResourcesModal,
            openTokenModal,
            openDelegateModal,
            openCryptoModal,
            openSwapTokenModal,
            openBuyWaxModal
        } = this.props;
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
                        <div className="dashboard-send-btn" onClick={openCryptoModal}>
                            <h3>Send</h3>
                            <Image src={require('../../../../../renderer/assets/images/dashboard/arrow1.png')} />
                        </div>
                    </div>
                    <div className="send-btn-wrap">
                        <div className="dashboard-send-btn" onClick={openTokenModal}>
                            <h3>Receive</h3>
                            <Image src={require('../../../../../renderer/assets/images/dashboard/iconfinder263.png')} />
                        </div>
                    </div>
                </div>
                <div className="balance-button-group">
                    <div className="balance-button-wrap" onClick={openBuyWaxModal}>
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
                    <div className="balance-button-wrap" onClick={openResourcesModal}>
                        <div className="balance-button-title">
                            Resources
                        </div>
                        <Image src={require('../../../../../renderer/assets/images/dashboard/Group15.png')} />
                    </div>
                </div>
            </div>
        );
    }

}
