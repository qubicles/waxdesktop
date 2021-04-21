import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Dropdown, Modal } from "semantic-ui-react";

import * as AssetsActions from "../../../../../actions/assets";
import * as SettingsActions from "../../../../../actions/settings";
import * as BlockExplorersActions from "../../../../../actions/blockexplorers";

import "./BuyAssetModal.global.css";
import showSweetAlert from "../../../../../utils/SweetAlert";

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
      currencyPrice: props.selectedAssets && tokenPrice ? (parseFloat(props.selectedAssets.listing_price / 100000000) + (parseFloat(props.selectedAssets.listing_price / 100000000) * 0.09)) * parseFloat(tokenPrice.price) : 0,
      totalAmt: props.selectedAssets ? parseFloat(props.selectedAssets.listing_price / 100000000) + (parseFloat(props.selectedAssets.listing_price / 100000000) * 0.09) : "",
    };
  }

  purchaseAssets(selectedAssets) {
    const { actions } = this.props;
    actions.purchaseAssets(selectedAssets).then((results) => {
      this.showAlert(results);
    });
  }

  showAlert = (results) => {
    const { blockexplorers, settings } = this.props;
    let blockExplorer = blockexplorers[settings.blockExplorer];
    let urlPartsWithoutVariable;
    let generatedLink;
    if (results.type == 'PURCHASE_ASSETS_SUCCESS') {
      if (blockExplorer && blockExplorer['txid']) {
        urlPartsWithoutVariable = blockExplorer['txid'].split(`{txid}`);
        generatedLink = `${urlPartsWithoutVariable[0]}${results.payload.tx.transaction_id}${urlPartsWithoutVariable[1]}`;
      }

      const expLink = `<a href="${generatedLink}" target="_blink"> ${results.payload.tx.transaction_id.substr(0, 8)}...${results.payload.tx.transaction_id.substr(-8)}</a>`;
      showSweetAlert(
        "success",
        expLink
      );
    } else {
      showSweetAlert(
        "error",
        "Error occurred. try again."
      )
    }
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
                (
                  selectedAssets ?
                    (selectedAssets && selectedAssets.assets[0] && selectedAssets.assets[0].data.img == undefined) ?
                      (
                        <img
                          src={require("../../../../../../renderer/assets/images/unknowImg.jpg")}
                        />
                      ) : (
                        <img
                          src={selectedAssets.assets[0].data.img.indexOf('http') == -1 ? `https://ipfs.io/ipfs/${selectedAssets.assets[0].data.img}` : selectedAssets.assets[0].data.img}
                        />
                      ) : ''
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
                  <span>{parseFloat(totalAmt).toFixed(2)} WAX</span>
                  <span> $ {currencyPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="delegate-btn" onClick={() => { this.purchaseAssets(selectedAssets) }}>
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

const mapStateToProps = state => {
  return {
    assets: state.assets,
    settings: state.settings,
    blockexplorers: state.blockexplorers,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(
      {
        ...AssetsActions,
        ...BlockExplorersActions,
        ...SettingsActions
      },
      dispatch
    )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BuyAssetModal);
