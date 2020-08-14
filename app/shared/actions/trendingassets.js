import * as types from "./types";
import axios from "axios";

export const getTrendingAssets = () => {
    return (dispatch: () => void) => {
        return axios.get(`https://wax.api.atomicassets.io/atomicassets/v1/assets?page=1&limit=5&order=desc&sort=minted`)
            .then(res => {
                dispatch({
                    type: types.TRENDING_ASSETS_LIST,
                    payload: res.data
                });
            })
    };
}

export default {
    getTrendingAssets
};