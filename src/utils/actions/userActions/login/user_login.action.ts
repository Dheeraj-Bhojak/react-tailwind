import axios from "axios";
import { Dispatch } from "redux";
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
} from "../../../constants/userConstants/userConstants";

export type UserLoginActionTypes =
  | { type: typeof USER_LOGIN_REQUEST }
  | { type: typeof USER_LOGIN_SUCCESS; payload: string }
  | { type: typeof USER_LOGIN_FAIL; error: string };

export const userLogin = (email: string, password: string) => {
  return async (dispatch: Dispatch<UserLoginActionTypes>) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const hostName = process.env.REACT_APP_API_URL;
      const { data } = await axios.post(`${hostName}users/login`, {
        email,
        password,
      });

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      localStorage.setItem("userLoggedIn", data);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch({ type: USER_LOGIN_FAIL, error: error.response.data });
      } else {
        dispatch({ type: USER_LOGIN_FAIL, error: error.response.data });
      }
    }
  };
};
