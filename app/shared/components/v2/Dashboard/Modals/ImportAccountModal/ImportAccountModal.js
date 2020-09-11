import React from "react"
import PropTypes from "prop-types"
import { Form, TextArea, Dropdown, Modal } from "semantic-ui-react"

import debounce from 'lodash/debounce';

const ecc = require('eosjs-ecc');

import "./ImportAccountModal.global.css"


class ImportAccountModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			value: "",
			error: false
		}
	}

	onChange = debounce((e, { name, value }) => {
		const parsed = value.trim();
		const { actions } = this.props;
		this.setState({
			value: parsed
		}, () => {
			try {
				const publicKey = ecc.privateToPublic(parsed);
				const valid = ecc.isValidPrivate(parsed);
				if (valid) {
					actions.getAccountByKey(publicKey);
				} else {
					actions.clearAccountByKey();
				}
				this.setState({
					value: parsed,
					error: !valid
				})
			} catch (error) {
				this.setState({
					value: parsed,
					error: true
				})
			}
		});
	}, 300)

	onSubmit = () => {
		const { value } = this.state;
		const { actions } = this.props;

		if (!value) {
			this.setState({
				error: true
			})
			return;
		}
	}


	render() {
		const { modalOpen, closeModal, accounts } = this.props;

		const {
			value,
			error
		} = this.state;

		let matches = [];

		if(accounts) {
			matches = accounts && accounts.__lookups;
		}

		return (
			<Modal
				onClose={closeModal}
				className=""
				size={"tiny"}
				open={modalOpen}
			>

				<Modal.Content className="importAccountModal-body">
					<div className="modal-header">
						<span>Import </span>
						<span> Account</span>
					</div>
					<div className="modal-body">
						<Form.Field
							className="custom-import"
							control={TextArea}
							name="privateKey"
							onChange={this.onChange}
							defaultValue={value}
							error={error}
							placeholder="Active Private key"
						/>
						<div className="importModal-label">
							1,468,932.19
						</div>
						{matches.map((account, index) => {
							return <div className="importModal-label" key={`matches-${index}`}>
								imported account: {account}
							</div>
						})}
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

ImportAccountModal.propTypes = {}

ImportAccountModal.defaultProps = {}

export default ImportAccountModal