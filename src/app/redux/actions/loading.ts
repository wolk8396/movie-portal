import { createAction } from "@reduxjs/toolkit";

export const loadingSpinner = createAction('LOADING_SPINNER', 
function loading(loading: boolean, error: boolean) {
  return {
    payload: {
      error: error,
      loading: loading,
    }
  }
});
// export const errorModal = createAction('ERROR_MODAL');
export const ResetStateLoading = createAction('RESET_STATE_LOADING');