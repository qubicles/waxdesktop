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
  Button
} from "semantic-ui-react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

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
import Balance from "../../Dashboard/Balance/Balance";
import "./WalletSettings.global.css";

class WalletSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      node: ""
    };
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextProps.settings.node !== nextState.node) {
      return {
        node: nextProps.settings.node
      }
    }

    return null;
  }
  componentDidMount() {
    this.props.actions.getBlockExplorers()
  }

  goBack = () => {
    this.props.history.push("/advanced");
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
    const { actions, settings, blockExplorers } = this.props;
    return (
      <div className="dashboard-container">
        <div className="dashboard-body-section">
          <div className="walletSettings-section">
            <div className="walletSettings-header">
              <img
                src={require("../../../../../renderer/assets/images/advanced/down-arrow1.png")}
                onClick={this.goBack}
              />
              <div className="delegate-btn">
                Confirm Changes
                <img
                  src={require("../../../../../renderer/assets/images/advanced/correct2.png")}
                />
              </div>
            </div>
            <div className="walletSettings-body">
              <div className="w-title">Wallet Settings</div>
              <div className="w-form">
                <Form>
                  <div className="seller-input">
                    {(settings.walletMode !== 'cold')
                      ? (
                        <Form.Field>
                          <div className="input-title">Default Block Explorer</div>
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
                    <div className="input-title">Default IPFS Node</div>
                    <GlobalSettingsIPFSNode
                      actions={actions}
                      settings={settings}
                    />
                  </div>
                  <div className="seller-input">
                    <div className="input-title">IPFS Port</div>
                    <GlobalSettingsIPFSPort
                      actions={actions}
                      settings={settings}
                    />
                  </div>
                  <div className="seller-input">
                    <div className="input-title">Language</div>
                    <GlobalSettingsLanguage
                      actions={actions}
                      setLanguage={settings.lang}
                      selection />
                  </div>
                  <div className="seller-input">
                    <div className="input-title">
                      Lock Wallet Automatically When Inactive
                  </div>
                    <GlobalSettingsIdleTimeout
                      actions={actions}
                      defaultValue={settings.idleTimeout}
                      selection
                    />
                  </div>
                  <div className="seller-input">
                    <div className="input-title">
                      Show Warning When Clicking Links to External Sites
                  </div>
                    <GlobalSettingsSkipLinkModal
                      actions={actions}
                      defaultValue={settings.skipLinkModal}
                      selection
                    />
                  </div>
                  <div className="seller-input">
                    <div className="input-title">
                      Recalculate Voting Weight Prior To Voting
                  </div>
                    <GlobalSettingsMirrorCastVote
                      actions={actions}
                      defaultValue={settings.mirrorCastOnVote}
                      selection
                    />
                  </div>
                  <div className="seller-input">
                    <div className="input-title">
                      Use Wax Desktop Wallet To Pay For Resources
                  </div>
                    <GlobalSettingsPowerToken
                      actions={actions}
                      defaultValue={settings.usePOWERtoken}
                      selection
                    />
                  </div>
                  <div className="seller-input">
                    <div className="input-title">
                      Filter Out Spam Transters (Hide tx's below 0.005 WAX)
                  </div>
                    <GlobalSettingsFilterSpamTransfers
                      actions={actions}
                      defaultValue={settings.filterSpamTransfersUnder}
                      selection
                    />
                  </div>
                  <div className="seller-input">
                    <div className="input-title">Connect To Network</div>
                    <div className="btn-wrap">
                      <Form.Field className="ui-common-input">
                        <GlobalSettingsNetwork
                          name="blockchain"
                        />
                      </Form.Field>
                      {/* <Button className="btn-left-round btn-inside">
                        WAX Mainnet
                      </Button>
                      <Button className="btn-right-round btn-inside">
                        WAX Testnet
                      </Button> */}
                    </div>
                  </div>
                  <div className="seller-input w-img-wrap">
                    <div className="input-title">Wallet API URL</div>
                    <GlobalSettingsNode
                      actions={actions}
                      settings={settings}
                    />
                    <img
                      src={require("../../../../../renderer/assets/images/dashboard/correct3.png")}
                      className="w-input-img"
                    />
                  </div>
                  <Button className="delegate-btn" onClick={this.onConnect}>Connect To Server</Button>
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
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({
      ...AccountActions,
      ...GlobalsActions,
      ...SettingsActions,
      ...BlockExplorersActions,
    }, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(WalletSettings);
