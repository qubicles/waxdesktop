import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Table, Image, Header } from "semantic-ui-react";
import { forEach } from 'lodash';

import * as TableActions from "../../../actions/table";
import * as AccountActions from "../../../actions/accounts";
import * as GlobalsActions from "../../../actions/globals";
import * as SettingsActions from '../../../actions/settings';

class Proxies extends Component {
    componentDidMount() {
        this.tick();
        this.interval = setInterval(this.tick.bind(this), 120000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    tick() {
        const {
            actions,
            validate,
            settings
        } = this.props;
        const {
            getTable
        } = actions;

        if (validate.NODE) {
            if (settings.blockchain.tokenSymbol === 'TLOS')
                getTable('tlsproxyinfo', 'tlsproxyinfo', 'proxies');
            else if (settings.blockchain.tokenSymbol === 'WAX')
                getTable('eosio', 'eosio', 'voters', 10000000);
        }

    }

    render() {
        const {
            accounts,
            actions,
            globals,
            settings,
            tables,
        } = this.props;
        const account = accounts[settings.account];
        const isProxying = !!(account && account.voter_info && account.voter_info.proxy);
        const currentProxy = account && account.voter_info && account.voter_info.proxy;
        let proxies = (tables.tlsproxyinfo && tables.tlsproxyinfo.tlsproxyinfo.proxies.rows) || [];
        if (proxies.length < 1) {
            const voters = (tables.eosio &&
                tables.eosio.eosio &&
                tables.eosio.eosio.voters &&
                tables.eosio.eosio.voters.rows) || [];
            if (voters.length > 0)
                proxies = voters.filter((p) => { return p.is_proxy === 1 }).map(proxy => {
                    return {
                        owner: proxy.owner,
                        name: proxy.owner,
                        website: '',
                        slogan: '',
                        philosophy: '',
                        background: '',
                        logo_256: '',
                        telegram: '',
                        steemit: '',
                        twitter: '',
                        wechat: '',
                        reserved_1: '',
                        reserved_2: '',
                        reserved_3: ''
                    }
                });
        }

        if (!proxies.length) {
            return null;
        }

        let rows = [];

        forEach(proxies, (proxy, index) => {
            rows.push((<Table.Row key={`proxy-${index}`}>
                <Table.Cell>
                    <Image
                        src={proxy.logo_256}
                        style={{width:"40px"}}
                    />
                </Table.Cell>
                <Table.Cell>
                    <Header as="h3" style={{color:"white"}}>{proxy.owner}</Header>
                </Table.Cell>
                <Table.Cell><Header as="h5" style={{color:"white"}}>{proxy.name}</Header></Table.Cell>
            </Table.Row>))
        })

        return (
            <Table>
                <Table.Body>
                    {rows}
                </Table.Body>
            </Table>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        globals: state.globals,
        settings: state.settings,
        accounts: state.accounts,
        tables: state.tables,
        validate: state.validate
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            ...AccountActions,
            ...GlobalsActions,
            ...SettingsActions,
            ...TableActions
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Proxies);