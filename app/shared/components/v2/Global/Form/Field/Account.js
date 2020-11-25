import React, { Component } from "react";
import { Form, Input } from "semantic-ui-react";

export default class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }
    onChange = (e, { name, value }) => {
        const parsed = value.trim().toLowerCase();
        const valid = !!(parsed.match(/^[a-z12345.]{1,12}$/g));
        this.setState({
            value: parsed
        }, () => {
            this.props.onChange(e, {
                name,
                value: parsed,
                valid
            });
        });
    }

    render() {
        const {
            name,
            error,
            placeholder
        } = this.props;

        const {
            value
        } = this.state;

        return (
            <Form.Field
                className="ui-custom-account-input"
                control={Input}
                name={name}
                onChange={this.onChange}
                defaultValue={value}
                error={error}
                placeholder={placeholder}
            />
        )
    }
}