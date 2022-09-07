import { createSlice } from '@reduxjs/toolkit';
import { User } from 'models';
import { RootState } from 'redux/store';

export interface UserState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	userInfo: User | null;
	otherUserInfo: User | null;
}

const initialState: UserState = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	userInfo: null,
	otherUserInfo: null,
};

const slice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		startLoading(state) {
			state.isLoading = true;
		},
		hasError(state, action) {
			state.isLoading = false;
			state.isSuccess = false;
			state.errorMessage = action.payload;
		},
		getUserSuccess(state, action) {
			state.isLoading = false;
			state.isSuccess = true;
			state.userInfo = action.payload.data;
		},
		getOtherUserInfoSuccess(state, action) {
			state.isLoading = false;
			state.isSuccess = true;
			state.otherUserInfo = action.payload.data;
		},
		updateUserSuccess(state, action) {
			state.isLoading = false;
			state.isSuccess = true;
			state.userInfo = action.payload;
		},
		logOutUserSuccess(state) {
			state.isLoading = false;
			state.isSuccess = true;
			state.userInfo = null;
		},
	},
});

//Actions
export const {
	startLoading,
	hasError,
	getUserSuccess,
	getOtherUserInfoSuccess,
	updateUserSuccess,
	logOutUserSuccess,
} = slice.actions;

export const selectUser = (state: RootState) => state.user.userInfo;
export const selectOtherUserInfo = (state: RootState) => state.user.otherUserInfo;
export const selectLoading = (state: RootState) => state.user.isLoading;

export default slice.reducer;
