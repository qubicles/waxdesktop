// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import { Form, Dropdown } from 'semantic-ui-react';

class ContractInterfaceSelectorAction extends Component<Props> {
  render() {
    const {
      contract,
      contractAction,
      onChange,
      t
    } = this.props;
    const actionOptions = contract.getActions().map((action) => ({
      text: action.name,
      value: action.type,
    }));
    return (
      <div className="round-dropdown-wrap">
        <div className="round-dropdown-label">Contract Actions</div>
        <Form>
          <Form.Field>
            <Dropdown
              defaultValue={contractAction}
              fluid
              name="contractAction"
              placeholder={t('interface_actions_header')}
              onChange={onChange}
              options={actionOptions}
              search
              selection
              className="ui-common-input"
            />
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default translate('contract')(ContractInterfaceSelectorAction);
