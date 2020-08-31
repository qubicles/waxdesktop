
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio } from "semantic-ui-react"
import { connect } from 'react-redux';


class RewardHistory extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
    }

	render() {
		return (
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
                    <img src={require('../../../../../renderer/assets/images/marketplace/Group1730.png')} className="staking-history-img" />
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
		)
	}
}

RewardHistory.propTypes = {

}

RewardHistory.defaultProps = {

}

export default RewardHistory
