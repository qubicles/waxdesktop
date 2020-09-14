// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

export default class GlobalSettingsBlockExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: props.defaultValue
    };
  }

  onChange = (e, { value }) => {
    const { actions } = this.props;

    actions.setSetting('blockExplorer', value);
  }

  render() {
    const {
      blockExplorers,
      name,
      selection
    } = this.props;

    const {
      value
    } = this.state;

    const blockExplorerOptions = Object.keys(blockExplorers).map((blockExplorer) => {
      return { value: blockExplorer, text: blockExplorer };
    });

    return (
      <Dropdown
        className="ui-common-input"
        defaultValue={value || blockExplorerOptions[0].value}
        name={name}
        onChange={this.onChange}
        options={blockExplorerOptions}
        selection={selection}
      />
    );
  }
}
