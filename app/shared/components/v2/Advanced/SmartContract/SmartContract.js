import React, { Component } from "react";
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

import * as GlobalsActions from "../../../../actions/globals";
import * as AccountActions from "../../../../actions/accounts";
import * as SettingsActions from '../../../../actions/settings';
import * as ContractsActions from "../../../../actions/contracts";
import * as TableActions from "../../../../actions/table";
import * as TransactionActions from "../../../../actions/transaction";

import EOSContract from '../../../../utils/EOS/Contract';

import ContractInterfaceSelectorContract from "./Selector/Contract";
import ContractInterfaceTabActions from "./Tab/Actions";
import ContractInterfaceTabTables from "./Tab/Tables";
import ContractInterfaceTabData from "./Tab/Data";

import "./SmartContract.global.css";
import { from } from "form-data";

class SmartContract extends Component {
    state = {
        contractAction: '',
        contractName: '',
        contractTable: '',
        contractTableScope: ''
    }
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
    // Reset table scope to prevent visibility element from retriggering constantly
    onTabChange = () => this.setState({
        contractTable: '',
        contractTableScope: ''
    });
    resetContract = () => this.setState({ contractName: '' });

    render() {
        const {
            actions,
            blockExplorers,
            contracts,
            settings,
            system,
            tables,
            transaction
        } = this.props;

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

        const panes = [
            {
                menuItem: (
                    <Menu.Item key="actions">
                        <img
                            src={require("../../../../../renderer/assets/images/advanced/edit1.png")}
                            style={{ width: 15, height: 15, marginRight: 10 }}
                        />
                  Actions
                    </Menu.Item>
                ),
                pane: {
                    key: 'actions',
                    attached: false,
                    content: (
                        <ContractInterfaceTabActions
                            actions={actions}
                            blockExplorers={blockExplorers}
                            contract={contract}
                            contractAction={contractAction}
                            onChange={this.onChange}
                            onSubmit={this.onSubmit}
                            settings={settings}
                            system={system}
                            transaction={transaction}
                        />
                    )
                }
            },
            {
                menuItem: (
                    <Menu.Item key="tables">
                        <img
                            src={require("../../../../../renderer/assets/images/advanced/grid1.png")}
                            style={{ width: 15, height: 15, marginRight: 10 }}
                        />
                      Tables
                    </Menu.Item>
                ),
                pane: {
                    key: 'tables',
                    attached: false,
                    content: (
                        <ContractInterfaceTabTables
                            actions={actions}
                            contract={contract}
                            contractTable={contractTable}
                            contractTableScope={contractTableScope}
                            onChange={this.onChange}
                            onSet={this.onSet}
                            tables={tables}
                        />
                    )
                }
            },
            {
                menuItem: (
                    <Menu.Item key="abi">
                        <img
                            src={require("../../../../../renderer/assets/images/advanced/portable-document-format.png")}
                            style={{ width: 15, height: 15, marginRight: 10 }}
                        />
                      ABI
                    </Menu.Item>
                ),
                pane: {
                    key: 'abi',
                    attached: false,
                    content: (
                        <ContractInterfaceTabData
                            contract={contract}
                        />
                    )
                }
            },
        ];

        return (
            <div className="dashboard-container">
                <div className="dashboard-body-section">
                    {(validContract)
                        ? (
                            <div className="smartContractActions-section">
                                <div className="smartContractActions-header">
                                    <img
                                        src={require("../../../../../renderer/assets/images/advanced/down-arrow1.png")}
                                        onClick={this.resetContract}
                                    />
                                </div>
                                <div className="smartContractActions-body">
                                    <div className="w-title">Smart Contracts</div>
                                    <div className="w-account-name">
                                        <div>{contractName}</div>
                                        <div onClick={this.resetContract}>Change Contract</div>
                                    </div>
                                    <div className="smartContractActions-tab">
                                        <Tab
                                            defaultActiveIndex={0}
                                            onTabChange={this.onTabChange}
                                            panes={panes}
                                            renderActiveOnly={false}
                                            className="smartActions-tab"
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                        : (
                            <div className="smartContractAccount-section">
                                <div className="smartContractAccount-header">
                                    <img
                                        src={require("../../../../../renderer/assets/images/advanced/down-arrow1.png")}
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
                                            onReset={this.resetContract}
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
        transaction: state.transaction,
        tables: state.tables
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            ...AccountActions,
            ...GlobalsActions,
            ...SettingsActions,
            ...ContractsActions,
            ...TableActions,
            ...TransactionActions
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SmartContract);
