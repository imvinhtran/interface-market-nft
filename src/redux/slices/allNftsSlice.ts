import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterNft, ListParams, ListResponse, NFT } from 'models';
import { RootState } from '../store';

export interface AllNftsState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	listNFTs: any[];
	filter: FilterNft;
	pagination: ListParams;
	hasNextPage: boolean;
}

const initialState: AllNftsState = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	listNFTs: [],
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
	pagination: {
		page: 1,
		pageSize: 20,
	},
	hasNextPage: false,
};

export const slice = createSlice({
	name: 'allNfts',
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
		fetchAllNftsFirstLoadSuccess(state, action: PayloadAction<ListResponse<NFT>>) {
			state.isLoading = false;
			state.isSuccess = true;
			state.listNFTs = action.payload.data;
		},
		fetchAllNftsSuccess(state, action: PayloadAction<ListResponse<NFT>>) {
			state.isLoading = false;
			state.isSuccess = true;
			state.listNFTs = state.listNFTs.concat(action.payload.data);
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
	fetchAllNftsSuccess,
	fetchAllNftsFirstLoadSuccess,
	setFilter,
	setPagination,
	setHasNextPage,
	resetAll,
} = slice.actions;

// Selector
export const selectInitialState = initialState;
export const selectAllNfts = (state: RootState) => state.allNfts.listNFTs;
export const selectPagination = (state: RootState) => state.allNfts.pagination;
export const selectLoading = (state: RootState) => state.allNfts.isLoading;
export const selectFilter = (state: RootState) => state.allNfts.filter;
export const selectHasNextPage = (state: RootState) => state.allNfts.hasNextPage;

// Reducer
export default slice.reducer;
