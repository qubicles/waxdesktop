
import PropTypes from "prop-types";
import React from 'react';
import { translate } from 'react-i18next';
import { delete as del, set } from 'dot-prop-immutable';
import { map, values } from 'lodash';
import SlideToggle from "react-slide-toggle";
import { Modal, Button, Checkbox, Container, Divider, Form, Message, Segment } from 'semantic-ui-react';
import ToolsFormPermissionsAuthWeightedKey from '../../../../Tools/Form/Permissions/Auth/WeightedKey';

import "./PermissionModal.global.css";

const defaultAuth = {
    perm_name: '',
    parent: 'active',
    required_auth: {
        threshold: 1,
        keys: [{
            key: '',
            weight: 1
        }],
        accounts: [],
        waits: []
    }
};
class PermissionModal extends React.Component {
    constructor(props) {
        super(props);
        let { auth } = props;
        const newAuth = !(auth);
        if (props.modalOpen) {
            if (!auth || auth.required_auth.keys.length === 0 && auth.required_auth.accounts.length === 0) {
                auth = Object.assign({}, defaultAuth);
            }
            if (!auth || auth.required_auth.keys.length === 0 && auth.required_auth.accounts.length !== 0) {
                auth = Object.assign({}, auth);
                auth.required_auth.keys.push({
                    key: '',
                    weight: 1
                });
            }
        } else {
            auth = Object.assign({}, defaultAuth);
        }

        this.state = Object.assign({}, {
            auth: {
                ...auth.required_auth,
            },
            newAuth,
            original: {
                ...auth.required_auth,
            },
            parent: auth.parent,
            permission: auth.perm_name,
            selectedActions: [],
            validFields: {},
            validForm: false,
            linkedAuth: [],
            unlinkAuth: [],
        });


    }
    componentDidMount() {
        const { auth, linkAuthHistory } = this.props;
        const permission = auth.perm_name;
        let linkedAuth = [];

        if(auth && auth.perm_name){
            linkAuthHistory.filter(item => {
                if(item.requirement == permission){
                    linkedAuth.push(item.type);
                }
            })
        }
        
        this.setState({
            validForm: auth ? true : false,
            linkedAuth: linkedAuth,
        })
    }

    addKey = (e) => {
        e.preventDefault();
        this.setState({
            auth: set(this.state.auth, `keys.${this.state.auth.keys.length}`, { key: '', weight: 1 }),
            validFields: Object.assign({}, this.state.validFields, {
                [`keys.${this.state.auth.keys.length}.key`]: false
            })
        })
    }
    onKeyChange = (e, { name, valid, value }) => {
        this.setState({
            auth: set(this.state.auth, name, value),
            validFields: Object.assign({}, this.state.validFields, { [name]: valid })
        }, () => {
            this.validateFields();
        });
    }
    validateFields = () => {
        const { validFields } = this.state;
        const eachFieldValid = values(validFields);
        this.setState({
            validForm: eachFieldValid.every((isValid) => isValid === true)
        });
    }
    onStringChange = (e, { name, value }) => {
        this.setState({
            permission: String(value)
        });
    }
    onNumberChange = (e, { name, value }) => {
        this.setState({
            auth: set(this.state.auth, name, parseInt(value, 10))
        });
    }
    onRemoveKey = (e, { name }) => {
        const { [`${name}.key`]: value, ...validFields } = this.state.validFields;
        this.setState({
            auth: del(this.state.auth, name),
            validFields
        });
    }
    toggleAccount = (e, { checked, name }) => {
        let { unlinkAuth } = this.state;
        if(this.state.linkedAuth.indexOf(name)>=0 && !checked){
            unlinkAuth.push(name);
        } else if(this.state.linkedAuth.indexOf(name)>=0 && checked){
            unlinkAuth.splice(unlinkAuth.indexOf(name), 1);
        }

        const selectedActions = [...this.state.selectedActions];
        const existing = selectedActions.indexOf(name);

        if (checked && existing < 0) {
            selectedActions.push(name);
        } else if (!checked && existing >= 0) {
            selectedActions.splice(existing, 1);
        }

        this.setState({ selectedActions });
    }
    onSubmit = () => {
        const {
            actions,
            settings
        } = this.props;
        const { auth, parent, permission, selectedActions, unlinkAuth } = this.state;
        debugger
        if(unlinkAuth.length != 0){
            unlinkAuth.map((item) => (
                actions.unlinkauth(item)
            ))
        }
        if (!settings.authorization) {
            settings.authorization = 'active';
            actions.setSetting('authorization', settings.authorization);
        }
        let authorization = `${settings.account}@${settings.authorization}`;
        actions.updateauth(permission, parent, auth, authorization, selectedActions);
    }
    deleteAuth = (e) => {
        e.preventDefault();
        const {
            actions,
            settings,
            linkAuthHistory,
        } = this.props;
        const {
            permission
        } = this.state;
        const { deleteauth } = actions;


        if (!settings.authorization) {
            settings.authorization = 'active';
            actions.setSetting('authorization', 'active');
        }
        let authorization = `${settings.account}@${settings.authorization}`;
        let selAuth = [];
        linkAuthHistory.filter(auth => { 
            if (auth.requirement == permission){
                actions.unlinkauth(auth.type);
            }
        });
        setTimeout((deleteauth(authorization, permission, selAuth)), 5000)
        
    }

