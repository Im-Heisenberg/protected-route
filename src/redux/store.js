import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/slices/auth-slice";
export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});
