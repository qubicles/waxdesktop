import React from "react";
import PropTypes from "prop-types";
import { Form, TextArea, Dropdown, Modal } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

import debounce from "lodash/debounce";

const ecc = require("eosjs-ecc");

import "./ImportAccountModal.global.css";

import "./ImportAccountModal.global.css";

class ImportAccountModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      error: false
    };
  }

  onChange = debounce((e, { name, value }) => {
    const parsed = value.trim();
    const { actions } = this.props;
    this.setState(
      {
        value: parsed
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
          this.setState({
            value: parsed,
            error: !valid
          });
        } catch (error) {
          this.setState({
            value: parsed,
            error: true
          });
        }
      }
    );
  }, 300);

  onSubmit = () => {
    const { value } = this.state;
    const { actions, closeModal, history } = this.props;
    const importedAccount = this.props.accounts.__lookups[0];

    if (!value) {
      this.setState({
        error: true
      });
      return;
    } else {
      actions.addNewAccount(importedAccount);
      history.push("/");
      closeModal();
    }
  };

  render() {
    const { modalOpen, closeModal, accounts } = this.props;

    const { value, error } = this.state;

    const importedAccount = accounts && accounts.__lookups[0];

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
              error={error}
              placeholder="Active Private key"
            />
            {!this.state.error && (
              <div>
                <div className="importModal-label">
                  imported account: {importedAccount}
                </div>
                <div className="delegate-btn" onClick={this.onSubmit}>
                  Confirm Import
                  <img
                    src={require("../../../../../../renderer/assets/images/dashboard/correct3.png")}
                  />
                </div>
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

export default withRouter(ImportAccountModal);
