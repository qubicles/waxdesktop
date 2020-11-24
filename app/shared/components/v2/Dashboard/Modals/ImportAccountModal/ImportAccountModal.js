import React from "react";
import PropTypes from "prop-types";
import {
  Form,
  TextArea,
  Dropdown,
  Modal,
  Checkbox,
  Button
} from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as WalletsActions from "../../../../../actions/wallets";

import debounce from "lodash/debounce";

const ecc = require("eosjs-ecc");

import "./ImportAccountModal.global.css";

import "./ImportAccountModal.global.css";

class ImportAccountModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      error: false,
      btnDisable: true,
    };
  }

  onChange = debounce((e, { name, value }) => {
    const parsed = value.trim();
    const { actions } = this.props;
    this.setState(
      {
        value: parsed,
        error: true
      },
      () => {
        try {
          const publicKey = ecc.privateToPublic(parsed);
          const valid = ecc.isValidPrivate(parsed);
          if (valid) {
            actions.getAccountByKey(publicKey);
          } else {
            actions.clearAccountByKey();
          }
        } catch (error) {
          this.setState({
            value: parsed,
            error: false
          });
        }
      }
    );
  }, 300);

  onSelectAccount = e => {
    this.setState({
      btnDisable: false
    });
  };

  onSubmit = e => {
    e.preventDefault();
    let selectedAccounts = document.getElementsByName("selectedAccounts");
    const filtered = [];
    selectedAccounts.forEach(el => {
      if (el.checked) {
        filtered.push(el.value);

      }
    });
    const { value } = this.state;
    const { actions, closeModal, history } = this.props;

    if (filtered.length > 0 && value) {
      filtered.forEach(importedAccount => {
        actions.addNewAccount(importedAccount);
      });
      actions.setSetting('account', filtered[0]);
      actions.setTemporaryKey(value, 'active');
      history.push("/");
    }
    closeModal();
  }

  render() {
    const { modalOpen, closeModal, accounts } = this.props;
    const {
      value,
      error,
      btnDisable,
    } = this.state;
    const importedAccounts = this.props.accounts && this.props.accounts.__lookups;

    return (
      <Modal onClose={closeModal} className="" size={"tiny"} open={modalOpen}>
        <Modal.Content className="importAccountModal-body">
          <div className="modal-header">
            <span>Import </span>
            <span> Account</span>
          </div>
          <div className="modal-body">
            <Form.Field
              className="custom-import"
              control={TextArea}
              name="privateKey"
              onChange={this.onChange}
              defaultValue={value}
              error={!error}
              placeholder="Active Private key"
            />
            {this.state.error && importedAccounts.length > 0 && (
              <div>
                <div className="importModal-label">
                  <div>
                    Select one or more accounts to import with this private key
                </div>
                  <div className="imported-users-wrap">
                    {importedAccounts.map(importedAccount => (
                      <div className="user-row" key={importedAccount}>
                        <Checkbox
                          label={importedAccount}
                          onChange={this.onSelectAccount}
                          name="selectedAccounts"
                          value={importedAccount}
                        />
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  className={`delegate-btn-sem delegate-btn ${btnDisable ? "btn-disable" : ""}`}
                  onClick={this.onSubmit}
                  disabled={btnDisable}
                >
                  Confirm Import
                <img
                    src={require("../../../../../../renderer/assets/images/dashboard/correct3.png")}
                  />
                </button>
              </div>
            )}
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

ImportAccountModal.propTypes = {};

ImportAccountModal.defaultProps = {};

// export default withRouter(ImportAccountModal);

const mapStateToProps = (state, ownProps) => {
  return {
    wallets: state.wallets
  };
};

export default withRouter(connect(mapStateToProps)(ImportAccountModal));
