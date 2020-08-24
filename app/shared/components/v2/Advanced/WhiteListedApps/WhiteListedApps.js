
import React from "react"
import SlideToggle from "react-slide-toggle";
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio, Menu, Checkbox} from "semantic-ui-react"
import { connect } from 'react-redux';
import Balance from "../../Dashboard/Balance/Balance"
import "./WhiteListedApps.global.css"

class WhiteListedApps extends React.Component {
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
                    <div className="whiteListedApps-section">
                        <div className="whiteListedApps-header">
                            <img src={require('../../../../../renderer/assets/images/advanced/down-arrow1.png')} onClick={this.goBack}/>
                            <div className="delegate-btn">
                                Confirm Changes
                                <img src={require('../../../../../renderer/assets/images/advanced/correct2.png')} />
                            </div>
                        </div>
                        <div className="whiteListedApps-body">
                            <div className="w-title">
                                Whitelisted Apps
                            </div>
                            <div className="item-list-wrap">
                                <SlideToggle
                                    duration={800}
                                    render={({ onToggle, setCollapsibleElement, progress }) => (
                                        <div className="item-list-body">
                                            <div className="item-parent-wrap">
                                                <div className="item-parent-left" onClick={onToggle}>
                                                    <img src={require('../../../../../renderer/assets/images/dashboard/ScrollGroup1.png')} />
                                                    <div className="w-des">
                                                        <div>Newdex</div>
                                                        <div>3 Type Of Transactions</div>
                                                    </div>
                                                </div>
                                                <div className="item-parent-right">
                                                    <div className="round-checkbox">
                                                        <Checkbox />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item-child-wrap" ref={setCollapsibleElement}>
                                                <div
                                                    className="item-child-inner"
                                                    style={{
                                                    transform: `translateY(${Math.round(20 * (-1 + progress))}px)`
                                                    }}
                                                >   
                                                    <div className="item-child-group">
                                                        <div className="item-child-des">Markatbuy</div>
                                                        <div className="common-checkbox">
                                                            <Checkbox />
                                                        </div>
                                                    </div>
                                                    <div className="item-child-group">
                                                        <div className="item-child-des">Markatbuy</div>
                                                        <div className="common-checkbox">
                                                            <Checkbox />
                                                        </div>
                                                    </div>
                                                    <div className="item-child-group">
                                                        <div className="item-child-des">Markatbuy</div>
                                                        <div className="common-checkbox">
                                                            <Checkbox />
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <Balance />
            </div>
		)
	}
}
WhiteListedApps.propTypes = {

}

WhiteListedApps.defaultProps = {

}

export default WhiteListedApps
