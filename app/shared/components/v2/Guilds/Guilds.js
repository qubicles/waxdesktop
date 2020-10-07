import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
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

import Balance from "../Dashboard/Balance/Balance";
import ProxiesTab from "./ProxiesTab";
import GuildsTab from "./GuildsTab";
import "./Guilds.global.css";
import ProducersVotingPreview from "./Preview";

import * as AccountsActions from "../../../actions/accounts";
import * as ArbitrationActions from "../../../actions/governance/arbitration";
import * as BlockExplorersActions from "../../../actions/blockexplorers";
import * as BuyRamBytesActions from "../../../actions/system/buyrambytes";
import * as BuyRamActions from "../../../actions/system/buyram";
import * as ContractsActions from "../../../actions/contracts";
import * as CreateAccountActions from "../../../actions/createaccount";
import * as ChainActions from "../../../actions/chain";
import * as GlobalsActions from "../../../actions/globals";
import * as ProducersActions from "../../../actions/producers";
import * as ProposalsActions from "../../../actions/governance/proposals";
import * as ProxyActions from "../../../actions/system/community/regproxyinfo";
import * as REXActions from "../../../actions/rex";
import * as SellRamActions from "../../../actions/system/sellram";
import * as SettingsActions from "../../../actions/settings";
import * as StakeActions from "../../../actions/stake";
import * as TableActions from "../../../actions/table";
import * as TFVotingActions from "../../../actions/governance/tfvoting";
import * as TransactionActions from "../../../actions/transaction";
import * as TransferActions from "../../../actions/transfer";
import * as ValidateActions from "../../../actions/validate";
import * as VoteProducerActions from "../../../actions/system/voteproducer";
import * as WalletActions from "../../../actions/wallet";
import * as SystemStateActions from "../../../actions/system/systemstate";

