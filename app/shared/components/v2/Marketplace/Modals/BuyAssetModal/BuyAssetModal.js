import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Dropdown, Modal } from "semantic-ui-react";

import * as AssetsActions from "../../../../../actions/assets";
import "./BuyAssetModal.global.css";

class BuyAssetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      seller: "",
      nftName: "",
      collectionName: "",
      sellerAmt: "",
      currencyPrice: "",
      totalAmt: "",
    };
  }

  static getDerivedStateFromProps(props, state) {
    let tokenPrice = "";
    if (props.globals && props.globals.pricefeed && props.globals.pricefeed.CUSD) {
      tokenPrice = props.globals.pricefeed.CUSD.find(item => item.base === "WAX");
    }
    return {
      seller: props.selectedAssets ? props.selectedAssets.seller : "",
      nftName: props.selectedAssets ? props.selectedAssets.assets[0].name : "",
      collectionName: props.selectedAssets ? props.selectedAssets.assets[0].collection.collection_name : "",
      sellerAmt: props.selectedAssets ? props.selectedAssets.listing_price / 100000000 : "",
      currencyPrice: props.selectedAssets && tokenPrice ? (parseInt(props.selectedAssets.listing_price / 100000000) + (parseInt(props.selectedAssets.listing_price / 100000000) * 0.09)) * parseFloat(tokenPrice.price) : 0,
      totalAmt: props.selectedAssets ? parseInt(props.selectedAssets.listing_price / 100000000) + (parseInt(props.selectedAssets.listing_price / 100000000) * 0.09) : "",
    };
  }

  purchaseAssets(selectedAssets) {
    const { actions } = this.props;
    actions.purchaseAssets(selectedAssets);
  }

  render() {
    const {
      modalOpen,
      closeModal,
      selectedAssets,
      actions,
    } = this.props;

    const {
      seller,
      nftName,
      collectionName,
      sellerAmt,
      currencyPrice,
      totalAmt
    } = this.state;

    return (
      <Modal
        onClose={closeModal}
        className="BuyAssetModal"
        size={"tiny"}
        open={modalOpen}
      >
        <Modal.Content className="BuyAssetModal-body">
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
                      src={selectedAssets.assets[0].data.img.indexOf('http') == -1 ? `https://ipfs.io/ipfs/${selectedAssets.assets[0].data.img}` : selectedAssets.assets[0].data.img}
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
                  <div>{sellerAmt} WAX</div>
                </div>
              </div>
            </div>
          </div>
          <div className="sell-right-container">
            <div>
              <div className="sellModal-title">
                <span>Buy </span>
                <span> Assets</span>
              </div>
              <div className="seller-input">
                <div className="input-title">Seller</div>
                <input
                  type="text"
                  className="common-input seller-name"
                  defaultValue={seller}
                  readOnly
                />
              </div>
              <h3>Breakdown</h3>
              <div className="seller-info">
                <span>Seller Gets</span>
                <span>{sellerAmt} WAX</span>
              </div>
              <div className="seller-info author-fee">
                <div>
                  <span>Author Fee</span>
                  <span>8%</span>
                </div>
                <div>
                  {
                    (sellerAmt * 0.08).toFixed(2)
                  } WAX
                </div>
              </div>
              <div className="seller-info wdw-fee">
                <div>
                  <span>WDW Fee</span>
                  <span>1%</span>
                </div>
                <div>
                  {
                    (sellerAmt * 0.01).toFixed(2)
                  } WAX
                </div>
              </div>
              <div className="seller-info total-fee">
                <div>Total</div>
                <div>
                  <span>{totalAmt} WAX</span>
                  <span> $ {currencyPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="delegate-btn" onClick={() => {this.purchaseAssets(selectedAssets)}}>
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

BuyAssetModal.propTypes = {};

BuyAssetModal.defaultProps = {};

// const mapStateToProps = state => {
//   return {
//     assets: state.assets,
//   };
// };

// const mapDispatchToProps = dispatch => {
//   return {
//     actions: bindActionCreators(
//       {
//         ...AssetsActions,
//       },
//       dispatch
//     )
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(BuyAssetModal);

export default BuyAssetModal