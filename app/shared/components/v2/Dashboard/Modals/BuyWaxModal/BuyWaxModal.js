import React from "react"
import PropTypes from "prop-types"
import { Dropdown, Modal } from "semantic-ui-react"

import "./BuyWaxModal.global.css"


class BuyWaxModal extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}


	render() {
		const { modalOpen, closeModal } = this.props
		return (
			<Modal
				onClose={closeModal}
				size={"tiny"}
				open={modalOpen}
			>

				<Modal.Content className="BuyWaxModal-body">
					<div className="modal-header">
						<span>Buy </span>
						<span> Wax</span>
					</div>
					<div className="modal-body">
						<div className="buy-wax-link">
						<iframe
							allowtransparency="true" 
							src="https://buy.moonpay.io/?currencyCode=WAXP" 
							title="Buy WAXP"/>
						</div>
						{/* <div className="buy-wax-link">
							<a href="https://buy.moonpay.io/?currencyCode=WAXP">https://buy.moonpay.io/?currencyCode=WAXP</a>
						</div> */}
					</div>
				</Modal.Content>
			</Modal>
		)
	}
}

BuyWaxModal.propTypes = {}

BuyWaxModal.defaultProps = {}

export default BuyWaxModal