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
import Balance from "../Dashboard/Balance/Balance";
import "./Staking.global.css";
import CurrentStackingCard from "./CurrentStackingCard/CurrentStackingCard";
import AutoClaimCard from "./AutoClaimCard/AutoClaimCard";
import RewardHistoryCard from "./RewardHistoryCard/RewardHistoryCard";

class Staking extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="dashboard-container">
        <div className="dashboard-body-section">
          <div className="staking-header">
            <img
              src={require("../../../../renderer/assets/images/dashboard/dashboard-stacking.png")}
            />
            <div>Staking</div>
          </div>
          <div className="staking-body">
            <div className="staking-card-section">
              <CurrentStackingCard />
              <AutoClaimCard />
            </div>
            <RewardHistoryCard />
          </div>
        </div>
        {/* <Balance /> */}
      </div>
    );
  }
}

Staking.propTypes = {};

Staking.defaultProps = {};

export default Staking;
