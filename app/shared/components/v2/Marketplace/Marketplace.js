
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown } from "semantic-ui-react"
import { connect } from 'react-redux';
import "./Marketplace.global.css"

const options = [
    { key: 1, text: 'Most Recent', value: 1 },
    { key: 2, text: 'Choice 2', value: 2 },
    { key: 3, text: 'Choice 3', value: 3 },
]

const MarketplaceDropdown = () => (
    <Dropdown 
        clearable 
        options={options} 
        defaultValue={1}
        selection
        className="round-dropdown"
    />
)

  
class Marketplace extends React.Component {
	constructor(props) {
		super(props)
		this.state = {}
    }
    
    toggleRadio = () => {
		const { radioChange } = this.state
		this.setState({
			radioChange: !radioChange,
		})
    }
    
	render() {
        const { radioChange  } = this.state
		return (
			<div className="dashboard-container">
				<div className="dashboard-body-section">
					<div className="market-search-section">
                        <div className="round-search-bar">
                            <input type="text" className="round-input" />
                            <div className="round-search-btn">
                                <img src={require('../../../../renderer/assets/images/marketplace/Group543.png')} />
                            </div>
                        </div>
                        <MarketplaceDropdown />
                    </div>
                    <div className="marketplace-card-section">
                        <div className="card-wrap">
                            <Card className="trending-assets-card" >
                                <Image src={require('../../../../renderer/assets/images/dashboard/dallas141.png')} />
                                <Card.Header className="t-card-title">Methews</Card.Header>
                                <Card.Meta>
                                    <div className="t-card-author">theonlykarma</div>
                                    <div className="t-card-price">
                                        <Image src={require('../../../../renderer/assets/images/dashboard/Group47.png')} />
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
                                <Image src={require('../../../../renderer/assets/images/dashboard/dallas141.png')} />
                                <Card.Header className="t-card-title">Methews</Card.Header>
                                <Card.Meta>
                                    <div className="t-card-author">theonlykarma</div>
                                    <div className="t-card-price">
                                        <Image src={require('../../../../renderer/assets/images/dashboard/Group47.png')} />
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
                                <Image src={require('../../../../renderer/assets/images/dashboard/dallas141.png')} />
                                <Card.Header className="t-card-title">Methews</Card.Header>
                                <Card.Meta>
                                    <div className="t-card-author">theonlykarma</div>
                                    <div className="t-card-price">
                                        <Image src={require('../../../../renderer/assets/images/dashboard/Group47.png')} />
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
                                <Image src={require('../../../../renderer/assets/images/dashboard/dallas141.png')} />
                                <Card.Header className="t-card-title">Methews</Card.Header>
                                <Card.Meta>
                                    <div className="t-card-author">theonlykarma</div>
                                    <div className="t-card-price">
                                        <Image src={require('../../../../renderer/assets/images/dashboard/Group47.png')} />
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
                                <Image src={require('../../../../renderer/assets/images/dashboard/dallas141.png')} />
                                <Card.Header className="t-card-title">Methews</Card.Header>
                                <Card.Meta>
                                    <div className="t-card-author">theonlykarma</div>
                                    <div className="t-card-price">
                                        <Image src={require('../../../../renderer/assets/images/dashboard/Group47.png')} />
                                        <div className="t-card-des">
                                            25,000 KARMAR
                                        </div>
                                    </div>
                                    <div className="card-btn-group">
                                        <Button className="card-detail-btn">Details</Button>
                                        <Button className="card-buy-btn">Buy</Button>
                                    </div>
                                </Card.Meta>
                            </Card><Card className="trending-assets-card" >
                                <Image src={require('../../../../renderer/assets/images/dashboard/dallas141.png')} />
                                <Card.Header className="t-card-title">Methews</Card.Header>
                                <Card.Meta>
                                    <div className="t-card-author">theonlykarma</div>
                                    <div className="t-card-price">
                                        <Image src={require('../../../../renderer/assets/images/dashboard/Group47.png')} />
                                        <div className="t-card-des">
                                            25,000 KARMAR
                                        </div>
                                    </div>
                                    <div className="card-btn-group">
                                        <Button className="card-detail-btn">Details</Button>
                                        <Button className="card-buy-btn">Buy</Button>
                                    </div>
                                </Card.Meta>
                            </Card><Card className="trending-assets-card" >
                                <Image src={require('../../../../renderer/assets/images/dashboard/dallas141.png')} />
                                <Card.Header className="t-card-title">Methews</Card.Header>
                                <Card.Meta>
                                    <div className="t-card-author">theonlykarma</div>
                                    <div className="t-card-price">
                                        <Image src={require('../../../../renderer/assets/images/dashboard/Group47.png')} />
                                        <div className="t-card-des">
                                            25,000 KARMAR
                                        </div>
                                    </div>
                                    <div className="card-btn-group">
                                        <Button className="card-detail-btn">Details</Button>
                                        <Button className="card-buy-btn">Buy</Button>
                                    </div>
                                </Card.Meta>
                            </Card><Card className="trending-assets-card" >
                                <Image src={require('../../../../renderer/assets/images/dashboard/dallas141.png')} />
                                <Card.Header className="t-card-title">Methews</Card.Header>
                                <Card.Meta>
                                    <div className="t-card-author">theonlykarma</div>
                                    <div className="t-card-price">
                                        <Image src={require('../../../../renderer/assets/images/dashboard/Group47.png')} />
                                        <div className="t-card-des">
                                            25,000 KARMAR
                                        </div>
                                    </div>
                                    <div className="card-btn-group">
                                        <Button className="card-detail-btn">Details</Button>
                                        <Button className="card-buy-btn">Buy</Button>
                                    </div>
                                </Card.Meta>
                            </Card><Card className="trending-assets-card" >
                                <Image src={require('../../../../renderer/assets/images/dashboard/dallas141.png')} />
                                <Card.Header className="t-card-title">Methews</Card.Header>
                                <Card.Meta>
                                    <div className="t-card-author">theonlykarma</div>
                                    <div className="t-card-price">
                                        <Image src={require('../../../../renderer/assets/images/dashboard/Group47.png')} />
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
                        </div>
                    </div>
                </div>
                <div className="balance-section">
                    <div className="marketplace-currency-section">
                        <div className="title">Currency</div>
                        <div className="currency-btn-group">
                            <div className="currency-btn-wax">WAX</div>
                            <div className="currency-btn-usd">USD</div>
                        </div>
                    </div>
                    <div className="marketplace-filter-section">
                        <div className="title">Price Filter</div>
                        <div className="price-filter-wrap">
                            <div className="min-price">Min Price</div>
                            <div>Max Price</div>
                        </div>
                    </div>
                    <div className="marketplce-collections-section">
                        <div className="title">Collections</div>
                        <div className="radio-btn-wrap">
                            <form>
                                <div className="common-radio">
                                    <input type="radio" id="collectionsRadio1" />
                                    <label htmlFor="collectionsRadio1">GPK</label>
                                </div>
                                <div className="common-radio">
                                    <input type="radio" id="collectionsRadio2" />
                                    <label htmlFor="collectionsRadio2">Topps</label>
                                </div>
                                <div className="common-radio">
                                    <input type="radio" id="collectionsRadio3" />
                                    <label htmlFor="collectionsRadio3">Topps</label>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
			</div>

		)
	}
}

Marketplace.propTypes = {

}

Marketplace.defaultProps = {

}

export default Marketplace
