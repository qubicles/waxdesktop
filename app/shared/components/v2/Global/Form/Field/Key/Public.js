import React, { Component } from "react";
import { Form, TextArea } from 'semantic-ui-react';

import debounce from 'lodash/debounce';

const ecc = require('eosjs-ecc');

export default class Public extends Component {
    constructor(props) {
        super(props);
        this.state = {
            generated: '',
            value: props.defaultValue
        };
    }

    componentDidUpdate(prevProps, prevStates) {
        if (prevProps.defaultValue !== this.props.defaultValue) {
            this.setState({
                value: this.props.defaultValue
            })
        }
    }

    generate = (e) => {
        const {
            name,
            setPrivateKey,
            settings
        } = this.props;

        e.preventDefault();
        ecc
            .randomKey()
            .then((key) => {
                const publicKey = ecc.privateToPublic(key);
                // Set the value in the parent form with the provided name
                this.onChange(null, {
                    name,
                    value: publicKey
                });
                // Also pass the private key back if a method was passed
                if (setPrivateKey) {
                    setPrivateKey(name, publicKey, key);
                }
                // Set the local state
                this.setState({
                    generated: publicKey,
                });
                return publicKey;
            })
            .catch(() => {
                // no catch
            });
        return false;
    }
    onChange = debounce((e, { name, value }) => {
        const { settings } = this.props;
        var parsed = value.trim();
        const valid = ecc.isValidPublic(parsed);
        this.setState({
            value: parsed
        }, () => {
            this.props.onChange(e, { name, value: parsed, valid });
        });
    }, 300)

    render() {
        const {
            autoFocus,
            disabled,
            generate,
            loading,
            name,
            error,
            onCopy
        } = this.props;

        const {
            generated,
            value
        } = this.state;

        let action;
        if (generate) {
            action = {
                color: 'grey',
                icon: 'redo alternate',
                onClick: this.generate,
                size: 'tiny'
            };
        }


        return (
            <React.Fragment>
                <Form.Field
                    action={action}
                    autoFocus
                    control={TextArea}
                    key={generated}
                    name={name}
                    onChange={this.onChange}
                    error={error}
                    defaultValue={generated || value}
                />
                <div className="custom-copy-btn" onClick={() => onCopy(value)}>
                    <img src={require('../../../../../../../renderer/assets/images/dashboard/paper.png')} />
                </div>
            </React.Fragment>
        )
    }
} 