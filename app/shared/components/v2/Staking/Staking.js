
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio } from "semantic-ui-react"
import { connect } from 'react-redux';
import Balance from "../Dashboard/Balance/Balance"
import "./Staking.global.css"


class Staking extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
    }

    
	render() {
		return (
			<div className="dashboard-container">
				<div className="dashboard-body-section">
                    <div className="staking-header">
                        <img src={require('../../../../renderer/assets/images/dashboard/dashboard-stacking.png')} />
                        <div>Staking</div>
                    </div>
                    <div className="staking-body">
                        <div className="staking-card-section">
                            <div className="staking-card-left">
                                <div className="staking-card-logo">
                                    <img src={require('../../../../renderer/assets/images/marketplace/ScrollGroup3.png')} />
                                    <div className="staking-card-des">
                                        <div>Current Stake</div>
                                        <div>1,468,932.19 WAX</div>
                                    </div>
                                </div>
                                <div className="stake-card-btn">Stake WAX</div>
                            </div>
                            <div className="staking-card-right">
                                <div className="staking-card-radio">
                                    <div>Auto-Claim</div>
                                    <div className="s-custom-radio">
                                        <Radio toggle />
                                    </div>
                                </div>
                                <div className="s-card-des">
                                    <div>Next Claim</div>
                                    <div>6 hrs 17min</div>
                                </div>
                                <div className="stake-card-btn">
                                    Claim Rewards
                                </div>
                            </div>
                        </div>
                        <div className="staking-history-board">
                            <div className="staking-history-header">
                                <div className="header-left">
                                    <div>Reward History</div>
                                    <div> Earned: 7,168,39 WAX</div>
                                </div>
                                <div className="header-right">
                                    <div>Est Rewards</div>
                                    <div>18 WAX Per Day</div>
                                </div>
                            </div>
                            <div className="staking-history-body">
                                <img src={require('../../../../renderer/assets/images/marketplace/Group1730.png')} className="staking-history-img" />
                                <div className="history-body-right">
                                    <div className="history-body-des">
                                        <div>Est. APR</div>
                                        <div>4.39% Annually</div>
                                    </div>
                                    <div className="history-body-des">
                                        <div>Monthly Rewards</div>
                                        <div>2,139.64 WAX</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Balance />
            </div>

		)
	}
}

Staking.propTypes = {

}

Staking.defaultProps = {

}

export default Staking
