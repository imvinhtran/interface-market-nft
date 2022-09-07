import { RootState } from 'redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface BuyState {
	isLoading: boolean;
	error: boolean;
}

const initialState: BuyState = {
	isLoading: false,
	error: false,
};

const slice = createSlice({
	name: 'buy',
	initialState,
	reducers: {
		startLoading(state) {
			state.isLoading = true;
		},
		hasError(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
		buyItemSucess(state, action: PayloadAction<any>) {
			state.isLoading = false;
		},
	},
});

//Action
export const { startLoading, hasError, buyItemSucess } = slice.actions;

//Selectors
export const selectLoading = (state: RootState) => state.buyAction.isLoading;
export const selectError = (state: RootState) => state.buyAction.error;

//Reducer
export default slice.reducer;
