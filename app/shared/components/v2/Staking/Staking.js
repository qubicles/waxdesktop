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
import { bindActionCreators } from "redux";
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';

import Balance from "../Dashboard/Balance/Balance";

import * as AssetsActions from "../../../actions/assets";
import * as BlockExplorersActions from "../../../actions/blockexplorers";
import * as SettingsActions from "../../../actions/settings";

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
    const { actions, settings, blockexplorers, t } = this.props;
    return (
      <div className="dashboard-container">
        <div className="dashboard-body-section">
          <div className="staking-header">
            <img
              src={require("../../../../renderer/assets/images/dashboard/dashboard-stacking.png")}
            />
            <div>{t('s_staking')}</div>
          </div>
          <div className="staking-body">
            <div className="staking-card-section">
              <CurrentStackingCard />
              <AutoClaimCard 
                actions = {actions}
                settings = {settings}
                blockexplorers = {blockexplorers}
              />
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

const mapStateToProps = (state) => {
  return {
      assets: state.assets,
      blockexplorers: state.blockexplorers,
      settings: state.settings,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators({
          ...AssetsActions,
          ...BlockExplorersActions,
          ...SettingsActions
      }, dispatch)
  };
}

export default compose(
  translate('staking'),
  connect(mapStateToProps, mapDispatchToProps)
)(Staking);
