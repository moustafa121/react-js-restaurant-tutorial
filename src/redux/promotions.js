import * as ActionTypes from "./ActionTypes";

// reducer takes state and action, if no actions return the state
export const Promotions = (
  state = { isLoading: true, errMsg: null, promotions: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_PROMOS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        promotions: action.payload,
      };

    case ActionTypes.PROMOS_LOADING:
      return { ...state, isLoading: true, errMsg: null, promotions: [] };

    case ActionTypes.PROMOS_FAILED:
      return {
        ...state,
        isLoading: false,
        errMsg: action.payload,
        promotions: [],
      };

    default:
      return state;
  }
};