    render() {
        const {
            contractActions,
            linkAuthHistory,
            pubkey,
            settings,
            t,
            connection,
            closeModal,
            modalOpen,
            modalKey
        } = this.props;
        const {
            auth,
            newAuth,
            original,
            parent,
            permission,
            selectedActions,
            validForm
        } = this.state;
        // const isCurrentKey = map(original.keys, 'key').includes(pubkey);
        const isCurrentKey = this.props.auth ? true : false;
        return (
            <Modal
                onClose={closeModal}
                size={"tiny"}
                open={modalOpen}
            >
                <Modal.Content
                    className="permissionModal-body"
                >
                    <div className="modal-header">
                        <span>Update </span>
                        <span> Permission</span>
                    </div>
                    <Form
                        onSubmit={this.onSubmit}
                    >
                        {(settings.advancedPermissions || newAuth)
                            ? (
                                <Form.Input
                                    defaultValue={permission}
                                    label={t('tools_form_permissions_auth_permission')}
                                    name="permission"
                                    onChange={this.onStringChange}
                                    className="seller-input"
                                />
                            )
                            : false
                        }
                        {(settings.advancedPermissions || newAuth)
                            ? (
                                <Form.Input
                                    defaultValue={parent}
                                    label={t('tools_form_permissions_auth_parent')}
                                    name="parent"
                                    className="seller-input"
                                    onChange={this.onStringChange}
                                />
                            )
                            : false
                        }
                        {(settings.advancedPermissions)
                            ? (
                                <Form.Input
                                    defaultValue={auth.threshold}
                                    label={t('tools_form_permissions_auth_threshold')}
                                    name="threshold"
                                    className="seller-input"
                                    onChange={this.onNumberChange}
                                />
                            )
                            : false
                        }
                        {auth.keys.map((keyAuths, index) => (
                            <ToolsFormPermissionsAuthWeightedKey
                                auth={auth}
                                key={JSON.stringify(keyAuths)}
                                keyAuths={keyAuths}
                                index={index}
                                onNumberChange={this.onNumberChange}
                                onKeyChange={this.onKeyChange}
                                onRemoveKey={this.onRemoveKey}
                                settings={settings}
                                connection={connection}
                                className="seller-input"
                            />
                        ))}
                        {(settings.advancedPermissions)
                            ? (
                                <Button
                                    content={t('tools_form_permissions_auth_add_key')}
                                    icon="circle plus"
                                    className="yellow-bg"
                                    onClick={this.addKey}
                                />
                            )
                            : false
                        }

                        <SlideToggle
                            collapsed
                            duration={800}
                            render={({ onToggle, setCollapsibleElement, progress }) => (
                                <Segment className="sel-permission-part">
                                    <div onClick={onToggle}>{t('tools_form_permissions_auth_linkauth')}</div>
                                    <div ref={setCollapsibleElement} className="inner-part">
                                        {(contractActions && contractActions.map((action, index) => {
                                            return (
                                                <div key={index} style={{ padding: 5 }}>
                                                    <Checkbox
                                                        label={action.text}
                                                        name={action.value}
                                                        onChange={this.toggleAccount}
                                                        defaultChecked={linkAuthHistory.filter(auth => {
                                                            return auth.requirement == permission && auth.type == action.text
                                                        }).length > 0
                                                            || selectedActions.indexOf(action.value) !== -1}
                                                    />
                                                </div>

                                            );
                                        })
                                        )}
                                    </div>
                                </Segment>
                            )}
                        />

                        <Container textAlign="right">
                            {(settings.advancedPermissions)
                                ? (
                                    <Button
                                        content={t('Delete Permission')}
                                        disabled={!validForm || !isCurrentKey}
                                        onClick={this.deleteAuth}
                                    />) : false}
                            <Button
                                content={t('tools_form_permissions_auth_submit')}
                                disabled={!validForm}
                                className="yellow-bg"
                                primary
                            />
                        </Container>
                    </Form>
                </Modal.Content>

            </Modal>
        )

    }
}

PermissionModal.propTypes = {};

PermissionModal.defaultProps = {};

export default translate('tools')(PermissionModal);
