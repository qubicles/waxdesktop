import React from "react"
import PropTypes from "prop-types"
import { Dropdown, Modal } from "semantic-ui-react"

import "./CreateAccountModal.global.css"


class CreateAccountModal extends React.Component {
  constructor(props) {
	super(props)
	this.state = {
	}
  }


  render() {
	const { modalOpen, closeModal} = this.props
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
					<div className="custom-textarea-section">
						<div className="custom-textarea-label">
							Active Public Key
						</div>
						<div className="custom-textarea">
							<textarea>
								QWERTYUI2345678ASDFGH3456789XCVBDFGHJ
							</textarea>
							<div className="custom-copy-btn">
								<img src={require('../../../../../../renderer/assets/images/dashboard/paper.png')} />
							</div>
						</div>
					</div>
					<div className="custom-textarea-section">
						<div className="custom-textarea-label">
							Active Prvate Key
						</div>
						<div className="custom-textarea">
							<textarea>
								QWERTYUI2345678ASDFGH3456789XCVBDFGHJ
							</textarea>
							<div className="custom-copy-btn">
								<img src={require('../../../../../../renderer/assets/images/dashboard/paper.png')} />
							</div>
						</div>
					</div>
					<div className="custom-input-group">
						<div className="c-input-left">
							<div className="c-input-title">
								CPU
							</div>
							<input type="text" className="common-input" placeholder="0.2 WAX" />
						</div>
						<div className="c-input-left">
							<div className="c-input-title">
								NET
							</div>
							<input type="text" className="common-input" placeholder="0.2 WAX" />
						</div>
					</div>
					<div className="account-name-section">
						<div className="input-title">
							Account Name
						</div>
						<input type="text" className="common-input" placeholder="12 Characters (A-Z & 1-5)" />
					</div>
					<div className="delegate-btn">
                        Confirm Transaction
                        <img src={require('../../../../../../renderer/assets/images/dashboard/correct3.png')} />
                    </div>
				</div>

			</Modal.Content>
	  </Modal>
	)
  }
}

CreateAccountModal.propTypes = {}

CreateAccountModal.defaultProps = {}

export default CreateAccountModal