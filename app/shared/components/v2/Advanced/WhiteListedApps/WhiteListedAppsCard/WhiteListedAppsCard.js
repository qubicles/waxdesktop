import React from "react";
import SlideToggle from "react-slide-toggle";
import PropTypes from "prop-types";
import { translate } from 'react-i18next';
import { debounce, filter, sortBy } from 'lodash';
import { find } from 'lodash';
import { bindActionCreators } from "redux";

import {
  Card,
  Button,
  Confirm,
  Container,
  Icon,
  Header, 
  Input,
  Message,
  Segment,
  Table
} from 'semantic-ui-react';

import * as GlobalsActions from "../../../../../actions/globals";
import * as AccountActions from "../../../../../actions/accounts";
import * as SettingsActions from "../../../../../actions/settings";
import * as TransferActions from "../../../../../actions/transfer";
import * as TableActions from "../../../../../actions/table";

import { connect } from "react-redux";
import Balance from "../../../Dashboard/Balance/Balance";
import "./WhiteListedAppsCard.global.css";
import AuthorizedApp from '../../../../../../wallet-integration/API/models/AuthorizedApp'
import {PermissionList} from'../../../../../../wallet-integration/API/models/PermissionList'
import APIUtils from '../../../../../../wallet-integration/API/util/APIUtils'



class WhiteListedAppsCard extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        query: '',
        numberToLoad: 10,
        confirmDeleteAll: false,
        confirmDeleteApp: false,
        confirmDeletePermission: false,
        appToDelete: undefined,
        permissionToDelete: undefined
      };
    }
  
    onSearchChange = debounce((e, { value }) => {
      const query = String(value).toLowerCase();
  
      this.setState({ query });
    }, 300);
  
    render() {
      const {
        accounts,
        actions,
        blockExplorers,
        keys,
        settings,
        system,
        t,
        validate,
        wallet,
        wapii,
        connection
      } = this.props;
  
      const account = accounts[settings.account] ;
  
      if (!account || !wapii || !wapii.authorizedApps || !wapii.authorizedApps.length)
        return (
          <Message
            content='There are no apps connected to WDW'
            icon="info circle"
            info
            color="orange"
            size="small"
            compact
          />
        );
  
      const {
        confirmDeleteAll,
        confirmDeleteApp,
        confirmDeletePermission,
        numberToLoad,
        query
      } = this.state;
  
      const {
        removeApp,
        removeApps,
        removePermission,
        removePermissionsByOrigin
      } = actions;
  
      const apps = wapii.authorizedApps.map((app) => {
        return new AuthorizedApp(app.origin, app.appkey, app.nextNonce, app.createdAt);
      });
  
      const sortedApps = sortBy(apps, 'origin');
  
      const appsToDisplay = filter(sortedApps, (app) => {
        const matchesLabel = (String(app.origin).toLowerCase()).indexOf(query) > -1;
  
        return !query || matchesLabel;
      }).slice(0, numberToLoad);
  
      let permissions = PermissionList.permissionsPerOrigin(wapii.permissions);
      permissions = Object.keys(permissions)
        .reduce((value, origin) => {
          value[origin] = PermissionList.permissionsPerType( permissions[origin] );
          return value;
        }, {});

    return (
      <div className="item-list-wrap">
        {appsToDisplay.map((app, i) => (
        <SlideToggle
          collapsed
          duration={800}
          render={({ onToggle, setCollapsibleElement, progress }) => (
            <div className="item-list-body">
              <div className="item-parent-wrap">
                <div className="item-parent-left" onClick={onToggle}></div>
                <div className="item-parent-right">
                  <div className="round-checkbox">
                    <Checkbox onClick={() => this.setState({ confirmDeleteApp: true, appToDelete: app})}/>
                  </div>
                </div>
              </div>

            {(permissions[app.origin] && permissions[app.origin].identityRequirements.length) ? (
              <div className="item-child-wrap" ref={setCollapsibleElement}>
                <div
                  className="item-child-inner"
                  style={{
                    transform: `translateY(${Math.round(
                      20 * (-1 + progress)
                    )}px)`
                  }}
                >
                  {permission.accounts.map((unique, i1) => { const account = PermissionList.getAccountUnique(unique, wapii.accounts);
                  <React.Fragment>
                  <div className="item-child-group">
                    <div className="item-child-des">{account.name}@{account.authority}</div>
                    <div className="common-checkbox">
                      <Checkbox onClick={() => this.setState({ confirmDeletePermission: true, permissionToDelete: permission})}/>
                    </div>
                  </div>

                  <div className="item-child-group">
                    <div className="item-child-des">{account.name}@{account.authority}</div>
                    <div className="common-checkbox">
                      <Checkbox onClick={() => this.setState({ confirmDeletePermission: true, permissionToDelete: permission})}/>
                    </div>
                  </div>


                  <div className="item-child-group">
                    <div className="item-child-des">{account.name}@{account.authority}</div>
                    <div className="common-checkbox">
                      <Checkbox onClick={() => this.setState({ confirmDeletePermission: true, permissionToDelete: permission})}/>
                    </div>
                  </div>
                  </React.Fragment>
                  })}
                  </div>
              </div>
              ) : false }
            </div>
          )}
        />
        ))}
      </div>
    );
  }
}

WhiteListedAppsCard.propTypes = {};

WhiteListedAppsCard.defaultProps = {};

const mapStateToProps = (state) => {
  return {
      settings: state.settings,
      globals: state.globals,
      accounts: state.accounts,
      tables: state.tables,
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
      actions: bindActionCreators({
          ...AccountActions,
          ...GlobalsActions,
          ...SettingsActions,
          ...TableActions
      }, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(WhiteListedAppsCard);
