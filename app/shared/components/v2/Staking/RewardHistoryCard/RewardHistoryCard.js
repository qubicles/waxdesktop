import React from "react";
import PropTypes from "prop-types";
import { Chart } from "react-google-charts";
import { Decimal } from 'decimal.js';
import { find } from "lodash";
import eos from '../../../../actions/helpers/eos';
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
import * as GlobalsActions from "../../../../actions/globals";

import Balance from "../../Dashboard/Balance/Balance";
import "./RewardHistoryCard.global.css";

const initBalData = [
  ['Date', 'Amount'],
  [0, 0],
  [1, 0]
]
class RewardHistoryCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      balData: initBalData,
      lastClaimTime: {},
      nextClaimTime: {},
      voteRewardsDue: 0,
      stakedBalance: 0,
      secondsSinceClaimed: 0,
      genesisTotalBal: 0,
      gbmRewards: 0,
      totalVoteRewards: 0,
      dateSince: 0,
    };
  }
  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 5000);
    // get stake CPU/NET history
    const { connection, settings } = this.props;
    eos(connection).getActions(settings.account, -1, -100000).then((results) => {
      if (results && results.actions) {
        let mapVoteAmt = 0;
        let firstVoteTime = [];
        let totalRewards = 0;
        let rewardsHistoryArr = [];
        results.actions.map(action => {
          if (action && action.action_trace && action.action_trace.act) {
            const trace = action.action_trace.act;
            if (trace.name == "delegatebw" && trace.data.from == "eosio.voters") {
              mapVoteAmt += parseFloat(trace.data.amount);
              firstVoteTime.push(new Date(action.block_time).getTime());
              rewardsHistoryArr.push([new Date(action.block_time).getTime(), trace.data.amount]);
            }

            if (trace.name == "transfer" && trace.data.from == "genesis.wax") {
              rewardsHistoryArr.push([new Date(action.block_time).getTime(), trace.data.amount]);
            }
          }
        });

        firstVoteTime.sort(function (a, b) {
          return a - b;
        });

        rewardsHistoryArr.sort(function (a, b) {
          return a[0] - b[0];
        });

        let sortRewardsHis = rewardsHistoryArr.map((data) => {
          totalRewards += data[1];
          return [data[0], totalRewards]
        })

        sortRewardsHis.unshift(['Date', 'Amount']);
        // console.log(rewardsHistoryArr);
        const voteRangeDay = (new Date().getTime() - firstVoteTime[0]) / 86400000;
        this.setState({
          totalVoteRewards: mapVoteAmt,
          dateSince: voteRangeDay,
          balData: sortRewardsHis[1] ? sortRewardsHis : initBalData
        })
      }
    })
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

  render() {
    const { genesisTotalBal, voteRewardsDue, gbmRewards, totalVoteRewards, dateSince, balData } = this.state;
    const totalPending = gbmRewards != 0 ? parseFloat(voteRewardsDue) + parseFloat(gbmRewards.split(" ")[0]) : voteRewardsDue;
    const totalRewards = parseFloat(genesisTotalBal) + parseFloat(totalVoteRewards);
    const dailyRewards = totalRewards / dateSince;
    const monthRewards = dailyRewards * 31;
    return (
      <div className="staking-history-container">
        <div className="staking-history-board">
          <div className="staking-history-header">
            <div className="header-left">
              <div>Reward History</div>
              <div> Earned: {totalRewards.toFixed(2)} WAX</div>
            </div>
            <div className="header-right">
              <div>Est Rewards</div>
              <div>{dailyRewards ? dailyRewards.toFixed(2): '0.00' } WAX Per Day</div>
            </div>
          </div>
          <div className="staking-history-body">
            <Chart
              width={370}
              height={170}
              chartType="LineChart"
              loader={<div>Loading Chart</div>}
              data={balData}
              className="staking-history-img"
              options={{
                title: 'Balance History',
                hAxis: {
                  title: 'Date',
                  gridlines: {
                    color: 'transparent'
                  }
                },
                vAxis: {
                  minValue: 0,
                  gridlines: {
                    color: '#707070'
                  },
                  baselineColor: 'transparent'
                },
                // For the legend to fit, we make the chart area smaller
                chartArea: { width: '100%', height: '100%' },
                series: {
                  0: { color: '#ff886d' },
                },
                backgroundColor: 'transparent',
                lineWidth: 4,
                curveType: 'function',
              }}
            />
            <div className="history-body-right">
              <div className="history-body-des">
                <div>Est. APR</div>
                <div>4.39% Annually</div>
              </div>
              <div className="history-body-des">
                <div>Monthly Rewards</div>
                <div>{monthRewards ? monthRewards.toFixed(2): '0.00'} WAX</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

RewardHistoryCard.propTypes = {};

RewardHistoryCard.defaultProps = {};

const mapStateToProps = state => {
  return {
    settings: state.settings,
    globals: state.globals,
    accounts: state.accounts,
    balances: state.balances,
    connection: state.connection,
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

export default connect(mapStateToProps, mapDispatchToProps)(RewardHistoryCard);
