
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio, Menu, Checkbox} from "semantic-ui-react"
import { connect } from 'react-redux';
import Balance from "../Dashboard/Balance/Balance"
import "./Advanced.global.css"

class Advanced extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
    }

    goStaking = () => {
		this.props.history.push("/walletSettings")
    }
    goCustomPermissions = () => {
		this.props.history.push("/customPermissions")
    }
    goWhiteListedApps = () => {
		this.props.history.push("/whiteListedApps")
    }
    
	render() {
		return (
			<div className="dashboard-container">
				<div className="dashboard-body-section">
                    <div className="advanced-section">
                        <div className="advanced-title">Advanced</div>
                        <div className="advanced-card-wrap">
                            <div className="advanced-card" style={{backgroundImage:"url('../../renderer/assets/images/marketplace/ScrollGroup1.png')"}} onClick={this.goStaking}>
                                <div className="advanced-card-title">
                                    <div>Wallet Settings</div>
                                </div>
                            </div>
                            <div className="advanced-card" style={{backgroundImage:"url('../../renderer/assets/images/marketplace/ScrollGroup2.png')"}} onClick={this.goCustomPermissions}>
                                <div className="advanced-card-title">
                                    <div>Custom Permissions</div>
                                </div>
                            </div>
                            <div className="advanced-card" style={{backgroundImage:"url('../../renderer/assets/images/marketplace/ScrollGroup13.png')"}} onClick={this.goWhiteListedApps}>
                                <div className="advanced-card-title">
                                    <div>Whitelisted Apps</div>
                                </div>
                            </div>
                            <div className="advanced-card" style={{backgroundImage:"url('../../renderer/assets/images/marketplace/ScrollGroup4.png')"}}>
                                <div className="advanced-card-title">
                                    <div>Delegated Resources</div>
                                </div>
                            </div>
                            <div className="advanced-card" style={{backgroundImage:"url('../../renderer/assets/images/marketplace/ScrollGroup5.png')"}}>
                                <div className="advanced-card-title">
                                    <div>Smart Contracts</div>
                                </div>
                            </div>
                            <div className="advanced-card" style={{backgroundImage:"url('../../renderer/assets/images/marketplace/Group1732.png')"}}>
                                <div className="advanced-card-title">
                                    <div>Connect Ledger</div>
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

Advanced.propTypes = {

}

Advanced.defaultProps = {

}

export default Advanced
