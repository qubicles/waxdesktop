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
import "./MarketplaceRightNav.global.css";

class MarketplaceRightNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
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
    );
  }
}

MarketplaceRightNav.propTypes = {};

MarketplaceRightNav.defaultProps = {};

export default MarketplaceRightNav;
