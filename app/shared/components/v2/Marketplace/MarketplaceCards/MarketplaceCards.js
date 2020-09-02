import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import "./MarketplaceCards.global.css"


import { Card, Image, Button } from "semantic-ui-react";

const marketplaceCardList = [
    {
        title: 'King Keo',
        value: 'theonlykarma',
        description: '25,000 KARMA',
        logo: require('../../../../../renderer/assets/images/dashboard/dallas141.png'),
        image: require('../../../../../renderer/assets/images/dashboard/Group47.png'),
    },
    {
        title: 'King Keo',
        value: 'theonlykarma',
        description: '25,000 KARMA',
        logo: require('../../../../../renderer/assets/images/dashboard/dallas141.png'),
        image: require('../../../../../renderer/assets/images/dashboard/Group47.png'),
    },
    {
        title: 'King Keo',
        value: 'theonlykarma',
        description: '25,000 KARMA',
        logo: require('../../../../../renderer/assets/images/dashboard/dallas141.png'),
        image: require('../../../../../renderer/assets/images/dashboard/Group47.png'),
    },
    {
        title: 'King Keo',
        value: 'theonlykarma',
        description: '25,000 KARMA',
        logo: require('../../../../../renderer/assets/images/dashboard/dallas141.png'),
        image: require('../../../../../renderer/assets/images/dashboard/Group47.png'),
    },
    {
        title: 'King Keo',
        value: 'theonlykarma',
        description: '25,000 KARMA',
        logo: require('../../../../../renderer/assets/images/dashboard/dallas141.png'),
        image: require('../../../../../renderer/assets/images/dashboard/Group47.png'),
    },
    
]

class MarketplaceCards extends React.Component {
    
    render() {
            return (marketplaceCardList.map(item => (
                <Card className="trending-assets-card" >
                    <Image src={item.logo} />
                    <Card.Header className="t-card-title">{item.title}</Card.Header>
                    <Card.Meta>
                        <div className="t-card-author">{item.value}</div>
                        <div className="t-card-price">
                            <Image src={item.image} />
                            <div className="t-card-des">
                                {item.description}
                            </div>
                        </div>
                        <div className="card-btn-group">
                            <Button className="card-detail-btn">Details</Button>
                            <Button className="card-buy-btn">Buy</Button>
                        </div>
                    </Card.Meta>
                </Card>))
            )
        }
}

export default MarketplaceCards

