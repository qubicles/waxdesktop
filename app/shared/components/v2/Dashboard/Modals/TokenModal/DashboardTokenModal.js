import React from "react"
import PropTypes from "prop-types"
import { Modal, Button } from "semantic-ui-react"
import QRCode from "qrcode.react";

import "./DashboardTokenModal.global.css"

class DashboardTokenModal extends React.Component {
  constructor(props) {
	super(props)
	this.state = {
	}
  }


  render() {
	const { modalOpen, closeModal, settings} = this.props
	return (
		<Modal 
			onClose={closeModal}
			className="dashboardTokenModal" 
			size={"tiny"} 
			open={modalOpen}
		>
			
		<Modal.Content className="dashboardTokenModal-body">
			<div className="modal-header">
					<span>Receive </span>
					<span> Tokens</span>
				</div>
			<div className="modal-body">
				<div className="token-img-wrap">
					{/* <img src={require('../../../../../../renderer/assets/images/dashboard/qr-code3.png')} /> */}
					<QRCode value={settings.account} />
					<div className="token-title">
						<span className="left-title">WAX Account: </span>
						<span className="right-title">{settings.account}</span>
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
