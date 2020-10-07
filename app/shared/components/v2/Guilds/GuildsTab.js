import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";
import { Table, Image, Header, Checkbox, Flag } from "semantic-ui-react";
import { forEach } from 'lodash';

import * as TableActions from "../../../actions/table";
import * as AccountActions from "../../../actions/accounts";
import * as GlobalsActions from "../../../actions/globals";
import * as SettingsActions from '../../../actions/settings';

class GuildsTab extends Component {
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
            getGuildsTable
        } = actions;
        if (validate.NODE) {
          getGuildsTable()
        }

    }

    numberWithComma(num){
      return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    render() {
        const {
            accounts,
            actions,
            globals,
            settings,
            tables,
            removeProducer,
            addProducer
        } = this.props;
        let producers = (tables.tlsguildsinfo && tables.tlsguildsinfo.tlsguildsinfo.producers.rows) || [];
        if (producers.length < 1) {
          const guilds = (tables.eosio &&
            tables.eosio.eosio &&
            tables.eosio.eosio.guilds &&
            tables.eosio.eosio.guilds.rows) || [];
            if (guilds.producers && guilds.producers.length > 0)
                producers = guilds.producers.map(guild => {
                  const {
                    owner,
                    url,
                    slogan,
                    philosophy,
                    background,
                    logo,
                    telegram,
                    steemit,
                    twitter,
                    wechat,
                    rank,
                    vote_count,
                    num_votes,
                    country,
                    flag,
                    voteNumChange
                  } = guild
                    return {
                      slogan,
                      telegram,
                      steemit,
                      twitter,
                      website: url,
                      wechat,
                      rank,
                      vote_count,
                      owner,
                      philosophy,
                      background,
                      logo,
                      reserved_1: '',
                      reserved_2: '',
                      reserved_3: '',
                      num_votes,
                      country,
                      flag,
                      voteNumChange
                    }
                });
        }

        if (!producers.length) {
            return null;
        }
        let rows = [];
        forEach(producers, (producer, index) => {
          const isSelected = this.props.selected.includes(producer.owner)
            rows.push((
            <Table.Row key={`producer-${index}`}>
                <Table.Cell className="common-checkbox">
                    <Checkbox
                      checked={isSelected}
                      onClick={
                        (isSelected)
                        ? () => removeProducer(producer.owner)
                        : () => addProducer(producer.owner)
                      }
                    />
                </Table.Cell>
                <Table.Cell >{index + 1}</Table.Cell>
                <Table.Cell >
                    <Image
                        src={producer.logo}
                        style={{width:"40px", height: '40px', borderRadius: '50%'}}
                    />
                </Table.Cell>
                <Table.Cell >
                    <Header style={{color:"white"}}>{producer.owner}</Header>
                </Table.Cell>
                <Table.Cell>
                    <div className="list-btn">
                    {producer.rank < 22 ? 'Top 21' : 'Stand By'}
                    </div>
                </Table.Cell>
                <Table.Cell>
                  <Flag name={producer.flag} style={{display:'inline', marginRight:'10px'}} />
                  <Header style={{color:"white", display:'inline'}}>
                      {producer.country}
                  </Header>
                </Table.Cell>
                <Table.Cell className="list-img-group" >
                    {producer.telegram &&
                        <a href={`https://telegram.dog/${producer.telegram}`} target="_blank"><Image src={require('../../../../renderer/assets/images/marketplace/telegram2.png')} /></a>}
                    {producer.website &&
                        <a href={producer.website} target="_target"><Image src={require('../../../../renderer/assets/images/marketplace/internet.png')} /></a>}
                    {producer.twitter &&
                        <a href={`https://twitter.com/${producer.twitter}`} target="_target"><Image src={require('../../../../renderer/assets/images/marketplace/Logo__x2014__FIXED.png')} /></a>}
                </Table.Cell>
                <Table.Cell>
                    <Header style={{color:"white"}}>
                      {this.numberWithComma(producer.num_votes.toFixed(2))}
                    {producer.voteNumChange < 0 ?
                      (<sup style={{marginLeft: "8px", color: 'red'}}>{this.numberWithComma(producer.voteNumChange.toFixed(2))}</sup>) :
                      (<sup style={{marginLeft: "8px", color: 'green'}}>+{this.numberWithComma(producer.voteNumChange.toFixed(2))}</sup>)
                    }
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

export default connect(mapStateToProps, mapDispatchToProps)(GuildsTab);
