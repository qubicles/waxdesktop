
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio } from "semantic-ui-react"
import { connect } from 'react-redux';


class CurrentStake extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
    }

	render() {
		return (
                <div className="staking-card-left">
                    <div className="staking-card-logo">
                        <img src={require('../../../../../renderer/assets/images/marketplace/ScrollGroup3.png')} />
                        <div className="staking-card-des">
                            <div>Current Stake</div>
                            <div>1,468,932.19 WAX</div>
                        </div>
                    </div>
                    <div className="stake-card-btn">Stake WAX</div>
                </div>
		)
	}
}

CurrentStake.propTypes = {

}

CurrentStake.defaultProps = {

}

export default CurrentStake
