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
  Input,
  Radio
} from "semantic-ui-react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import debounce from "lodash/debounce";

import * as AssetsActions from "../../../actions/assets";
import * as GlobalsActions from "../../../actions/globals";
import "./Marketplace.global.css";
import MarketplaceRightNav from "./MarketplaceRightNav/MarketplaceRightNav";
import BuyAssetModal from "../Marketplace/Modals/BuyAssetModal/BuyAssetModal";

const options = [
  { key: "created", text: "Most Recent", value: "created" },
  { key: "updated", text: "Updated", value: "updated" },
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
      maxPrice: "",
      collection: "",
      buyAssetModal: false,
      selectedAssets: "",
    };
  }

  componentDidMount() {
    const {
      actions: { getActiveCollections }
    } = this.props;
    this.getAllAssets();
    getActiveCollections();
  }

  getAllAssets = () => {
    const {
      actions: { getAssets }
    } = this.props;
    const {
      match,
      page,
      limit,
      order,
      sort,
      minPrice,
      maxPrice,
      collection,
      buyAssetModal
    } = this.state;

    getAssets({ match, page, limit, order, sort, minPrice, maxPrice });
  };

  onChange = debounce((e, { name, value }) => {
    this.setState(
      {
        [name]: value
      },
      () => {
        this.getAllAssets();
      }
    );
  }, 300);

  toggleRadio = () => {
    const { radioChange } = this.state;
    this.setState({
      radioChange: !radioChange
    });
  };

  toggleBuyAssetModal = (index) => {
    const { buyAssetModal } = this.state;
    const { assetsList } = this.props.assets;
    this.setState({ 
      buyAssetModal: !buyAssetModal,
      selectedAssets: assetsList.data[index],
    });
  };

  renderAssets = () => {
    const { match } = this.state;
    const {
      assets: { isAssetsLoading, assetsList }
    } = this.props;
    if (isAssetsLoading && assetsList.data.length === 0) {
      return <div>Loading...</div>;
    }

    if (assetsList && assetsList.data.length === 0) {
      return (
        <div>
          No data found for "<b>{match}</b>", Please try again!
        </div>
      );
    }

    return (
      assetsList &&
      assetsList.data.map((asset, index) => (
        <Card className="trending-assets-card" key={`assets-${asset.offer_id}`}>
          <Image src={asset.assets[0].data.img.indexOf('http') == -1 ? `https://ipfs.io/ipfs/${asset.assets[0].data.img}`: asset.assets[0].data.img } />
          <Card.Header className="t-card-title">
            {asset.assets[0].name}
          </Card.Header>
          <Card.Meta>
            <div className="t-card-author">{asset.seller}</div>
            <div className="t-card-price">
              <Image
                src={require("../../../../renderer/assets/images/dashboard/accountIcon.png")}
                style={{width: 16, height:16}}
              />
              <div className="t-card-des">
                {(asset.listing_price / 100000000).toFixed(2)} {asset.listing_symbol}
              </div>
            </div>
            <div className="card-btn-group">
              <Button 
              className="card-detail-btn"
              onClick={() => this.toggleBuyAssetModal(index)}
              >Details</Button>
              {/* <Button
                className="card-buy-btn"
                onClick={() => this.toggleBuyAssetModal(index)}
              >
                Buy
              </Button> */}
            </div>
          </Card.Meta>
        </Card>
      ))
    );
  };

  handleChange = (e, { name, value }) => {
    this.setState(
      {
        sort: value
      },
      () => {
        this.getAllAssets();
      }
    );
  };

  render() {
    const {
      radioChange,
      match,
      sort,
      minPrice,
      maxPrice,
      buyAssetModal,
      selectedAssets
    } = this.state;
    const displayAssets = this.renderAssets();
    const { assets, actions, globals } = this.props;

    const MarketplaceDropdown = () => (
      <Dropdown
        clearable
        options={options}
        defaultValue={sort}
        selection
        className="round-dropdown"
        onChange={this.handleChange}
      />
    );
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
                <img
                  src={require("../../../../renderer/assets/images/marketplace/Group543.png")}
                />
              </div>
            </div>
            <MarketplaceDropdown />
          </div>
          <div className="marketplace-card-section">
            <div className="card-wrap">{displayAssets}</div>
          </div>
        </div>
        <div className="balance-section">
          {/* <div className="marketplace-currency-section">
            <div className="title">Currency</div>
            <div className="currency-btn-group">
              <div className="currency-btn-wax">WAX</div>
              <div className="currency-btn-usd">USD</div>
            </div>
          </div> */}
          <div className="marketplace-filter-section">
            <div className="title">Price Filter</div>
            <div className="price-filter-wrap">
              <Form.Field
                placeholder="Min Price"
                className="price-input"
                control={Input}
                name="minPrice"
                type="number"
                onChange={this.onChange}
                defaultValue={minPrice}
              />
              <Form.Field
                placeholder="Max Price"
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
              <Form>
                <Form.Field>
                  <Radio
                    label="All"
                    name="collection"
                    value=""
                    checked={this.state.collection === ""}
                    onChange={this.onChange}
                  />
                </Form.Field>
                {assets.collectionNames &&
                  assets.collectionNames.length > 0 &&
                  assets.collectionNames.map((collection, index) => (
                    <Form.Field key={`collection_${index}`}>
                      <Radio
                        label={collection.name}
                        name="collection"
                        value={collection.collection_name}
                        checked={
                          this.state.collection === collection.collection_name
                        }
                        onChange={this.onChange}
                      />
                    </Form.Field>
                  ))}
              </Form>
            </div>
          </div>
        </div>
        <BuyAssetModal
          closeModal={this.toggleBuyAssetModal}
          modalOpen={buyAssetModal}
          history={history}
          actions={actions}
          selectedAssets={selectedAssets}
          location={location}
          globals={globals}
        />
      </div>
    );
  }
}

Marketplace.propTypes = {};

Marketplace.defaultProps = {};
const mapStateToProps = state => {
  return {
    assets: state.assets,
    globals: state.globals,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...AssetsActions,
        ...GlobalsActions,
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Marketplace);
