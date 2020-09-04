import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Image,
  Divider,
  Tab,
  Dropdown,
  Radio,
  Menu,
  Checkbox,
  Form,
  Input,
  Button
} from "semantic-ui-react";
import { connect } from "react-redux";
import Balance from "../../Dashboard/Balance/Balance";
import "./WalletSettings.global.css";

class WalletSettings extends React.Component {
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
          <div className="walletSettings-section">
            <div className="walletSettings-header">
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
            <div className="walletSettings-body">
              <div className="w-title">Wallet Settings</div>
              <div className="w-form">
                <div className="seller-input">
                  <div className="input-title">Default Block Explorer</div>
                  <Form.Field
                    className="ui-common-input"
                    placeholder="Bolks.io"
                    required
                    autoFocus
                    control={Input}
                  />
                </div>
                <div className="seller-input">
                  <div className="input-title">Default IPFS Node</div>
                  <Form.Field
                    className="ui-common-input"
                    placeholder="ipfs.was.miami"
                    required
                    autoFocus
                    control={Input}
                  />
                </div>
                <div className="seller-input">
                  <div className="input-title">IPFS Port</div>
                  <Form.Field
                    className="ui-common-input"
                    placeholder="miami"
                    required
                    autoFocus
                    control={Input}
                  />
                </div>
                <div className="seller-input">
                  <div className="input-title">Language</div>
                  <Form.Field
                    className="ui-common-input"
                    placeholder="English"
                    required
                    autoFocus
                    control={Input}
                  />
                </div>
                <div className="seller-input">
                  <div className="input-title">
                    Lock Wallet Automatically When Inactive
                  </div>
                  <Form.Field
                    className="ui-common-input"
                    placeholder="Disable automatic locking"
                    required
                    autoFocus
                    control={Input}
                  />
                </div>
                <div className="seller-input">
                  <div className="input-title">
                    Show Warning When Clicking Links to External Sites
                  </div>
                  <Form.Field
                    className="ui-common-input"
                    placeholder="Disable automatic locking"
                    required
                    autoFocus
                    control={Input}
                  />
                </div>
                <div className="seller-input">
                  <div className="input-title">
                    Recalculate Voting Weight Prior To Voting
                  </div>
                  <Form.Field
                    className="ui-common-input"
                    placeholder="Disable automatic locking"
                    required
                    autoFocus
                    control={Input}
                  />
                </div>
                <div className="seller-input">
                  <div className="input-title">
                    Use Wax Desktop Wallet To Pay For Resources
                  </div>
                  <Form.Field
                    className="ui-common-input"
                    placeholder="No"
                    required
                    autoFocus
                    control={Input}
                  />
                </div>
                <div className="seller-input">
                  <div className="input-title">
                    Filter Out Spam Transters (Hide tx's below 0.005 WAX)
                  </div>
                  <Form.Field
                    className="ui-common-input"
                    placeholder="Do not filter out spam transfers"
                    required
                    autoFocus
                    control={Input}
                  />
                </div>
                <div className="seller-input">
                  <div className="input-title">Connect To Network</div>
                  <div className="btn-wrap">
                    <Button className="btn-left-round btn-inside">
                      WAX Mainnet
                    </Button>
                    <Button className="btn-right-round btn-inside">
                      WAX Testnet
                    </Button>
                  </div>
                </div>
                <div className="seller-input w-img-wrap">
                  <div className="input-title">Wallet API URL</div>
                  <Form.Field
                    className="ui-common-input"
                    placeholder="https://chain.wax.io"
                    required
                    autoFocus
                    control={Input}
                  />
                  <img
                    src={require("../../../../../renderer/assets/images/dashboard/correct3.png")}
                    className="w-input-img"
                  />
                </div>
                <Button className="delegate-btn">Connect To Server</Button>
              </div>
            </div>
          </div>
        </div>
        {/* <Balance /> */}
      </div>
    );
  }
}

WalletSettings.propTypes = {};

WalletSettings.defaultProps = {};

export default WalletSettings;
