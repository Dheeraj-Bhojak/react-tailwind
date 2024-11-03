import axios from "axios";

import {
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from "../../../constants/userConstants/userConstants";
import { UserState } from "../../../reducers/users/userAuth.reducers";

export type UserProfileActionTypes =
  | { type: typeof USER_PROFILE_REQUEST }
  | { type: typeof USER_PROFILE_SUCCESS; payload: UserState }
  | { type: typeof USER_PROFILE_FAIL; error: string };

export const GetProfileData =
  (token: string) =>
  async (
    dispatch: (arg0: { type: string; payload?: any; error?: any }) => void
  ) => {
    try {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}users/profile`,
        config
      );

      dispatch({ type: USER_PROFILE_SUCCESS, payload: data });
    } catch (error: any) {
      const errorMessage =
        error.response && error.response.data
          ? error.response.data.message
          : error.message;

      dispatch({ type: USER_PROFILE_FAIL, error: errorMessage });
    }
  };
