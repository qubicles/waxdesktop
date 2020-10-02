import React from "react";
import PropTypes from "prop-types";
import { Dropdown, Modal } from "semantic-ui-react";

import "./sellAssetModal.global.css";

const Styles = {
  elementHidden: { display: "none" },
  elementShow: { color: "block" }
};

class SellAssetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { changeInput: true };
  }

  changeSellerInput() {
    if (event.target.value != "") {
      this.setState({ changeInput: false });
    } else {
      this.setState({ changeInput: true });
    }
  }

  render() {
    const { modalOpen, closeModal } = this.props;
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
              <img
                src={require("../../../../../../renderer/assets/images/dashboard/dallas141.png")}
              />
              <div className="sell-card-info">
                <div className="sc-title">King Keo</div>
                <div className="sc-brand">theonlykarma</div>
                <div className="sc-price">
                  <img
                    src={require("../../../../../../renderer/assets/images/dashboard/Group1684.png")}
                  />
                  <div>25,000 KARMA</div>
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
                  className="common-input"
                  placeholder="yogi3.wam"
                />
              </div>
              <div className="seller-input">
                <div className="input-title">Cheapest Market Price</div>
                <input
                  type="text"
                  className="common-input multi-placeholder"
                  onChange={() => this.changeSellerInput()}
                />
                <div
                  style={
                    this.state.changeInput
                      ? Styles.elementShow
                      : Styles.elementHidden
                  }
                >
                  2,115 WAX
                </div>
                <div
                  style={
                    this.state.changeInput
                      ? Styles.elementShow
                      : Styles.elementHidden
                  }
                >
                  $116.32
                </div>
              </div>
              <h3>Breakdown</h3>
              <div className="seller-info">
                <span>Seller Gets</span>
                <span>1,820 WAX</span>
              </div>
              <div className="seller-info author-fee">
                <div>
                  <span>Author Fee</span>
                  <span>8%</span>
                </div>
                <div>160 WAX</div>
              </div>
              <div className="seller-info wdw-fee">
                <div>
                  <span>WDW Fee</span>
                  <span>1%</span>
                </div>
                <div>20 WAX</div>
              </div>
              <div className="seller-info total-fee">
                <div>Total</div>
                <div>
                  <span>2,000 WAX</span>
                  <span>$100.00</span>
                </div>
              </div>
            </div>
            <div className="delegate-btn">
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
