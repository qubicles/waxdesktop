
import React from "react"
import PropTypes from "prop-types"
import DelegateModal from "../../Dashboard/Modals/DelegateModal/DelegateModal"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio, Menu, Checkbox} from "semantic-ui-react"
import { connect } from 'react-redux';
import Balance from "../../Dashboard/Balance/Balance"
import "./DelegatedResources.global.css"

const initialState = {
	delegateModal: false,
}

class DelegatedResources extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
    }
    toggleDelegateModal = () => {
		const { delegateModal } = this.state
		this.setState({ delegateModal: !delegateModal })
	}
    goBack = () => {
		this.props.history.push("/advanced")
	}
	render() {
        const { delegateModal } = this.state
        const { wallet, actions, history, location, tokens } = this.props
		return (
			<div className="dashboard-container">
				<div className="dashboard-body-section">
                    <div className="DelegatedResources-section">
                        <div className="DelegatedResources-header">
                            <img src={require('../../../../../renderer/assets/images/advanced/down-arrow1.png')} onClick={this.goBack}/>
                        </div>
                        <div className="DelegatedResources-body">
                            <div className="w-title">
                                Delegated Resources
                            </div>
                            <div className="del-table">
                                <div className="del-table-header">
                                    <div className="header-account">Account</div>
                                    <div className="header-amount">Amount</div>
                                    <div className="header-type">Type</div>
                                    <div className="header-action"></div>
                                </div>
                                <div className="del-table-body">
                                    <div className="del-table-row">
                                        <div className="body-account">captainkarma</div>
                                        <div className="body-amount">32.0000 WAX</div>
                                        <div className="body-type">CPU</div>
                                        <div className="body-action">Undelegate</div>
                                    </div>
                                    <div className="del-table-row del-yellow-border">
                                        <div className="body-account">captainkarma</div>
                                        <div className="body-amount">32.0000 WAX</div>
                                        <div className="body-type">CPU</div>
                                        <div className="body-action">Undelegate</div>
                                    </div>
                                    <div className="del-table-row">
                                        <div className="body-account">captainkarma</div>
                                        <div className="body-amount">32.0000 WAX</div>
                                        <div className="body-type">CPU</div>
                                        <div className="body-action">Undelegate</div>
                                    </div>
                                </div>
                            </div>
                            <div className="new-permission-btn" onClick={this.toggleDelegateModal}>
                                Create New Permission
                                <img src={require('../../../../../renderer/assets/images/advanced/Group1730.png')} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Balance /> */}
                <DelegateModal
					closeModal={this.toggleDelegateModal}
					modalOpen={delegateModal}
					history={history}
					actions={actions}
					location={location}
				/>
            </div>
		)
	}
}
DelegatedResources.propTypes = {

}

DelegatedResources.defaultProps = {

}

export default DelegatedResources
