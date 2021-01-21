import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Tab, Image, Card, Button, Checkbox } from "semantic-ui-react";

import * as AssetsActions from "../../../../actions/assets";

class NFTPanes extends Component {
    constructor(props) {
        super(props);
        this.state = {
            assetsForSubmit: [],
        }
    }

    componentDidMount() {
        const { actions: { getNftAssets } } = this.props;
        const owner = this.props.settings.account;
        if (owner) {
            getNftAssets(owner);
        }
    }
    toggleSellAssets = (e, { checked, name }) => {
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

    render() {
        const { assets: { isAssetsLoading, nftAssets } } = this.props;
        let assetCard = [];

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
                    onChange={this.toggleSellAssets}
                    
                />
                <Card.Header className="t-card-title">{asset.collection.name}</Card.Header>
                <Card.Meta>
                    <div className="t-card-author">{asset.collection.author}</div>
                    <div className="t-card-price">
                        <Image src={require('../../../../../renderer/assets/images/dashboard/Group47.png')} />
                        <div className="t-card-des">
                            {asset.prices[0].sales ? `${asset.prices[0].sales} ${asset.prices[0].token.token_symbol}` : '' }
                        </div>
                    </div>
                    <div className="card-btn-group">
                        <Button className="card-detail-btn">Details</Button>
                        <Button className="card-buy-btn">Sell</Button>
                    </div>
                </Card.Meta>
            </Card>
        )

        return <Tab.Pane attached={false}>
            {NFTAssets}
        </Tab.Pane>
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(NFTPanes);
