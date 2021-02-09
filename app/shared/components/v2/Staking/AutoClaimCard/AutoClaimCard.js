import React from "react";
import PropTypes from "prop-types";
import { Decimal } from 'decimal.js';
import Moment from 'react-moment';
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
import * as AccountActions from "../../../../actions/accounts";
import * as SettingsActions from "../../../../actions/settings";
import * as GlobalsActions from "../../../../actions/globals"
import "./AutoClaimCard.global.css";

class AutoClaimCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastClaimTime: {},
      nextClaimTime: {},
      rewardsDue: 0,
      stakedBalance: 0,
      secondsSinceClaimed: 0,
    };
  }

  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 5000);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    let { accounts, settings } = this.props;
    if (!accounts) accounts = {};
    const {
      cpu_weight,
      net_weight
    } = accounts[settings.account].self_delegated_bandwidth || {
      cpu_weight: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol,
      net_weight: '0.'.padEnd(settings.tokenPrecision + 2, '0') + ' ' + settings.blockchain.tokenSymbol
    };

    const parsedCpuWeight = cpu_weight.split(' ')[0];
    const parsedNetWeight = net_weight.split(' ')[0];
    const cpuOriginal = Decimal(parsedCpuWeight);
    const netOriginal = Decimal(parsedNetWeight);
    
    if (accounts[settings.account]) {
      const account = accounts[settings.account];
      if (account.voter_info && account.voter_info.last_claim_time) {

        const lastClaimed = new Date(account.voter_info.last_claim_time + 'z');
        const nextClaim = new Date(lastClaimed);
        nextClaim.setHours(lastClaimed.getHours() + 24);

        const secondsSince = ((new Date().getTime() - lastClaimed.getTime()) / 1000);
        const staked = cpuOriginal.plus(netOriginal);
        const rewards = 0.000000010560287 * secondsSince * staked;
        // debugger
        this.setState({
          lastClaimTime: lastClaimed,
          nextClaimTime: nextClaim,
          secondsSinceClaimed: secondsSince,
          stakedBalance: staked,
          rewardsDue: rewards
        });
      }
    }
  }

  claimVote = () => {
    const {
      actions
    } = this.props;
    const {
      claimVotingRewards
    } = actions;

    claimVotingRewards();
  }

  claimGenesis = () => {
    const {
      actions
    } = this.props;
    const {
      claimGBMRewards,
    } = actions;

    claimGBMRewards();
  }

  render() {
    const {
      settings,
    } = this.props;

    const {
      lastClaimTime,
      nextClaimTime,
      rewardsDue,
      secondsSinceClaimed,
      stakedBalance
    } = this.state;

    return (
      <div className="staking-card-right">
        <div className="staking-card-radio">
          {/* <div>Auto-Claim</div>
          <div className="s-custom-radio">
            <Radio
              toggle
              name=""
              onChange={this.claimAutomatically}
              checked={settings.claimGBMRewards === true}
            />
          </div> */}
        </div>
        <div className="s-card-des">
          <div>Next Claim</div>
          <Moment fromNow>{nextClaimTime}</Moment>
        </div>
        <Button
          className="claim-btn"
          content="Claim Vote"
          onClick={this.claimVote}
          disabled={rewardsDue <= 0 || secondsSinceClaimed < 86400}
        />
        <Button
          className="claim-btn"
          content="Claim Genesis"
          onClick={this.claimGenesis}
          disabled={rewardsDue <= 0 || secondsSinceClaimed < 86400}
        />
      </div>
    );
  }
}

AutoClaimCard.propTypes = {};

AutoClaimCard.defaultProps = {};

const mapStateToProps = state => {
  return {
    settings: state.settings,
    globals: state.globals,
    accounts: state.accounts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...AccountActions,
        ...GlobalsActions,
        ...SettingsActions,
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AutoClaimCard);
