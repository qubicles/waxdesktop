import * as types from '../actions/types';

const initialState = {
  __lookups: [],
  allAccounts: []
};

export default function accounts(state = initialState, action) {
  switch (action.type) {
    case types.CLEAR_ACCOUNT_CACHE:
    case types.RESET_ALL_STATES: {
      return initialState;
    }
    case types.GET_ACCOUNT_SUCCESS: {
      return Object.assign({}, state, {
        __updated: Date.now(),
        [action.payload.results.account_name]: action.payload.results
      });
    }
    case types.SYSTEM_ACCOUNT_BY_KEY_SUCCESS: {
      return Object.assign({}, state, {
        __lookups: action.payload.accounts.account_names
      });
    }
    case types.SYSTEM_ACCOUNT_BY_KEY_PENDING:
    case types.SYSTEM_ACCOUNT_BY_KEY_FAILURE:
    case types.SYSTEM_ACCOUNT_BY_KEY_CLEAR: {
      return Object.assign({}, state, {
        __lookups: []
      });
    }
    case types.ALL_ACCOUNTS:
      return {
        ...state
      }
    case types.GET_BALANCE_HISTORY_SUCCESS:
      return Object.assign({}, state, {
        [action.payload.account_name]: 
          Object.assign({}, state[action.payload.account_name], action.payload.balHistory)
      });
    default: {
      return state;
    }
  }
}
