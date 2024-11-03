import { combineReducers } from "redux";
import { userAuthReducer } from "./reducers/users/userAuth.reducers";

export const RootReducer = combineReducers({
  user: userAuthReducer,
});
