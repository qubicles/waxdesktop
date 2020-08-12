
import React from "react"
import PropTypes from "prop-types"
import { Divider, Tab, Dropdown } from "semantic-ui-react"
import { connect } from 'react-redux';

import DashboardTokenModal from "./Modals/TokenModal/DashboardTokenModal"
import TabPanes from './TabPanes/TabPanes'
import ResourcesModal from "./Modals/ResourcesModal/ResourcesModal"
import DelegateModal from "./Modals/DelegateModal/DelegateModal"
import CryptoModal from "./Modals/CryptoModal/CryptoModal"
import SwapTokenModal from "./Modals/SwapTokenModal/SwapTokenModal"
import "./Dashboard.global.css"

const initialState = {
	dashboardTokenModal: false,
	resourcesModal: false,
	delegateModal: false,
	cryptoModal: false,
	swapTokenModal: false,
}

class Home extends React.Component {
	constructor(props) {
		super(props)
		this.state = initialState
	}

	toggleDashboardTokenModal = () => {
		const { dashboardTokenModal, resourcesModal } = this.state
		this.setState({
			dashboardTokenModal: !dashboardTokenModal,
		})
	}
	toggleResourcesModal = () => {
		const { resourcesModal } = this.state
		this.setState({ resourcesModal: !resourcesModal })
	}
	toggleDelegateModal = () => {
		const { delegateModal } = this.state
		this.setState({ delegateModal: !delegateModal })
	}
	toggleCryptoModal = () => {
		const { cryptoModal } = this.state
		this.setState({ cryptoModal : !cryptoModal })
	}
	toggleSwapTokenModal = () => {
		const { swapTokenModal } = this.state
		this.setState({ swapTokenModal : !swapTokenModal })
	}

	render() {
		const { dashboardTokenModal, resourcesModal, delegateModal, cryptoModal, swapTokenModal } = this.state
		const { wallet, actions, history, location, tokens } = this.props
		return (
			<div className="dashboard-container">
				<div className="dashboard-body-section">
					<TrendingAssets />
					<RecommendedApps />
					<div className="token-ntfs-section">
						<div className="right-badge">
							<img src={require('../../../../renderer/assets/images/dashboard/Group1737.png')} />
						</div>
						<TabPanes tokens={tokens} />
					</div>
				</div>
				<Balance 
					openTokenModal={this.toggleDashboardTokenModal} 
					openResourcesModal={this.toggleResourcesModal}
					openDelegateModal={this.toggleDelegateModal}	 
				/>
				<DashboardTokenModal
					closeModal={this.toggleDashboardTokenModal}
					modalOpen={dashboardTokenModal}
					history={history}
					actions={actions}
					location={location}
				/>
				<ResourcesModal
					closeModal={this.toggleResourcesModal}
					modalOpen={resourcesModal}
					history={history}
					actions={actions}
					location={location}
				/>
				<DelegateModal
					closeModal={this.toggleDelegateModal}
					modalOpen={delegateModal}
					history={history}
					actions={actions}
					location={location}
				/>
				<CryptoModal
					closeModal={this.toggleCryptoModal}
					modalOpen={cryptoModal}
					history={history}
					actions={actions}
					location={location}
				/>
				<SwapTokenModal
					closeModal={this.toggleSwapTokenModal}
					modalOpen={swapTokenModal}
					history={history}
					actions={actions}
					location={location}
				/>
			</div>

		)
	}
}

Home.propTypes = {

}

Home.defaultProps = {

}

function mapStateToProps(state) {
	return {
		tokens: state.tokens
	};
}


export default connect(mapStateToProps)(Home)
