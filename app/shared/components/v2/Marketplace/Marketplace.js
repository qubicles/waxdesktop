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
      sort: "created"
    };
  }

  componentDidMount() {
    this.getAllAssets();
  }

  getAllAssets = () => {
    const {
      actions: { getAssets }
    } = this.props;
    const { match, owner, page, limit, order, sort } = this.state;
    getAssets({ match, owner, page, limit, order, sort });
  };

  onChange = debounce((e, { name, value }) => {
    this.setState(
      {
        match: value
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

  renderAssets = () => {
    const { match } = this.state;
    const {
      assets: { isAssetsLoading, assetsList }
    } = this.props;
    if (isAssetsLoading) {
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
      assetsList.data.map(asset => (
        <Card className="trending-assets-card" key={`assets-${asset.offer_id}`}>
          <Image src={`https://ipfs.io/ipfs/${asset.collection.img}`} />
          <Card.Header className="t-card-title">
            {asset.collection.name}
          </Card.Header>
          <Card.Meta>
            <div className="t-card-author">{asset.collection.author}</div>
            <div className="t-card-price">
              <Image
                src={require("../../../../renderer/assets/images/dashboard/Group47.png")}
              />
              <div className="t-card-des">
                {asset.listing_price} {asset.listing_symbol}
              </div>
            </div>
            <div className="card-btn-group">
              <Button className="card-detail-btn">Details</Button>
              <Button className="card-buy-btn">Buy</Button>
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
    const { radioChange, match, sort } = this.state;
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
    );

    return (
      <div className="dashboard-container">
        <div className="dashboard-body-section">
          <div className="market-search-section">
            <div className="round-search-bar">
              <Form.Field
                className="round-input"
                control={Input}
                fluid
                name={"match"}
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
        <MarketplaceRightNav />
      </div>
    );
  }
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
