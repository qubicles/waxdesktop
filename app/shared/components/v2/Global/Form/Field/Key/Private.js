import React, { Component } from "react";
import { Form, TextArea } from "semantic-ui-react";

import debounce from 'lodash/debounce';

const ecc = require('eosjs-ecc');

export default class Private extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue,
            visible: false
        }
    }

    componentDidUpdate(prevProps, prevStates) {
        if (prevProps.defaultValue !== this.props.defaultValue) {
            this.setState({
                value: this.props.defaultValue
            })
        }
    }

    onChange = debounce((e, { name, value }) => {
        const parsed = value.trim();
        this.setState({
            value: parsed
        }, () => {
            try {
                const publicKey = ecc.privateToPublic(parsed);
                const valid = ecc.isValidPrivate(parsed);
                this.props.onChange(e, {
                    name,
                    publicKey: publicKey,
                    valid,
                    value: parsed
                });
            } catch (error) {
                this.props.onChange(e, {
                    error,
                    name,
                    valid: false,
                    value: parsed
                });
            }
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
            value
        } = this.state;

        return (
            <React.Fragment>
                <Form.Field
                    control={TextArea}
                    name={name}
                    onChange={this.onChange}
                    defaultValue={value}
                    error={error}
                />
                <div className="custom-copy-btn" onClick={() => onCopy(value)}>
                    <img src={require('../../../../../../../renderer/assets/images/dashboard/paper.png')} />
                </div>
            </React.Fragment>
        )
    }
}