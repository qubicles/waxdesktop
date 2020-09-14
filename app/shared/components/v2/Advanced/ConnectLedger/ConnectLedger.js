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
  Checkbox,
  Form,
  Input
} from "semantic-ui-react";
import { connect } from "react-redux";
import Balance from "../../Dashboard/Balance/Balance";
import "./ConnectLedger.global.css";
import ConnectLedgerCard from "./ConnectLedgerCard/ConnectLedgerCard";

class ConnectLedger extends React.Component {
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
          <div className="connectLedger-section">
            <div className="connectLedger-header">
              <img
                src={require("../../../../../renderer/assets/images/advanced/down-arrow1.png")}
                onClick={this.goBack}
              />
            </div>
            <div className="connectLedger-body">
              <div className="w-title">Connect Ledger</div>
              <ConnectLedgerCard />
              <div className="seller-input">
                <div className="input-title">Ledger Public Key</div>
                <Form.Field
                  className="ui-common-input"
                  placeholder="Enter the key"
                  required
                  autoFocus
                  control={Input}
                />
              </div>
              <div className="delegate-btn">Import Account</div>
            </div>
          </div>
        </div>
        {/* <Balance /> */}
      </div>
    );
  }
}

ConnectLedger.propTypes = {};

ConnectLedger.defaultProps = {};

export default ConnectLedger;
