import React, { Component } from "react";
import { Form, Input } from "semantic-ui-react";

export default class NET extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        };
    }
    onChange = (e, { name, value }) => {
        const parsed = value.trim();
        const valid = !!(parsed.match(/[0-9]$/g));
        this.setState({
            value
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
            error
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
            />
        )
    }
}