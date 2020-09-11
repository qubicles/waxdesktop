// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';
import { translate } from 'react-i18next';

class GlobalSettingsPowerToken extends Component<Props> {
  onChange = (e, { value }) => {
    const { actions } = this.props;

    actions.setSetting('usePOWERtoken', value);
  }

  render() {
    const {
      defaultValue,
      name,
      selection,
      t
    } = this.props;

    const options = [
      { key: 'use_power_token_on', value: true, text: "Yes" },
      { key: 'use_power_token_off', value: false, text: "No" }
    ];

    return (
      <Dropdown
        className="ui-common-input"
        name={name}
        onChange={this.onChange}
        options={options}
        selection={selection}
        value={defaultValue}
      />
    );
  }
}

export default translate('global')(GlobalSettingsPowerToken);
