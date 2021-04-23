// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalFormFieldGeneric from '../Form/Field/Generic';

class GlobalSettingsNode extends Component{
  onChange = (e, { name, value }) => {
    const { actions, onChangeNode } = this.props;
    onChangeNode(value);
    // actions.setSetting(name, value);
  }

  render() {
    const {
      settings,
      isDisabled
    } = this.props;

    return (
      <GlobalFormFieldGeneric
        key="node"
        name="node"
        onChange={this.onChange}
        value={settings.node}
        isDisabled={isDisabled}
      />
    );
  }
}

export default GlobalSettingsNode;
