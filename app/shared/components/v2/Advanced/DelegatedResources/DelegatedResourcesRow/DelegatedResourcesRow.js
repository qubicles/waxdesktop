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
import "./DelegatedResourcesRow.global.css";

class DelegatedResourcesRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { title, amount, type } = this.props;
    return (
      <div
        className={`del-table-row ${type == "NET" ? "del-yellow-border" : ""}`}
      >
        <div className="body-account">{title}</div>
        <div className="body-amount">{amount}</div>
        <div className="body-type">{type}</div>
        <div className="body-action">Undelegate</div>
      </div>
    );
  }
}
DelegatedResourcesRow.propTypes = {};

DelegatedResourcesRow.defaultProps = {};

export default DelegatedResourcesRow;
