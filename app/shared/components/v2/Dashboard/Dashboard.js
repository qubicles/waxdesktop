
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
import "./Dashboard.global.css"

const initialState = {
	dashboardTokenModal: false,
	resourcesModal: false,
	delegateModal: false,
	cryptoModal: false,
	swapTokenModal: false,
	importAccountModal: false,
}
const accountOption = [
	{
	  text: 'Import Account',
	  value: 'Import Account',
	  image: { avatar: true, src: '../assets/images/dashboard/dashboard-import.png' },
	},
	{
	  text: 'Create Account',
	  value: 'Create Account',
	  image: { avatar: true, src: '../assets/images/dashboard/dashboard-create.png' },
	},
	{
	  text: 'willquigley',
	  value: 'willquigley',
	  image: { avatar: true, src: '../assets/images/dashboard/ScrollGroup6.png' },
	},
	{
	  text: 'dloyt.yes',
	  value: 'dloyt.yes',
	  image: { avatar: true, src: '../assets/images/dashboard/ScrollGroup6.png' },
	},
	{
	  text: 'elhfo.wam',
	  value: 'elhfo.wam',
	  image: { avatar: true, src: '../assets/images/dashboard/ScrollGroup6.png' },
	},
]

const DropdownExampleSelection = () => (
	<Dropdown
		placeholder='Select Account'
		fluid
		selection
		scrolling
		upward
		options={accountOption}
		className="left-nav-dropdown"
	/>
)

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
		this.setState({ resourcesModal : !resourcesModal })
	}
	toggleDelegateModal = () => {
		const { delegateModal } = this.state
		this.setState({ delegateModal : !delegateModal })
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

	render() {
		const { dashboardTokenModal, resourcesModal, delegateModal, cryptoModal, swapTokenModal, importAccountModal } = this.state
		const { wallet, actions, history, location, tokens } = this.props
		return (
			<div className="dashboard-container">
				<div className="nav-section">
					<div className="logo-section">
						<div className="logo-img-wrap">
							<div className="logo-rect2-wrap">
								<div className="logo-rect2"></div>
							</div>
							<div className="logo-rect1-wrap">
								<div className="logo-rect1"></div>
							</div>
						</div>
						<div className="logo-text-wrap">
							<h3 className="pin-wax">WAX</h3>
							<h4 className="pin-desktop">D E S K T O P</h4>
						</div>
					</div>
					<div className="nav-items-section">
						<div className="nav-item-wrap">
							<img src={require('../../../../renderer/assets/images/dashboard/dashboard-home.png')} />
							<div className="nav-item-title">
								Home
							</div>
						</div>
						<div className="nav-item-wrap">
							<img src={require('../../../../renderer/assets/images/dashboard/dashboard-market.png')} />
							<div className="nav-item-title">
								Market
							</div>
						</div>
						<div className="nav-item-wrap">
							<img src={require('../../../../renderer/assets/images/dashboard/dashboard-apps.png')} />
							<div className="nav-item-title">
								Apps
							</div>
						</div>
						<div className="nav-item-wrap">
							<img src={require('../../../../renderer/assets/images/dashboard/dashboard-stacking.png')} />
							<div className="nav-item-title">
								Staking
							</div>
						</div>
						<div className="nav-item-wrap">
							<img src={require('../../../../renderer/assets/images/dashboard/dashboard-guilds.png')} />
							<div className="nav-item-title">
								Guilds
							</div>
						</div>
						<div className="nav-item-wrap">
							<img src={require('../../../../renderer/assets/images/dashboard/dashabord-advanced.png')} />
							<div className="nav-item-title">
								Advanced
							</div>
						</div>
					</div>
					<div className="nav-select-section">
						<DropdownExampleSelection />
					</div>
				</div>
				<div className="dashboard-body-section">
					<div className="trending-assets-section">
						<div className="trending-assets-header">
							<div className="trending-assets-title">Trending Assets</div>
							<div className="trending-assets-view">View Market</div>
						</div>
						<div className="trending-assets-body">
							<div className="trending-assets-card">
								<img src={require('../../../../renderer/assets/images/dashboard/dallas141.png')} />
								<div className="t-card-title">King Kao</div>
								<div className="t-card-author">theonlykarma</div>
								<div className="t-card-price">
									<img src={require('../../../../renderer/assets/images/dashboard/Group47.png')} />
									<div className="t-card-des">
										25,000 KARMAR
									</div>
								</div>
								<button className="trending-view-button">View Market</button>
							</div>
							<div className="trending-assets-card">
								<img src={require('../../../../renderer/assets/images/dashboard/dallas141.png')} />
								<div className="t-card-title">King Kao</div>
								<div className="t-card-author">theonlykarma</div>
								<div className="t-card-price">
									<img src={require('../../../../renderer/assets/images/dashboard/Group47.png')} />
									<div className="t-card-des">
										25,000 KARMAR
									</div>
								</div>
								<button className="trending-view-button">View Market</button>
							</div>
							<div className="trending-assets-card">
								<img src={require('../../../../renderer/assets/images/dashboard/dallas141.png')} />
								<div className="t-card-title">King Kao</div>
								<div className="t-card-author">theonlykarma</div>
								<div className="t-card-price">
									<img src={require('../../../../renderer/assets/images/dashboard/Group47.png')} />
									<div className="t-card-des">
										25,000 KARMAR
									</div>
								</div>
								<button className="trending-view-button">View Market</button>
							</div>
							<div className="trending-assets-card">
								<img src={require('../../../../renderer/assets/images/dashboard/dallas141.png')} />
								<div className="t-card-title">King Kao</div>
								<div className="t-card-author">theonlykarma</div>
								<div className="t-card-price">
									<img src={require('../../../../renderer/assets/images/dashboard/Group47.png')} />
									<div className="t-card-des">
										25,000 KARMAR
									</div>
								</div>
								<button className="trending-view-button">View Market</button>
							</div>
							<div className="trending-assets-card">
								<img src={require('../../../../renderer/assets/images/dashboard/dallas141.png')} />
								<div className="t-card-title">King Kao</div>
								<div className="t-card-author">theonlykarma</div>
								<div className="t-card-price">
									<img src={require('../../../../renderer/assets/images/dashboard/Group47.png')} />
									<div className="t-card-des">
										25,000 KARMAR
									</div>
								</div>
								<button className="trending-view-button">View Market</button>
							</div>
						</div>
					</div>
					<div className="recommended-apps-section">
						<div className="recommended-apps-header">
							<div className="recommended-apps-title">Recommended Apps</div>
							<img src={require('../../../../renderer/assets/images/dashboard/Group1737.png')} />
						</div>
						<div className="recommended-apps-body">
							<div className="recommended-apps-card">
								<img src={require('../../../../renderer/assets/images/dashboard/ScrollGroup1.png')} />
								<div className="app-title">KARMAR</div>
							</div>
							<div className="recommended-apps-card">
								<img src={require('../../../../renderer/assets/images/dashboard/ScrollGroup2.png')} />
								<div className="app-title">Newdex</div>
							</div>
							<div className="recommended-apps-card">
								<img src={require('../../../../renderer/assets/images/dashboard/ScrollGroup4.png')} />
								<div className="app-title">KARMAR</div>
							</div>
							<div className="recommended-apps-card">
								<img src={require('../../../../renderer/assets/images/dashboard/ScrollGroup5.png')} />
								<div className="app-title">KARMAR</div>
							</div>
							<div className="recommended-apps-card">
								<img src={require('../../../../renderer/assets/images/dashboard/Group209.png')} />
								<div className="app-title">KARMAR</div>
							</div>
						</div>
					</div>
					<div className="token-ntfs-section">
						<div className="right-badge">
							<img src={require('../../../../renderer/assets/images/dashboard/Group1737.png')} />
						</div>
						<TabPanes tokens={tokens} />
					</div>
				</div>
				<div className="balance-section">
					<div className="balance-chart-container">
						<div className="balance-total">
							<h4>Total Balance</h4>
							<div className="balance-percent">
								+3.49%
							</div>
						</div>
						<h2>$12,184.62</h2>
						<div className="chart-img">
							<img src={require('../../../../renderer/assets/images/dashboard/Group1733.png')} />
						</div>
						<div className="chart-button-group">
							<div className="chart-white-btn">1D</div>
							<div className="chart-white-btn">1W</div>
							<div className="chart-white-btn">1M</div>
							<div className="chart-orange-btn">All</div>
						</div>
						<div className="send-btn-wrap">
							<div className="dashboard-send-btn">
								<h3>Send</h3>
								<img src={require('../../../../renderer/assets/images/dashboard/arrow1.png')} />
							</div>
						</div>
						<div className="send-btn-wrap">
							<div className="dashboard-send-btn" onClick={this.toggleDashboardTokenModal}>
								<h3>Receive</h3>
								<img src={require('../../../../renderer/assets/images/dashboard/iconfinder263.png')} />
							</div>
						</div>
					</div>
					<div className="balance-button-group">
						<div className="balance-button-wrap">
							<div className="balance-button-title">
								Buy WAX
							</div>
							<img src={require('../../../../renderer/assets/images/dashboard/credit-card2.png')} />
						</div>
						<div className="balance-button-wrap">
							<div className="balance-button-title" onClick={this.toggleSwapTokenModal}>
								Swap Tokens
							</div>
							<img src={require('../../../../renderer/assets/images/dashboard/Group1734.png')} />
						</div>
						<div className="balance-button-wrap">
							<div className="balance-button-title" onClick={this.toggleResourcesModal}>
								Resources
							</div>
							<img src={require('../../../../renderer/assets/images/dashboard/Group15.png')} />
						</div>
					</div>
				</div>
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
