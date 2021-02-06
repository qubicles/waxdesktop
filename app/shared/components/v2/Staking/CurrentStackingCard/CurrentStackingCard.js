import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Image,
  Divider,
  Tab,
  Button,
  Dropdown,
  Radio
} from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as AccountActions from "../../../../actions/accounts";
import * as SettingsActions from "../../../../actions/settings";
import * as GlobalsActions from "../../../../actions/globals"
import StakingModal from "../Modals/StakingModal/StakingModal"
import "./CurrentStackingCard.global.css";


class CurrentStackingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stakingModal: false,
    };
  }

  toggleStakingModal = () => {
    const { stakingModal } = this.state;
    this.setState({ stakingModal: !stakingModal });
  };

  render() {
    const { stakingModal } = this.state;
    const { history, location, accounts, settings, globals, actions } = this.props
    return (
      <div className="staking-card-left">
        <div className="staking-card-logo">
          <img
            src={require("../../../../../renderer/assets/images/marketplace/ScrollGroup3.png")}
          />
          <div className="staking-card-des">
            <div>Pending Rewards</div>
            <div>1,468,932.19 WAX</div>
          </div>
        </div>
        <Button 
          className="stake-card-btn"
          onClick={this.toggleStakingModal}
        >
          Staking Rewards
        </Button>
        {stakingModal && (
          <StakingModal
            closeModal={this.toggleStakingModal}
            modalOpen={stakingModal}
            history={history}
            actions={actions}
            location={location}
            settings={settings}
          />
        )}
      </div>
    );
  }
}

CurrentStackingCard.propTypes = {};

CurrentStackingCard.defaultProps = {};

const mapStateToProps = state => {
  return {
    settings: state.settings,
    globals: state.globals,
    accounts: state.accounts,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...AccountActions,
        ...GlobalsActions,
        ...SettingsActions,
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentStackingCard);
