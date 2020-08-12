import * as types from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
        case types.TRENDING_ASSETS_LIST:
            return { ...state, trendingAssetsList: action.payload };

        default: {
            return state;
        }
    }
}
