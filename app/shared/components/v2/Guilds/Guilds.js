
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio, Menu, Checkbox} from "semantic-ui-react"

import Balance from "../Dashboard/Balance/Balance"
import ProxiesTab from "./ProxiesTab";
import GuildsTab from "./GuildsTab"

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
                    <GuildsTab />
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
                    <ProxiesTab />
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
                <div className="confirm-btn-wrap">
                    <div className="confirm-btn">
                        <h3>Confirm Votes</h3>
                        <Image src={require('../../../../renderer/assets/images/dashboard/correct3.png')} />
                    </div>
                </div>
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
