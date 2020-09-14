import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Card, Image, Button } from "semantic-ui-react";
import * as TrendingAssetsActions from "../../../../actions/assets";
import "./TrendingAssets.global.css";

class TrendingAssets extends React.Component {
    componentDidMount() {
        const { actions: { getTrendingAssets } } = this.props;
        getTrendingAssets();
    }
    goMarketplace = () => {
		const { actions, history, location } = this.props
		history.push("/marketplace")
	}

    render() {
        const { assets: { trendingAssetsList } } = this.props;

        const TrendingAssetCard = () => {
            if (!trendingAssetsList) {
                return <div>Loading...</div>;
            }

            return (trendingAssetsList.data.map((item, index) => (
                <Card className="trending-assets-card" key={`trending-asset-${index}`}>
                    <Image src={`https://ipfs.io/ipfs/${item.collection.img}`} />
                    <Card.Header className="t-card-title">{item.collection.name}</Card.Header>
                    <Card.Meta>
                        <div className="t-card-author">{item.collection.author}</div>
                        <div className="t-card-price">
                            <Image src={require('../../../../../renderer/assets/images/dashboard/Group47.png')} />
                            <div className="t-card-des">
                                {item.listing_price/80000000} {item.listing_symbol}
                            </div>
                        </div>
                        <Button className="trending-view-button" onClick={this.goMarketplace}>View Market</Button>
                    </Card.Meta>
                </Card>))
            )
        }

        return (
            <div className="trending-assets-section">
                <div className="trending-assets-header">
                    <div className="trending-assets-title">Trending Assets</div>
                    <div className="trending-assets-view" onClick={this.goMarketplace}>View Market</div>
                </div>
                <div className="trending-assets-body">
                    <TrendingAssetCard />
                </div>
            </div>
        )
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
            ...TrendingAssetsActions,
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendingAssets);

