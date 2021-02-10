import React from "react";
import PropTypes from "prop-types";
import { Dropdown, Modal, Form, Input, Button } from "semantic-ui-react";
import { Decimal } from 'decimal.js';
import { find } from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AccountActions from "../../../../../actions/accounts";
import * as SettingsActions from "../../../../../actions/settings";
import * as GlobalsActions from "../../../../../actions/globals";

import "./StakingModal.global.css";

class StakingModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastClaimTime: {},
      nextClaimTime: {},
      voteRewardsDue: 0,
      stakedBalance: 0,
      secondsSinceClaimed: 0,
      genesisTotalBal: 0,
      gbmRewards: 0,
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
    let { accounts, settings, balances } = this.props;
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
        this.setState({
          lastClaimTime: lastClaimed,
          nextClaimTime: nextClaim,
          secondsSinceClaimed: secondsSince,
          stakedBalance: staked,
          voteRewardsDue: rewards,
          genesisTotalBal: balances && balances.__genesisbal && balances.__genesisbal.balance ? balances.__genesisbal.balance : 0, 
          gbmRewards: balances && balances.__genesisbal && balances.__genesisbal.unclaimed_balance ? balances.__genesisbal.unclaimed_balance : 0,
        });
      }
    }
  }

  render() {
    const { modalOpen, closeModal } = this.props;
    const { genesisTotalBal, voteRewardsDue, gbmRewards } = this.state
    const totalPending = gbmRewards != 0 ? parseFloat(voteRewardsDue) + parseFloat(gbmRewards.split(" ")[0]): voteRewardsDue;
    return (
      <Modal
        onClose={closeModal}
        className="staking-modal-wrap"
        size={"small"}
        open={modalOpen}
      >
        <Modal.Content className="staking-modal-body">
          <div className="modal-header">
            <span>Staking </span>
            <span> Rewards</span>
          </div>
          <div className="modal-body">
            <div className="rewards-info-row">
              <span>Total Genesis WAX tokens: </span>
              <span>{genesisTotalBal ? genesisTotalBal: '0 WAX'}</span>
            </div>
            <div className="rewards-info-row">
              <span>Daily Rewards: </span>
              <span>234234.4646 WAX</span>
            </div>
            <div className="rewards-info-row">
              <span>Rewards earned to date: </span>
              <span>234234.4646 WAX</span>
            </div>
            <div className="rewards-info-row">
              <span>Total staking/voter rewards pending: </span>
              <span>{totalPending.toFixed(6)} WAX</span>
            </div>

          </div>
        </Modal.Content>
      </Modal>
    );
  }

}

StakingModal.propTypes = {};

StakingModal.defaultProps = {};

const mapStateToProps = state => {
  return {
    settings: state.settings,
    globals: state.globals,
    accounts: state.accounts,
    balances: state.balances,
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

export default connect(mapStateToProps, mapDispatchToProps)(StakingModal);