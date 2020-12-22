
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio, Menu, Checkbox } from "semantic-ui-react"
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import eos from '../../../../actions/helpers/eos';
import EOSAccount from '../../../../utils/EOS/Account';
import EOSContract from '../../../../utils/EOS/Contract';

import * as GlobalsActions from "../../../../actions/globals";
import * as AccountActions from "../../../../actions/accounts";
import * as SettingsActions from '../../../../actions/settings';
import * as WalletActions from '../../../../actions/wallet';
import * as ContractsActions from '../../../../actions/contracts';
import * as SystemActions from '../../../../actions/system/updateauth';

import PermissionModal from "./PermissionModal/PermissionModal";
import "./CustomPermissions.global.css"

class CustomPermissions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
            linkAuthHistory: [],
            auth: false,
            modalKey: 123,
        }
    }

    componentDidMount() {
        const {
            actions,
            connection,
            settings
        } = this.props;
        actions.getAbi('eosio');
        actions.getAccount(settings.account);

        eos(connection).getActions(settings.account, -1, -100000).then((results) => {
            if (results && results.actions) {
                const linkAuthHistory = [...this.state.linkAuthHistory];
                results.actions.map(action => {
                    if (action && action.action_trace && action.action_trace.act) {
                        const trace = action.action_trace.act;
                        if (trace.name == "linkauth") {
                            linkAuthHistory.push(trace.data);
                        }
                    }
                });
                this.setState({ linkAuthHistory });
            }
        })
    }

    togglePermissionModal = (data) => {
        const { openModal } = this.state;
        this.setState({
            auth: data ? data : false,
            modalKey: +new Date(),
            openModal: !openModal,
        });
    };

    goBack = () => {
        this.props.history.push("/advanced")
    }

    render() {
        const {
            accounts,
            actions,
            blockExplorers,
            contracts,
            keys,
            settings,
            system,
            t,
            validate,
            wallet,
            connection
        } = this.props;
        const {
            linkAuthHistory,
            auth,
            openModal,
            modalKey
        } = this.state;
        const account = accounts[settings.account];
        if (!account) return false;

        let { pubkey } = wallet;
        if (!pubkey) {
            if (keys && keys.pubkey) {
                ({ pubkey } = keys);
            }
        }
        let authorization = new EOSAccount(account).getAuthorization(pubkey, true);
        if (settings.walletMode === 'watch') {
            authorization = {
                perm_name: settings.authorization
            };
        }

        // Ensure the contract is loaded and valid
        let contract = null;
        if (contracts && contracts.eosio && contracts.eosio.abi)
            contract = new EOSContract(contracts.eosio.abi, 'eosio');

        const contractActions = contract &&
            contract.getActions().filter((action) => {
                return ['updateauth', 'deleteauth', 'linkauth',
                    'unlinkauth', 'canceldelay', 'init',
                    'onblock', 'onerror', 'setabi', 'setalimits',
                    'setpriv', 'setcode', 'setparams', 'setram',
                    'setramrate', 'updtrevision'].indexOf(action.name) === -1
            }).map((action) => {
                return {
                    text: action.name,
                    value: action.type
                }
            });

        return (
            <div className="dashboard-container">
                <div className="dashboard-body-section">
                    <div className="customPermissions-section">
                        <div className="customPermissions-header">
                            <img src={require('../../../../../renderer/assets/images/advanced/down-arrow1.png')} onClick={this.goBack} />
                        </div>
                        <div className="customPermissions-body">
                            <div className="w-title">
                                Custom Permissions
                            </div>
                            <h3>Standard and custom permissions</h3>
                            <div className="active-p-key">
                                <img src={require('../../../../../renderer/assets/images/advanced/password.png')} />
                                <div className="p-key-des">
                                    <div>Active Public Key:</div>
                                    <div>EOS7alsdkfjaosijGzlkJLKJOiksjflsadkjDFKJDLFJEKJDL</div>
                                </div>
                            </div>
                            {account.permissions.map((data) => {
                                return data.required_auth.keys.map((key, index) => {
                                    return (
                                        <div className="active-permission" key={index}>
                                            <div className="active-permission-left">
                                                <img src={require('../../../../../renderer/assets/images/advanced/padlock.png')} />
                                                <div className="active-permission-des">
                                                    <div style={{ textTransform: "capitalize" }}>{data.perm_name} Permission</div>
                                                    <div>1 of 1 (child of owner)</div>
                                                    <div>{key.key}</div>
                                                </div>
                                            </div>
                                            {
                                                (
                                                    !authorization
                                                    || (data.perm_name === 'owner' && authorization.perm_name !== 'owner')
                                                    || (data.perm_name === 'active' && !(['active', 'owner'].includes(authorization.perm_name)))
                                                )
                                                    ? false
                                                    : (
                                                        <div onClick={() => this.togglePermissionModal(data)}>
                                                            <img src={require('../../../../../renderer/assets/images/dashboard/Group1737.png')} />
                                                        </div>
                                                    )
                                            }

                                        </div>
                                    )
                                })
                            })}
                            <div className="new-permission-btn" onClick={() => this.togglePermissionModal()}>
                                Create New Permission
                                <img src={require('../../../../../renderer/assets/images/advanced/Group1730.png')} />
                            </div>
                        </div>
                    </div>
                </div>
                <PermissionModal
                    closeModal={this.togglePermissionModal}
                    modalOpen={openModal}
                    actions={actions}
                    auth={auth}
                    contractActions={contractActions}
                    linkAuthHistory={linkAuthHistory}
                    pubkey={pubkey}
                    settings={settings}
                    connection={connection}
                    key={modalKey}
                />
            </div>
        )
    }
}


CustomPermissions.propTypes = {};

CustomPermissions.defaultProps = {};


const mapStateToProps = (state) => {
    return {
        balances: state.balances,
        settings: state.settings,
        globals: state.globals,
        accounts: state.accounts,
        blockExplorers: state.blockexplorers,
        keys: state.keys,
        wallet: state.wallet,
        contracts: state.contracts,
        connection: state.connection,

    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            ...AccountActions,
            ...GlobalsActions,
            ...SettingsActions,
            ...WalletActions,
            ...ContractsActions,
            ...SystemActions,
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPermissions);
