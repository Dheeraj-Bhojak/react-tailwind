import axios from "axios";
import { Dispatch } from "redux";

import { USER_LOGOUT_SUCCESS } from "../../../constants/userConstants/userConstants";
export type UserLogOutActionTypes = { type: typeof USER_LOGOUT_SUCCESS };

export const userLogOut = () => {
  return async (dispatch: Dispatch<UserLogOutActionTypes>) => {
    localStorage.removeItem("userLoggedIn");
    dispatch({ type: USER_LOGOUT_SUCCESS, payload: null });
  };
};
