
import React from "react"
import PropTypes from "prop-types"
import { Card, Image, Divider, Tab, Button, Dropdown, Form, Input } from "semantic-ui-react"
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import debounce from 'lodash/debounce';

import * as AssetsActions from "../../../actions/assets";
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
        super(props);
        this.state = {
            owner: "",
            page: 1,
            limit: 100,
            order: "desc",
            sort: "asset_id"
        }
    }

    componentDidMount() {
        this.getAllAssets();
    }

    getAllAssets = () => {
        const { actions: { getAssets } } = this.props;
        const { owner, page, limit, order, sort } = this.state;
        getAssets({ owner, page, limit, order, sort });
    }

    onChange = debounce((e, { name, value }) => {
        this.setState({
            owner: value
        }, () => {
            this.getAllAssets();
        });
    }, 300)

    toggleRadio = () => {
        const { radioChange } = this.state
        this.setState({
            radioChange: !radioChange,
        })
    }

    renderAssets = () => {
        const { owner } = this.state;
        const { assets: { isAssetsLoading, assetsList } } = this.props;
        if (isAssetsLoading) {
            return <div>Loading...</div>
        }

        if (assetsList && assetsList.data.length === 0) {
            return <div>No data found with "<b>{owner}</b>", Please provide correct owner names</div>
        }

        return assetsList && assetsList.data.map(asset =>
            <Card className="trending-assets-card" key={`assets-${asset.asset_id}`}>
                <Image src={`https://ipfs.io/ipfs/${asset.data.img}`} />
                <Card.Header className="t-card-title">{asset.name}</Card.Header>
                <Card.Meta>
                    <div className="t-card-author">{asset.owner}</div>
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
            </Card>)

    }

    render() {
        const { radioChange, owner } = this.state;
        const displayAssets = this.renderAssets();

        return (
            <div className="dashboard-container">
                <div className="dashboard-body-section">
                    <div className="market-search-section">
                        <div className="round-search-bar">
                            <Form.Field
                                className="round-input"
                                control={Input}
                                fluid
                                name={"owner"}
                                onChange={this.onChange}
                                defaultValue={owner}
                            />
                            <div className="round-search-btn">
                                <img src={require('../../../../renderer/assets/images/marketplace/Group543.png')} />
                            </div>
                        </div>
                        <MarketplaceDropdown />
                    </div>
                    <div className="marketplace-card-section">
                        <div className="card-wrap">
                            {displayAssets}
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
const mapStateToProps = (state) => {
    return {
        assets: state.assets
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            ...AssetsActions,
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);
