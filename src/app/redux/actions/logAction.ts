import { createAction } from "@reduxjs/toolkit";

export const logIn = createAction('LOG_IN', 
function LogIn(auth: boolean) {
  return {
    payload: {
      logIn: auth,
      logOut: false,
    }
  }
});

export const logOut = createAction('LOG_OUT', 
function logOut(auth: boolean) {
  return {
    payload: {
      logIn: false,
      logOut: auth,
    }
  }
});

export const RestLog = createAction('REST_LOG');
