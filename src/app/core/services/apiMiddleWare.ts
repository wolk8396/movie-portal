import { Action, Dispatch, Middleware } from "@reduxjs/toolkit";
import { RootState } from "../../redux/store";
import { LOADING_FULFILLED, LOADING_PENDING, LOADING_REJECTED } from "../../shared/consts/apiActionsLoadingConsts";
import { loadingSpinner } from "../../redux/actions/loading";

export const apiMiddleWare: Middleware<{}, RootState, Dispatch<Action>> = ({ dispatch }) => (next) => (action) => {
  const response = next(action);
  const type = (response as Action ).type;
  switch (type) {
    case LOADING_PENDING:
      dispatch(loadingSpinner(true, false))
      break;
    case LOADING_REJECTED:
      dispatch(loadingSpinner(false, true))
      break;
    case LOADING_FULFILLED:
      dispatch(loadingSpinner(false, false))
      break;
    default:
      break;
  }
  
  return response;
};
