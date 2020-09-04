import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Image,
  Divider,
  Tab,
  Button,
  Dropdown,
  Radio
} from "semantic-ui-react";
import { connect } from "react-redux";
import Balance from "../../Dashboard/Balance/Balance";
import "./AutoClaimCard.global.css";

class AutoClaimCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="staking-card-right">
        <div className="staking-card-radio">
          <div>Auto-Claim</div>
          <div className="s-custom-radio">
            <Radio toggle />
          </div>
        </div>
        <div className="s-card-des">
          <div>Next Claim</div>
          <div>6 hrs 17min</div>
        </div>
        <div className="stake-card-btn">Claim Rewards</div>
      </div>
    );
  }
}

AutoClaimCard.propTypes = {};

AutoClaimCard.defaultProps = {};

export default AutoClaimCard;
