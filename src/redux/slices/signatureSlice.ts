import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Signature } from 'models';
import { RootState } from 'redux/store';

export interface signatureState {
	isLoading: boolean;
	error: string;
	signature: Signature | null;
}

const initialState: signatureState = {
	isLoading: false,
	error: '',
	signature: null,
};

const slice = createSlice({
	name: 'signature',
	initialState,
	reducers: {
		// START LOADING
		startLoading(state) {
			state.isLoading = true;
		},
		// HAS ERROR
		hasError(state, action) {
			state.isLoading = false;
			state.error = action.payload;
		},
		getSignatureSuccess(state, action: PayloadAction<any>) {
			state.isLoading = false;
			state.signature = action.payload.data;
		},
	},
});

// Actions
export const { startLoading, hasError, getSignatureSuccess } = slice.actions;

//Reducer
export default slice.reducer;

//Selector
export const selectSignature = (state: RootState) => state.signature.signature;
