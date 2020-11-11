import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./SideBar.global.css";
import { Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from "react-router-dom";

import * as GlobalsActions from "../../../actions/globals";
import * as AccountActions from "../../../actions/accounts";
import * as SettingsActions from "../../../actions/settings";
import * as TransferActions from "../../../actions/transfer";
import * as CreateAccountActions from "../../../actions/createaccount";
import * as WalletsActions from "../../../actions/wallets";
import * as WalletAction from "../../../actions/wallet";
import * as ChainActions from "../../../actions/chain";

import CreateAccountModal from "../Dashboard/Modals/CreateAccountModal/CreateAccountModal";
import ImportAccountModal from "../Dashboard/Modals/ImportAccountModal/ImportAccountModal";

const accountIcon = {
  image: {
    avatar: true,
    src: "../assets/images/dashboard/accountIcon.png"
  }
};

const SideBar = props => {
  let allAccounts = [];
  props.wallets.map(arr => {
    if (arr.text && arr.value) {
      allAccounts.push(arr);
    }
  });
  // const allAccounts = props.wallets;
  const [createAccountModal, toggleCreateAccountModal] = useState(false);
  const [importAccountModal, toggleImportAccountModal] = useState(false);
  const dropDownOptions = [
    {
      text: "Create Account",
      value: "createAccount",
      image: {
        avatar: true,
        src: "../assets/images/dashboard/dashboard-create.png"
      }
    },
    {
      text: "Import Account",
      value: "importAccount",
      image: {
        avatar: true,
        src: "../assets/images/dashboard/dashboard-import.png"
      }
    },
    ...allAccounts
  ];

  const handleChange = (e, { value }) => {
    switch (value) {
      case "createAccount":
        toggleCreateAccountModal(true);
        break;
      case "importAccount":
        toggleImportAccountModal(true);
        break;
      case "":
        break;
      default:
        props.actions.setSettings("account", value);
        props.history.push("/");
    }
  };

  const DropdownExampleSelection = () => (
    <Dropdown
      fluid
      selectOnNavigation={true}
      selection
      scrolling
      onChange={(e, data) => handleChange(e, data)}
      upward
      options={dropDownOptions}
      selectOnNavigation={false}
      value={props.settings.account || ""}
      className="left-nav-dropdown"
    />
  );
  const menuOption = [
    {
      text: "Home",
      value: "dashboard",
      image: require("../../../../renderer/assets/images/dashboard/dashboard-home.png")
    },
    {
      text: "Market",
      value: "marketplace",
      image: require("../../../../renderer/assets/images/dashboard/dashboard-market.png")
    },
    {
      text: "Apps",
      value: "apps",
      image: require("../../../../renderer/assets/images/dashboard/dashboard-apps.png")
    },
    {
      text: "Staking",
      value: "staking",
      image: require("../../../../renderer/assets/images/dashboard/dashboard-stacking.png")
    },
    {
      text: "Guilds",
      value: "guilds",
      image: require("../../../../renderer/assets/images/dashboard/dashboard-guilds.png")
    },
    {
      text: "Advanced",
      value: "advanced",
      image: require("../../../../renderer/assets/images/dashboard/dashabord-advanced.png")
    }
  ];

  const menuSection = menuOption.map(item => (
    <Link to={`/${item.value}`} key={item.value}>
      <div className="nav-item-wrap">
        <img src={item.image} />
        <div className="nav-item-title">{item.text}</div>
      </div>
    </Link>
  ));

  const {
    accounts,
    balances,
    connection,
    globals,
    settings,
    system,
    actions,
    chain,
    wallets,
  } = props;

  return (
    <div className="nav-section">
      <div className="logo-section">
        <div className="logo-img-wrap">
          <div className="logo-rect2-wrap">
            <div className="logo-rect2"></div>
          </div>
          <div className="logo-rect1-wrap">
            <div className="logo-rect1"></div>
          </div>
        </div>
        <div className="logo-text-wrap">
          <h3 className="pin-wax">WAX</h3>
          <h4 className="pin-desktop">D E S K T O P</h4>
        </div>
      </div>

      <div className="nav-items-section">{menuSection}</div>

      <div className="nav-select-section">
        <DropdownExampleSelection />
      </div>
      {createAccountModal && (
        <CreateAccountModal
          settings={settings}
          balances={balances}
          globals={globals}
          accounts={accounts}
          system={system}
          connection={connection}
          closeModal={() => toggleCreateAccountModal(false)}
          modalOpen={createAccountModal}
          history={history}
          actions={actions}
          location={location}
        />
      )}
      {importAccountModal && (
        <ImportAccountModal
          settings={settings}
          balances={balances}
          globals={globals}
          accounts={accounts}
          system={system}
          // wallets={wallets}
          connection={connection}
          closeModal={() => toggleImportAccountModal(false)}
          modalOpen={importAccountModal}
          history={history}
          actions={actions}
          location={location}
          chain={chain}
        />
      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    balances: state.balances,
    settings: state.settings,
    globals: state.globals,
    accounts: state.accounts,
    system: state.system,
    connection: state.connection,
    wallets: state.wallets,
    chain: state.chain,
    wallet: state.wallet,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...AccountActions,
        ...GlobalsActions,
        ...SettingsActions,
        ...TransferActions,
        ...CreateAccountActions,
        ...WalletsActions,
        ...ChainActions,
        ...WalletAction,
      },
      dispatch
    )
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(SideBar)
);
