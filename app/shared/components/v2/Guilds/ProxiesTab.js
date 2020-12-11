import React, { Component, useState, useEffect } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Table, Image, Header, Checkbox, Flag, Popup, Button, Radio } from "semantic-ui-react";
import { forEach } from 'lodash';
import { translate } from 'react-i18next';

import * as TableActions from "../../../actions/table";
import * as AccountActions from "../../../actions/accounts";
import * as GlobalsActions from "../../../actions/globals";
import * as SettingsActions from '../../../actions/settings';

function MyImage(props) {
  const [url, setUrl] = useState(require('../../../../renderer/assets/images/profile.png'));
  useEffect(() => {
    if (props.src) {
      const imgElement = document.createElement('img');
      imgElement.onload = () => {
        setUrl(props.src)
      }
      imgElement.onerror = (e) => {
        setUrl(require('../../../../renderer/assets/images/profile.png'))
      }
      imgElement.src = props.src;
    }
  });
  return (
    <Image
      src={url}
      style={{ ...props.style }}
    />
  );
}
class ProxiesTab extends Component {
  componentDidMount() {
    this.tick();
    this.interval = setInterval(this.tick.bind(this), 120000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    const {
      actions,
      validate,
      settings
    } = this.props;
    const {
      getTable,
      getProxiesTable
    } = actions;
    if (validate.NODE) {
      getProxiesTable()
    }

  }

  deleteRegProxy = () => {
    const { actions } = this.props;
    actions.removeregproxyinfo();
    actions.unregproxy();
  }

  render() {
    const {
      accounts,
      actions,
      globals,
      settings,
      tables,
      system,
      keys,
      addProxy,
      removeProxy,
      t,
      currentProxy
    } = this.props;
    const account = accounts[settings.account];
    const isProxying = !!(account && account.voter_info && account.voter_info.proxy);
    let proxies = (tables.tlsproxyinfo && tables.tlsproxyinfo.tlsproxyinfo.proxies.rows) || [];
    if (proxies.length < 1) {
      const voters = (tables.eosio &&
        tables.eosio.eosio &&
        tables.eosio.eosio.voters &&
        tables.eosio.eosio.voters.rows) || [];
      if (voters.proxies && voters.proxies.length > 0)
        proxies = voters.proxies.map(proxy => {
          const {
            account,
            website,
            slogan,
            philosophy,
            background,
            logo_256,
            telegram,
            steemit,
            twitter,
            wechat,
            rank,
            vote_count,
          } = proxy
          return {
            slogan,
            telegram,
            steemit,
            twitter,
            website,
            wechat,
            rank,
            vote_count,
            owner: account,
            name: account,
            philosophy,
            background,
            logo_256,
            reserved_1: '',
            reserved_2: '',
            reserved_3: ''
          }
        });
    }

    if (!proxies.length) {
      return null;
    }
    let rows = [];
    forEach(proxies, (proxy, index) => {
      const currentProxy = (account && account.voter_info && account.voter_info.proxy);
      const isSelected = (proxy.owner === currentProxy)
      rows.push((
        <Table.Row key={`proxy-${index + 1}`}>
          <Table.Cell >{index + 1}</Table.Cell>
          <Table.Cell
            singleLine
            textAlign="center"
          >
            {
              (proxy.owner == settings.account) ?
                <GlobalTransactionModal
                  actionName="REMOVE_REGPROXYINFO"
                  actions={actions}
                  blockExplorers={blockExplorers}
                  button={{
                    color: 'red',
                    icon: 'trash'
                  }}
                  content={(
                    <Segment basic clearing>
                      <p>
                        This will delete your account <strong>{proxy.owner}</strong> as a voting proxy on the network. Are you sure you would like to continue?
                          <Button
                          color='red'
                          content="Delete Registration"
                          floated="right"
                          icon="trash"
                          loading={system.REMOVE_REGPROXYINFO === 'PENDING'}
                          style={{ marginTop: 20 }}
                          onClick={() => this.deleteRegProxy(proxy.owner)}
                          primary
                        />
                      </p>
                    </Segment>
                  )}
                  icon="share square"
                  settings={settings}
                  system={system}
                  title="Delete Proxy Registration"
                />
                : ''
            }

            <Popup
              content={t('producers_proxies_popup_content', { proxy: proxy.owner })}
              header={t('producers_proxies_popup_header')}
              hoverable
              position="right center"
              trigger={(
                <Button
                  color={isSelected ? 'blue' : 'grey'}
                  icon={isSelected ? 'circle' : 'circle outline'}
                  onClick={
                    (isSelected)
                      ? () => removeProxy(proxy.owner)
                      : () => addProxy(proxy.owner)
                  }
                  size="small"
                />
              )}
            />
          </Table.Cell>
          <Table.Cell >
            <MyImage
              src={proxy.logo_256}
              style={{ width: "40px", height: '40px', borderRadius: '50%' }}
            />
          </Table.Cell>
          <Table.Cell >
            <Header style={{ color: "white" }}>{proxy.owner}</Header>
          </Table.Cell>
          <Table.Cell>
            <div className="list-btn">
              {proxy.rank < 22 ? 'Top 21' : 'Stand By'}
            </div>
          </Table.Cell>
          <Table.Cell>
            <Flag name={proxy.flag} style={{ display: 'inline', marginRight: '10px' }} />
            <Header style={{ color: "white", display: 'inline' }}>
              {proxy.country}
            </Header>
          </Table.Cell>
          <Table.Cell className="list-img-group" >
            {proxy.telegram && <a target="_blank" href={`https://telegram.dog/${proxy.telegram}`}><Image src={require('../../../../renderer/assets/images/marketplace/telegram2.png')} /></a>}
            {proxy.website && <a target="_blank" href={proxy.website}><Image src={require('../../../../renderer/assets/images/marketplace/internet.png')} /></a>}
            {proxy.twitter && <a target="_blank" href={`https://www.twitter.com/${proxy.twitter}`}><Image src={require('../../../../renderer/assets/images/marketplace/Logo__x2014__FIXED.png')} /></a>}
          </Table.Cell>
          <Table.Cell>
            <Header style={{ color: "white" }}>
              {proxy.vote_count}
            </Header>
          </Table.Cell>
        </Table.Row>
      ))
    })

    return (
      <Table collapsing={true}>
        <Table.Body>
          {rows}
        </Table.Body>
      </Table>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    globals: state.globals,
    settings: state.settings,
    accounts: state.accounts,
    tables: state.tables,
    validate: state.validate
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

export default translate('producers')(connect(mapStateToProps, mapDispatchToProps)(ProxiesTab));
