import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { KEY_MOVIE_API, movieApi } from "../core/services/movi.services";
import { KEY_LOADING_APP, LoadingState, loadingAppReducer } from "./slices/loadingSlice";
import { apiMiddleWare } from "../core/services/apiMiddleWare";
import { KEY_SIGN_UP, registerSliceReducer } from "./slices/registerSlice";
import { KEY_AUTH, authUserSliceReducer } from "./slices/authUserSlice";

export interface RootState {
  [KEY_LOADING_APP]: LoadingState;
  [KEY_MOVIE_API]: ReturnType<typeof movieApi.reducer>;
	[KEY_SIGN_UP]: ReturnType<typeof registerSliceReducer>;
	[KEY_AUTH]: ReturnType<typeof authUserSliceReducer>;
};

export const store = configureStore({
	middleware: (getDefaultMiddleware) => getDefaultMiddleware({
		serializableCheck: false,
	}).concat(movieApi.middleware).concat(apiMiddleWare),
	reducer: {
		[KEY_AUTH]: authUserSliceReducer,
		[KEY_LOADING_APP]: loadingAppReducer,
		[KEY_MOVIE_API]: movieApi.reducer,
		[KEY_SIGN_UP]:registerSliceReducer,
	},
});

export type RootDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => RootDispatch = useDispatch;
