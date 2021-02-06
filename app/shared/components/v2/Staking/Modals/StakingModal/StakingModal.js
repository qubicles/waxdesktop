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
    actions.testVoteRewards()
  }

  render() {
    const { modalOpen, closeModal, settings, actions } = this.props;
    return (
      <Modal
        onClose={closeModal}
        className="dashboardTokenModal"
        size={"tiny"}
        open={modalOpen}
      >
        <Modal.Content className="dashboardTokenModal-body">
          <div className="modal-header">
            <span>Staking </span>
            <span> Rewards</span>
          </div>
          <div className="modal-body">
            <div>
              <span>Total Genesis WAX tokens: </span>
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