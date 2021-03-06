
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio, Menu, Checkbox} from "semantic-ui-react"
import { connect } from 'react-redux';
import Balance from "../Dashboard/Balance/Balance"
import "./Guilds.global.css"
import GuildItem from "./GuildItem/GuildItem"


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
                            <GuildItem />
                            <GuildItem />
                            <GuildItem />
                            <GuildItem />
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
                    <div className="guilds-section">
                        <Tab 
                            menu={{ secondary: true, pointing: true }} 
                            panes={this.getPanes()} 
                            className="guilds-tab"
                        />
                        <div className="right-badge">
                            <img src={require('../../../../renderer/assets/images/dashboard/Group1737.png')} onClick={this.goStaking} />
                        </div>
                    </div>
                </div>
                {/* <Balance /> */}
            </div>
		)
	}
}

Guilds.propTypes = {

}

Guilds.defaultProps = {

}

export default Guilds
