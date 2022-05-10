import * as ActionTypes from "./ActionTypes";
// reducer takes state and action, if no actions return the state
export const Dishes = (
  state = { isLoading: true, errMsg: null, dishes: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_DISHES:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        dishes: action.payload,
      };

    case ActionTypes.DISHES_LOADING:
      // we did this in purpose if we want to refresh data or something like that
      // we let the rest of data and modified only those
      return { ...state, isLoading: true, errMsg: null, dishes: [] };
    case ActionTypes.DISHES_FAILED:
      // we set the payload to err msg in the ActionCreators
      return { ...state, isLoading: false, errMsg: action.payload, dishes: [] };
    default:
      return state;
  }
};
