
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown } from "semantic-ui-react"
import { connect } from 'react-redux';
import Balance from "../Dashboard/Balance/Balance"
import "./Apps.global.css"


class Apps extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
    }

    
	render() {
		return (
			<div className="dashboard-container">
				<div className="dashboard-body-section">
                    <div className="recommended-apps-section">
                        <div className="recommended-apps-header">
                            <div className="recommended-apps-title">Recently Used</div>
                            <img src={require('../../../../renderer/assets/images/dashboard/Group1737.png')} />
                        </div>
                        <div className="recommended-apps-body">
                            <div className="recommended-apps-card">
                                <img src={require('../../../../renderer/assets/images/dashboard/ScrollGroup1.png')} />
                                <div className="app-title">KARMAR</div>
                            </div>
                            <div className="recommended-apps-card">
                                <img src={require('../../../../renderer/assets/images/dashboard/ScrollGroup2.png')} />
                                <div className="app-title">KARMAR</div>
                            </div>
                            <div className="recommended-apps-card">
                                <img src={require('../../../../renderer/assets/images/dashboard/ScrollGroup4.png')} />
                                <div className="app-title">KARMAR</div>
                            </div>
                            <div className="recommended-apps-card">
                                <img src={require('../../../../renderer/assets/images/dashboard/Group209.png')} />
                                <div className="app-title">KARMAR</div>
                            </div>
                            <div className="recommended-apps-card">
                                <img src={require('../../../../renderer/assets/images/dashboard/ScrollGroup1.png')} />
                                <div className="app-title">KARMAR</div>
                            </div>
                            <div className="recommended-apps-card">
                                <img src={require('../../../../renderer/assets/images/dashboard/ScrollGroup1.png')} />
                                <div className="app-title">KARMAR</div>
                            </div>

                            
                        </div>
                    </div>
                    <div className="decentralized-apps-section">
                        <div className="decentralized-apps-container">
                            <div className="decentralized-apps-header">Decentralized Applications</div>
                            <div className="decentralized-apps-body">
                                <div className="dec-left-section">
                                    <img src={require('../../../../renderer/assets/images/dashboard/ScrollGroup1.png')} />
                                    <div className="dec-des">
                                        <div>Newdex</div>
                                        <div>Decentralized Exchange</div>
                                    </div>
                                </div>
                                <div className="dec-right-section">
                                    Open
                                </div>
                            </div>
                            <div className="decentralized-apps-body">
                                <div className="dec-left-section">
                                    <img src={require('../../../../renderer/assets/images/dashboard/ScrollGroup1.png')} />
                                    <div className="dec-des">
                                        <div>Newdex</div>
                                        <div>Decentralized Exchange</div>
                                    </div>
                                </div>
                                <div className="dec-right-section">
                                    Open
                                </div>
                            </div>
                            <div className="decentralized-apps-body">
                                <div className="dec-left-section">
                                    <img src={require('../../../../renderer/assets/images/dashboard/ScrollGroup1.png')} />
                                    <div className="dec-des">
                                        <div>Newdex</div>
                                        <div>Decentralized Exchange</div>
                                    </div>
                                </div>
                                <div className="dec-right-section">
                                    Open
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
                <Balance />
            </div>

		)
	}
}

Apps.propTypes = {

}

Apps.defaultProps = {

}

export default Apps
