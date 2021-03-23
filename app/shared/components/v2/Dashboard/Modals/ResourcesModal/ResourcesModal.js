import React from "react"
import PropTypes from "prop-types"
import { Modal, Button, Tab, Dropdown, Menu, Form, Input } from "semantic-ui-react"
import { Decimal } from "decimal.js";
import showSweetAlert from "../../../../../utils/SweetAlert";

import "./ResourcesModal.global.css"
import CustomProgressBar from "../../CustomProgressBar/CustomProgressBar"
import settings from "../../../../../actions/settings";
import calculateAmountOfRam from '../../../../helpers/calculateAmountOfRam';

const options = [
	{ key: 1, text: 'CPU', value: 1 },
	{ key: 2, text: 'Net', value: 2 },
	{ key: 3, text: 'RAM', value: 3 },
]

class ResourcesModal extends React.Component {
	constructor(props) {
		super(props)
		let { accounts, settings, actions } = props;
		let account = accounts[settings.account];
		if (!account) account = {};
		const {
			cpu_weight,
			net_weight
		} = account.self_delegated_bandwidth || {
			cpu_weight: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol,
			net_weight: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol
		};

		const parsedCpuWeight = cpu_weight.split(' ')[0];
		const parsedNetWeight = net_weight.split(' ')[0];

		this.state = {
			accountName: account.account_name,
			amountValStake: "",
			selectItemStake: 1,
			amountValUnstake: "",
			selectItemUnstake: 1,
			cpuOriginal: Decimal(parsedCpuWeight),
			netOriginal: Decimal(parsedNetWeight),
			errorMsg: "",
		}
		actions.getRamStats();
	}
	onSubmit = () => {
		const { amountValStake, selectItemStake, netOriginal, cpuOriginal, accountName } = this.state;
		if (!amountValStake) {
			this.setState({
				errorMsg: "This form can't be blink"
			})
			return false;
		}
		const decimalAmountStake = Decimal(amountValStake);
		if (selectItemStake == 1) {
			this.props.actions.setStake(accountName, netOriginal, cpuOriginal.plus(decimalAmountStake)).then((results) => {
				this.showAlert(results);
			});
		} else if (selectItemStake == 2) {
			this.props.actions.setStake(accountName, netOriginal.plus(decimalAmountStake), cpuOriginal).then((results) => {
				this.showAlert(results);
			});
		} else {
			this.props.actions.buyram(decimalAmountStake).then((results) => {
				this.showRamAlert(results);
			});
		}
		this.setState({
			errorMsg: "",
		})
	}
	onSubmit1 = () => {
		const { amountValUnstake, selectItemUnstake, netOriginal, cpuOriginal, accountName, errorMsg } = this.state;
		if (!amountValUnstake) {
			this.setState({
				errorMsg: "This form can't be blink"
			})
			return false;
		}
		const decimalAmountUnstake = Decimal(amountValUnstake);
		if (selectItemUnstake == 1) {
			this.props.actions.setStake(accountName, netOriginal, cpuOriginal.minus(decimalAmountUnstake)).then((results) => {
				this.showAlert(results);
			});
		} else if (selectItemUnstake == 2) {
			this.props.actions.setStake(accountName, netOriginal.minus(decimalAmountUnstake), cpuOriginal).then((results) => {
				this.showAlert(results);
			});
		} else {
			const { globals } = this.props;
			const decPrice = Decimal(amountValUnstake);
			const decBaseBal = Decimal(globals.ram.base_balance);
			const decQuoteBal = Decimal(globals.ram.quote_balance);
			let amountOfRam = 0;
			if (decPrice.greaterThan(0)) {
				const decAmount = calculateAmountOfRam(decBaseBal, decQuoteBal, decPrice);
				amountOfRam = decAmount.floor();
			}
			this.props.actions.sellram(amountOfRam).then((results) => {
				this.showRamAlert(results);
			});
		}
		this.setState({
			errorMsg: "",
		})
	}

	showAlert = (results) => {
		const { blockExplorers, settings } = this.props;
		let blockExplorer = blockExplorers[settings.blockExplorer];
		let urlPartsWithoutVariable;
		let generatedLink;

		if (results.type == 'SYSTEM_STAKE_SUCCESS') {
			if (blockExplorer && blockExplorer['txid']) {
				urlPartsWithoutVariable = blockExplorer['txid'].split('txid');
				generatedLink = `${urlPartsWithoutVariable[0]}${results.payload.tx.transaction_id}${urlPartsWithoutVariable[1]}`;
			}

			const expLink = `<a href="${generatedLink}" target="_blink"> ${results.payload.tx.transaction_id.substr(0, 8)}...${results.payload.tx.transaction_id.substr(-8)}</a>`;
			showSweetAlert(
				"success",
				expLink
			);
		} else {
			showSweetAlert(
				"error",
				"Error occurred. try again."
			)
		}
	}

	showRamAlert = (results) => {
		const { blockExplorers, settings } = this.props;
		let blockExplorer = blockExplorers[settings.blockExplorer];
		let urlPartsWithoutVariable;
		let generatedLink;

		if (results.type == 'SYSTEM_SELLRAM_SUCCESS' || results.type == 'SYSTEM_BUYRAM_SUCCESS') {
			if (blockExplorer && blockExplorer['txid']) {
				urlPartsWithoutVariable = blockExplorer['txid'].split('txid');
				generatedLink = `${urlPartsWithoutVariable[0]}${results.payload.tx.transaction_id}${urlPartsWithoutVariable[1]}`;
			}

			const expLink = `<a href="${generatedLink}" target="_blink"> ${results.payload.tx.transaction_id.substr(0, 8)}...${results.payload.tx.transaction_id.substr(-8)}</a>`;
			showSweetAlert(
				"success",
				expLink
			);
		} else {
			showSweetAlert(
				"error",
				"Error occurred. try again."
			)
		}
	}

