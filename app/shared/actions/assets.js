import * as types from "./types";
import axios from "axios";

export const getTrendingAssets = () => {
    return (dispatch: () => void, getState) => {
        const {
            settings
        } = getState();
        return axios.get(`https://wax.api.atomicassets.io/atomicmarket/v1/sales?page=1&limit=5&order=desc&sort=created`)
            .then(res => {
                dispatch({
                    type: types.TRENDING_ASSETS_LIST,
                    payload: res.data
                });
            })
    };
}

export const getAssets = ({ match, owner, page = 1, limit = 100, order = "desc", sort = "created", minPrice = "", maxPrice = "" }) => {
    return (dispatch: () => void, getState) => {
        const {
            settings
        } = getState();
        dispatch({
            type: types.ASSETS_LIST_REQUEST,
        });
        return axios.get(`https://wax.api.atomicassets.io/atomicmarket/v1/sales?owner=${owner}&match=${match}&page=${page}&limit=${limit}&order=${order}&sort=${sort}&min_price=${minPrice}&max_price=${maxPrice}`)
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