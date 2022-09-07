import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TokenPayment, ListResponseNonPaging } from 'models';
import { RootState } from 'redux/store';

export interface TokenPaymentState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	listTokenPayment: TokenPayment[];
}

const initialState: TokenPaymentState = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	listTokenPayment: [],
};

const slice = createSlice({
	name: 'tokenPayment',
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
		fetchListTokenPaymentSuccess(
			state,
			action: PayloadAction<ListResponseNonPaging<TokenPayment>>
		) {
			state.isLoading = false;
			state.isSuccess = true;
			state.listTokenPayment = action.payload.data;
		},
	},
});

export const selectListTokenPayment = (state: RootState) => state.tokenPayment.listTokenPayment;
export const selectError = (state: RootState) => state.tokenPayment.errorMessage;
export const selectLoading = (state: RootState) => state.tokenPayment.isLoading;

export const { startLoading, hasError, fetchListTokenPaymentSuccess } = slice.actions;

export default slice.reducer;
