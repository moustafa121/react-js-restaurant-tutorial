// means import everything from the ActionTypes files as an object named ActionTypes
import * as ActionTypes from "./ActionTypes";
// import { DISHES } from "../shared/dishes";
import { baseUrl } from "../shared/baseUrl";

export const addComment = (comment) => ({
  type: ActionTypes.ADD_COMMENT,
  // payload means the data to be carried in the object
  payload: comment,
});

export const postComment = (dishId, rating, author, comment) => (dispatch) => {
  const newComment = {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  };
  newComment.date = new Date().toISOString();
  return fetch(baseUrl + "comments", {
    // here we specify the post method and it is requirements(request message)
    method: "POST",
    body: JSON.stringify(newComment),
    // specify required because we sent json data
    headers: {
      "Content-Type": "application/json",
    },
    // deal with it with node js
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          // error cause by server, ex: response 404
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      // dont get anything back
      (error) => {
        var errMsg = new Error(error.message);
        throw errMsg;
      }
    )
    .then((response) => response.json())
    .then((response) => dispatch(addComment(response)))
    .catch((error) => {
      console.log("post comments ", error.message);
      alert("you comment is not posted");
    });
};

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));

  return fetch(baseUrl + "dishes")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          // error cause by server, ex: response 404
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      // dont get anything back
      (error) => {
        var errMsg = new Error(error.message);
        throw errMsg;
      }
    )
    .then((response) => response.json())
    .then((dishes) => dispatch(addDishes(dishes)))
    .catch((error) => {
      //catch exectued when we throw errors we created in promises
      dispatch(dishesFailed(error.message));
    });
};

//to tell that the dishes are loading
export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING,
});

export const dishesFailed = (errMsg) => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errMsg,
});

export const addDishes = (dishes) => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes,
});

export const fetchComments = () => (dispatch) => {
  return fetch(baseUrl + "comments")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          // error cause by server, ex: response 404
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      // dont get anything back
      (error) => {
        var errMsg = new Error(error.message);
        throw errMsg;
      }
    )
    .then((response) => response.json())
    .then((comments) => dispatch(addComments(comments)))
    .catch((error) => {
      //catch exectued when we throw errors we created in promises
      dispatch(commentsFailed(error.message));
    });
};

export const commentsFailed = (errMsg) => ({
  type: ActionTypes.COMMENTS_FAILED,
  payload: errMsg,
});

export const addComments = (comments) => ({
  type: ActionTypes.ADD_COMMENTS,
  payload: comments,
});

export const fetchPromos = () => (dispatch) => {
  dispatch(promosLoading(true));

  return fetch(baseUrl + "promotions")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          // error cause by server, ex: response 404
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      // dont get anything back
      (error) => {
        var errMsg = new Error(error.message);
        throw errMsg;
      }
    )
    .then((response) => response.json())
    .then((promos) => dispatch(addPromos(promos)))
    .catch((error) => {
      //catch exectued when we throw errors we created in promises
      dispatch(promosFailed(error.message));
    });
};

export const promosLoading = () => ({
  type: ActionTypes.PROMOS_LOADING,
});

export const promosFailed = (errMsg) => ({
  type: ActionTypes.PROMOS_FAILED,
  payload: errMsg,
});

export const addPromos = (promos) => ({
  type: ActionTypes.ADD_PROMOS,
  payload: promos,
});

// leaders actions
export const fetchLeaders = () => (dispatch) => {
  dispatch(leadersLoading(true));

  return fetch(baseUrl + "leaders")
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          // error cause by server, ex: response 404
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      // dont get anything back
      (error) => {
        var errMsg = new Error(error.message);
        throw errMsg;
      }
    )
    .then((response) => response.json())
    .then((leaders) => dispatch(addLeaders(leaders)))
    .catch((error) => {
      //catch exectued when we throw errors we created in promises
      dispatch(leadersFailed(error.message));
    });
};

//to tell that the leaders are loading
export const leadersLoading = () => ({
  type: ActionTypes.LEADERS_LOADING,
});

export const leadersFailed = (errMsg) => ({
  type: ActionTypes.LEADERS_FAILED,
  payload: errMsg,
});

export const addLeaders = (leaders) => ({
  type: ActionTypes.ADD_LEADERS,
  payload: leaders,
});

// feedback action
export const postFeedback = (feedback) => {
  return fetch(baseUrl + "feedback", {
    // here we specify the post method and it is requirements(request message)
    method: "POST",
    body: JSON.stringify(feedback),
    // specify required because we sent json data
    headers: {
      "Content-Type": "application/json",
    },
    // deal with it with node js
    credentials: "same-origin",
  })
    .then(
      (response) => {
        if (response.ok) {
          return response;
        } else {
          // error cause by server, ex: response 404
          var error = new Error(
            "Error " + response.status + ": " + response.statusText
          );
          error.response = response;
          throw error;
        }
      },
      // dont get anything back
      (error) => {
        var errMsg = new Error(error.message);
        throw errMsg;
      }
    )
    .then((response) => response.json())
    .then((response) => {
      alert("Thank you for your feedback !\n" + JSON.stringify(response));
    })
    .catch((error) => {
      console.log("post feedback ", error.message);
      alert("you feedback is not posted");
    });
};
