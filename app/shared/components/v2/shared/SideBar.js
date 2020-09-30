import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'
import "./SideBar.global.css";
import { Dropdown } from "semantic-ui-react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import * as GlobalsActions from "../../../actions/globals";
import * as AccountActions from "../../../actions/accounts";
import * as SettingsActions from '../../../actions/settings';
import * as TransferActions from '../../../actions/transfer';
import * as CreateAccountActions from '../../../actions/createaccount';

import CreateAccountModal from "../Dashboard/Modals/CreateAccountModal/CreateAccountModal";
import ImportAccountModal from "../Dashboard/Modals/ImportAccountModal/ImportAccountModal"

const SideBar = (props) => {
    const { allAccounts } = props.accounts
    const [createAccountModal, toggleCreateAccountModal] = useState(false);
    const [currentAccount, setCurrentAccount] = useState(allAccounts[2]);
    const [importAccountModal, toggleImportAccountModal] = useState(false);

    const handleChange = (e, { name, value }) => {
        setCurrentAccount(value)
        switch (value) {
            case "createAccount":
                toggleCreateAccountModal(true);
                break;
            case "importAccount":
                toggleImportAccountModal(true);
                break;
            default:
                return null;
        }
    }
    const DropdownExampleSelection = () => (
        <Dropdown
            fluid
            selection
            scrolling
            upward
            options={allAccounts}
            className="left-nav-dropdown"
            onChange={(e, data) => handleChange(e, data)}
            value={currentAccount}
        />
    );
    const menuOption = [
        {
            text: 'Home',
            value: 'dashboard',
            image: require('../../../../renderer/assets/images/dashboard/dashboard-home.png'),
        },
        {
            text: 'Market',
            value: 'marketplace',
            image: require('../../../../renderer/assets/images/dashboard/dashboard-market.png'),
        },
        {
            text: 'Apps',
            value: 'apps',
            image: require('../../../../renderer/assets/images/dashboard/dashboard-apps.png'),
        },
        {
            text: 'Staking',
            value: 'staking',
            image: require('../../../../renderer/assets/images/dashboard/dashboard-stacking.png'),
        },
        {
            text: 'Guilds',
            value: 'guilds',
            image: require('../../../../renderer/assets/images/dashboard/dashboard-guilds.png'),
        },
        {
            text: 'Advanced',
            value: 'advanced',
            image: require('../../../../renderer/assets/images/dashboard/dashabord-advanced.png'),
        },
    ]

    const menuSection = (menuOption.map(item => (
        <Link to={`/${item.value}`} key={item.value}>
            <div className="nav-item-wrap" >
                <img src={item.image} />
                <div className="nav-item-title">
                    {item.text}
                </div>
            </div>
        </Link>
    )))

    const { accounts, balances, connection, globals, settings, system, actions } = props;

    return (
        <div className="nav-section">
            <div className="logo-section">
                <div className="logo-img-wrap">
                    <div className="logo-rect2-wrap">
                        <div className="logo-rect2"></div>
                    </div>
                    <div className="logo-rect1-wrap">
                        <div className="logo-rect1"></div>
                    </div>
                </div>
                <div className="logo-text-wrap">
                    <h3 className="pin-wax">WAX</h3>
                    <h4 className="pin-desktop">D E S K T O P</h4>
                </div>
            </div>

            <div className="nav-items-section">
                {menuSection}
            </div>

            <div className="nav-select-section">
                <DropdownExampleSelection />
            </div>
            {createAccountModal &&
                <CreateAccountModal
                    settings={settings}
                    balances={balances}
                    globals={globals}
                    accounts={accounts}
                    system={system}
                    connection={connection}
                    closeModal={() => toggleCreateAccountModal(false)}
                    modalOpen={createAccountModal}
                    history={history}
                    actions={actions}
                    location={location}
                />}
            {importAccountModal &&
                <ImportAccountModal
                    settings={settings}
                    balances={balances}
                    globals={globals}
                    accounts={accounts}
                    system={system}
                    connection={connection}
                    closeModal={() => toggleImportAccountModal(false)}
                    modalOpen={importAccountModal}
                    history={history}
                    actions={actions}
                    location={location}
                />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        balances: state.balances,
        settings: state.settings,
        globals: state.globals,
        accounts: state.accounts,
        system: state.system,
        connection: state.connection,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            ...AccountActions,
            ...GlobalsActions,
            ...SettingsActions,
            ...TransferActions,
            ...CreateAccountActions
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

