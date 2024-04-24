import { createAsyncThunk } from "@reduxjs/toolkit";
import { FormDataModel } from "../../core/models/FormData.models";
import { ApiSignUp } from "../../core/api/mock-sign-up.api";

export const fetchUserRegister = createAsyncThunk('userAuth/fetchRegister', async (userData: FormDataModel, thunkAPI) => {
	const userInfo: FormDataModel = {
		password: userData.password,
		email: userData.email,
		uuid: userData.uuid
	};

	try {
		return await ApiSignUp(userInfo);
	} catch (error) {
		return thunkAPI.rejectWithValue(error);
	}
});