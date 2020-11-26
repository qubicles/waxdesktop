import React from "react";
import PropTypes from "prop-types";
import { Card, Image, Divider, Tab, Button, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Balance from "../Dashboard/Balance/Balance";
import "./Apps.global.css";
import RecentlyApps from "./RecentlyApps/RecentlyApps";
import DecentralizedApps from "./DecentralizedApps/DecentralizedApps";
import { isArray } from "util";

export default class Apps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-body-section">
          <RecentlyApps />
          <DecentralizedApps />
        </div>
      </div>
    );
  }
}

Apps.propTypes = {};

Apps.defaultProps = {};

