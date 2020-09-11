// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalFormFieldGeneric from '../Form/Field/Generic';

class GlobalSettingsNode extends Component{
  onChange = (e, { name, value }) => {
    const { actions } = this.props;

    actions.setSetting(name, value);
  }

  render() {
    const {
      settings
    } = this.props;

    return (
      <GlobalFormFieldGeneric
        key="node"
        name="node"
        onChange={this.onChange}
        value={settings.node}
      />
    );
  }
}

export default GlobalSettingsNode;
