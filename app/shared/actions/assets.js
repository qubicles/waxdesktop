import * as types from "./types";
import axios from "axios";

export const getTrendingAssets = () => {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    return axios
      .get(
        `https://wax.api.atomicassets.io/atomicmarket/v1/sales?page=1&limit=5&order=desc&sort=created`
      )
      .then(res => {
        dispatch({
          type: types.TRENDING_ASSETS_LIST,
          payload: res.data
        });
      });
  };
};

export const getAssets = ({
  match,
  owner,
  page = 1,
  limit = 100,
  order = "desc",
  sort = "created",
  minPrice = "",
  maxPrice = "",
  collection = ""
}) => {
  return (dispatch: () => void, getState) => {
    const { settings } = getState();
    dispatch({
      type: types.ASSETS_LIST_REQUEST
    });
    return axios
      .get(
        `https://wax.api.atomicassets.io/atomicmarket/v1/sales?symbol=WAX&match=${match}&page=${page}&limit=${limit}&order=${order}&sort=${sort}&min_price=${minPrice}&max_price=${maxPrice}&collection_name=${collection}`
      )
      .then(res => {
        dispatch({
          type: types.ASSETS_LIST_SUCCESS,
          payload: res.data
        });
      });
  };
};
export const getNftAssets = (owner) => {
  return (dispatch: () => void, getState) => {
    dispatch({
      type: types.NFT_ASSETS_LIST_REQUEST
    });
    return axios
      .get(`https://wax.api.atomicassets.io/atomicassets/v1/assets?owner=${owner}&page=1&limit=100&order=desc&sort=asset_id`)
      .then(res => {
        dispatch({
          type: types.NFT_ASSETS_LIST_SUCCESS,
          payload: res.data
        })
      })
  }
}
export const getActiveCollections = () => {
  return (dispatch: () => void, getState) => {
    return axios
      .get(
        `https://wax.api.atomicassets.io/atomicmarket/v1/stats/collections?symbol=WAX&order=desc&sort=volume`
      )
      .then(res => {
        dispatch({
          type: types.COLLECTION_NAMES_SUCCESS,
          payload: res.data.data.results
        });
      });
  };
};

export default {
  getTrendingAssets,
  getAssets,
  getActiveCollections,
  getNftAssets
};
