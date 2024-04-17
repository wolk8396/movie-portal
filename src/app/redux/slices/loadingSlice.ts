import { Action, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Reducer } from "react";
import { ResetStateLoading, loadingSpinner } from "../actions/loading";

const KEY_LOADING_APP = 'loading_app';

type DynamicKeyAppLoading =  Reducer<LoadingState, Action> | boolean | any;

export interface LoadingState {
  loading: boolean,
  error?: boolean
	[key: string]: DynamicKeyAppLoading
};

const initialState: LoadingState = {
	loading: false,
};

const loadingAppSlice = createSlice({
	extraReducers: (builder) => {
		builder.addCase(loadingSpinner.toString(), (state: LoadingState, action: PayloadAction<LoadingState>) => {
			state.loading = action.payload.loading;
      state.error = action.payload.error
		});
		builder.addCase(ResetStateLoading, () => initialState);
	},
	initialState,
	name: KEY_LOADING_APP,
	reducers: {},
});

const loadingAppReducer = loadingAppSlice.reducer;

export {loadingAppReducer, KEY_LOADING_APP}