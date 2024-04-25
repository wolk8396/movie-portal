import { Reducer } from "react";
import { LoadingState } from "./loadingSlice";
import { Action, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { logIn, logOut } from "../actions/logAction";

const KEY_LOG_AUTH = 'log_auth';

type DynamicKeyLogAuth =  Reducer<LoadingState, Action> | boolean;

export interface LogAuthState {
  logIn: boolean;
  logOut: boolean;
	[key: string]: DynamicKeyLogAuth
};

const initialState: LogAuthState = {
	logIn: false,
  logOut: false,
};

const LogAuthSlice = createSlice({
	extraReducers: (builder) => {
		builder.addCase(logIn.toString(), (state: LogAuthState, action: PayloadAction<LogAuthState>) => {
			state.logIn = action.payload.logIn;
      state.logOut = action.payload.logOut;
		});
    builder.addCase(logOut.toString(), (state: LogAuthState, action: PayloadAction<LogAuthState>) => {
			state.logIn = action.payload.logIn;
      state.logOut = action.payload.logOut;
		});
	},
	
	initialState,
	name: KEY_LOG_AUTH,
	reducers: {},
});

const LogAuthReducer = LogAuthSlice.reducer;

export {LogAuthReducer, KEY_LOG_AUTH};