import React from "react";
import { Card, Button, Tab, Table, Image, Header } from "semantic-ui-react";

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
			<Card className="trending-assets-card" >
				<Image src={require('../../../../../renderer/assets/images/dashboard/dallas141.png')} />
				<Card.Header className="t-card-title">Methews</Card.Header>
				<Card.Meta>
					<div className="t-card-author">theonlykarma</div>
					<div className="t-card-price">
						<Image src={require('../../../../../renderer/assets/images/dashboard/Group47.png')} />
						<div className="t-card-des">
							25,000 KARMAR
						</div>
					</div>
					<div className="card-btn-group">
						<Button className="card-detail-btn">Details</Button>
						<Button className="card-buy-btn">Buy</Button>
					</div>
				</Card.Meta>
			</Card>
			<Card className="trending-assets-card" >
				<Image src={require('../../../../../renderer/assets/images/dashboard/dallas141.png')} />
				<Card.Header className="t-card-title">Methews</Card.Header>
				<Card.Meta>
					<div className="t-card-author">theonlykarma</div>
					<div className="t-card-price">
						<Image src={require('../../../../../renderer/assets/images/dashboard/Group47.png')} />
						<div className="t-card-des">
							25,000 KARMAR
						</div>
					</div>
					<div className="card-btn-group">
						<Button className="card-detail-btn">Details</Button>
						<Button className="card-buy-btn">Buy</Button>
					</div>
				</Card.Meta>
			</Card>
			<Card className="trending-assets-card" >
				<Image src={require('../../../../../renderer/assets/images/dashboard/dallas141.png')} />
				<Card.Header className="t-card-title">Methews</Card.Header>
				<Card.Meta>
					<div className="t-card-author">theonlykarma</div>
					<div className="t-card-price">
						<Image src={require('../../../../../renderer/assets/images/dashboard/Group47.png')} />
						<div className="t-card-des">
							25,000 KARMAR
						</div>
					</div>
					<div className="card-btn-group">
						<Button className="card-detail-btn">Details</Button>
						<Button className="card-buy-btn">Buy</Button>
					</div>
				</Card.Meta>
			</Card>
			<Card className="trending-assets-card" >
				<Image src={require('../../../../../renderer/assets/images/dashboard/dallas141.png')} />
				<Card.Header className="t-card-title">Methews</Card.Header>
				<Card.Meta>
					<div className="t-card-author">theonlykarma</div>
					<div className="t-card-price">
						<Image src={require('../../../../../renderer/assets/images/dashboard/Group47.png')} />
						<div className="t-card-des">
							25,000 KARMAR
						</div>
					</div>
					<div className="card-btn-group">
						<Button className="card-detail-btn">Details</Button>
						<Button className="card-buy-btn">Buy</Button>
					</div>
				</Card.Meta>
			</Card>
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
