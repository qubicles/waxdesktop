// @flow
import React, { Component } from 'react';
import { Radio } from 'semantic-ui-react';

class GlobalSettingsNetwork extends Component {
    constructor(props) {
        super(props)
        this.state = {
            value: ""
        }
    }

    onChange = (e, { value }) => {
        const { actions, onChangeNode} = this.props;

        this.setState({
            value: value.value
        },() => {
            onChangeNode(value);
        })
        
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
                    apiurl="https://api.wax.alohaeos.com"
                    checked={value === "waxMainnet"}
                    onChange={(name, value) => this.onChange(null, {name, value: value })} 
                />
                <Radio
                    label="WAX Testnet"
                    className={value === "waxTestnet" ? "btn-right btn-round btn-inside active-btn" : "btn-right btn-round btn-inside"}
                    name={name}
                    value="waxTestnet"
                    apiurl="https://api.waxtest.alohaeos.com"
                    checked={value === "waxTestnet"}
                    onChange={(name, value) => this.onChange(null, {name, value: value })} 
                />
                <Radio
                    label="Custom Node API"
                    className={value === "customNode" ? "btn-right btn-round btn-inside active-btn" : "btn-right btn-round btn-inside"}
                    name={name}
                    value="customNode"
                    checked={value === "customNode"}
                    onChange={(name, value) => this.onChange(null, {name, value: value })} 
                />
            </React.Fragment>
        );
    }
}

export default GlobalSettingsNetwork;
