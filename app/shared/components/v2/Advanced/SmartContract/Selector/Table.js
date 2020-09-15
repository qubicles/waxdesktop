// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Dropdown, Form, Header, Segment, Button } from 'semantic-ui-react';

class ContractInterfaceSelectorTable extends Component<Props> {
    constructor(props) {
        super(props);
        const {
            contractTable,
            contractTableScope
        } = props;
        this.state = {
            contractTable,
            contractTableScope
        };
    }
    onChange = (e, { name, value }) => this.setState({ [name]: value });
    onSubmit = () => this.props.onSet(this.state);
    render() {
        const {
            contract,
            contractTable,
            contractTableScope,
            t
        } = this.props;
        const tableOptions = contract.getTables().map((table) => ({
            text: table.name,
            value: table.name,
        }));
        return (
            <React.Fragment>

                <Form
                    onSubmit={this.onSubmit}
                >
                    <div className="round-dropdown-wrap">
                        <div className="round-dropdown-label">Contract Tables</div>
                        <Form.Field>
                            <Dropdown
                                defaultValue={contractTable}
                                fluid
                                name="contractTable"
                                placeholder={t('interface_tables_placeholder')}
                                onChange={this.onChange}
                                options={tableOptions}
                                selection
                                className="ui-common-input"
                            />
                        </Form.Field>

                    </div>
                    <div className="seller-input">
                        <div className="input-title">Table Scope (Account Name)</div>
                        <Form.Input
                            defaultValue={contractTableScope}
                            fluid
                            name="contractTableScope"
                            placeholder={contract.account}
                            onChange={this.onChange}
                            className="ui-common-input"
                        />
                    </div>
                    <Button
                        className="delegate-btn"
                        content={t('interface_tables_load')}
                        fluid
                    />
                </Form>
            </React.Fragment>
        );
    }
}

export default translate('contract')(ContractInterfaceSelectorTable);
