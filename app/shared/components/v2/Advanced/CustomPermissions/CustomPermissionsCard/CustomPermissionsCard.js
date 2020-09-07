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
import "./CustomPermissionsCard.global.css";

class CustomPermissionsCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="active-permission">
        <div className="active-permission-left">
          {this.props.cardType ? (
            <img
              src={require("../../../../../../renderer/assets/images/advanced/password.png")}
            />
          ) : (
            <img
              src={require("../../../../../../renderer/assets/images/advanced/padlock.png")}
            />
          )}

          <div className="active-permission-des">
            <div>{this.props.title}</div>
            <div>{this.props.description}</div>
            <div>{this.props.keycode}</div>
          </div>
        </div>
        {!this.props.cardType ? (
          <img
            src={require("../../../../../../renderer/assets/images/dashboard/Group1737.png")}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

CustomPermissionsCard.propTypes = {};

CustomPermissionsCard.defaultProps = {};

export default CustomPermissionsCard;
