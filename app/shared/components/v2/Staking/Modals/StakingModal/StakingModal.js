import React from "react";
import PropTypes from "prop-types";
import { Dropdown, Modal, Form, Input, Button } from "semantic-ui-react";
import { find } from "lodash";

import "./StakingModal.global.css";

class StakingModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    const { actions } = this.props;
    // actions.getGenesisBalance("bxxaw.wam");
  }

  render() {
    const { modalOpen, closeModal, settings, actions } = this.props;
    return (
      <Modal
        onClose={closeModal}
        className="staking-modal-wrap"
        size={"medium"}
        open={modalOpen}
      >
        <Modal.Content className="staking-modal-body">
          <div className="modal-header">
            <span>Staking </span>
            <span> Rewards</span>
          </div>
          <div className="modal-body">
            <div className="rewards-info-row">
              <span>Total Genesis WAX tokens: </span>
              <span>234234.4646 WAX</span> 
            </div>
            <div className="rewards-info-row">
              <span>Daily Rewards: </span>
              <span>234234.4646 WAX</span> 
            </div>
            <div className="rewards-info-row">
              <span>Rewards earned to date: </span>
              <span>234234.4646 WAX</span> 
            </div>
            <div className="rewards-info-row">
              <span>Total staking/voter rewards pending: </span>
              <span>234234.4646 WAX</span> 
            </div>

          </div>
        </Modal.Content>
      </Modal>
    );
  }

}

StakingModal.propTypes = {};

StakingModal.defaultProps = {};

export default StakingModal;