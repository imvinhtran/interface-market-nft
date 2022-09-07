import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Collection, ListParams } from 'models';
import { RootState } from '../store';

export interface ListTopCollectionState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	listTopCollection: Collection[];
	filter: ListParams;
}

const initialState: ListTopCollectionState = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	listTopCollection: [],
	filter: {
		limit: 10,
		days: 10,
	},
};

export const slice = createSlice({
	name: 'listTopCollection',
	initialState,
	reducers: {
		startLoading: (state) => {
			state.isLoading = true;
		},
		hasError: (state, action) => {
			state.isLoading = false;
			state.isSuccess = false;
			state.errorMessage = action.payload;
		},
		setListTopCollectionSuccess: (state, action: PayloadAction<any>) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.listTopCollection = action.payload.data;
		},
	},
});

//Actions
export const { startLoading, hasError, setListTopCollectionSuccess } = slice.actions;

//Selectors
export const selectListTopCollection = (state: RootState) =>
	state.listTopCollection.listTopCollection;
export const selectLoading = (state: RootState) => state.listTopCollection.isLoading;
export const selectFilter = (state: RootState) => state.listTopCollection.filter;

//Reducer
export default slice.reducer;
