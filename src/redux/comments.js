import * as ActionTypes from "./ActionTypes";

// reducer takes state and action, if no actions return the state
export const Comments = (state = { errMsg: null, comments: [] }, action) => {
  switch (action.type) {
    // we can't modify directly the state object but instead we use concat
    // to creates a new object similar to state and combine it with comment object
    case ActionTypes.ADD_COMMENTS:
      return {
        ...state,
        isLoading: false,
        errMsg: null,
        comments: action.payload,
      };
    case ActionTypes.COMMENTS_FAILED:
      // we set the payload to err msg in the ActionCreators
      return { ...state, isLoading: false, errMsg: action.payload };

    case ActionTypes.ADD_COMMENT:
      var comment = action.payload;
      // add new comment to the other comments
      return { ...state, comments: state.comments.concat(comment) };
    default:
      return state;
  }
};
