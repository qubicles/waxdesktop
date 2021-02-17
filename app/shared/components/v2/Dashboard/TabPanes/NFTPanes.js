import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Tab, Image, Card, Button, Checkbox } from "semantic-ui-react";

import * as AssetsActions from "../../../../actions/assets";
import * as GlobalsActions from "../../../../actions/globals";
import SellAssetsModal from "../../Dashboard/Modals/SellAssetModal/SellAssetModal"

class NFTPanes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assetsForSubmit: [],
            sellAssetModal: false,
            selectedAssets: "",
            
        }
    }

    componentDidMount() {
        const { actions: { getNftAssets } } = this.props;
        const owner = this.props.settings.account;
        if (owner) {
            getNftAssets(owner);
        }
    }
    checkSellAssets = (e, { checked, name }) => {
        const { assetsForSubmit } = this.state;
        const existing = assetsForSubmit.indexOf(name);
        if(checked && existing < 0) {
            assetsForSubmit.push(name);
        } else if (!checked && existing >=0) {
            assetsForSubmit.splice(existing, 1);
        }
        this.setState({
            assetsForSubmit: assetsForSubmit,
        })
    }

    toggleSellAssetsModal = (index) => {
        const { sellAssetModal } = this.state;
        const { nftAssets } = this.props.assets;
        this.setState({
            sellAssetModal: !sellAssetModal,
            selectedAssets: nftAssets.data[index]
        })
    }

    render() {
        const { assets: { isAssetsLoading, nftAssets }, actions, globals } = this.props;
        const { sellAssetModal, selectedAssets } = this.state;

        if (isAssetsLoading) {
            return <div>Loading...</div>
        }

        if (nftAssets && nftAssets.data.length === 0) {
            return <div>No data found</div>
        }

        const NFTAssets = nftAssets && nftAssets.data.map((asset, index) => 
            <Card className="trending-assets-card" key={`nft-token-${asset.asset_id}`}>
                <Image src={`https://ipfs.io/ipfs/${asset.collection.img}`} />
                <Checkbox
                    className="nftCheckBox-wrap"
                    name={`assetsCards${index}`}
                    onChange={this.checkSellAssets}
                    
                />
                <Card.Header className="t-card-title">{asset.collection.name}</Card.Header>
                <Card.Meta>
                    <div className="t-card-author">{asset.collection.author}</div>
                    <div className="t-card-price">
                        <Image 
                            src={require('../../../../../renderer/assets/images/dashboard/accountIcon.png')} 
                            style={{width: 16, height: 16}}    
                        />
                        <div className="t-card-des">
                            {asset.prices[0].min ? `${(asset.prices[0].min/100000000).toFixed(2)} ${asset.prices[0].token.token_symbol}` : '' }
                        </div>
                    </div>
                    <div className="card-btn-group">
                        {/* <Button className="card-detail-btn">Details</Button> */}
                        <Button className="card-buy-btn" onClick={() => this.toggleSellAssetsModal(index)}>Sell</Button>
                    </div>
                </Card.Meta>
                <SellAssetsModal 
                    closeModal={this.toggleSellAssetsModal}
                    modalOpen={sellAssetModal}
                    history={history}
                    actions={actions}
                    selectedAssets={selectedAssets}
                    location={location}
                    globals={globals}
                />
            </Card>
        )

        return <Tab.Pane attached={false}>
            {NFTAssets}
        </Tab.Pane>
    }
}

const mapStateToProps = (state) => {
    return {
        assets: state.assets,
        globals: state.globals,
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            ...AssetsActions,
            ...GlobalsActions,
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NFTPanes);
