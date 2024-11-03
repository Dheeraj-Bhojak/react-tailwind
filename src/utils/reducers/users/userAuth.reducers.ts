// import {
//   USER_REGISTER_REQUEST,
//   USER_REGISTER_SUCCESS,
//   USER_REGISTER_FAIL,
// } from "../../constants/userConstants/userConstants";
// import { UserRegisterActionTypes } from "../../actions/userActions/register/user_register.action";

// export interface InfluencerState {
//   loading: boolean;
//   error: string | null;
//   token: string | null;
// }

// const initialState: InfluencerState = {
//   loading: false,
//   error: null,
//   token: null,
// };

// export const userAuthReducer = (
//   state = { initialState },
//   action: UserRegisterActionTypes
// ): InfluencerState => {
//   switch (action.type) {
//     case USER_REGISTER_REQUEST:
//       return { loading: true, token: null, error: null };
//     case USER_REGISTER_SUCCESS:
//       return {
//         loading: false,
//         token: action.payload,
//         error: null,
//       };
//     case USER_REGISTER_FAIL:
//       return { loading: false, token: null, error: action.error };
//     default:
//       return initialState;
//   }
// };

import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGOUT_SUCCESS,
  ERROR_RESET_SUCCESS,
  USER_PROFILE_REQUEST,
  USER_PROFILE_SUCCESS,
  USER_PROFILE_FAIL,
} from "../../constants/userConstants/userConstants";

export type UserAuthActionTypes =
  | { type: typeof USER_REGISTER_REQUEST }
  | { type: typeof USER_REGISTER_SUCCESS; payload: string }
  | { type: typeof USER_REGISTER_FAIL; error: string }
  | { type: typeof USER_LOGIN_REQUEST }
  | { type: typeof USER_LOGIN_SUCCESS; payload: string }
  | { type: typeof USER_LOGIN_FAIL; error: string }
  | { type: typeof USER_LOGOUT_SUCCESS; payload: null }
  | { type: typeof ERROR_RESET_SUCCESS; payload: null }
  | { type: typeof USER_PROFILE_REQUEST }
  | { type: typeof USER_PROFILE_SUCCESS; payload: string }
  | { type: typeof USER_PROFILE_FAIL; error: string };

export interface UserState {
  loading: boolean;
  error: string | null;
  userData: string | null;
}

const initialState: UserState = {
  loading: false,
  error: null,
  userData: null,
};

export const userAuthReducer = (
  state = { initialState },
  action: UserAuthActionTypes
): UserState => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, userData: null, error: null };
    case USER_LOGIN_SUCCESS:
      return {
        loading: false,
        userData: action.payload,
        error: null,
      };
    case USER_LOGIN_FAIL:
      return { loading: false, userData: null, error: action.error };

    case USER_REGISTER_REQUEST:
      return { loading: true, userData: null, error: null };
    case USER_REGISTER_SUCCESS:
      return {
        loading: false,
        userData: action.payload,
        error: null,
      };
    case USER_REGISTER_FAIL:
      return { loading: false, userData: null, error: action.error };
    case USER_LOGOUT_SUCCESS:
      return { loading: false, userData: null, error: null };
    case ERROR_RESET_SUCCESS:
      return { ...initialState, error: null };

    case USER_PROFILE_REQUEST:
      return { loading: true, userData: initialState.userData, error: null };
    case USER_PROFILE_SUCCESS:
      return {
        loading: false,
        userData: action.payload,
        error: null,
      };
    case USER_PROFILE_FAIL:
      return { loading: false, userData: null, error: action.error };
    default:
      return initialState;
  }
};
