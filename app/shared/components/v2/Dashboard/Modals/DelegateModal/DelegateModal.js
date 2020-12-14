import React from "react"
import PropTypes from "prop-types"
import { Decimal } from "decimal.js"
import { Dropdown, Modal, Form, Input } from "semantic-ui-react"

import "./DelegateModal.global.css"

const options = [
	{ key: 1, text: 'CPU', value: 1 },
	{ key: 2, text: 'Net', value: 2 },
]

class DelegateModal extends React.Component {
	constructor(props) {
		super(props)
		const { accounts, settings } = props;
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
			delegateAmt: "",
			delegationItem: 1,
			delegationTo: "",
			cpuOriginal: Decimal(parsedCpuWeight),
			netOriginal: Decimal(parsedNetWeight),
			errorMsg: "",
		}
	}

	onSubmit = () => {
		const { delegateAmt, delegationItem, netOriginal, cpuOriginal, delegationTo } = this.state;

		if (!delegateAmt) {
			this.setState({
				errorMsg: "This form can't be blink"
			})
			return false;
		}
	
		const decimalAmt = Decimal(delegateAmt);

		if (delegationItem == 1) {
			this.props.actions.setStake(delegationTo, netOriginal, cpuOriginal.plus(decimalAmt));
		} else if (delegationItem == 2) {
			this.props.actions.setStake(delegationTo, netOriginal.plus(decimalAmt), cpuOriginal);
		} 

		this.setState({
			errorMsg: "",
		})
	}

	onChange = (e, { name, value }) => {
		const newState = { [name]: value };
		this.setState(newState);
	}


	render() {
		const { modalOpen, closeModal, accounts, settings } = this.props;
		let liquidWax = accounts && accounts[settings.account] && accounts[settings.account].core_liquid_balance;
		const { delegateAmt, delegationItem, delegationTo, errorMsg } = this.state;

		return (
			<Modal
				onClose={closeModal}
				className=""
				size={"tiny"}
				open={modalOpen}
			>

				<Modal.Content className="delgateModal-body">
					<div className="modal-header">
						<span>Delegate </span>
						<span> Resources</span>
					</div>
					<div className="modal-body">
						<Form.Field
							control={Input}
							className="common-input" 
							placeholder="Account Name"
							onChange={this.onChange}
							value={delegationTo}
							name="delegationTo"
							required
						/>
						<div className="input-select">
							<Form.Field
								control={Input}
								className="common-input"
								placeholder="Enter Amount"
								name="delegateAmt"
								value={delegateAmt}
								onChange={this.onChange}
								required
							/>
							<Dropdown
								defaultValue={delegationItem}
								name="delegationItem"
								onChange={this.onChange}
								selection
								options={options}
								className="resource-choose-dropdown"
							/>
							<div className="d-title">
								<span>Liquid WAX: </span>
								<span> {liquidWax}</span>
							</div>
						</div>
						{
							(errorMsg) ? (
								<div className="warnning-alert">
									{errorMsg}
								</div>
							) : ''
						}
						<div className="delegate-btn" onClick={this.onSubmit}>
							Confirm Transaction
							<img src={require('../../../../../../renderer/assets/images/dashboard/correct3.png')} />
						</div>
					</div>

				</Modal.Content>

			</Modal>
		)
	}
}

DelegateModal.propTypes = {}

DelegateModal.defaultProps = {}

export default DelegateModal
