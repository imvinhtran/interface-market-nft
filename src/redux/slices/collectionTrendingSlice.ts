/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Collection, FilterTrendingCollection, ListParams, ListResponse } from 'models';
import { RootState } from '../store';

export interface AllNftsByAddress {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	listCollections: Collection[];
	filter: FilterTrendingCollection;
	pagination: ListParams;
	hasNextPage: boolean;
	isFiltering: boolean;
}

const initialState: AllNftsByAddress = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	listCollections: [],
	filter: {
		sortBy: 'volume7Days',
	},
	pagination: {
		page: 1,
		pageSize: 20,
	},
	hasNextPage: false,
	isFiltering: false,
};

export const slice = createSlice({
	name: 'trendingCollection',
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
		fetchAllCollectionFirstLoadSuccess(state, action: PayloadAction<ListResponse<Collection>>) {
			state.isLoading = false;
			state.isSuccess = true;
			state.listCollections = action.payload.data;
		},
		fetchAllCollectionSuccess(state, action: PayloadAction<ListResponse<Collection>>) {
			state.isLoading = false;
			state.isSuccess = true;
			state.listCollections = state.listCollections.concat(action.payload.data);
		},
		setFilter(state, action) {
			return { ...initialState, isFiltering: true, filter: { ...action.payload } };
		},
		setPagination(state, action) {
			state.pagination = action.payload;
		},
		setHasNextPage(state, action) {
			state.hasNextPage = action.payload;
		},
		resetAll: () => initialState,
	},
});

// Actions
export const {
	startLoading,
	hasError,
	fetchAllCollectionFirstLoadSuccess,
	fetchAllCollectionSuccess,
	setFilter,
	setPagination,
	setHasNextPage,
	resetAll,
} = slice.actions;

// Selectors
export const selectInitialState = initialState;
export const selectListCollection = (state: RootState) => state.trendingCollection.listCollections;
export const selectPagination = (state: RootState) => state.trendingCollection.pagination;
export const selectLoading = (state: RootState) => state.trendingCollection.isLoading;
export const selectFilter = (state: RootState) => state.trendingCollection.filter;
export const selectHasNextPage = (state: RootState) => state.trendingCollection.hasNextPage;
export const selectIsFiltering = (state: RootState) => state.trendingCollection.isFiltering;

// Reducer
export default slice.reducer;
