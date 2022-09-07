import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterNft, Pagination, ListResponse, NFT } from 'models';
import { RootState } from '../store';

export interface UserAssetState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	listAssets: NFT[];
	filter: FilterNft;
	pagination: Pagination;
	hasNextPage: boolean;
}

const initialState: UserAssetState = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	listAssets: [],
	filter: {
		chainId: [],
		status: [],
		collectionId: [],
		tokenSymbol: '',
		minPrice: '',
		maxPrice: '',
		itemName: '',
		owner: '',
		isFiltering: false,
	},
	pagination: { page: 1, pageSize: 20 },
	hasNextPage: false,
};

export const slice = createSlice({
	name: 'userAsset',
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
		fetchUserAssetFirstLoadSuccess(state, action: PayloadAction<ListResponse<NFT>>) {
			state.isLoading = false;
			state.isSuccess = true;
			state.listAssets = action.payload.data;
		},
		fetchUserAssetSuccess(state, action: PayloadAction<ListResponse<NFT>>) {
			state.isLoading = false;
			state.isSuccess = true;
			state.listAssets = state.listAssets.concat(action.payload.data);
		},
		setPagination(state, action) {
			state.pagination = action.payload;
		},
		setFilter(state, action) {
			return { ...initialState, filter: { ...action.payload, isFiltering: true } };
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
	fetchUserAssetSuccess,
	fetchUserAssetFirstLoadSuccess,
	setPagination,
	setFilter,
	resetAll,
	setHasNextPage,
} = slice.actions;

// Selectors
export const selectInitialState = initialState;
export const selectListAssets = (state: RootState) => state.userAsset.listAssets;
export const selectPagination = (state: RootState) => state.userAsset.pagination;
export const selectLoading = (state: RootState) => state.userAsset.isLoading;
export const selectFilter = (state: RootState) => state.userAsset.filter;
export const selectHasNextPage = (state: RootState) => state.userAsset.hasNextPage;

// Reducer
export default slice.reducer;
