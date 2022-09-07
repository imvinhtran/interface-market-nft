import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CollectionCategory } from 'models';
import { RootState } from '../store';

export interface CollectionCategoryState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	listCollectionCategory: CollectionCategory[];
	refresh: boolean;
}

const initialState: CollectionCategoryState = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	listCollectionCategory: [],
	refresh: false,
};

export const slice = createSlice({
	name: 'collectionCategory',
	initialState,
	reducers: {
		startLoading(state) {
			state.isLoading = true;
		},
		// HAS ERROR
		hasError(state, action) {
			state.isLoading = false;
			state.isSuccess = false;
			state.errorMessage = action.payload;
		},
		fetchCollectionCategorySuccess: (state, action: PayloadAction<CollectionCategory[]>) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.listCollectionCategory = action.payload;
		},
		setRefresh(state) {
			state.refresh = !state.refresh;
		},
	},
});

//Actions
export const { fetchCollectionCategorySuccess, startLoading, hasError, setRefresh } = slice.actions;

//Selectors
export const selectCollectionCategory = (state: RootState) =>
	state.collectionCategory.listCollectionCategory;
export const selectLoading = (state: RootState) => state.collectionCategory.isLoading;
export const selectIsSuccess = (state: RootState) => state.collectionCategory.isSuccess;
export const selectRefresh = (state: RootState) => state.collectionCategory.refresh;

//Reducer
export default slice.reducer;