	onChange = (e, { name, value, valid }) => {
		const newState = { [name]: value };
		this.setState(newState);
	}
	resourceUsage = (account) => {
		const {
			cpu_limit,
			net_limit,
			ram_quota,
			ram_usage
		} = account;

		let cpuUsage;
		let netUsage;
		if (cpu_limit) {
			const { max, used } = cpu_limit;
			cpuUsage = Math.min(100, (Decimal((used / max) * 100)));
		}

		if (net_limit) {
			const { max, used } = net_limit;
			netUsage = Math.min(100, (Decimal((used / max) * 100)));
		}
		let ramUsage;
		if (ram_quota && ram_usage) {
			ramUsage = Math.min(100, (Decimal((ram_usage / ram_quota) * 100)));
		}

		return {
			cpuUsage,
			netUsage,
			ramUsage
		};
	}

	TabExampleSecondaryPointing = (panes) => {
		return (
			<Tab menu={{ secondary: true, pointing: true }} panes={panes} />
		)
	}

	render() {
		const { modalOpen, closeModal, accounts, settings } = this.props;
		const { amountValStake, selectItemStake, amountValUnstake, selectItemUnstake, error, errorMsg } = this.state;
		let account = accounts[settings.account];
		if (!account) account = {};
		const { cpuUsage, netUsage, ramUsage } = this.resourceUsage(account);

		const {
			cpu_weight,
			net_weight
		} = account.self_delegated_bandwidth || {
			cpu_weight: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol,
			net_weight: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol
		};
		const parsedCpuWeight = cpu_weight.split(' ')[0];
		const parsedNetWeight = net_weight.split(' ')[0];

		const ResourceUsageStats = ({ cpuUsage, netUsage, ramUsage, parsedCpuWeight, parsedNetWeight, settings }) => (
			<React.Fragment>
				<CustomProgressBar
					label="CPU"
					statusColor="red"
					percent={cpuUsage ? cpuUsage.toFixed(2) : 0}
					innerLabel={Decimal(parsedCpuWeight).toFixed(2)}
					settings={settings}
				/>
				<CustomProgressBar
					label="NET"
					statusColor="yellow"
					percent={netUsage ? netUsage.toFixed(2) : 0}
					innerLabel={Decimal(parsedNetWeight).toFixed(2)}
					settings={settings}
				/>
				<CustomProgressBar
					label="RAM"
					statusColor="green"
					percent={ramUsage ? ramUsage.toFixed(2) : 0}
					innerLabel="0"
					settings={settings}
				/>
			</React.Fragment>
		)

		const panes = [
			{
				menuItem: 'Stake',
				render: () => <Tab.Pane attached={false}>
					<ResourceUsageStats
						cpuUsage={cpuUsage}
						netUsage={netUsage}
						ramUsage={ramUsage}
						parsedCpuWeight={parsedCpuWeight}
						parsedNetWeight={parsedNetWeight}
						settings={settings}
					/>
					{/* <Form> */}
					<div className="resource-choose-section">
						<Dropdown
							defaultValue={selectItemStake}
							name="selectItemStake"
							selection
							options={options}
							className="resource-choose-dropdown"
							onChange={this.onChange}
						/>
						<div className="input-button-wrap">
							<Form.Field
								className="common-input-wrap"
								control={Input}
								name="amountValStake"
								placeholder="Amount Of WAX"
								value={amountValStake}
								onChange={this.onChange}
								required
							/>
							<div className="circle-btn-wrap" onClick={this.onSubmit}>
								<img src={require('../../../../../../renderer/assets/images/dashboard/correct2.png')} />
							</div>
						</div>
					</div>
					{
						(errorMsg) ? (
							<div className="warnning-alert">
								{errorMsg}
							</div>
						) : ''
					}
					<div className="resources-delegate-link">
						DELEGATE RESOURCES
						</div>
					{/* </Form> */}
				</Tab.Pane>,
			},
			{
				menuItem: 'Unstake',
				render: () => <Tab.Pane attached={false}>
					<ResourceUsageStats
						cpuUsage={cpuUsage}
						netUsage={netUsage}
						ramUsage={ramUsage}
						parsedCpuWeight={parsedCpuWeight}
						parsedNetWeight={parsedNetWeight}
						settings={settings}
					/>
					<div className="resource-choose-section">
						<Dropdown
							defaultValue={selectItemUnstake}
							name="selectItemUnstake"
							selection
							options={options}
							className="resource-choose-dropdown"
							onChange={this.onChange}
						/>
						<div className="input-button-wrap">
							<Form.Field
								className="common-input-wrap"
								control={Input}
								name="amountValUnstake"
								placeholder="Amount Of WAX"
								value={amountValUnstake}
								onChange={this.onChange}
								required
							/>
							<div className="circle-btn-wrap" onClick={this.onSubmit1}>
								<img src={require('../../../../../../renderer/assets/images/dashboard/correct2.png')} />
							</div>
						</div>
					</div>
					{
						(errorMsg) ? (
							<div className="warnning-alert">
								{errorMsg}
							</div>
						) : ''
					}
				</Tab.Pane>,
			},
		]

		return (
			<Modal
				onClose={closeModal}
				className="resourcesModal"
				size={"tiny"}
				open={modalOpen}
			>


				<Modal.Content
					className="resourceModal-body"
				>
					{this.TabExampleSecondaryPointing(panes)}
				</Modal.Content>

			</Modal>
		)
	}
}

ResourcesModal.propTypes = {}

ResourcesModal.defaultProps = {}

export default ResourcesModal
