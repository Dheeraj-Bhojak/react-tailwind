import axios, { AxiosError } from "axios";
import { Dispatch } from "redux";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
} from "../../../constants/userConstants/userConstants";

export type UserRegisterActionTypes =
  | { type: typeof USER_REGISTER_REQUEST }
  | { type: typeof USER_REGISTER_SUCCESS; payload: string }
  | { type: typeof USER_REGISTER_FAIL; error: string };

export const registerUser =
  (
    first_name: string,
    last_name: string,
    email: string,
    user_password: string,
    role: string
  ) =>
  async (dispatch: Dispatch<UserRegisterActionTypes>) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}users/register`,
        {
          first_name,
          last_name,
          email,
          role,
          user_password,
        }
      );
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        dispatch({ type: USER_REGISTER_FAIL, error: error.response.data });
      } else {
        dispatch({ type: USER_REGISTER_FAIL, error: error.response.data });
      }
    }
  };

// export const verifyUserOtp =
//   (otp: string, accessToken: string) =>
//   async (dispatch: Dispatch<UserVerifyActionType>) => {
//     try {
//       dispatch({ type: USER_OTP_VERIFICATION_REQUEST });
//       const { data } = await axios.put(
//         `http://localhost:5001/api/users/verify-otp`,
//         { otp },
//         {
//           headers: {
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       );

//       dispatch({ type: USER_OTP_VERIFICATION_SUCCESS, payload: data });
//       localStorage.setItem("userLoggedIn", data);
//     } catch (error: any) {
//       if (error.response && error.response.status === 401) {
//         dispatch({
//           type: USER_OTP_VERIFICATION_FAIL,
//           error: error.response.data,
//         });
//       } else {
//         dispatch({
//           type: USER_OTP_VERIFICATION_FAIL,
//           error: error.response.data,
//         });
//       }
//     }
//   };
