
import React from "react"
import PropTypes from "prop-types"
import { Divider, Tab, Dropdown } from "semantic-ui-react"
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

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

import * as GlobalsActions from "../../../actions/globals";
import * as AccountActions from "../../../actions/accounts";
import * as SettingsActions from '../../../actions/settings';
import StatsFetcher from "../../../utils/StatsFetcher";
import { isArray } from 'util';
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

	componentDidMount = async () => {
		const {
			actions,
			settings
		} = this.props;

		const {
			addCustomToken,
			getCustomTokensRemote,
			getCurrencyBalance
		} = actions;

		const remoteTokensResult = await getCustomTokensRemote();
		if (remoteTokensResult && remoteTokensResult.payload && isArray(remoteTokensResult.payload)) {
			for (var i = 0; i < remoteTokensResult.payload.length; i++) {
				const remoteToken = remoteTokensResult.payload[i];
				if (remoteToken.chain.toUpperCase() == settings.blockchain.tokenSymbol) {
					const tokenTracked = settings.customTokens.filter((t) => t.split(':')[0] == remoteToken.account)[0];
					if (!tokenTracked) {
						await addCustomToken(remoteToken.account, remoteToken.symbol);
					}
				}
			};
		}

		getCurrencyBalance(settings.account)

		this.tick();
		this.interval = setInterval(this.tick.bind(this), 30000);
	}

	componentWillUnmount() {
		clearInterval(this.interval);
	}

	tick() {
		const {
			actions,
			settings
		} = this.props;
		const {
			getPriceFeed,
			getPriceFeedGecko,
		} = actions;

		if (settings.blockchain.tokenSymbol === "WAX") {
			getPriceFeedGecko("WAX", "USD", settings.blockchain.tokenSymbol);
		}
		else {
			getPriceFeedGecko(settings.blockchain.tokenSymbol, "USD");
		}
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
		this.setState({ cryptoModal: !cryptoModal })
	}
	toggleSwapTokenModal = () => {
		const { swapTokenModal } = this.state
		this.setState({ swapTokenModal: !swapTokenModal })
	}
	toggleImportAccountModal = () => {
		const { importAccountModal } = this.state
		this.setState({ importAccountModal: !importAccountModal })
	}
	toggleBuyWaxModal = () => {
		const { buyWaxModal } = this.state
		this.setState({ buyWaxModal: !buyWaxModal })
	}
	toggleCreateAccountModal = () => {
		const { createAccountModal } = this.state
		this.setState({ createAccountModal: !createAccountModal })
	}
	toggleSellAssetModal = () => {
		const { sellAssetModal } = this.state
		this.setState({ sellAssetModal: !sellAssetModal })
	}
	toggleCryptoModal = () => {
		const { cryptoModal } = this.state
		this.setState({ cryptoModal: !cryptoModal })
	}
	toggleSwapTokenModal = () => {
		const { swapTokenModal } = this.state
		this.setState({ swapTokenModal : !swapTokenModal })
	}
	toggleBuyWaxModal = () => {
		const { buyWaxModal } = this.state
		this.setState({ buyWaxModal : !buyWaxModal })
	}
	toggleSellAssetModal = () => {
		const { sellAssetModal } = this.state
		this.setState({ sellAssetModal  : !sellAssetModal })
	}
	goStaking = () => {
		this.props.history.push("/staking")
	}
	
	render() {
		const { dashboardTokenModal, resourcesModal, delegateModal, cryptoModal, swapTokenModal, importAccountModal, buyWaxModal, createAccountModal, sellAssetModal } = this.state
		const { wallet, actions, history, location, settings, balances, globals } = this.props
		const statsFetcher = new StatsFetcher(settings.account, balances, settings, null, null);

		return (
			<div className="dashboard-container">
				<div className="dashboard-body-section">
					<TrendingAssets history={history} />
					<RecommendedApps />
					<div className="token-ntfs-section">
						<div className="right-badge">
							<img src={require('../../../../renderer/assets/images/dashboard/Group1737.png')} onClick={this.goStaking} />
						</div>
						<TabPanes statsFetcher={statsFetcher} />
					</div>
				</div>

				<Balance
					globals={globals}
					settings={settings}
					statsFetcher={statsFetcher}
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

const mapStateToProps = (state) => {
	return {
		balances: state.balances,
		settings: state.settings,
		globals: state.globals
	};
}

const mapDispatchToProps = (dispatch) => {
	return {
		actions: bindActionCreators({
			...AccountActions,
			...GlobalsActions,
			...SettingsActions
		}, dispatch)
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);


// export default connect(mapStateToProps)(Home)
