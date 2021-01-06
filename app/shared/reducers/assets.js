import * as types from "../actions/types";

const initialState = {
    isAssetsLoading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case types.TRENDING_ASSETS_LIST:
            return { ...state, trendingAssetsList: action.payload };

        case types.ASSETS_LIST_REQUEST:
            return { ...state, isAssetsLoading: true };

        case types.ASSETS_LIST_SUCCESS:
            return { ...state, assetsList: action.payload, isAssetsLoading: false };

        case types.COLLECTION_NAMES_SUCCESS:
            return { ...state, collectionNames: action.payload }

        case types.NFT_ASSETS_LIST_SUCCESS:
            return { ...state, nftAssets: action.payload }

        default: {
            return state;
        }
    }
}
