import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	user: null,
	loading: true,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload;
		},
		removeUser: (state) => {
			state.user = null;
		},
		finishLoading: (state) => {
			state.loading = false;
		},
	},
});

// Action creators are generated for each case reducer function
export const { setUser, removeUser, finishLoading } = authSlice.actions;

export default authSlice.reducer;
