import * as types from "./types";
import axios from "axios";
import eos from './helpers/eos';

import { payforcpunet } from './helpers/eos';
import { decrypt } from './wallet';
import { Decimal } from 'decimal.js';

import { Api, JsonRpc, RpcError } from 'eosjs-new';
import { JsSignatureProvider } from 'eosjs-new/dist/eosjs-jssig';

const CryptoJS = require('crypto-js');
const ecc = require('eosjs-ecc');

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
      .get(`https://wax.api.atomicassets.io/atomicmarket/v1/assets?owner=${owner}&page=1&limit=100&order=desc&sort=asset_id`)
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

export const purchaseAssets = (selectedAsset) => {
  return (dispatch: () => void, getState) => {
    const {
      balances,
      connection,
      settings,
      accounts
    } = getState();
    dispatch({
      type: types.PURCHASE_ASSETS_PENDING
    });

    try {
      const symbol = settings.blockchain.tokenSymbol;
      const contracts = balances.__contracts;
      const account = contracts[symbol].contract;
      const price = Decimal(selectedAsset.price.amount / 100000000).toFixed(8) + ' ' + selectedAsset.price.token_symbol;
      const wdwPrice = Decimal(selectedAsset.price.amount / 100000000 * 0.01).toFixed(8) + ' ' + selectedAsset.price.token_symbol;
      const authorPrice = Decimal(selectedAsset.price.amount / 100000000 * 0.08).toFixed(8) + ' ' + selectedAsset.price.token_symbol;
      const assetAuthor = selectedAsset.collection.author;
      let actions = [
        {
          account: account,
          name: 'transfer',
          authorization: [{
            actor: settings.account,
            permission: 'active',
          }],
          data: {
            from: settings.account,
            to: 'atomicmarket',
            quantity: price,
            memo: "deposit"
          },
        },
        {
          account: account,
          name: 'transfer',
          authorization: [{
            actor: settings.account,
            permission: 'active',
          }],
          data: {
            from: settings.account,
            to: 'wdw',
            quantity: wdwPrice,
            memo: "WDW fee",
          },
        },
        {
          account: account,
          name: 'transfer',
          authorization: [{
            actor: settings.account,
            permission: 'active',
          }],
          data: {
            from: settings.account,
            to: assetAuthor,
            quantity: authorPrice,
            memo: "Author Fee",
          },
        },
        {
          account: 'atomicmarket',
          name: 'purchasesale',
          authorization: [{
            actor: settings.account,
            permission: 'active',
          }],
          data: {
            buyer: settings.account,
            intended_delphi_median: 0,
            sale_id: selectedAsset.sale_id,
            taker_marketplace: ""
          },
        }
      ]


      const payforaction = payforcpunet(settings.account, getState());
      if (payforaction) actions = payforaction.concat(actions);

      return eos(connection, true, payforaction !== null).transaction(
        {
          actions
        },
        {
          broadcast: connection.broadcast,
          expireInSeconds: connection.expireInSeconds,
          sign: connection.sign
        }).then((tx) => {
          return dispatch({
            payload: { tx },
            type: types.PURCHASE_ASSETS_SUCCESS
          });
        }).catch((err) => {
          dispatch({
            payload: { err },
            type: types.PURCHASE_ASSETS_FAILURE
          })
        });
    } catch (err) {
      return dispatch({
        payload: { err },
        type: types.PURCHASE_ASSETS_FAILURE
      });
    }
  };
}

export function sellAssets (listPrice, selectedAssets) {
  return (dispatch: () => void, getState) => {
    const {
      balances,
      connection,
      settings,
      accounts
    } = getState();

    dispatch({
      type: types.SELL_ASSETS_PENDING
    });


    const listingPrice = listPrice + ' ' + selectedAssets.prices[0].token.token_symbol;
    let senderAssets = [];
    let receipAssets = [];
    senderAssets.push(parseInt(selectedAssets.asset_id));
    if (selectedAssets && listingPrice) {
      let anounceActions = [
        {
          account: 'atomicmarket',
          name: 'announcesale',
          authorization: [{
            actor: settings.account,
            permission: 'active',
          }],
          data: {
            seller: settings.account,
            listing_price: listingPrice,
            asset_ids: senderAssets,
            settlement_symbol: `${selectedAssets.prices[0].token.token_precision},${selectedAssets.prices[0].token.token_symbol}`,
            maker_marketplace: ""
          },
        }
      ]
      let createOfferAction = [
        {
          account: 'atomicassets',
          name: 'createoffer',
          authorization: [{
            actor: settings.account,
            permission: settings.authorization || 'active',
          }],
          data: {
            sender: settings.account,
            recipient: "atomicmarket",
            sender_asset_ids: senderAssets,
            recipient_asset_ids: receipAssets,
            memo: "sale"
          },
        }
      ]

      
      return eos(connection, true, false).transaction(
        {
          actions: anounceActions
        },
        {
          broadcast: connection.broadcast,
          expireInSeconds: connection.expireInSeconds,
          sign: connection.sign
        }).then((tx) => {
          dispatch({
            type: types.UNNOUNCE_SELL_SUCCESS
          })

          const { hash, key } = connection.keyProviderObfuscated;
          if (hash && key) {
            const wif = decrypt(key, hash, 1).toString(CryptoJS.enc.Utf8);
            if (ecc.isValidPrivate(wif) === true) {
              const defaultPrivateKey = wif;
              const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
              const rpc = new JsonRpc(connection.httpEndpoint, { fetch });
              const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
              // (async () => {
                return api.transact({
                  actions: createOfferAction
                },
                  {
                    blocksBehind: 3,
                    expireSeconds: 30,
                  }).then((tx) => {
                    return dispatch({
                      payload: { tx },
                      type: types.SELL_ASSETS_SUCCESS
                    })
                  }).catch((err) => {
                    return dispatch({
                      payload: { err },
                      type: types.SELL_ASSETS_FAILURE
                    })
                  });
              // });
            }
          }

        }).catch((err) => {
          return dispatch({
            payload: { err },
            type: types.UNNOUNCE_SELL_FAILURE
          })
        });
    }
  }
}

export const cancelSellAssets = (selectedAssets) => {
  return (dispatch: () => void, getState) => {
    const {
      balances,
      connection,
      settings,
      accounts
    } = getState();
    let cancelAction = [
      {
        account: 'atomicmarket',
        name: 'cancelsale',
        authorization: [{
          actor: settings.account,
          permission: 'active',
        }],
        data: {
          sale_id: selectedAssets.sales[0].sale_id,
        },
      }
    ]

    const { hash, key } = connection.keyProviderObfuscated;
    if (hash && key) {
      const wif = decrypt(key, hash, 1).toString(CryptoJS.enc.Utf8);
      if (ecc.isValidPrivate(wif) === true) {
        const defaultPrivateKey = wif;
        const signatureProvider = new JsSignatureProvider([defaultPrivateKey]);
        const rpc = new JsonRpc(connection.httpEndpoint, { fetch });
        const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
        (async () => {
          await api.transact({
            actions: cancelAction
          },
            {
              blocksBehind: 3,
              expireSeconds: 30,
            }).then((tx) => { }).catch((err) => {
              
            });
        })();
      }
    }

  }
}

export default {
  getTrendingAssets,
  getAssets,
  getActiveCollections,
  getNftAssets,
  purchaseAssets,
  sellAssets,
  cancelSellAssets
};
