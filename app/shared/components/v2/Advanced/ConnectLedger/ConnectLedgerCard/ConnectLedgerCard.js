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
import Balance from "../../../Dashboard/Balance/Balance";
import "./ConnectLedgerCard.global.css";

class ConnectLedgerCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="ledger-content">
        <div className="ledger-content-header">
          <div className="ledger-content-header-left">
            <img
              src={require("../../../../../../renderer/assets/images/advanced/Group1731.png")}
            />
            <div>Ledger</div>
          </div>
          <img
            src={require("../../../../../../renderer/assets/images/dashboard/Group1737.png")}
          />
        </div>
        <div className="ledger-content-body">
          <p>Follow these steps to get started:</p>
          <p>
            Connect a Leger Wallet Device via USB to your computer running this
            app.
          </p>
          <p>Unlock the device using your PIN code.</p>
          <p>
            Ensure the WAX application is installed on the device (Using Ledger
            Live)
          </p>
          <p>Allow the Ledger Manager on the device</p>
          <p>Start the WAX application on the Ledger device.</p>
        </div>
      </div>
    );
  }
}

ConnectLedgerCard.propTypes = {};

ConnectLedgerCard.defaultProps = {};

export default ConnectLedgerCard;
