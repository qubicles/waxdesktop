
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio, Menu, Checkbox} from "semantic-ui-react"
import { connect } from 'react-redux';
import Balance from "../Dashboard/Balance/Balance"
import "./Guilds.global.css"


class Guilds extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
    }

    getPanes() {
        const guildsPan = {
            menuItem: (
                <Menu.Item key='messages'>
                    <img src={require('../../../../renderer/assets/images/dashboard/dashboard-guilds.png')} style={{width:15, height:15, marginRight: 10}} />
                    Guilds
                </Menu.Item>
            ),
            render: () => (
                <Tab.Pane attached={false}>
                    <div className="guilds-tab-body">
                        <div className="guilds-list-section">
                            <div className="guilds-list-wrap">
                                <div className="list-index">1</div>
                                <img src={require('../../../../renderer/assets/images/marketplace/g.png')} className="list-logo" />
                                <div className="list-title">waxcafeblock</div>
                                <div className="list-btn">Top 21</div>
                                <div className="list-img-group">
                                    <img src={require('../../../../renderer/assets/images/marketplace/telegram2.png')} />
                                    <img src={require('../../../../renderer/assets/images/marketplace/internet.png')} />
                                    <img src={require('../../../../renderer/assets/images/marketplace/Logo__x2014__FIXED.png')} />
                                </div>
                                <div className="list-number">1,38,002,190</div>
                                <div className="common-checkbox">
                                    <Checkbox />
                                </div>
                            </div>
                            <div className="guilds-list-wrap">
                                <div className="list-index">1</div>
                                <img src={require('../../../../renderer/assets/images/marketplace/g.png')} className="list-logo" />
                                <div className="list-title">waxcafeblock</div>
                                <div className="list-btn">Top 21</div>
                                <div className="list-img-group">
                                    <img src={require('../../../../renderer/assets/images/marketplace/telegram2.png')} />
                                    <img src={require('../../../../renderer/assets/images/marketplace/internet.png')} />
                                    <img src={require('../../../../renderer/assets/images/marketplace/Logo__x2014__FIXED.png')} />
                                </div>
                                <div className="list-number">1,38,002,190</div>
                                <div className="common-checkbox">
                                    <Checkbox />
                                </div>
                            </div>
                            <div className="guilds-list-wrap">
                                <div className="list-index">1</div>
                                <img src={require('../../../../renderer/assets/images/marketplace/g.png')} className="list-logo" />
                                <div className="list-title">waxcafeblock</div>
                                <div className="list-btn">Top 21</div>
                                <div className="list-img-group">
                                    <img src={require('../../../../renderer/assets/images/marketplace/telegram2.png')} />
                                    <img src={require('../../../../renderer/assets/images/marketplace/internet.png')} />
                                    <img src={require('../../../../renderer/assets/images/marketplace/Logo__x2014__FIXED.png')} />
                                </div>
                                <div className="list-number">1,38,002,190</div>
                                <div className="common-checkbox">
                                    <Checkbox />
                                </div>
                            </div>
                            <div className="guilds-list-wrap">
                                <div className="list-index">1</div>
                                <img src={require('../../../../renderer/assets/images/marketplace/g.png')} className="list-logo" />
                                <div className="list-title">waxcafeblock</div>
                                <div className="list-btn">Top 21</div>
                                <div className="list-img-group">
                                    <img src={require('../../../../renderer/assets/images/marketplace/telegram2.png')} />
                                    <img src={require('../../../../renderer/assets/images/marketplace/internet.png')} />
                                    <img src={require('../../../../renderer/assets/images/marketplace/Logo__x2014__FIXED.png')} />
                                </div>
                                <div className="list-number">1,38,002,190</div>
                                <div className="common-checkbox">
                                    <Checkbox />
                                </div>
                            </div>
                        </div>
                    </div>
                </Tab.Pane>
            )
        };
    
        const proxiesPan = {
            menuItem: (
                <Menu.Item key='messages'>
                    <img src={require('../../../../renderer/assets/images/marketplace/Group565.png')} style={{width:15, height:15, marginRight: 10}} />
                    Proxies
                </Menu.Item>
            ),
            render: () => (
                <Tab.Pane attached={false}>
                    content 2
                </Tab.Pane>
            )
        };
        return [guildsPan, proxiesPan];
      }

	render() {
		return (
			<div className="dashboard-container">
				<div className="dashboard-body-section">
                    <Tab 
                        menu={{ secondary: true, pointing: true }} 
                        panes={this.getPanes()} 
                        className="guilds-tab"
                    />
                </div>
                <Balance />
            </div>
		)
	}
}

Guilds.propTypes = {

}

Guilds.defaultProps = {

}

export default Guilds
