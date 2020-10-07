// @flow
import React, { Component } from "react";
import { Button, Header, Modal } from "semantic-ui-react";

import GlobalTransactionHandler from "./Handler";

type Props = {
  actionName: string,
  actions: {
    clearSystemState: () => void
  },
  button: {},
  content: {},
  icon: string,
  title: string,
  settings: {},
  system: {}
};

class GlobalTransactionModal extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      open: props.open ? props.open : false
    };
  }

  handleOpen = () => this.setState({ open: true });

  onClose = () =>
    this.setState({ open: false }, () => {
      if (this.props.onClose) {
        this.props.onClose();
      }
      this.props.actions.clearSystemState();
    });

  onOpen = () => {
    const { onOpen } = this.props;
    if (onOpen) {
      onOpen();
    }
  };

  render() {
    const {
      actionName,
      actions,
      blockExplorers,
      content,
      icon,
      title,
      settings,
      size,
      system,
      confirmVotesButton
    } = this.props;
    let { button, contract, openModal, transaction } = this.props;
    const { open } = this.state;
    button =
      (<span onClick={this.handleOpen}> {confirmVotesButton} </span>) ||
      (button ? (
        <Button
          color={button.color}
          content={button.content}
          disabled={button.disabled}
          fluid={button.fluid}
          floated={button.floated}
          icon={button.icon}
          onClick={this.handleOpen}
          size={button.size}
        />
      ) : (
        button
      ));
    // Load the transaction from props by default, but overwrite
    //   with last transaction from the system if exists
    if (system && system[`${actionName}_LAST_TRANSACTION`]) {
      transaction = system[`${actionName}_LAST_TRANSACTION`];
    }
    // Load the contract from props by default, but overwrite
    //   with last contract from the system if exists
    if (system && system[`${actionName}_LAST_CONTRACT`]) {
      contract = system[`${actionName}_LAST_CONTRACT`];
    }
    return (
      <Modal
        centered={false}
        closeIcon
        closeOnDimmerClick={false}
        closeOnDocumentClick={false}
        trigger={button ? button : false}
        open={openModal || open}
        onOpen={this.onOpen}
        onClose={this.onClose}
        size={size || "small"}
      >
        <Header icon={icon} content={title} />
        <Modal.Content>
          <GlobalTransactionHandler
            actionName={actionName}
            actions={actions}
            blockExplorers={blockExplorers}
            content={content}
            contract={contract}
            onClose={this.onClose}
            settings={settings}
            system={system}
            transaction={transaction}
          />
        </Modal.Content>
      </Modal>
    );
  }
}

export default GlobalTransactionModal;
