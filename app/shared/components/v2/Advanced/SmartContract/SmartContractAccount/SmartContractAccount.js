
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio, Menu, Checkbox} from "semantic-ui-react"
import { connect } from 'react-redux';
import Balance from "../../../Dashboard/Balance/Balance"
import "./SmartContractAccount.global.css"

class SmartContractAccount extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
    }
    goBack = () => {
		this.props.history.push("/advanced")
    }
    goSmartContracts = () => {
        this.props.history.push("/smartContractActions")
    }
	render() {
		return (
			<div className="dashboard-container">
				<div className="dashboard-body-section">
                    <div className="smartContractAccount-section">
                        <div className="smartContractAccount-header">
                            <img src={require('../../../../../../renderer/assets/images/advanced/down-arrow1.png')} onClick={this.goBack}/>
                        </div>
                        <div className="smartContractAccount-body">
                            <div className="w-title">
                                Smart Contracts
                            </div>
                            <div className="seller-input">
                                <div className="input-title">Contract Account Name</div>
                                <input type="text" className="common-input" placeholder="Enter contract name here" />
                            </div>
                            <div className="delegate-btn" onClick={this.goSmartContracts}>
                                Load Contract
                                <img src={require('../../../../../../renderer/assets/images/advanced/correct2.png')} />
                            </div>
                        </div>
                    </div>
                </div>
                <Balance />
            </div>
		)
	}
}
SmartContractAccount.propTypes = {

}

SmartContractAccount.defaultProps = {

}

export default SmartContractAccount
