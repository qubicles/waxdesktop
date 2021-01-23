import React from "react";
import PropTypes from "prop-types";
import { Dropdown, Modal } from "semantic-ui-react";

import "./SellAssetModal.global.css";

class SellAssetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      buyPrice: "",
      nftName: "",
      collectionName: "",
      lowestSellAmt: "",
      lowestSellPrice: "",
      currencyPrice: "",
      errMsg: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    let tokenPrice = "";
    if (props.globals && props.globals.pricefeed && props.globals.pricefeed.CUSD) {
      tokenPrice = props.globals.pricefeed.CUSD.find(item => item.base === "WAX");
    }
    return {
      nftName: props.selectedAssets ? props.selectedAssets.name : "",
      collectionName: props.selectedAssets ? props.selectedAssets.collection.name : "",
      lowestSellAmt: props.selectedAssets ? props.selectedAssets.prices[0].min / 100000000 : "",
      lowestSellPrice: props.selectedAssets && tokenPrice ? parseInt(props.selectedAssets.prices[0].min / 100000000) * parseFloat(tokenPrice.price) : 0,
    };
  }
  changeBuyPrice = (e) => {
    if (e.target.value && !isNaN(e.target.value)) {
      let tokenPrice = '';
      if (this.props.globals && this.props.globals.pricefeed && this.props.globals.pricefeed.CUSD) {
        tokenPrice = this.props.globals.pricefeed.CUSD.find(item => item.base === "WAX");
      }
      this.setState({
        buyPrice: e.target.value,
        currencyPrice: tokenPrice ? parseFloat(e.target.value) * parseFloat(tokenPrice.price) : '',
        errMsg: false,
      })
    } else {
      this.setState({
        buyPrice: 0,
        currencyPrice: 0,
        errMsg: true,
      })
    }
  }
  submitSellAsset = () => {
    const { actions: { sellAssets }, selectedAssets } = this.props;
    const { buyPrice } = this.state;
    const listPrice = (parseFloat(buyPrice) * 0.91).toFixed(8);

    if (listPrice && listPrice != 0) {
      sellAssets(listPrice, selectedAssets);
    } else {
      this.setState({
        errMsg: true
      })
    }
  }

  render() {
    const {
      modalOpen,
      closeModal,
      selectedAssets,
    } = this.props;

    const {
      buyPrice,
      nftName,
      collectionName,
      lowestSellAmt,
      lowestSellPrice,
      currencyPrice,
      errMsg,
    } = this.state;
    return (
      <Modal
        onClose={closeModal}
        className="SellAssetModal"
        size={"tiny"}
        open={modalOpen}
      >
        <Modal.Content className="SellAssetModal-body">
          <div className="sell-left-container">
            <div className="sell-card">
              {
                (!selectedAssets) ?
                  (
                    <img
                      src={require("../../../../../../renderer/assets/images/dashboard/dallas141.png")}
                    />
                  ) : (
                    <img
                      src={selectedAssets.collection.img.indexOf('http') == -1 ? `https://ipfs.io/ipfs/${selectedAssets.collection.img}` : selectedAssets.collection.img}
                    />
                  )
              }
              <div className="sell-card-info">
                <div className="sc-title">{nftName}</div>
                <div className="sc-brand">{collectionName}</div>
                <div className="sc-price">
                  <img
                    src={require("../../../../../../renderer/assets/images/dashboard/Group1684.png")}
                  />
                  <div>{lowestSellAmt} WAX</div>
                </div>
              </div>
            </div>
          </div>
          <div className="sell-right-container">
            <div>
              <div className="sellModal-title">
                <span>Sell </span>
                <span> Assets</span>
              </div>
              <div className="seller-input first-element">
                <div className="input-title">Instant Buy Price</div>
                <input
                  type="text"
                  className="common-input seller-name"
                  placeholder="Enter Price In WAX"
                  onChange={this.changeBuyPrice}
                  ref={(el) => {
                    if (el) {
                      el.style.setProperty('color', 'white', 'important');
                    }
                  }}
                />
                {
                  (errMsg)
                    ? (
                     <p className="warn-hint">This field is required and must be a number</p>
                    )
                    : false
                }
              </div>
              <div className="seller-input">
                <div className="input-title">Cheapest Market Price</div>
                <input
                  type="text"
                  className="common-input multi-placeholder seller-name"
                  readOnly
                />
                <div>
                  {lowestSellAmt} WAX
                </div>
                <div>
                  ${lowestSellPrice.toFixed(2)}
                </div>
              </div>
              <h3>Breakdown</h3>
              <div className="seller-info">
                <span>List Price</span>
                <span>{buyPrice ? (parseFloat(buyPrice) * 0.91).toFixed(2) : 0} WAX</span>
              </div>
              <div className="seller-info author-fee">
                <div>
                  <span>Author Fee</span>
                  <span>8%</span>
                </div>
                <div>{buyPrice ? (parseFloat(buyPrice) * 0.08).toFixed(2) : 0} WAX</div>
              </div>
              <div className="seller-info wdw-fee">
                <div>
                  <span>WDW Fee</span>
                  <span>1%</span>
                </div>
                <div>{buyPrice ? (parseFloat(buyPrice) * 0.01).toFixed(2) : 0} WAX</div>
              </div>
              <div className="seller-info total-fee">
                <div>Total</div>
                <div>
                  <span>{buyPrice ? (parseFloat(buyPrice)).toFixed(2) : 0} WAX</span>
                  <span>$ {currencyPrice ? parseFloat(currencyPrice).toFixed(2) : 0}</span>
                </div>
              </div>
            </div>
            <div className="delegate-btn" onClick={this.submitSellAsset}>
              Confirm Purchase
              <img
                src={require("../../../../../../renderer/assets/images/dashboard/correct3.png")}
              />
            </div>
          </div>
        </Modal.Content>
      </Modal>
    );
  }
}

SellAssetModal.propTypes = {};

SellAssetModal.defaultProps = {};

export default SellAssetModal;
