
import React from "react"
import PropTypes from "prop-types"

import "./Dashboard.global.css"
import { Divider } from "semantic-ui-react"

class Home extends React.Component {
  constructor(props) {
	  super(props)
	  this.state = {

	  }
  }

  render() {

	return (
		<div className="dashboard-container">
			<div className="nav-section">
				<div className="logo-section">
					<div className="logo-img-wrap">
						<div className="logo-rect1-wrap">
							<div className="logo-rect1"></div>
						</div>
						<div className="logo-rect2-wrap">
							<div className="logo-rect2"></div>
						</div>
					</div>
					<div className="logo-text-wrap">
						<h3 className="pin-wax">WAX</h3>
						<h4 className="pin-desktop">D E S K T O P</h4>
					</div>
				</div>
				<div className="nav-items-section">
					<div className="nav-item-wrap">
						<img src={require('../../../../renderer/assets/images/dashboard/dashboard-home.png')} />
						<div className="nav-item-title">
							Home
						</div>
					</div>
					<div className="nav-item-wrap">
						<img src={require('../../../../renderer/assets/images/dashboard/dashboard-market.png')} />
						<div className="nav-item-title">
							Market
						</div>
					</div>
					<div className="nav-item-wrap">
						<img src={require('../../../../renderer/assets/images/dashboard/dashboard-apps.png')} />
						<div className="nav-item-title">
							Apps
						</div>
					</div>
					<div className="nav-item-wrap">
						<img src={require('../../../../renderer/assets/images/dashboard/dashboard-stacking.png')} />
						<div className="nav-item-title">
							Staking
						</div>
					</div>
					<div className="nav-item-wrap">
						<img src={require('../../../../renderer/assets/images/dashboard/dashboard-guilds.png')} />
						<div className="nav-item-title">
							Guilds
						</div>
					</div>
					<div className="nav-item-wrap">
						<img src={require('../../../../renderer/assets/images/dashboard/dashabord-advanced.png')} />
						<div className="nav-item-title">
							Advanced
						</div>
					</div>
				</div>
				<div className="nav-select-section">
					<select>
						<option>Import Account</option>
						<option>Create Account</option>
						<option>willquigley</option>
						<option>dloyt.yes</option>
						<option>elhfo.wam</option>
					</select>
				</div>
			</div>
			<div className="dashboard-body-section">
				
			</div>
			<div className="balance-section"></div>
		</div>

	)
  }
}

Home.propTypes = {

}

Home.defaultProps = {

}


export default Home
