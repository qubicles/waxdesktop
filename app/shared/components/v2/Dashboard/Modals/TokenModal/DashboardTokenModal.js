import React from "react"
import PropTypes from "prop-types"
import { Modal, Button } from "semantic-ui-react"

import "./DashboardTokenModal.global.css"

class DashboardTokenModal extends React.Component {
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
			className="resetWalletModal dashboard-token-modal" 
			size={"tiny"} 
			open={modalOpen}
		>
			
		<Modal.Header className="resetWallet">
		  <span className="resetWallet-1">Receive </span>
		  <span className="resetWallet-0"> Tokens</span>
		</Modal.Header>
		<Modal.Content className="modalInstructions">
			<div className="dashboard-token-body">
				<div className="token-img-wrap">
					<img src={require('../../../../../../renderer/assets/images/dashboard/qr-code3.png')} />
					<div className="token-title">
						<span className="left-title">WAX Account: </span>
						<span className="right-title">exodl.wam</span>
					</div>
				</div>
			</div>
		</Modal.Content>
		
	  </Modal>
	)
  }
}

DashboardTokenModal.propTypes = {}

DashboardTokenModal.defaultProps = {}

export default DashboardTokenModal
