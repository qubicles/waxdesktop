import React from "react";
import SlideToggle from "react-slide-toggle";
import PropTypes from "prop-types";
import {
  Card,
  Image,
  Divider,
  Tab,
  Button,
  Dropdown,
  Radio,
  Menu,
  Checkbox
} from "semantic-ui-react";
import { connect } from "react-redux";
import Balance from "../../Dashboard/Balance/Balance";
import "./WhiteListedApps.global.css";
import WhiteListedAppsCard from "./WhiteListedAppsCard/WhiteListedAppsCard";

class WhiteListedApps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  goBack = () => {
    this.props.history.push("/advanced");
  };
  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-body-section">
          <div className="whiteListedApps-section">
            <div className="whiteListedApps-header">
              <img
                src={require("../../../../../renderer/assets/images/advanced/down-arrow1.png")}
                onClick={this.goBack}
              />
              <div className="delegate-btn">
                Confirm Changes
                <img
                  src={require("../../../../../renderer/assets/images/advanced/correct2.png")}
                />
              </div>
            </div>
            <div className="whiteListedApps-body">
              <div className="w-title">Whitelisted Apps</div>
              <WhiteListedAppsCard />
              <WhiteListedAppsCard />
            </div>
          </div>
        </div>
        {/* <Balance /> */}
      </div>
    );
  }
}
WhiteListedApps.propTypes = {};

WhiteListedApps.defaultProps = {};

export default WhiteListedApps;
