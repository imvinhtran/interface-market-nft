import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, ListResponse, NFT, PaginationParams } from 'models';
import { RootState } from '../store';

export interface AllFavoriteNftsByAddressState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	listNFTs: NFT[];
	filter: ListParams;
	paginationParams: ListParams;
	paginationResponse: PaginationParams;
}

const initialState: AllFavoriteNftsByAddressState = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	listNFTs: [],
	filter: {},
	paginationParams: {
		page: 1,
		pageSize: 20,
	},
	paginationResponse: {
		totalPages: 0,
		currentPage: 0,
		pageSize: 0,
		totalItems: 0,
	},
};

export const slice = createSlice({
	name: 'allFavoriteNftsByAddress',
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
		fetchFavoriteNftsByAddressSuccess: (state, action: PayloadAction<ListResponse<NFT>>) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.listNFTs = action.payload.data;
			state.paginationResponse = action.payload.pagination;
		},
		setFilter(state, action) {
			state.filter = action.payload;
			state.paginationParams = initialState.paginationParams;
		},
		setPaginationParams(state, action) {
			state.paginationParams = action.payload;
		},
		resetFilterAndPaginationParams(state) {
			state.filter = initialState.filter;
			state.paginationParams = initialState.paginationParams;
		},
	},
});

// Actions
export const {
	startLoading,
	hasError,
	fetchFavoriteNftsByAddressSuccess,
	setFilter,
	setPaginationParams,
	resetFilterAndPaginationParams,
} = slice.actions;

// Selectors
export const selectFavoriteNftsByAddress = (state: RootState) =>
	state.allFavoriteNftsByAddress.listNFTs;
export const selectPaginationParams = (state: RootState) =>
	state.allFavoriteNftsByAddress.paginationParams;
export const selectPaginationResponse = (state: RootState) =>
	state.allFavoriteNftsByAddress.paginationResponse;
export const selectLoading = (state: RootState) => state.allFavoriteNftsByAddress.isLoading;
export const selectFilter = (state: RootState) => state.allFavoriteNftsByAddress.filter;
export const selectDefaultFilter = initialState.filter;
export const selectDefaultPaginationParams = initialState.paginationParams;

// Reducer
export default slice.reducer;
