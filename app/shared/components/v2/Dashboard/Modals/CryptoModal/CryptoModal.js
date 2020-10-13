import React from "react";
import PropTypes from "prop-types";
import { Dropdown, Modal, Form, Input, Button } from "semantic-ui-react";
import { find } from "lodash";

import "./CryptoModal.global.css";

class CryptoModal extends React.Component {
  constructor(props) {
    super(props);

    const { settings } = props;
    this.state = {
      asset: settings.blockchain.tokenSymbol,
      confirming: false,
      formError: false,
      from: settings.account,
      memo: "",
      memoValid: true,
      quantity: "",
      submitDisabled: true,
      to: "",
      toValid: true,
      waiting: false,
      waitingStarted: 0
    };
  }

  onConfirm = () => {
    const { from, memo, quantity, asset, to } = this.state;
    console.log("onConfirm", to, from, memo, quantity, asset);
    // this.setState({ confirming: false }, () => {
    //     this.props.actions.transfer(from, to, quantity, memo, asset);
    // });
  };

  onChange = (e, { name, value, valid }) => {
    const newState = { [name]: value };

    this.setState(newState);
  };

  render() {
    const { modalOpen, closeModal, settings, balances, globals } = this.props;
    const { from, memo, quantity, asset, to } = this.state;

    const assets = balances && Object.keys(balances[settings.account]);
    const { customTokens } = settings;
    const trackedTokens = customTokens
      ? customTokens.map(tokenName => {
          const [contract, symbol] = tokenName.split(":");

          // find logo
          const tokenInfo =
            globals &&
            globals.remotetokens &&
            globals.remotetokens.filter(
              token =>
                token.account == contract &&
                token.symbol == settings.blockchain.tokenSymbol
            )[0];

          return {
            contract,
            symbol: tokenInfo ? tokenInfo.name : "",
            logo: tokenInfo ? tokenInfo.logo : null
          };
        })
      : [
          {
            contract: "eosio",
            symbol: settings.blockchain.tokenSymbol,
            logo: null
          }
        ];
    const options = [];
    // Iterate assets and build the options list based on tracked tokens
    assets.forEach(asset => {
      const assetDetails = find(trackedTokens, { symbol: asset });
      if (assetDetails) {
        const { contract, symbol, logo } = find(trackedTokens, {
          symbol: asset
        });
        if (
          contract &&
          symbol &&
          balances[settings.account] &&
          balances[settings.account][asset] > 0
        ) {
          options.push({
            key: asset,
            // image: logo,
            text: `${symbol}`,
            value: asset
          });
        }
      }
    });

    return (
      <Modal onClose={closeModal} size={"tiny"} open={modalOpen}>
        <Modal.Content className="cryptoModal-body">
          <div className="modal-header">
            <span>Send </span>
            <span> Crypto</span>
          </div>
          <div className="modal-body">
            <Form onKeyPress={this.onKeyPress} onSubmit={this.onConfirm}>
              <Form.Field
                className="ui-common-input"
                placeholder="Account Name"
                required
                autoFocus
                control={Input}
                name="to"
                onChange={this.onChange}
                value={to}
              />
              <Form.Field
                className="ui-common-input"
                placeholder="Memo"
                required
                control={Input}
                name="memo"
                onChange={this.onChange}
                value={memo}
              />
              <div className="input-select">
                <Form.Field
                  className="ui-common-input"
                  placeholder="0.0000 WAX"
                  required
                  control={Input}
                  name="quantity"
                  onChange={this.onChange}
                  value={quantity}
                />
                <Dropdown
                  value={this.state.asset || settings.blockchain.tokenSymbol}
                  name="asset"
                  onChange={this.onChange}
                  options={options}
                  selection
                  className="resource-choose-dropdown"
                />
              </div>
              <Button fluid className="delegate-btn">
                Confirm Transaction
                <img
                  src={require("../../../../../../renderer/assets/images/dashboard/correct3.png")}
                />
              </Button>
            </Form>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

CryptoModal.propTypes = {};

CryptoModal.defaultProps = {};

export default CryptoModal;
