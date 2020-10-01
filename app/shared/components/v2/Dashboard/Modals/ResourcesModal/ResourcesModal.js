import React from "react"
import PropTypes from "prop-types"
import { Modal, Button, Tab, Dropdown, Menu } from "semantic-ui-react"
import Decimal from "decimal.js";

import "./ResourcesModal.global.css"
import CustomProgressBar from "../../CustomProgressBar/CustomProgressBar"
import settings from "../../../../../actions/settings";

const options = [
	{ key: 1, text: 'CPU', value: 1 },
	{ key: 2, text: 'Net', value: 2 },
	{ key: 3, text: 'RAM', value: 3 },
]

class ResourcesModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
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


	render() {
		const { modalOpen, closeModal, accounts, settings } = this.props;
		const account = accounts[settings.account];
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
					percent={cpuUsage.toFixed(2)}
					innerLabel={Decimal(parsedCpuWeight).toFixed(2)}
					settings={settings}
				/>
				<CustomProgressBar
					label="NET"
					statusColor="yellow"
					percent={netUsage.toFixed(2)}
					innerLabel={Decimal(parsedNetWeight).toFixed(2)}
					settings={settings}
				/>
				<CustomProgressBar
					label="RAM"
					statusColor="green"
					percent={ramUsage.toFixed(2)}
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
					<div className="resource-choose-section">
						<Dropdown
							defaultValue={1}
							selection
							options={options}
							className="resource-choose-dropdown"
						/>
						<div className="input-button-wrap">
							<input type="text" className="common-input" placeholder="Amount Of WAX" />
							<div className="circle-btn-wrap">
								<img src={require('../../../../../../renderer/assets/images/dashboard/correct2.png')} />
							</div>
						</div>
					</div>
					<div className="resources-delegate-link">
						DELEGATE RESOURCES
								</div>
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
							defaultValue="CPU"
							selection
							options={options}
							className="resource-choose-dropdown"
						/>
						<div className="input-button-wrap">
							<input type="text" className="common-input" placeholder="Amount Of WAX" />
							<div className="circle-btn-wrap">
								<img src={require('../../../../../../renderer/assets/images/dashboard/correct2.png')} />
							</div>
						</div>
					</div>
				</Tab.Pane>,
			},
		]

		const TabExampleSecondaryPointing = () => (
			<Tab menu={{ secondary: true, pointing: true }} panes={panes} />
		)

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
					<TabExampleSecondaryPointing
						cpuUsage={cpuUsage}
						netUsage={netUsage}
						ramUsage={ramUsage}
					/>
				</Modal.Content>

			</Modal>
		)
	}
}

ResourcesModal.propTypes = {}

ResourcesModal.defaultProps = {}

export default ResourcesModal
