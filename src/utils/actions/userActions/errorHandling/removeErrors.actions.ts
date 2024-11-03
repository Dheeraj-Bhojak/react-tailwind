import { Dispatch } from "redux";
import { ERROR_RESET_SUCCESS } from "../../../constants/userConstants/userConstants";
export type ErrorResetActionTypes = { type: typeof ERROR_RESET_SUCCESS };
export const ResetErrors = () => {
  return async (dispatch: Dispatch<ErrorResetActionTypes>) => {
    dispatch({ type: ERROR_RESET_SUCCESS, payload: null });
  };
};
