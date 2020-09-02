import React from "react"
import PropTypes from "prop-types"
import { Dropdown, Modal } from "semantic-ui-react"

import "./ImportAccountModal.global.css"


class ImportAccountModal extends React.Component {
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
					<div className="private-key-section">
						Active Private Key
					</div>
					<div className="importModal-label">
						1,468,932.19
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

ImportAccountModal.propTypes = {}

ImportAccountModal.defaultProps = {}

export default ImportAccountModal