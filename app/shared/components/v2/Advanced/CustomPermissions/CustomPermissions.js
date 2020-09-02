
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio, Menu, Checkbox} from "semantic-ui-react"
import { connect } from 'react-redux';
import Balance from "../../Dashboard/Balance/Balance"
import "./CustomPermissions.global.css"

class CustomPermissions extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
    }
    goBack = () => {
		this.props.history.push("/advanced")
	}
	render() {
		return (
			<div className="dashboard-container">
				<div className="dashboard-body-section">
                    <div className="customPermissions-section">
                        <div className="customPermissions-header">
                            <img src={require('../../../../../renderer/assets/images/advanced/down-arrow1.png')} onClick={this.goBack}/>
                        </div>
                        <div className="customPermissions-body">
                            <div className="w-title">
                                Custom Permissions
                            </div>
                            <h3>Standard and custom permissions</h3>
                            <div className="active-p-key">
                                <img src={require('../../../../../renderer/assets/images/advanced/password.png')} />
                                <div className="p-key-des">
                                    <div>Active Public Key:</div>
                                    <div>EOS7alsdkfjaosijGzlkJLKJOiksjflsadkjDFKJDLFJEKJDL</div>
                                </div>
                            </div>
                            <div className="active-permission">
                                <div className="active-permission-left">
                                    <img src={require('../../../../../renderer/assets/images/advanced/padlock.png')} />
                                    <div className="active-permission-des">
                                        <div>Active Permission</div>
                                        <div>1 of 1 (child of owner)</div>
                                        <div>EOS7alsdkfjaosijGzlkJLKJOiksjflsadkjDFKJDLFJEKJDL</div>
                                    </div>
                                </div>
                                <img src={require('../../../../../renderer/assets/images/dashboard/Group1737.png')} />
                            </div>
                            <div className="active-permission">
                                <div className="active-permission-left">
                                    <img src={require('../../../../../renderer/assets/images/advanced/padlock.png')} />
                                    <div className="active-permission-des">
                                        <div>Claim Permission</div>
                                        <div>1 of 1 (child of owner)</div>
                                        <div>EOS7alsdkfjaosijGzlkJLKJOiksjflsadkjDFKJDLFJEKJDL</div>
                                    </div>
                                </div>
                                <img src={require('../../../../../renderer/assets/images/dashboard/Group1737.png')} />
                            </div>
                            <div className="new-permission-btn">
                                Create New Permission
                                <img src={require('../../../../../renderer/assets/images/advanced/Group1730.png')} />
                            </div>
                        </div>
                    </div>
                </div>
                {/* <Balance /> */}
            </div>
		)
	}
}

CustomPermissions.propTypes = {

}

CustomPermissions.defaultProps = {

}

export default CustomPermissions
