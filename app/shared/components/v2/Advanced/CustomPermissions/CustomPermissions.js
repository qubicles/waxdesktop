
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Radio, Menu, Checkbox } from "semantic-ui-react"
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";


import * as GlobalsActions from "../../../../actions/globals";
import * as AccountActions from "../../../../actions/accounts";
import * as SettingsActions from '../../../../actions/settings';
import PermissionModal from "./PermissionModal/PermissionModal";
import "./CustomPermissions.global.css"

class CustomPermissions extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            openModal: false,
        }
    }
    togglePermissionModal = () => {
        const { openModal } = this.state;
        this.setState({ openModal: !openModal });
    };

    goBack = () => {
        this.props.history.push("/advanced")
    }

    render() {
        const { settings, accounts } = this.props;
        const { openModal } = this.state;

        let account = accounts[settings.account];

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
                                            <img src={require('../../../../../renderer/assets/images/dashboard/Group1737.png')} />
                                        </div>
                                    )
                                })
                            })}
                            <div className="new-permission-btn" onClick={this.togglePermissionModal}>
                                Create New Permission
                                <img src={require('../../../../../renderer/assets/images/advanced/Group1730.png')} />
                            </div>
                        </div>
                    </div>
                </div>
                <PermissionModal
                    closeModal={this.togglePermissionModal}
                    modalOpen={openModal}
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
        keys: state.keys
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            ...AccountActions,
            ...GlobalsActions,
            ...SettingsActions
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CustomPermissions);
