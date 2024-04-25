import { createAsyncThunk } from "@reduxjs/toolkit";
import { FormDataModel } from "../../core/models/FormData.models";
import { ApiSignIn } from "../../core/api/mock-sign-in.api";

export const fetchAuthUser = createAsyncThunk('userAuth/fetchRegister', async (userData: FormDataModel, thunkAPI) => {
	const userInfo: FormDataModel = {
		password: userData.password,
		email: userData.email,
	};
	try {
		return await ApiSignIn(userInfo);
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});
