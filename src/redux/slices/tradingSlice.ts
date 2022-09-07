import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ItemActivity, UserActivity, CollectionActivity } from 'models/histories';
import { ListResponse } from 'models';

export interface TradingHistoryState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	listTxById: any;
	listItemActivity: ItemActivity[];
	listUserActivity: UserActivity[];
	listCollectionActivity: CollectionActivity[];
}

const initialState: TradingHistoryState = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	listTxById: [],
	listItemActivity: [],
	listUserActivity: [],
	listCollectionActivity: [],
};

export const slice = createSlice({
	name: 'tradeHistory',
	initialState,
	reducers: {
		// START LOADING
		startLoading(state) {
			state.isLoading = true;
		},
		// HAS ERROR
		hasError(state, action) {
			state.isLoading = false;
			state.isSuccess = false;
			state.errorMessage = action.payload;
		},
		fetchTradingHistorySuccess: (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.listItemActivity = action.payload.data;
		},
		fetchUserHistorySuccess: (state, action: PayloadAction<ListResponse<UserActivity>>) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.listUserActivity = action.payload.data;
		},
		fetchCollectionHistorySuccess: (
			state,
			action: PayloadAction<ListResponse<CollectionActivity>>
		) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.listCollectionActivity = action.payload.data;
		},
	},
});

//Actions
export const {
	startLoading,
	hasError,
	fetchTradingHistorySuccess,
	fetchUserHistorySuccess,
	fetchCollectionHistorySuccess,
} = slice.actions;

//Selectors
export const selectTradingHistory = (state: RootState) => state.tradeHistory.listTxById;
export const selectLoading = (state: RootState) => state.tradeHistory.isLoading;
export const selectListItemActivity = (state: RootState) => state.tradeHistory.listItemActivity;
export const selectListUserActivity = (state: RootState) => state.tradeHistory.listUserActivity;
export const selectListCollectionActivity = (state: RootState) =>
	state.tradeHistory.listCollectionActivity;

//Reducer
export default slice.reducer;
