import { Reducer } from "react";
import { FormDataModel } from "../../core/models/FormData.models";
import { Action, ActionReducerMapBuilder, PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchAuthUser } from "../actions/authAction";
import { ResetState } from "../actions/ResetState";
import { KEY_SIGN_UP } from "./registerSlice";

const KEY_AUTH = 'auth';

type DynamicKeySingUp = Reducer<IUserRegister, Action> | FormDataModel | boolean | undefined;

export interface IUserRegister {
	isLoading: boolean;
  isSuccess: boolean
  isError: boolean
  date?:FormDataModel,
  [key: string]: DynamicKeySingUp;
};

const initialState: IUserRegister = {
	isLoading: false,
  isSuccess: false,
  isError: false,
};

const authUserSlice = createSlice({
	extraReducers: (builder: ActionReducerMapBuilder<IUserRegister>) => {
		builder.addCase(fetchAuthUser.pending.toString(), (state: IUserRegister) => {
			state.isLoading = true;
      state.isError = false;
      state.isSuccess = false;
		});
		builder.addCase(fetchAuthUser.fulfilled.toString(), (state: IUserRegister, action: PayloadAction<FormDataModel>) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = true;
      state.date = action.payload;
		});
    builder.addCase(fetchAuthUser.rejected.toString(), (state: IUserRegister, action: PayloadAction<IUserRegister>) => {
			state.isLoading = false;
      state.isError = true;
      state.isSuccess = false;
		});
    builder.addCase(ResetState, () => initialState);
	},
	initialState,
	name: KEY_SIGN_UP,
  reducers: {},
});

const authUserSliceReducer = authUserSlice.reducer;

export { authUserSliceReducer, KEY_AUTH };
