import React from "react"
import PropTypes from "prop-types"
import { Dropdown, Modal } from "semantic-ui-react"

import "./CryptoModal.global.css"

const options = [
	{ key: 1, text: 'CPU', value: 1 },
	{ key: 2, text: 'Net', value: 2 },
	{ key: 3, text: 'RAM', value: 3 },
]

class CryptoModal extends React.Component {
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

			<Modal.Content className="cryptoModal-body">
				<div className="modal-header">
					<span>Send </span>
					<span> Crypto</span>
				</div>
				<div className="modal-body">
					<input type="text" className="common-input" placeholder="Account Name" />
					<input type="text" className="common-input" placeholder="Memo" />
					<div className="input-select">
						<input type="text" className="common-input" placeholder="0.0000 WAX" />	
						<Dropdown
							defaultValue="CPU"
							selection
							options={options}
							className="resource-choose-dropdown"
						/>
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

CryptoModal.propTypes = {}

CryptoModal.defaultProps = {}

export default CryptoModal
