// do the store Configuration, it is not required to do it this way
// now i imported CreateStore this way because it is not recommanded to use it anymore, but they encourage us to use configureStore
import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
} from "redux";
import { createForms } from "react-redux-form";
import { Dishes } from "./dishes";
import { Leaders } from "./leaders";
import { Promotions } from "./promotions";
import { Comments } from "./comments";
import { InitialFeedback } from "./forms";
import thunk from "redux-thunk";
import logger from "redux-logger";

// configure the store by creating a store
export const ConfigureStore = () => {
  // we pass the reducer func and the initial state we created
  const store = createStore(
    // we used combine reducers to combine all the reducers we created
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
      // add forms reducer, react-redux-form fills all other details
      ...createForms({ feedback: InitialFeedback }),
    }),
    // a second param for create store
    applyMiddleware(thunk, logger)
  );

  return store;
};
