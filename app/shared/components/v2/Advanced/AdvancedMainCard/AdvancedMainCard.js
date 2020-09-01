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
import Balance from "../../Dashboard/Balance/Balance";
import "./AdvancedMainCard.global.css";

const mainCardOption = [
  {
    title: "Wallet Setting",
    value: "walletSettings",
    image: 'url("../../renderer/assets/images/marketplace/ScrollGroup1.png")'
  },
  {
    title: "Custom Permissions",
    value: "customPermissions",
    image: 'url("../../renderer/assets/images/marketplace/ScrollGroup2.png")'
  },
  {
    title: "Whitelisted Apps",
    value: "whiteListedApps",
    image: 'url("../../renderer/assets/images/marketplace/ScrollGroup13.png")'
  },
  {
    title: "Delegated Resources",
    value: "delegatedResources",
    image: 'url("../../renderer/assets/images/marketplace/ScrollGroup4.png")'
  },
  {
    title: "Smart Contracts",
    value: "smartContractAccount",
    image: 'url("../../renderer/assets/images/marketplace/ScrollGroup5.png")'
  },
  {
    title: "Connect Ledger",
    value: "connectLedger",
    image: 'url("../../renderer/assets/images/marketplace/Group1732.png")'
  }
];

class AdvancedMainCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mainCard: mainCardOption.map(item => (
        <div
          className="advanced-card"
          style={{ backgroundImage: item.image }}
          key={item.value}
          onClick={() => this.goLink(item.value)}
        >
          <div className="advanced-card-title">
            <div>{item.title}</div>
          </div>
        </div>
      ))
    };
  }

  goLink = linkName => {
    this.props.history.push("/" + linkName);
  };

  render() {
    return <div className="advanced-card-wrap">{this.state.mainCard}</div>;
  }
}

AdvancedMainCard.propTypes = {};

AdvancedMainCard.defaultProps = {};

export default AdvancedMainCard;
