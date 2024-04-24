import { Action, ActionReducerMapBuilder, PayloadAction, Reducer, createSlice } from "@reduxjs/toolkit";
import { fetchUserRegister } from "../actions/registrationAsyncThunk";
import { FormDataModel } from "../../core/models/FormData.models";
import { ResetState } from "../actions/ResetState";


const KEY_SIGN_UP = 'userRegister';

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
  isError: false,
	isSuccess: false,
};

const registerSlice = createSlice({
	extraReducers: (builder: ActionReducerMapBuilder<IUserRegister>) => {
		builder.addCase(fetchUserRegister.pending.toString(), (state: IUserRegister) => {
			state.isLoading = true;
      state.isError = false;
			state.isSuccess = false;
		});
		builder.addCase(fetchUserRegister.fulfilled.toString(), (state: IUserRegister, action: PayloadAction<FormDataModel>) => {
			state.isLoading = false;
      state.isError = false;
			state.isSuccess = true;
      state.date = action.payload;
		});
    builder.addCase(fetchUserRegister.rejected.toString(), (state: IUserRegister, action: PayloadAction<IUserRegister>) => {
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

const registerSliceReducer = registerSlice.reducer;

export { registerSliceReducer, KEY_SIGN_UP };