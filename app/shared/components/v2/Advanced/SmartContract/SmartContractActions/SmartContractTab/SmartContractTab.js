import React from "react";
import PropTypes from "prop-types";
import {
  Image,
  Divider,
  Tab,
  Menu,
  Checkbox,
  Form,
  Input
} from "semantic-ui-react";
import { connect } from "react-redux";
import Balance from "../../../../Dashboard/Balance/Balance";
import "./SmartContractTab.global.css";

import SmartContractActions from "../../Tab/Actions";
import SmartContractTables from "../../Tab/Tables";
import SmartContractABI from "../../Tab/Data";

class SmartContractTab extends React.Component {
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
          <SmartContractActions />
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
          <SmartContractTables />
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
          <SmartContractABI />
        </Tab.Pane>
      )
    };
    return [smartActionsPan, smartTablesPan, smartAbiPan];
  }

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
