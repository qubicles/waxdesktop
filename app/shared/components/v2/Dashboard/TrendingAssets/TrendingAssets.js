import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { Card, Image, Button } from "semantic-ui-react";
import * as TrendingAssetsActions from "../../../../actions/assets";
import * as GlobalsActions from "../../../../actions/globals";
import BuyAssetModal from "../../Marketplace/Modals/BuyAssetModal/BuyAssetModal"
import "./TrendingAssets.global.css";

class TrendingAssets extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buyAssetModal: false,
            selectedAssets: "",
        }
    }
    componentDidMount() {
        const { actions: { getTrendingAssets } } = this.props;
        getTrendingAssets();
    }

    toggleBuyAssetModal = (index) => {
        const { buyAssetModal } = this.state;
        const {
            assets: { trendingAssetsList }
        } = this.props;
        this.setState({
            selectedAssets: trendingAssetsList.data[index],
            buyAssetModal: !buyAssetModal,
        });
    };
    goMarketplace = () => {
        const { actions, history, location } = this.props
        history.push("/marketplace")
    }

    render() {
        const {
            assets: { trendingAssetsList },
            history,
            location,
            actions,
            assets,
            globals,
        } = this.props;
        const { buyAssetModal, selectedAssets } = this.state;

        const TrendingAssetCard = () => {
            if (!trendingAssetsList) {
                return <div>Loading...</div>;
            }
            return (trendingAssetsList.data.map((item, index) => (
                <Card className="trending-assets-card" key={`trending-asset-${index}`}>
                    <Image src={item.assets[0].data.img.indexOf('http') == -1 ? `https://ipfs.io/ipfs/${item.assets[0].data.img}` : item.assets[0].data.img } />
                    <Card.Header className="t-card-title">{item.assets[0].name}</Card.Header>
                    <Card.Meta>
                        <div className="t-card-author">{item.seller}</div>
                        <div className="t-card-price">
                            <Image src={require('../../../../../renderer/assets/images/dashboard/Group47.png')} />
                            <div className="t-card-des">
                                {item.listing_price / 100000000} {item.listing_symbol}
                            </div>
                        </div>
                        <Button className="trending-view-button" onClick={() => this.toggleBuyAssetModal(index)}>View Market</Button>
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
                <BuyAssetModal
                    closeModal={this.toggleBuyAssetModal}
                    modalOpen={buyAssetModal}
                    history={history}
                    actions={actions}
                    location={location}
                    selectedAssets={selectedAssets}
                    globals={globals}
                />
            </div>
        )
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
            ...TrendingAssetsActions,
            ...GlobalsActions,
        }, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrendingAssets);

