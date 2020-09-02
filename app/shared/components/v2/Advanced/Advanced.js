
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio, Menu, Checkbox} from "semantic-ui-react"
import { connect } from 'react-redux';
import Balance from "../Dashboard/Balance/Balance"
import "./Advanced.global.css"
import AdvancedMainCard from "./AdvancedMainCard/AdvancedMainCard"


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
    goDelegatedResources = () => {
		this.props.history.push("/DelegatedResources")
    }
    goSmartContractAccount = () => {
        this.props.history.push("/smartContractAccount")
    }
    goConnectLedger = () => {
        this.props.history.push("/connectLedger")
    } 

	render() {
		return (
			<div className="dashboard-container">
				<div className="dashboard-body-section">
                    <div className="advanced-section">
                        <div className="advanced-title">Advanced</div>
                        <AdvancedMainCard history={this.props.history} />
                    </div>
                </div>
                {/* <Balance /> */}
            </div>
		)
	}
}

Advanced.propTypes = {

}

Advanced.defaultProps = {

}

export default Advanced
