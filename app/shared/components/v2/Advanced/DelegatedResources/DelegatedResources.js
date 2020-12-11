import React from "react"
import PropTypes from "prop-types"
import DelegateModal from "../../Dashboard/Modals/DelegateModal/DelegateModal"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio, Menu, Checkbox } from "semantic-ui-react"
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { sortBy } from 'lodash';

import * as GlobalsActions from "../../../../actions/globals";
import * as AccountActions from "../../../../actions/accounts";
import * as SettingsActions from '../../../../actions/settings';
import * as TableActions from '../../../../actions/table';
import "./DelegatedResources.global.css"

const initialState = {
    delegateModal: false,
}

class DelegatedResources extends React.Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.tick();
        this.interval = setInterval(this.tick.bind(this), 30000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        const {
            actions,
            settings
        } = this.props;

        actions.getTable('eosio', settings.account, 'delband');
    }
    removeDelegation = (delegate, type) => {
        const {
            actions
        } = this.props; 

        const {
            setStake
        } = actions;

        setStake(accountName, netOriginal.plus(decimalNetAmount), cpuOriginal.plus(decimalCpuAmount));
    }

    toggleDelegateModal = () => {
        const { delegateModal } = this.state
        this.setState({ delegateModal: !delegateModal })
    }

    goBack = () => {
        this.props.history.push("/advanced")
    }

    render() {
        const { delegateModal } = this.state
        const { wallet, actions, history, location, tokens, tables, settings } = this.props

        let delegations = tables &&
            tables.eosio &&
            tables.eosio[settings.account] &&
            tables.eosio[settings.account].delband.rows;

        if (!delegations && settings.account.indexOf('.') > 0) {
            const prefix = settings.account.split('.')[0];
            const suffix = settings.account.split('.')[1];
            delegations =
                tables &&
                tables.eosio &&
                tables.eosio[prefix] &&
                tables.eosio[prefix][suffix] &&
                tables.eosio[prefix][suffix].delband &&
                tables.eosio[prefix][suffix].delband.rows;
        }

        const delegationsToDisplay = sortBy(delegations, 'accountName');

        return (
            <div className="dashboard-container">
                <div className="dashboard-body-section">
                    <div className="DelegatedResources-section">
                        <div className="DelegatedResources-header">
                            <img src={require('../../../../../renderer/assets/images/advanced/down-arrow1.png')} onClick={this.goBack} />
                        </div>
                        <div className="DelegatedResources-body">
                            <div className="w-title">
                                Delegated Resources
                            </div>
                            <div className="del-table">
                                <div className="del-table-header">
                                    <div className="header-account">Account</div>
                                    <div className="header-amount">Amount</div>
                                    <div className="header-type">Type</div>
                                    <div className="header-action"></div>
                                </div>
                                <div className="del-table-body">
                                    {
                                        delegationsToDisplay.map((delegation) => (
                                            <div>
                                                {
                                                    (delegation.cpu_weight && parseFloat(delegationsToDisplay[0].cpu_weight.match(/[\d\.]+/)[0]) > 0) ? (
                                                        <div className="del-table-row">
                                                            <div className="body-account">{delegation.to}</div>
                                                            <div className="body-amount">{delegation.cpu_weight}</div>
                                                            <div className="body-type">CPU</div>
                                                            {
                                                                (delegation.to !== settings.account)
                                                                    ? (
                                                                        <div
                                                                            className="body-action"
                                                                            onClick={() => this.removeDelegation(delegation, 'cpu')}>
                                                                            Undelegate
                                                                        </div>
                                                                    )
                                                                    : ''
                                                            }
                                                        </div>
                                                    ) : false
                                                }
                                                {
                                                    (delegation.net_weight && parseFloat(delegationsToDisplay[0].net_weight.match(/[\d\.]+/)[0]) > 0) ? (
                                                        <div className="del-table-row del-yellow-border">
                                                            <div className="body-account">{delegation.to}</div>
                                                            <div className="body-amount">{delegation.net_weight}</div>
                                                            <div className="body-type">NET</div>
                                                            {
                                                                (delegation.to !== settings.account)
                                                                    ? (
                                                                        <div
                                                                            className="body-action"
                                                                            onClick={() => this.removeDelegation(delegation, 'net')}>
                                                                            Undelegate
                                                                        </div>
                                                                    )
                                                                    : ''
                                                            }
                                                        </div>
                                                    ) : false
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className="new-permission-btn" onClick={this.toggleDelegateModal}>
                                Create New Delegation
                                <img src={require('../../../../../renderer/assets/images/advanced/Group1730.png')} />
                            </div>
                        </div>
                    </div>
                </div>
                <DelegateModal
                    closeModal={this.toggleDelegateModal}
                    modalOpen={delegateModal}
                    history={history}
                    actions={actions}
                    location={location}
                />
            </div>
        )
    }
}
DelegatedResources.propTypes = {

}

DelegatedResources.defaultProps = {

}


const mapStateToProps = (state) => {
    return {
        balances: state.balances,
        settings: state.settings,
        globals: state.globals,
        accounts: state.accounts,
        tables: state.tables,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            ...AccountActions,
            ...GlobalsActions,
            ...SettingsActions,
            ...TableActions
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DelegatedResources);