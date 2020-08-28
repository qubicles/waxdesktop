import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Tab, Image, Card, Button } from "semantic-ui-react";

import * as AssetsActions from "../../../../actions/assets";

class NFTPanes extends Component {
    constructor(props) {
        super(props);
        
        const owner = props.settings.account;
        this.state = {
            owner,
            page: 1,
            limit: 100,
            order: "desc",
            sort: "asset_id"
        }
    }

    componentDidMount() {
        const { actions: { getAssets } } = this.props;
        const { owner, page, limit, order, sort } = this.state;
        getAssets({ owner, page, limit, order, sort })
    }

    render() {
        const { assets: { isAssetsLoading, assetsList } } = this.props;

        if (isAssetsLoading) {
            return <div>Loading...</div>
        }

        if (assetsList && assetsList.data.length === 0) {
            return <div>No data found</div>
        }

        const NFTAssets = assetsList && assetsList.data.map(asset =>
            <Card className="trending-assets-card" key={`nft-token-${asset.asset_id}`}>
                <Image src={`https://ipfs.io/ipfs/${asset.data.img}`} />
                <Card.Header className="t-card-title">{asset.name}</Card.Header>
                <Card.Meta>
                    <div className="t-card-author">{asset.owner}</div>
                    <div className="t-card-price">
                        <Image src={require('../../../../../renderer/assets/images/dashboard/Group47.png')} />
                        <div className="t-card-des">
                            25,000 KARMAR
                      </div>
                    </div>
                    <div className="card-btn-group">
                        <Button className="card-detail-btn">Details</Button>
                        <Button className="card-buy-btn">Buy</Button>
                    </div>
                </Card.Meta>
            </Card>)

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