import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
export interface RatioState {
	ratio: any;
	isLoading: boolean;
	error: boolean;
}

const initialState: RatioState = {
	ratio: null,
	isLoading: false,
	error: false,
};

export const slice = createSlice({
	name: 'ratio',
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
		setRatioSuccess: (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.ratio = action.payload;
		},
	},
});

//Actions
export const { startLoading, hasError, setRatioSuccess } = slice.actions;

//Selectors
export const selectRatio = (state: RootState) => state.ratio.ratio;

//Reducer
export default slice.reducer;
