import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';

export interface LoadingState {
	isLoadingPage: boolean;
	isLoadingTransparent: boolean;
}

const initialState: LoadingState = {
	isLoadingPage: false,
	isLoadingTransparent: false,
};

export const slice = createSlice({
	name: 'loading',
	initialState,
	reducers: {
		setLoading: (state, action) => {
			state.isLoadingPage = action.payload;
		},
		setLoadingTransparent: (state, action) => {
			state.isLoadingTransparent = action.payload;
		},
	},
});

// Actions
export const { setLoading, setLoadingTransparent } = slice.actions;

// Selector
export const selectLoadingPage = (state: RootState) => state.loading.isLoadingPage;
export const selectLoadingTransparent = (state: RootState) => state.loading.isLoadingTransparent;

// Reducer
export default slice.reducer;
