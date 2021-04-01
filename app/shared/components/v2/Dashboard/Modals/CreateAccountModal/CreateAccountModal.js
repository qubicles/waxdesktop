import React from "react";
import PropTypes from "prop-types";
import { Form, Dropdown, Modal, Button } from "semantic-ui-react";
import debounce from 'lodash/debounce';
import { Decimal } from 'decimal.js';
import macaddress from 'macaddress';

import GlobalPublicKeyField from "../../../Global/Form/Field/Key/Public";
import GlobalPrivateKeyField from "../../../Global/Form/Field/Key/Private";
import GlobalAccountField from "../../../Global/Form/Field/Account";
import GlobalCPUField from "../../../Global/Form/Field/CPU";
import GlobalNETField from "../../../Global/Form/Field/NET";
import showSweetAlert from "../../../../../utils/SweetAlert";


const { PrivateKey } = require('eosjs-ecc');
const { clipboard } = require('electron');

import "./CreateAccountModal.global.css";
import { setSettings } from "../../../../../actions/settings";

const formAttributes = ['accountName', 'activePublicKey', 'activePrivateKey', 'delegatedNet', 'delegatedCpu'];


class CreateAccountModal extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			accountName: "",
			delegatedNet: 0,
			delegatedCpu: 0,
			formErrors: {},
			submitDisabled: true,
			keys: [],
		};
	}

	componentDidMount() {
		this.generateKeyPair();
	}

	componentDidUpdate(prevProps, prevStates) {
		const { keys, activePublicKey, activePrivateKey } = this.state;
		if (prevStates.keys.length !== keys.length) {
			this.setState({
				activePublicKey: keys[0].key,
				activePrivateKey: keys[1].key
			})
		}
	}

	showAlert = (results) => {
		const { blockExplorers, settings } = this.props;
		let blockExplorer = blockExplorers[settings.blockExplorer];
		let urlPartsWithoutVariable;
		let generatedLink;

		if (blockExplorer && blockExplorer['txid']) {
			urlPartsWithoutVariable = blockExplorer['txid'].split(`{txid}`);
			generatedLink = `${urlPartsWithoutVariable[0]}${results.payload.tx.transaction_id}${urlPartsWithoutVariable[1]}`;
		}

		const expLink = `<a href="${generatedLink}" target="_blink"> ${results.payload.tx.transaction_id.substr(0, 8)}...${results.payload.tx.transaction_id.substr(-8)}</a>`;
		showSweetAlert(
			"success",
			expLink
		);
	}

	generateKeyPair = () => {
		const { connection } = this.props;
		const keys = this.state.keys.slice(0);
		PrivateKey.randomKey().then(privateKey => {
			const wif = privateKey.toWif();
			const publicKey = privateKey.toPublic().toString(connection.keyPrefix);
			this.setState({ keys: [{ key: publicKey, copied: false }, { key: wif, copied: false }] })
			return keys;
		});
	}

	copyToClipboard = (value) => {
		clipboard.writeText(value);
	};

	onChange = debounce((e, { name, value, valid }) => {
		this.setState({
			submitDisabled: false,
			[name]: value
		}, () => {
			let {
				formErrors
			} = this.state;

			const {
				accountName
			} = this.state;

			const {
				actions,
				globals
			} = this.props;

			const {
				checkAccountAvailability
			} = actions;

			if (name === 'accountName' && accountName.length !== 0) {
				checkAccountAvailability(accountName);
			}

			let submitDisabled = false;

			if (!valid) {
				formErrors[name] = `invalid_${name}`;
			} else {
				formErrors[name] = null;
			}

			if (this.allFieldsHaveValidFormat()) {
				({ formErrors, submitDisabled } = this.errorsInForm(formErrors));
			} else {
				submitDisabled = true;
			}

			this.setState({
				formErrors,
				submitDisabled
			});
		});
	}, 200)


	allFieldsHaveValidFormat = () => {
		const {
			formErrors
		} = this.state;

		let validFormat = true;

		formAttributes.forEach((attribute) => {
			if (!this.state[attribute] || formErrors[attribute] === `invalid_${attribute}`) {
				validFormat = false;
			}
		});

		return validFormat;
	}

	errorsInForm = (errors, disabled) => {
		const {
			delegatedNet,
			delegatedCpu,
		} = this.state;

		const { accounts, settings } = this.props;
		const formErrors = errors;
		let submitDisabled = disabled;

		formAttributes.forEach((attribute) => {
			formErrors[attribute] = null;
		});

		if (parseFloat(delegatedCpu) === 0) {
			formErrors.delegatedCpu = 'Not enough delegated CPU for new account';
			submitDisabled = true;
		}

		if (parseFloat(delegatedNet) === 0) {
			formErrors.delegatedBw = 'Not enough delegated CPU for new account';
			submitDisabled = true;
		}
		let account = accounts[settings.account];

		if (account) {
			const {
				cpu_weight,
				net_weight
			} = account.self_delegated_bandwidth

			// const decimalBalance = Decimal(EOSbalance);
			const decimalDelegatedNet = Decimal(net_weight.split(' ')[0]);
			const decimalDelegatedCpu = Decimal(cpu_weight.split(' ')[0]);

			if (+delegatedNet > decimalDelegatedNet) {
				formErrors.delegatedBw = `Not enough balance for NET, must be in ${decimalDelegatedNet}`;
			}
			if (+delegatedCpu > decimalDelegatedCpu) {
				formErrors.delegatedCpu = `Not enough balance for CPU, must be in ${decimalDelegatedCpu}`;
			}
		}

		submitDisabled = true;
		return { formErrors };
	}

	onSubmit = (e) => {
		e.preventDefault();
		const {
			actions,
			history
		} = this.props;

		const {
			createAccount,
			createFreeAccount,
			addNewAccount,
			setSettings
		} = actions;

		const {
			accountName,
			activePublicKey,
			activePrivateKey,
			delegatedNet,
			delegatedCpu,
			submitDisabled
		} = this.state;

		if (!submitDisabled) {
			// if (this.props.accounts.allAccounts.length < 3) {
			// 	macaddress.all(function (err, all) {
			// 		debugger
			// 		const macaddresses = [];
			// 		const map = new Map();
			// 		let keys = Object.keys(all);
			// 		for (let index = 0; index < keys.length; index++) {
			// 			const mac = all[keys[index]].mac;
			// 			if (!map.has(mac) && mac != '00:00:00:00:00:00') {
			// 				map.set(mac, true);
			// 				macaddresses.push(mac);
			// 			}
			// 		}
			// 		if (macaddresses.length > 0) {
			// 			createFreeAccount(accountName, activePublicKey, activePublicKey, macaddresses)
			// 		}
			// 	});
			// } else {
			createAccount(
				accountName,
				activePublicKey,
				delegatedNet,
				delegatedCpu,
				activePublicKey
			).then(results => {
				debugger
				if (results.type == 'SYSTEM_CREATEACCOUNT_SUCCESS') {
					addNewAccount(accountName)
					setSettings('account', accountName);
					this.showAlert(results);

				} else {
					showSweetAlert(
						"error",
						"Error occurred. try again."
					)
				}
			})
			// }
		}
	}

	render() {
		const { modalOpen, closeModal, system } = this.props;
		const { formErrors, accountName, delegatedNet, delegatedCpu, keys, activePublicKey, activePrivateKey } = this.state;
		
		let { submitDisabled } = this.state;
		if (accountName &&
			accountName.length !== 0 &&
			system.ACCOUNT_AVAILABLE === 'FAILURE' &&
			system.ACCOUNT_AVAILABLE_LAST_ACCOUNT === accountName) {
			formErrors.accountName = 'Account name is not available';
			submitDisabled = true;
		}

		return (
			<Modal
				onClose={closeModal}
				size={"tiny"}
				open={modalOpen}
				centered={false}
				className="createAccountModal"
			>
				<Modal.Content className="CreateAccountModal-body">
					<div className="modal-header">
						<span>Create </span>
						<span> Account</span>
					</div>
					<div className="modal-body">
						<Form
							onSubmit={this.onSubmit}
						>
							<div className="custom-textarea-section">
								<div className="custom-textarea-label">
									Active Public Key
								</div>
								<div className="custom-textarea">
									<GlobalPublicKeyField
										name="activePublicKey"
										onChange={this.onChange}
										defaultValue={activePublicKey}
										error={formErrors["activePublicKey"]}
										onCopy={this.copyToClipboard}
									/>
								</div>
							</div>
							<div className="custom-textarea-section">
								<div className="custom-textarea-label">
									Active Private Key
								</div>
								<div className="custom-textarea">
									<GlobalPrivateKeyField
										name="activePrivateKey"
										onChange={this.onChange}
										defaultValue={activePrivateKey}
										error={formErrors["activePrivateKey"]}
										onCopy={this.copyToClipboard}
									/>
								</div>
							</div>
							<div className="custom-input-group">
								<div className="c-input-left">
									<div className="c-input-title">
										CPU
									</div>
									<GlobalCPUField
										name="delegatedCpu"
										onChange={this.onChange}
										value={delegatedCpu || ''}
										error={formErrors["delegatedCpu"]}
									/>
								</div>
								<div className="c-input-left">
									<div className="c-input-title">
										NET
									</div>
									<GlobalNETField
										name="delegatedNet"
										onChange={this.onChange}
										value={delegatedNet || ''}
										error={formErrors["delegatedNet"]}
									/>
								</div>
							</div>
							<div className="account-name-section">
								<div className="input-title">
									Account Name
								</div>
								<GlobalAccountField
									name="accountName"
									onChange={this.onChange}
									value={accountName || ''}
									error={formErrors["accountName"]}
									placeholder="12 Characters (A-Z & 1-5)"
								/>
							</div>
							<Button
								className="delegate-btn"
								fluid
								disabled={submitDisabled}
							>
								Confirm Transaction
                                <img src={require('../../../../../../renderer/assets/images/dashboard/correct3.png')} />
							</Button>
						</Form>
					</div>

				</Modal.Content>
			</Modal>
		)
	}
}

CreateAccountModal.propTypes = {}

CreateAccountModal.defaultProps = {}

export default CreateAccountModal
