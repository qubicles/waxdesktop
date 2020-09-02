
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio, Checkbox} from "semantic-ui-react"
import { connect } from 'react-redux';
import "./GuildItem.global.css";


class GuildItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
    }

	render() {
		return (
            <div className="guilds-list-wrap">
                <div className="list-index">1</div>
                <img src={require('../../../../../renderer/assets/images/marketplace/g.png')} className="list-logo" />
                <div className="list-title">waxcafeblock</div>
                <div className="list-btn">Top 21</div>
                <div className="list-img-group">
                    <img src={require('../../../../../renderer/assets/images/marketplace/telegram2.png')} />
                    <img src={require('../../../../../renderer/assets/images/marketplace/internet.png')} />
                    <img src={require('../../../../../renderer/assets/images/marketplace/Logo__x2014__FIXED.png')} />
                </div>
                <div className="list-number">1,38,002,190</div>
                <div className="common-checkbox">
                    <Checkbox />
                </div>
            </div>
		)
	}
}

GuildItem.propTypes = {

}

GuildItem.defaultProps = {

}

export default GuildItem
