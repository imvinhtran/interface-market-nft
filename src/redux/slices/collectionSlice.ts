/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Collection, FilterCollection, ListParams, ListResponse } from 'models';
import { RootState } from '../store';

export interface AllCollectionByAddress {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	listCollections: Collection[];
	listCollectionsByOwnerOrCreatorItems: Collection[];
	collectionItem: Collection | null;
	filter: FilterCollection;
	pagination: ListParams;
	hasNextPage: boolean;
}

const initialState: AllCollectionByAddress = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	listCollections: [],
	listCollectionsByOwnerOrCreatorItems: [],
	collectionItem: null,
	filter: {
		chainId: [],
		userAddress: '',
		isCreator: false,
		isOwner: false,
		collectionName: '',
		isFiltering: false,
	},
	pagination: {
		page: 1,
		pageSize: 20,
	},
	hasNextPage: false,
};

export const slice = createSlice({
	name: 'collection',
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
		fetchListCollectionsByOwnerOrCreatorItemsFirstLoadSuccess(
			state,
			action: PayloadAction<ListResponse<Collection>>
		) {
			state.isLoading = false;
			state.isSuccess = true;
			state.listCollectionsByOwnerOrCreatorItems = action.payload.data;
		},
		fetchListCollectionsByOwnerOrCreatorItemsSuccess(
			state,
			action: PayloadAction<ListResponse<Collection>>
		) {
			state.isLoading = false;
			state.isSuccess = true;
			state.listCollectionsByOwnerOrCreatorItems =
				state.listCollectionsByOwnerOrCreatorItems.concat(action.payload.data);
		},
		fetchCollectionByIdSuccess(state, action: PayloadAction<any>) {
			state.isLoading = false;
			state.isSuccess = true;
			state.collectionItem = action.payload;
		},
		createCollectionSuccess(state) {
			state.isLoading = false;
			state.isSuccess = true;
		},
		editCollectionSuccess(state) {
			state.isLoading = false;
			state.isSuccess = true;
		},
		setFilter(state, action) {
			return { ...initialState, filter: { ...action.payload, isFiltering: true } };
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
	fetchListCollectionsByOwnerOrCreatorItemsFirstLoadSuccess,
	fetchListCollectionsByOwnerOrCreatorItemsSuccess,
	fetchCollectionByIdSuccess,
	createCollectionSuccess,
	editCollectionSuccess,
	setFilter,
	setPagination,
	setHasNextPage,
	resetAll,
} = slice.actions;

// Selectors
export const selectInitialState = initialState;
export const selectListCollection = (state: RootState) => state.collection.listCollections;
export const selectCollectionItem = (state: RootState) => state.collection.collectionItem;
export const selectListCollectionsByOwnerOrCreatorItems = (state: RootState) =>
	state.collection.listCollectionsByOwnerOrCreatorItems;
export const selectPagination = (state: RootState) => state.collection.pagination;
export const selectLoading = (state: RootState) => state.collection.isLoading;
export const selectFilter = (state: RootState) => state.collection.filter;
export const selectHasNextPage = (state: RootState) => state.collection.hasNextPage;

// Reducer
export default slice.reducer;
