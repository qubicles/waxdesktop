// @flow
import React, { Component } from 'react';
import { Dropdown } from 'semantic-ui-react';

const languages = [
  { key: 'en', value: 'en-US', flag: 'us', text: 'English' },
  { key: 'es', value: 'es-ES', flag: 'es', text: 'Spanish' },
  { key: 'fr', value: 'fr-FR', flag: 'fr', text: 'Français' },
  { key: 'it', value: 'it-IT', flag: 'it', text: 'Italiano' },
  { key: 'cn', value: 'zh-CN', flag: 'cn', text: '中文' },
  { key: 'ja', value: 'ja-JP', flag: 'jp', text: '日本語' },
  { key: 'kr', value: 'ko-KR', flag: 'kr', text: '한글' },
  { key: 'ru', value: 'ru-RU', flag: 'ru', text: 'Русский' },
];

class GlobalSettingsLanguage extends Component {
  onChange = (e, { value }) => {
    const { actions } = this.props;
    actions.setSetting('lang', value);
  }

  render() {
    const {
      name,
      setLanguage,
      selection,
    } = this.props;

    return (
      <Dropdown
        className="ui-common-input"
        name={name}
        onChange={this.onChange}
        options={languages}
        placeholder="Select language"
        selection={selection}
        value={setLanguage || 'en-US'}
      />
    );
  }
}

export default GlobalSettingsLanguage;
