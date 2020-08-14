import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Card, Image, Button } from "semantic-ui-react";
import * as TrendingAssetsActions from "../../../../actions/trendingassets";
import "./TrendingAssets.global.css";

class TrendingAssets extends React.Component {
    componentDidMount() {
        const { actions: { getTrendingAssets } } = this.props;
        getTrendingAssets();
    }

    render() {
        const { trendingAssets: { trendingAssetsList } } = this.props;

        const TrendingAssetCard = () => {
            if (!trendingAssetsList) {
                return null;
            }

            return (trendingAssetsList.data.map(item => (
                <Card className="trending-assets-card" key={item.asset_id}>
                    <Image src={`https://ipfs.io/ipfs/${item.data.img}`} />
                    <Card.Header className="t-card-title">{item.data.name}</Card.Header>
                    <Card.Meta>
                        <div className="t-card-author">{item.owner}</div>
                        <div className="t-card-price">
                            <Image src={require('../../../../../renderer/assets/images/dashboard/Group47.png')} />
                            <div className="t-card-des">
                                25,000 KARMAR
                            </div>
                        </div>
                        <Button className="trending-view-button">View Market</Button>
                    </Card.Meta>
                </Card>))
            )
        }

        return (
            <div className="trending-assets-section">
                <div className="trending-assets-header">
                    <div className="trending-assets-title">Trending Assets</div>
                    <div className="trending-assets-view">View Market</div>
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
        trendingAssets: state.trendingAssets
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

