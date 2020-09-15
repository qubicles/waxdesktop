import React from "react";
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
import Balance from "../../../Dashboard/Balance/Balance";
import "./SmartContractActions.global.css";
import SmartContractTab from "./SmartContractTab/SmartContractTab";

class SmartContractActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  goBack = () => {
    this.props.clearState();
  };

  render() {
    const { contractName } = this.props;
    
    return (
      <div className="dashboard-container">
        <div className="dashboard-body-section">
          <div className="smartContractActions-section">
            <div className="smartContractActions-header">
              <img
                src={require("../../../../../../renderer/assets/images/advanced/down-arrow1.png")}
                onClick={this.goBack}
              />
            </div>
            <div className="smartContractActions-body">
              <div className="w-title">Smart Contracts</div>
              <div className="w-account-name">
                <div>{contractName}</div>
                <div>Change Contract</div>
              </div>
              <SmartContractTab />
            </div>
          </div>
        </div>
        {/* <Balance /> */}
      </div>
    );
  }
}
SmartContractActions.propTypes = {};

SmartContractActions.defaultProps = {};

export default SmartContractActions;
