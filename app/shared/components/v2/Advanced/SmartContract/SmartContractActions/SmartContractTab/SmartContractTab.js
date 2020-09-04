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
import Balance from "../../../../Dashboard/Balance/Balance";
import "./SmartContractTab.global.css";

const accountOption = [
  {
    text: "claim",
    value: "claim"
  },
  {
    text: "owner",
    value: "owner"
  }
];

class SmartContractTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = { accountOption };
  }

  getPanes() {
    const smartActionsPan = {
      menuItem: (
        <Menu.Item key="actions">
          <img
            src={require("../../../../../../../renderer/assets/images/advanced/edit1.png")}
            style={{ width: 15, height: 15, marginRight: 10 }}
          />
          Actions
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane attached={false}>
          <div className="smartActions-tab-content">
            <div className="round-dropdown-wrap">
              <div className="round-dropdown-label">Contract Actions</div>
              <Dropdown
                fluid
                selection
                options={accountOption}
                className="round-dropdown"
                defaultValue="claim"
              />
            </div>
            <div className="seller-input">
              <div className="input-title">Action Parameters</div>
              <Form.Field
                className="ui-common-input"
                placeholder="owner"
                required
                autoFocus
                control={Input}
              />
            </div>
            <div className="delegate-btn">
              Load Contract
              <img
                src={require("../../../../../../../renderer/assets/images/advanced/correct2.png")}
              />
            </div>
          </div>
        </Tab.Pane>
      )
    };

    const smartTablesPan = {
      menuItem: (
        <Menu.Item key="tables">
          <img
            src={require("../../../../../../../renderer/assets/images/advanced/grid1.png")}
            style={{ width: 15, height: 15, marginRight: 10 }}
          />
          Tables
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane attached={false}>
          <div className="smartActions-tab-content">
            <div className="round-dropdown-wrap">
              <div className="round-dropdown-label">Contract Tables</div>
              <Dropdown
                fluid
                selection
                options={accountOption}
                className="round-dropdown"
                defaultValue="claim"
              />
            </div>
            <div className="seller-input">
              <div className="input-title">Table Scope (Account Name)</div>
              <Form.Field
                className="ui-common-input"
                placeholder="captainkama"
                required
                autoFocus
                control={Input}
              />
            </div>
            <div className="delegate-btn">Load Table</div>
          </div>
        </Tab.Pane>
      )
    };
    const smartAbiPan = {
      menuItem: (
        <Menu.Item key="abi">
          <img
            src={require("../../../../../../../renderer/assets/images/advanced/portable-document-format.png")}
            style={{ width: 15, height: 15, marginRight: 10 }}
          />
          ABI
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane attached={false}>
          <img
            src={require("../../../../../../../renderer/assets/images/advanced/Image71.png")}
          />
        </Tab.Pane>
      )
    };
    return [smartActionsPan, smartTablesPan, smartAbiPan];
  }

  goBack = () => {
    this.props.history.push("/smartContractAccount");
  };
  render() {
    return (
      <div className="smartContractActions-tab">
        <Tab
          menu={{ secondary: true, pointing: true }}
          panes={this.getPanes()}
          className="smartActions-tab"
        />
      </div>
    );
  }
}
SmartContractTab.propTypes = {};

SmartContractTab.defaultProps = {};

export default SmartContractTab;
