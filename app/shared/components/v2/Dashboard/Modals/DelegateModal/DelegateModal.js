import React from "react"
import PropTypes from "prop-types"
import { Dropdown, Modal } from "semantic-ui-react"

import "./DelegateModal.global.css"

const options = [
	{ key: 1, text: 'CPU', value: 1 },
	{ key: 2, text: 'Net', value: 2 },
	{ key: 3, text: 'RAM', value: 3 },
]

class DelegateModal extends React.Component {
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

			<Modal.Content className="delgateModal-body">
				<div className="modal-header">
					<span>Delegate </span>
					<span> Resources</span>
				</div>
				<div className="modal-body">
					<input type="text" className="common-input" placeholder="Amount Of WAX" />
					<div className="input-select">
						<input type="text" className="common-input" placeholder="Amount Of WAX" />	
						<Dropdown
							defaultValue="CPU"
							selection
							options={options}
							className="resource-choose-dropdown"
						/>
						<div className="d-title">
							<span>Liquid WAX: </span>
							<span> 321,932.19 WAX</span>
						</div>
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

DelegateModal.propTypes = {}

DelegateModal.defaultProps = {}

export default DelegateModal
