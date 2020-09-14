// @flow
import React, { Component } from 'react';
import { Radio } from 'semantic-ui-react';

class GlobalSettingsNetwork extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: "waxMainnet"
        }
    }

    onChange = (e, { value }) => {
        const { actions } = this.props;
        this.setState({
            value
        })
        // actions.setSetting('lang', value);
    }

    render() {
        const {
            name,
        } = this.props;


        const {
            value
        } = this.state;

        return (
            <React.Fragment>
                <Radio
                    label="WAX Mainnet"
                    className={value === "waxMainnet" ? "btn-round btn-inside active-btn" : "btn-round btn-inside"}
                    name={name}
                    value="waxMainnet"
                    checked={value === "waxMainnet"}
                    onChange={this.onChange}
                />
                <Radio
                    label="WAX Testnet"
                    className={value === "waxTestnet" ? "btn-right btn-round btn-inside active-btn" : "btn-right btn-round btn-inside"}
                    name={name}
                    value="waxTestnet"
                    checked={value === "waxTestnet"}
                    onChange={this.onChange}
                />
            </React.Fragment>
        );
    }
}

export default GlobalSettingsNetwork;
