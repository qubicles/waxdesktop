import * as types from "./types";
import axios from "axios";

export const getTrendingAssets = () => {
    return (dispatch: () => void, getState) => {
        const {
            settings
        } = getState();
        return axios.get(`https://wax.api.atomicassets.io/atomicmarket/v1/stats/collections?collection_whitelisted=true&sort=volume&order=desc&symbol=WAX&page=1&limit=5`)
            .then(res => {
                dispatch({
                    type: types.TRENDING_ASSETS_LIST,
                    payload: res.data
                });
            })
    };
}

export const getAssets = ({ owner, page = 1, limit = 100, order = "desc", sort = "asset_id" }) => {
    return (dispatch: () => void, getState) => {
        const {
            settings
        } = getState();
        dispatch({
            type: types.ASSETS_LIST_REQUEST,
        });
        return axios.get(`https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=${owner}&page=${page}&limit=${limit}&order=${order}&sort=${sort}`)
            .then(res => {
                dispatch({
                    type: types.ASSETS_LIST_SUCCESS,
                    payload: res.data
                });
            })
    };
}

export default {
    getTrendingAssets,
    getAssets
};