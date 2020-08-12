import React from "react";
import { Tab, Table, Image, Header } from "semantic-ui-react";

import './TabPanes.global.css'

class TabPanes extends React.Component {
  getPanes() {
    const { tokens } = this.props;
    const tokensPane = {
      menuItem: "Tokens",
      render: () => (
        <Tab.Pane attached={false}>
          <Table className="tokens-table">
            <Table.Body>
              {tokens.map((token, id) => (
                <Table.Row className="token-wrap" key={id}>
                  <Table.Cell>
                    <Image
                      src={require(`../../../../../renderer/assets/images/dashboard/${token.img}`)}
                    />
                  </Table.Cell>
                    <Table.Cell className="token-des">
                      <div className="des-title">
                        <Header as="h3">{token.name}</Header>
                        <Header as="h5">{token.quant}</Header>
                      </div>
                    </Table.Cell>
                    <Table.Cell className="des-price">{token.price}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Tab.Pane>
      )
    };

    const nftsPane = {
      menuItem: "NFTS",
      render: () => (
        <Tab.Pane attached={false}>
          <b>Tab 2 Content</b>
        </Tab.Pane>
      )
    };
    return [tokensPane, nftsPane];
  }

  render() {
    return (
      <Tab menu={{ secondary: true, pointing: true }} panes={this.getPanes()} />
    );
  }
}

export default TabPanes;
