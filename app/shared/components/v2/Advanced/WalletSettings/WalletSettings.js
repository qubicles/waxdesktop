
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio, Menu, Checkbox} from "semantic-ui-react"
import { connect } from 'react-redux';
import Balance from "../../Dashboard/Balance/Balance"
import "./WalletSettings.global.css"

class WalletSettings extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
    }
    goBack = () => {
		this.props.history.push("/advanced")
	}
	render() {
		return (
			<div className="dashboard-container">
				<div className="dashboard-body-section">
                    <div className="walletSettings-section">
                        <div className="walletSettings-header">
                            <img src={require('../../../../../renderer/assets/images/advanced/down-arrow1.png')} onClick={this.goBack}/>
                            <div className="delegate-btn">
                                Confirm Changes
                                <img src={require('../../../../../renderer/assets/images/advanced/correct2.png')} />
                            </div>
                        </div>
                        <div className="walletSettings-body">
                            <div className="w-title">
                                Wallet Settings
                            </div>
                            <div className="w-form">
                                <div className="seller-input">
                                    <div className="input-title">Default Block Explorer</div>
                                    <input type="text" className="common-input" placeholder="Bolks.io" />
                                </div>
                                <div className="seller-input">
                                    <div className="input-title">Default IPFS Node</div>
                                    <input type="text" className="common-input" placeholder="ipfs.was.miami" />
                                </div>
                                <div className="seller-input">
                                    <div className="input-title">IPFS Port</div>
                                    <input type="text" className="common-input" placeholder="5002" />
                                </div>
                                <div className="seller-input">
                                    <div className="input-title">Language</div>
                                    <input type="text" className="common-input" placeholder="English" />
                                </div>
                                <div className="seller-input">
                                    <div className="input-title">Lock Wallet Automatically When Inactive</div>
                                    <input type="text" className="common-input" placeholder="Disable automatic locking" />
                                </div>
                                <div className="seller-input">
                                    <div className="input-title">Show Warning When Clicking Links to External Sites</div>
                                    <input type="text" className="common-input" placeholder="Disable automatic locking" />
                                </div>
                                <div className="seller-input">
                                    <div className="input-title">Recalculate Voting Weight Prior To Voting</div>
                                    <input type="text" className="common-input" placeholder="Disable automatic locking" />
                                </div>
                                <div className="seller-input">
                                    <div className="input-title">Use Wax Desktop Wallet To Pay For Resources</div>
                                    <input type="text" className="common-input" placeholder="No" />
                                </div>
                                <div className="seller-input">
                                    <div className="input-title">Filter Out Spam Transters (Hide tx's below 0.005 WAX)</div>
                                    <input type="text" className="common-input" placeholder="Do not filter out spam transfers" />
                                </div>
                                <div className="seller-input">
                                    <div className="input-title">Connect To Network</div>
                                    <div className="btn-wrap">
                                        <div className="btn-left-round">
                                            WAX Mainnet
                                        </div>
                                        <div className="btn-right-round">
                                            WAX Testnet
                                        </div>
                                    </div>
                                </div>
                                <div className="seller-input w-img-wrap">
                                    <div className="input-title">Wallet API URL</div>
                                    <input type="text" className="common-input" placeholder="https://chain.wax.io" />
                                    <img src={require('../../../../../renderer/assets/images/dashboard/correct3.png')} className="w-input-img" />
                                </div>    
                                <div className="delegate-btn">
                                    Connect To Server
                                </div>                       
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Balance /> */}
            </div>
		)
	}
}

WalletSettings.propTypes = {

}

WalletSettings.defaultProps = {

}

export default WalletSettings
