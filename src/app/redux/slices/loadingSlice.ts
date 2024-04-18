import { Action, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Reducer } from "react";
import { ResetStateLoading, stopAction, loadingSpinner } from "../actions/loading";

const KEY_LOADING_APP = 'loading_app';

type DynamicKeyAppLoading =  Reducer<LoadingState, Action> | boolean | any;

export interface LoadingState {
	isAction:boolean
  loading: boolean,
  error?: boolean
	[key: string]: DynamicKeyAppLoading
};

const initialState: LoadingState = {
	isAction: true,
	loading: false,
};

const loadingAppSlice = createSlice({
	extraReducers: (builder) => {
		builder.addCase(stopAction.toString(), (state: LoadingState, action: PayloadAction<LoadingState>) => {
			state.isAction = action.payload.isAction;
		});
		builder.addCase(loadingSpinner.toString(), (state: LoadingState, action: PayloadAction<LoadingState>) => {
			if (state.isAction) {
				state.loading = action.payload.loading;
			}
			state.error = action.payload.error
		});
		builder.addCase(ResetStateLoading, () => initialState);
	},
	
	initialState,
	name: KEY_LOADING_APP,
	reducers: {},
});

const loadingAppReducer = loadingAppSlice.reducer;

export {loadingAppReducer, KEY_LOADING_APP};