class Guilds extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      choices: {
        guilds: [],
        proxy: ""
      },
      amount: 50,
      lastError: false,
      lastTransaction: {},
      previewing: false,
      querying: false,
      selected: [],
      selected_account: false,
      selected_loaded: false,
      submitting: false,
      activeTabIndex: 0
    };
  }

  componentWillReceiveProps(nextProps) {
    const { validate } = this.props;
    const { settings, system } = nextProps;
    const nextValidate = nextProps.validate;
    // On a new node connection, update props + producers
    if (validate.NODE === "PENDING" && nextValidate.NODE === "SUCCESS") {
      this.props.actions.getGlobals();
    }
    // Update state when the transaction has gone through
    if (
      this.state.submitting &&
      (this.state.lastTransaction !== system.VOTEPRODUCER_LAST_TRANSACTION ||
        this.state.lastError !== system.VOTEPRODUCER_LAST_ERROR)
    ) {
      this.setState({
        lastError: system.VOTEPRODUCER_LAST_ERROR,
        lastTransaction: system.VOTEPRODUCER_LAST_TRANSACTION,
        submitting: false
      });
    }
    // If no selected are loaded, attempt to retrieve them from the props
    if (
      !this.state.selected_loaded ||
      this.state.selected_account !== settings.account ||
      (nextProps.producers.proxy &&
        nextProps.producers.proxy !== this.state.selected_account)
    ) {
      const { accounts } = nextProps;
      // If an account is loaded, attempt to load it's votes
      if (settings.account && accounts[settings.account]) {
        const account = accounts[settings.account];
        if (account.voter_info) {
          const selected_account =
            account.voter_info.proxy || account.account_name;
          let selected = account.voter_info.producers;
          if (
            selected_account !== settings.account &&
            accounts[selected_account]
          ) {
            selected = accounts[selected_account].voter_info.producers;
          }
          // If the voter_info entry exists, load those votes into state
          this.setState({
            selected,
            selected_account,
            selected_loaded: true
          });
        } else {
          // otherwise notify users that they must stake before allowed voting
        }
      }
    }
  }

  addProducer = (producer) => {
    const producers = [...this.state.selected];
    if (producers.indexOf(producer) === -1) {
      producers.push(producer);
      producers.sort();
      this.setState({
        selected: producers
      });
    }
  }

  removeProducer = (producer) => {
    const producers = [...this.state.selected];
    const index = producers.indexOf(producer);
    if (index !== -1) {
      producers.splice(index, 1);
    }
    this.setState({
      selected: producers
    });
  }

  previewProducerVotes = previewing =>
    this.setState({
      previewing,
      lastError: false, // Reset the last error
      lastTransaction: {} // Reset the last transaction
    });

  submitProducerVotes = () => {
    const { clearSystemState, voteproducers } = this.props.actions;
    const { selected } = this.state;
    const { producers } = this.props;
    clearSystemState();
    //make sure selected producers weren't kicked
    //while user was in the research process
    const compliantProducers = producers.list
      .filter(p => {
        return selected.indexOf(p.owner) !== -1;
      })
      .map(s => {
        return s.owner;
      });

    voteproducers(compliantProducers);
    this.setState({
      lastError: false, // Reset the last error
      lastTransaction: {}, // Reset the last transaction
      submitting: true
    });
  };

  emptyChoices = () => {
    this.setState({ choices: { guilds: [], proxies: "" } });
  };

  getPanes() {
    const guildsPan = {
      menuItem: (
        <Menu.Item key="messages" onClick={this.emptyChoices}>
          <img
            src={require("../../../../renderer/assets/images/dashboard/dashboard-guilds.png")}
            style={{ width: 15, height: 15, marginRight: 10 }}
          />
          Guilds
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane attached={false}>
          <GuildsTab
           selected={this.state.selected}
           addProducer={this.addProducer.bind(this)}
           removeProducer={this.removeProducer.bind(this)}
          />
        </Tab.Pane>
      )
    };

    const proxiesPan = {
      menuItem: (
        <Menu.Item key="messages" onClick={this.emptyChoices}>
          <img
            src={require("../../../../renderer/assets/images/marketplace/Group565.png")}
            style={{ width: 15, height: 15, marginRight: 10 }}
          />
          Proxies
        </Menu.Item>
      ),
      render: () => (
        <Tab.Pane attached={false}>
          <ProxiesTab />
        </Tab.Pane>
      )
    };
    return [guildsPan, proxiesPan];
  }

  render() {
    const {
      choices,
      lastError,
      lastTransaction,
      previewing,
      selected,
      submitting
    } = this.state;
    const { actions, blockExplorers, system, settings } = this.props;

    const confirmVotesButton =
      <div className="confirm-btn-wrap">
        <div className="confirm-btn">
          <h3>Confirm Votes</h3>
          <Image
            src={require("../../../../renderer/assets/images/dashboard/correct3.png")}
          />
        </div>
      </div>

    return (
      <div className="dashboard-container">
        <div className="dashboard-body-section">
          <div className="guilds-section">
            <Tab
              menu={{ secondary: true, pointing: true }}
              panes={this.getPanes()}
              className="guilds-tab"
            />
            <ProducersVotingPreview
              actions={actions}
              blockExplorers={blockExplorers}
              lastError={lastError}
              lastTransaction={lastTransaction}
              open={previewing}
              onClose={() => this.previewProducerVotes(false)}
              onConfirm={this.submitProducerVotes.bind(this)}
              onOpen={() => this.previewProducerVotes(true)}
              selected={selected}
              settings={settings}
              submitting={submitting}
              system={system}
              confirmVotesButton={selected.length > 0 && confirmVotesButton}
            />
          </div>
        </div>
        {/* <Balance /> */}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    accounts: state.accounts,
    actionHistories: state.actions,
    arbitration: state.arbitration,
    balances: state.balances,
    blockExplorers: state.blockexplorers,
    chain: state.chain,
    connection: state.connection,
    contracts: state.contracts,
    globals: state.globals,
    keys: state.keys,
    producers: state.producers,
    proposals: state.proposals,
    rex: state.rex,
    settings: state.settings,
    system: state.system,
    tables: state.tables,
    tfvoting: state.tfvoting,
    transaction: state.transaction,
    validate: state.validate,
    wallet: state.wallet
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(
      {
        ...AccountsActions,
        ...ArbitrationActions,
        ...BlockExplorersActions,
        ...BuyRamActions,
        ...BuyRamBytesActions,
        ...ChainActions,
        ...ContractsActions,
        ...CreateAccountActions,
        ...GlobalsActions,
        ...ProducersActions,
        ...ProposalsActions,
        ...ProxyActions,
        ...REXActions,
        ...SellRamActions,
        ...SettingsActions,
        ...StakeActions,
        ...SystemStateActions,
        ...TableActions,
        ...TFVotingActions,
        ...TransactionActions,
        ...TransferActions,
        ...ValidateActions,
        ...VoteProducerActions,
        ...WalletActions
      },
      dispatch
    )
  };
}

Guilds.propTypes = {};

Guilds.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Guilds);
