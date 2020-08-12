import React from "react"
import PropTypes from "prop-types"
import { Modal, Button, Tab, Dropdown, Menu} from "semantic-ui-react"

import "./ResourcesModal.global.css"
import CustomProgressBar from "../../CustomProgressBar/CustomProgressBar"

const options = [
	{ key: 1, text: 'CPU', value: 1 },
	{ key: 2, text: 'Net', value: 2 },
	{ key: 3, text: 'RAM', value: 3 },
]

const panes = [
	{
	  menuItem: 'Stake',
	  render: () => <Tab.Pane attached={false}>
		  				<CustomProgressBar 
							label="CPU"
							statusColor="red"
							percent="76"
						/>
		  				<CustomProgressBar 
							label="NET"
							statusColor="brown"
							percent="51"
						/>
		  				<CustomProgressBar 
							label="RAM"
							statusColor="green"
							percent="28"
						/>
						<div className="resource-choose-section">
							<Dropdown
								defaultValue="CPU"
								selection
								options={options}
								className="resource-choose-dropdown"
							/>
							<div className="input-button-wrap">
								<input type="text" className="common-input" placeholder="Amount Of WAX" />
								<div className="circle-btn-wrap">
									<img src={require('../../../../../../renderer/assets/images/dashboard/correct2.png')} />
								</div>
							</div>
						</div>
						<div className="resources-delegate-link">
							DELEGATE RESOURCES
						</div>
	  				</Tab.Pane>,
	},
	{
	  menuItem: 'Unstake',
	  render: () => <Tab.Pane attached={false}>
		  				<CustomProgressBar 
							label="CPU"
							statusColor="red"
							percent="76"
						/>
		  				<CustomProgressBar 
							label="NET"
							statusColor="brown"
							percent="51"
						/>
		  				<CustomProgressBar 
							label="RAM"
							statusColor="green"
							percent="28"
						/>
						<div className="resource-choose-section">
							<Dropdown
								defaultValue="CPU"
								selection
								options={options}
								className="resource-choose-dropdown"
							/>
							<div className="input-button-wrap">
								<input type="text" className="common-input" placeholder="Amount Of WAX" />
								<div className="circle-btn-wrap">
									<img src={require('../../../../../../renderer/assets/images/dashboard/correct2.png')} />
								</div>
							</div>
						</div>
	  				</Tab.Pane>,
	},
]

const TabExampleSecondaryPointing = () => (
	<Tab menu={{ secondary: true, pointing: true }} panes={panes} />
)

class ResourcesModal extends React.Component {
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
			className="resourcesModal" 
			size={"tiny"} 
			open={modalOpen}
		>
			
	
		<Modal.Content 
			className="resourceModal-body"
		>
			<TabExampleSecondaryPointing />
		</Modal.Content>
		
	  </Modal>
	)
  }
}

ResourcesModal.propTypes = {}

ResourcesModal.defaultProps = {}

export default ResourcesModal
