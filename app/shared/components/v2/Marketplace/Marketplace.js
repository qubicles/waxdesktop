import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  Image,
  Divider,
  Tab,
  Button,
  Dropdown,
  Form,
  Input
} from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import debounce from "lodash/debounce";

import * as AssetsActions from "../../../actions/assets";
import "./Marketplace.global.css";
import MarketplaceRightNav from "./MarketplaceRightNav/MarketplaceRightNav";

const options = [
  { key: "created", text: "Most Recent", value: "created" },
  { key: "updated", text: "Recently Updated", value: "updated" },
  { key: "price", text: "Price", value: "price" }
];

class Marketplace extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      match: "",
      owner: "",
      page: 1,
      limit: 100,
      order: "desc",
      sort: "created",
      minPrice: "",
      maxPrice: ""
    }
  }

  componentDidMount() {
    this.getAllAssets();
  }

  getAllAssets = () => {
    const { actions: { getAssets } } = this.props;
    const { match, owner, page, limit, order, sort, minPrice, maxPrice } = this.state;
    getAssets({ match, owner, page, limit, order, sort, minPrice, maxPrice });
  }

  onChange = debounce((e, { name, value }) => {
    this.setState({
      [name]: value
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
    const { match } = this.state;
    const { assets: { isAssetsLoading, assetsList } } = this.props;
    if (isAssetsLoading) {
      return <div>Loading...</div>
    }

    if (assetsList && assetsList.data.length === 0) {
      return <div>No data found for "<b>{match}</b>", Please try again!</div>
    }

    return assetsList && assetsList.data.map(asset =>
      <Card className="trending-assets-card" key={`assets-${asset.offer_id}`}>
        <Image src={`https://ipfs.io/ipfs/${asset.collection.img}`} />
        <Card.Header className="t-card-title">{asset.collection.name}</Card.Header>
        <Card.Meta>
          <div className="t-card-author">{asset.collection.author}</div>
          <div className="t-card-price">
            <Image src={require('../../../../renderer/assets/images/dashboard/Group47.png')} />
            <div className="t-card-des">
              {asset.listing_price/80000000} {asset.listing_symbol}
            </div>
          </div>
          <div className="card-btn-group">
            <Button className="card-detail-btn">Details</Button>
            <Button className="card-buy-btn">Buy</Button>
          </div>
        </Card.Meta>
      </Card>)

  }

  handleChange = (e, { name, value }) => {
    this.setState({
      sort: value
    }, () => {
      this.getAllAssets();
    })
  }

  render() {
    const { radioChange, match, sort, minPrice, maxPrice } = this.state;
    const displayAssets = this.renderAssets();

    const MarketplaceDropdown = () => (
      <Dropdown
        clearable
        options={options}
        defaultValue={sort}
        selection
        className="round-dropdown"
        onChange={this.handleChange}
      />
    )

    return (
      <div className="dashboard-container">
        <div className="dashboard-body-section">
          <div className="market-search-section">
            <div className="round-search-bar">
              <Form.Field
                className="round-input"
                autoFocus
                control={Input}
                fluid
                name="match"
                onChange={this.onChange}
                defaultValue={match}
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
              <Form.Field
                className="price-input"
                control={Input}
                name="minPrice"
                type="number"
                onChange={this.onChange}
                defaultValue={minPrice}
              />
              <Form.Field
                className="price-input"
                control={Input}
                name="maxPrice"
                type="number"
                onChange={this.onChange}
                defaultValue={maxPrice}
              />
              {/* <div className="min-price">Min Price</div>
                            <div>Max Price</div> */}
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
    );
  };
}

Marketplace.propTypes = {};

Marketplace.defaultProps = {};
const mapStateToProps = state => {
  return {
    assets: state.assets
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...AssetsActions
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);
