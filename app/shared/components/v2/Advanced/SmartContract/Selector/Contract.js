// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';
import debounce from 'lodash/debounce';

import { Button, Form, Header, Segment, Dropdown } from 'semantic-ui-react';


class ContractInterfaceSelectorContract extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      contractName: props.contractName
    };
  }
  onChange = (e, { name, selection, value }) => {
    this.setState({ [name]: value }, () => {
      // If this is the dropdown, fire the submit
      if (selection) {
        this.onSubmit();
      }
    });
  }
  onSubmit = debounce(() => {
    const {
      onSet,
      onSubmit
    } = this.props;
    onSet(this.state, onSubmit);
  }, 300)
  render() {
    const {
      contract,
      onReset,
      t,
      settings
    } = this.props;
    const {
      contractName
    } = this.state;

    let recentOptions = [];
    if (settings && settings.recentContracts) {
      recentOptions = settings.recentContracts.map((recentContract) => ({
        text: recentContract,
        value: recentContract,
      }));
    }

    let display = (
      <Segment basic>
        <Form
          onSubmit={this.onSubmit}
        >
          <Dropdown
            className="ui-common-input"
            allowAdditions
            autoFocus
            fluid
            name="contractName"
            placeholder={t('interface_contract_account_name_placeholder')}
            onChange={this.onChange}
            openOnFocus={false}
            options={recentOptions}
            search
            searchInput={{ autoFocus: true }}
            selection
            selectOnBlur={false}
            selectOnNavigation={false}
          />
          <Button fluid className="delegate-btn" content={t('interface_contract_load')}>
                <img
              src={require("../../../../../../renderer/assets/images/advanced/correct2.png")}
            />
          </Button>
        </Form>
      </Segment>
    );
    return display;
  }
}
export default translate('contract')(ContractInterfaceSelectorContract);
