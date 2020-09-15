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
  Checkbox,
  Form,
  Input
} from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import debounce from 'lodash/debounce';
import { mapValues } from 'lodash';

import * as GlobalsActions from "../../../../../actions/globals";
import * as AccountActions from "../../../../../actions/accounts";
import * as SettingsActions from '../../../../../actions/settings';
import * as ContractsActions from "../../../../../actions/contracts";

import ContractInterfaceSelectorContract from "../Selector/Contract";
import EOSContract from '../../../../../utils/EOS/Contract';

import SmartContractActions from "../SmartContractActions/SmartContractActions";

import Balance from "../../../Dashboard/Balance/Balance";
import "./SmartContractAccount.global.css";

class SmartContractAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      contractAction: '',
      contractName: '',
      contractTable: '',
      contractTableScope: ''
    };
  }

  goBack = () => {
    this.props.history.push("/advanced");
  };

  clearState = () => {
    this.setState({
      contractAction: '',
      contractName: '',
      contractTable: '',
      contractTableScope: ''
    })
  };

  isValidContract = (name) => {
    const { contracts } = this.props;
    return (
      contracts[name]
      && contracts[name] instanceof EOSContract
    );
  }

  onChange = (e, { name, value }) => {
    const state = { [name]: value };
    // Reset the selected action if the contract name changes
    if (name === 'contractName' && value !== this.state.contractName) {
      state.contractAction = '';
      state.contractTable = '';
      state.contractTableScope = '';
    }
    this.setState(state);
  }

  onSet = (data, callback = () => { }) => this.setState(data, callback)

  onSubmit = () => {
    const { actions } = this.props;
    const { contractName } = this.state;
    actions.getAbi(contractName);
  }

  render() {
    const { actions, settings, blockExplorers, system, transaction, contracts, history } = this.props;

    const {
      contractAction,
      contractName,
      contractTable,
      contractTableScope
    } = this.state;

    // Ensure the contract is loaded and valid
    const validContract = this.isValidContract(contractName);
    // The selected contract
    const contract = (validContract) ? contracts[contractName] : null;


    return (
      <div className="dashboard-container">
        <div className="dashboard-body-section">
          {validContract ? (
            <SmartContractActions 
              contractName={contractName}
              clearState={this.clearState}
            />
          ) : (
              <div className="smartContractAccount-section">
                <div className="smartContractAccount-header">
                  <img
                    src={require("../../../../../../renderer/assets/images/advanced/down-arrow1.png")}
                    onClick={this.goBack}
                  />
                </div>
                <div className="smartContractAccount-body">
                  <div className="w-title">Smart Contracts</div>
                  <div className="seller-input">
                    <div className="input-title">Contract Account Name</div>
                    <ContractInterfaceSelectorContract
                      contract={contract}
                      contractName={contractName}
                      onSet={this.onSet}
                      onSubmit={this.onSubmit}
                      settings={settings}
                    />
                  </div>
                </div>
              </div>
            )
          }
        </div>
      </div>
    );
  }
}
SmartContractAccount.propTypes = {};

SmartContractAccount.defaultProps = {};

const mapStateToProps = (state) => {
  const contracts = mapValues(state.contracts, (contract) =>
    new EOSContract(contract.abi, contract.account_name));
  return {
    balances: state.balances,
    settings: state.settings,
    globals: state.globals,
    accounts: state.accounts,
    blockExplorers: state.blockexplorers,
    contracts,
    system: state.system,
    transaction: state.transaction
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...AccountActions,
      ...GlobalsActions,
      ...SettingsActions,
      ...ContractsActions
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartContractAccount);