import React, { Component } from "react";

// import "./Balance.global.css";
import { Image, Header } from "semantic-ui-react";
import { Decimal } from 'decimal.js';

export default class Balance extends Component {
    render() {
        const {
            globals,
            settings,
            statsFetcher,
            openResourcesModal,
            openTokenModal,
            openDelegateModal,
            toggleCryptoModal
        } = this.props;
        const {
            tokens,
            totalTokens
        } = statsFetcher.fetchAll();

        let totalUSDValue = 0;
        let usdPrice = 0;
        const totalBalance = totalTokens.toFixed(4);
        if (globals.pricefeed
            && globals.pricefeed.CUSD
            && globals.pricefeed.CUSD.price
            && globals.pricefeed.CUSD.base == settings.blockchain.tokenSymbol) {
            usdPrice = Decimal(globals.pricefeed.CUSD.price).toFixed(4);
            totalUSDValue = usdPrice * totalBalance;
        }

        return (
            <div className="balance-section">
                <div className="balance-chart-container">
                    <div className="balance-total">
                        <h4>Total Balance</h4>
                        <div className="balance-percent">
                            +3.49%
                        </div>
                    </div>
                    <h2>${usdPrice}</h2>
                    <div className="chart-img">
                        <Image src={require('../../../../../renderer/assets/images/dashboard/Group1733.png')} />
                    </div>
                    <div className="chart-button-group">
                        <div className="chart-white-btn">1D</div>
                        <div className="chart-white-btn">1W</div>
                        <div className="chart-white-btn">1M</div>
                        <div className="chart-orange-btn">All</div>
                    </div>
                    <div className="send-btn-wrap" onClick={toggleCryptoModal}>
                        <div className="dashboard-send-btn">
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
                    <div className="balance-button-wrap">
                        <div className="balance-button-title">
                            Buy WAX
                    </div>
                        <Image src={require('../../../../../renderer/assets/images/dashboard/credit-card2.png')} />
                    </div>
                    <div className="balance-button-wrap">
                        <div className="balance-button-title">
                            Swap Tokens
                        </div>
                        <Image src={require('../../../../../renderer/assets/images/dashboard/Group1734.png')} />
                    </div>
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
