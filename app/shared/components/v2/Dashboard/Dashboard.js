
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
import ImportAccountModal from "./Modals/ImportAccountModal/ImportAccountModal"
import BuyWaxModal from "./Modals/BuyWaxModal/BuyWaxModal"
import CreateAccountModal from "./Modals/CreateAccountModal/CreateAccountModal"
import SellAssetModal from "./Modals/SellAssetModal/SellAssetModal"
import TrendingAssets from "./TrendingAssets/TrendingAssets"
import RecommendedApps from "./RecommendedApps/RecommendedApps"
import Balance from "./Balance/Balance"
import "./Dashboard.global.css"

const initialState = {
	dashboardTokenModal: false,
	resourcesModal: false,
	delegateModal: false,
	cryptoModal: false,
	swapTokenModal: false,
	importAccountModal: false,
	buyWaxModal: false,
	createAccountModal: false,
	sellAssetModal: false,
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
	toggleImportAccountModal = () => {
		const { importAccountModal } = this.state
		this.setState({ importAccountModal : !importAccountModal })
	}
	toggleBuyWaxModal = () => {
		const { buyWaxModal } = this.state
		this.setState({ buyWaxModal : !buyWaxModal })
	}
	toggleCreateAccountModal = () => {
		const { createAccountModal } = this.state
		this.setState({ createAccountModal : !createAccountModal })
	}
	toggleSellAssetModal = () => {
		const { sellAssetModal } = this.state
		this.setState({ sellAssetModal  : !sellAssetModal })
	}
	toggleCryptoModal = () => {
		const { cryptoModal } = this.state
		this.setState({ cryptoModal : !cryptoModal })
	}
	goStaking = () => {
		this.props.history.push("/advanced")
	}
	
	render() {
		const { dashboardTokenModal, resourcesModal, delegateModal, cryptoModal, swapTokenModal, importAccountModal, buyWaxModal, createAccountModal, sellAssetModal  } = this.state
		const { wallet, actions, history, location, tokens } = this.props
		return (
			<div className="dashboard-container">
				<div className="dashboard-body-section">
					<TrendingAssets history={history} />
					<RecommendedApps />
					<div className="token-ntfs-section">
						<div className="right-badge">
							<img src={require('../../../../renderer/assets/images/dashboard/Group1737.png')} onClick={this.goStaking} />
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
				<ImportAccountModal
					closeModal={this.toggleImportAccountModal}
					modalOpen={importAccountModal}
					history={history}
					actions={actions}
					location={location}
				/>
				<BuyWaxModal
					closeModal={this.toggleBuyWaxModal}
					modalOpen={buyWaxModal}
					history={history}
					actions={actions}
					location={location}
				/>
				<CreateAccountModal
					closeModal={this.toggleCreateAccountModal}
					modalOpen={createAccountModal}
					history={history}
					actions={actions}
					location={location}
				/>
				<SellAssetModal
					closeModal={this.toggleSellAssetModal}
					modalOpen={sellAssetModal}
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
