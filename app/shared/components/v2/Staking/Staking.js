
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio } from "semantic-ui-react"
import { connect } from 'react-redux';
import Balance from "../Dashboard/Balance/Balance"
import "./Staking.global.css"
import CurrentStake from "./CurrentStake/CurrentStake"
import ClaimReward from "./ClaimReward/ClaimReward"
import RewardHistory from "./RewardHistory/RewardHistory"


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
                            <CurrentStake />
                            <ClaimReward />
                        </div>
                        <RewardHistory />
                    </div>
                </div>
                {/* <Balance /> */}
            </div>

		)
	}
}

Staking.propTypes = {

}

Staking.defaultProps = {

}

export default Staking
