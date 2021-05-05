import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Image,
  Divider,
  Tab,
  Dropdown,
  Radio,
  Menu,
  Checkbox,
  Form,
  Input,
  Button,
  Message
} from "semantic-ui-react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { translate } from 'react-i18next';
import compose from 'lodash/fp/compose';

import * as GlobalsActions from "../../../../actions/globals";
import * as AccountActions from "../../../../actions/accounts";
import * as SettingsActions from '../../../../actions/settings';
import * as TransferActions from '../../../../actions/transfer';
import * as CreateAccountActions from '../../../../actions/createaccount';
import * as BlockExplorersActions from "../../../../actions/blockexplorers";

import GlobalSettingsIPFSNode from "../../Global/Settings/IPFSNode";
import GlobalSettingsIPFSPort from "../../Global/Settings/IPFSPort";
import GlobalSettingsBlockExplorer from "../../Global/Settings/BlockExplorer";
import GlobalSettingsLanguage from "../../Global/Settings/Language";
import GlobalSettingsIdleTimeout from "../../Global/Settings/IdleTimeout";
import GlobalSettingsSkipLinkModal from "../../Global/Settings/SkipLinkModal";
import GlobalSettingsMirrorCastVote from "../../Global/Settings/MirrorCastVote";
import GlobalSettingsPowerToken from "../../Global/Settings/PowerToken";
import GlobalSettingsFilterSpamTransfers from "../../Global/Settings/FilterSpamTransfers";
import GlobalSettingsNetwork from "../../Global/Settings/Network";
import GlobalSettingsNode from "../../Global/Settings/Node";
import ValidateActions from "../../../../actions/validate"
import Balance from "../../Dashboard/Balance/Balance";
import "./WalletSettings.global.css";

class WalletSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      node: "",
      isDisabled: true,
    };
  }

  // static getDerivedStateFromProps(nextProps, nextState) {
  //   if (nextProps.settings.node !== nextState.node) {
  //     return {
  //       node: nextProps.settings.node
  //     }
  //   }
  //   return null;
  // }
  componentDidMount() {
    this.props.actions.getBlockExplorers()
  }

  goBack = () => {
    this.props.history.push("/advanced");
  }
  onChangeNode = (value) => {
    const { actions } = this.props;
    const { setSettingWithValidation } = actions;
    if (value.apiurl) {
      this.setState({
        node: value.apiurl,
        isDisabled: true
      }, () => {
        setSettingWithValidation('node', this.state.node);
      })
    } else {
      if (typeof (value) == 'string') {
        this.setState({
          node: value
        })
      } else {
        this.setState({
          isDisabled: false
        })
      }
    }

  }

  onConnect = () => {
    const { node } = this.state;
    const {
      actions,
      onStageSelect,
      settings
    } = this.props;
    const {
      getAccount,
      setSettingWithValidation,
      setWalletMode
    } = actions;
    if (settings.blockchainSelected) {
      setSettingWithValidation('node', settings.blockchain.node);
    }
    else {
      setSettingWithValidation('node', node);
    }
    if (settings.walletMode === 'cold') {
      setWalletMode('hot');
    }
    if (settings.account) {
      getAccount(settings.account);
    }
  }

  render() {
    const { 
            actions,
            settings, 
            blockExplorers, 
            validate,
            i18n, 
            t
          } = this.props;
    const { isDisabled } = this.state;
    return (
      <div className="dashboard-container">
        <div className="dashboard-body-section">
          <div className="walletSettings-section">
            <div className="walletSettings-header">
              <img
                src={require("../../../../../renderer/assets/images/advanced/down-arrow1.png")}
                onClick={this.goBack}
              />
            </div>
            <div className="walletSettings-body">
              <div className="w-title">{t('w_setting')}</div>
              <div className="w-form">
                <Form>
                  <div className="seller-input">
                    {(settings.walletMode !== 'cold')
                      ? (
                        <Form.Field>
                          <div className="input-title">{t('w_blockExplorer')}</div>
                          <GlobalSettingsBlockExplorer
                            actions={actions}
                            blockExplorers={blockExplorers}
                            defaultValue={settings.blockExplorer}
                            selection
                          />
                        </Form.Field>
                      ) : false
                    }
                  </div>
                  <div className="seller-input">
                    <div className="input-title">{t('w_ipfsNode')}</div>
                    <GlobalSettingsIPFSNode
                      actions={actions}
                      settings={settings}
                    />
                  </div>
                  <div className="seller-input">
                    <div className="input-title">{t('w_ipfsPort')}</div>
                    <GlobalSettingsIPFSPort
                      actions={actions}
                      settings={settings}
                    />
                  </div>
                  <div className="seller-input">
                    <div className="input-title">{t('w_language')}</div>
                    <GlobalSettingsLanguage
                      actions={actions}
                      setLanguage={settings.lang}
                      i18n={i18n}
                      selection />
                  </div>
                  <div className="seller-input">
                    <div className="input-title">
                      {t('w_lockWallet')}
                  </div>
                    <GlobalSettingsIdleTimeout
                      actions={actions}
                      defaultValue={settings.idleTimeout}
                      selection
                    />
                  </div>
                  <div className="seller-input">
                    <div className="input-title">
                      {t('w_externalSites')}
                  </div>
                    <GlobalSettingsSkipLinkModal
                      actions={actions}
                      defaultValue={settings.skipLinkModal}
                      selection
                    />
                  </div>
                  <div className="seller-input">
                    <div className="input-title">
                      {t('w_recalc')}
                  </div>
                    <GlobalSettingsMirrorCastVote
                      actions={actions}
                      defaultValue={settings.mirrorCastOnVote}
                      selection
                    />
                  </div>
                  <div className="seller-input">
                    <div className="input-title">
                      {t('w_payResources')}
                  </div>
                    <GlobalSettingsPowerToken
                      actions={actions}
                      defaultValue={settings.usePOWERtoken}
                      selection
                    />
                  </div>
                  <div className="seller-input">
                    <div className="input-title">
                      {t('w_filter')}
                  </div>
                    <GlobalSettingsFilterSpamTransfers
                      actions={actions}
                      defaultValue={settings.filterSpamTransfersUnder}
                      selection
                    />
                  </div>
                  <div className="seller-input">
                    <div className="input-title">{t('w_connectNetwork')}</div>
                    <div className="btn-wrap blockchain-radio-group">
                      <Form.Field className="ui-common-input">
                        <GlobalSettingsNetwork
                          name="blockchain"
                          onChangeNode={this.onChangeNode}
                        />
                      </Form.Field>
                    </div>
                  </div>
                  {
                    (validate.NODE === 'FAILURE') ? (
                      <Message
                        color="red"
                        content={t('w_diff_server_alert')}
                        header="Unable to connect"
                        icon="warning sign"
                      />
                    ) : ''
                  }
                  <div className="seller-input w-img-wrap">
                    <div className="input-title">{t('w_walletApi')}</div>
                    <GlobalSettingsNode
                      isDisabled={isDisabled}
                      actions={actions}
                      settings={settings}
                      onChangeNode={this.onChangeNode}
                    />
                    <img
                      src={require("../../../../../renderer/assets/images/dashboard/correct3.png")}
                      className="w-input-img"
                    />
                  </div>
                  <Button className="delegate-btn" onClick={this.onConnect}>{t('w_connectServer')}</Button>
                </Form>

              </div>
            </div>
          </div>
        </div>
        {/* <Balance /> */}
      </div>
    );
  }
}

WalletSettings.propTypes = {};

WalletSettings.defaultProps = {};

const mapStateToProps = (state) => {
  return {
    balances: state.balances,
    settings: state.settings,
    globals: state.globals,
    accounts: state.accounts,
    blockExplorers: state.blockexplorers,
    validate: state.validate
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...AccountActions,
      ...GlobalsActions,
      ...SettingsActions,
      ...BlockExplorersActions,
      ...ValidateActions
    }, dispatch)
  };
}

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  translate('walletSetting')
)(WalletSettings);
