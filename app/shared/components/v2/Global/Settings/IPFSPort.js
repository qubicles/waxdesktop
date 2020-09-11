// @flow
import React, { Component } from 'react';
import { translate } from 'react-i18next';

import GlobalFormFieldGeneric from '../Form/Field/Generic';

class GlobalSettingsIPFSPort extends Component{
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
        key="ipfsPort"
        name="ipfsPort"
        onChange={this.onChange}
        value={settings.ipfsPort}
      />
    );
  }
}

export default GlobalSettingsIPFSPort;
