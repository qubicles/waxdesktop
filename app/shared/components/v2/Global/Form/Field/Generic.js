// @flow
import React, { Component } from 'react';
import { Form, Input } from 'semantic-ui-react';

import debounce from 'lodash/debounce';

export default class GlobalFormFieldGeneric extends Component
{
    state = { value: '' };
    onChange = debounce((e, { name, value }) => {
        const parsed = value;
        this.setState({
            value: parsed
        }, () => {
            this.props.onChange(e, { name, value: parsed });
        });
    }, 300)
    render() {
        const {
            name,
            value,
            label
        } = this.props;

        return (
            <Form.Field
                className="ui-common-input"
                control={Input}
                fluid
                label={label}
                name={name}
                onChange={this.onChange}
                defaultValue={value}
            />
        );
    }
}
