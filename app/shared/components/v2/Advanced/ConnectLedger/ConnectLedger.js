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
              <div className="ledger-content">
                <div className="ledger-content-header">
                  <div className="ledger-content-header-left">
                    <img
                      src={require("../../../../../renderer/assets/images/advanced/Group1731.png")}
                    />
                    <div>Ledger</div>
                  </div>
                  <img
                    src={require("../../../../../renderer/assets/images/dashboard/Group1737.png")}
                  />
                </div>
                <div className="ledger-content-body">
                  <p>Follow these steps to get started:</p>
                  <p>
                    Connect a Leger Wallet Device via USB to your computer
                    running this app.
                  </p>
                  <p>Unlock the device using your PIN code.</p>
                  <p>
                    Ensure the WAX application is installed on the device (Using
                    Ledger Live)
                  </p>
                  <p>Allow the Ledger Manager on the device</p>
                  <p>Start the WAX application on the Ledger device.</p>
                </div>
              </div>
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
