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
import { Decimal } from 'decimal.js';
import { bindActionCreators } from "redux";
import * as AccountActions from "../../../../actions/accounts";
import * as SettingsActions from "../../../../actions/settings";
import * as GlobalsActions from "../../../../actions/globals"
import StakingModal from "../Modals/StakingModal/StakingModal"
import "./CurrentStackingCard.global.css";


class CurrentStackingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stakingModal: false,
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
    
    if (accounts[settings.account]) {
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

  toggleStakingModal = () => {
    const { stakingModal } = this.state;
    this.setState({ stakingModal: !stakingModal });
  };

  render() {
    const { stakingModal, genesisTotalBal, voteRewardsDue, gbmRewards } = this.state;
    const { history, location, accounts, settings, globals, actions } = this.props;
    const totalPending = gbmRewards != 0 ? parseFloat(voteRewardsDue) + parseFloat(gbmRewards.split(" ")[0]): voteRewardsDue;

    return (
      <div className="staking-card-left">
        <div className="staking-card-logo">
          <img
            src={require("../../../../../renderer/assets/images/marketplace/ScrollGroup3.png")}
          />
          <div className="staking-card-des">
            <div>Pending Rewards</div>
            <div>{totalPending.toFixed(8)} WAX</div>
          </div>
        </div>
        <Button 
          className="stake-card-btn"
          onClick={this.toggleStakingModal}
          disabled={!accounts[settings.account]}
        >
          Staking Rewards
        </Button>
        {stakingModal && (
          <StakingModal
            closeModal={this.toggleStakingModal}
            modalOpen={stakingModal}
            history={history}
            actions={actions}
            location={location}
            settings={settings}
          />
        )}
      </div>
    );
  }
}

CurrentStackingCard.propTypes = {};

CurrentStackingCard.defaultProps = {};

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

export default connect(mapStateToProps, mapDispatchToProps)(CurrentStackingCard);
