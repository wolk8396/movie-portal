import { Action, Dispatch, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { LOG_SIGN_IN_FULFILLED, LOG_SIGN_UP_FULFILLED } from "../../shared/consts/apiActionLogConsts";
import { logIn } from "../../redux/actions/logAction";

export const apiMiddleWareLog: Middleware<{}, RootState, Dispatch<Action>> = ({ dispatch }) => (next) => (action) => {
  const response = next(action);
  const type = (response as Action ).type;
  switch (type) {
    case LOG_SIGN_IN_FULFILLED:
      dispatch(logIn(true))
      break;
    case LOG_SIGN_UP_FULFILLED:
      dispatch(logIn(true));
      break;
    default:
      break;
  };
  
  return response;
};