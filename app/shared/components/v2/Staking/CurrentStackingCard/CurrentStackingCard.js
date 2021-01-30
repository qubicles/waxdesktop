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
import ResourcesModal from "../../Dashboard/Modals/ResourcesModal/ResourcesModal";
import "./CurrentStackingCard.global.css";


class CurrentStackingCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcesModal: false,
    };
  }

  toggleResourcesModal = () => {
    const { resourcesModal } = this.state;
    this.setState({ resourcesModal: !resourcesModal });
  };

  render() {
    const { resourcesModal } = this.state;
    const { history, location, accounts, settings, globals } = this.props
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
        <div className="stake-card-btn" onClick={this.toggleResourcesModal}>Stake Rewards</div>
        {resourcesModal && (
          <ResourcesModal
            closeModal={this.toggleResourcesModal}
            modalOpen={resourcesModal}
            history={history}
            actions={actions}
            location={location}
            accounts={accounts}
            settings={settings}
            globals={globals}
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
