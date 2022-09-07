import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterNft, ListResponse, NFT, Pagination } from 'models';
import { RootState } from '../store';

export interface AllNftsByAddressAndColllectionState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	listNFTs: NFT[];
	filter: FilterNft;
	pagination: Pagination;
	hasNextPage: boolean;
}

const initialState: AllNftsByAddressAndColllectionState = {
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
	name: 'collectionItem',
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
		fetchCollectionItemFirstLoadSuccess: (state, action: PayloadAction<ListResponse<NFT>>) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.listNFTs = action.payload.data;
		},
		fetchCollectionItemSuccess: (state, action: PayloadAction<ListResponse<NFT>>) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.listNFTs = state.listNFTs.concat(action.payload.data);
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
	fetchCollectionItemSuccess,
	fetchCollectionItemFirstLoadSuccess,
	setFilter,
	setPagination,
	setHasNextPage,
	resetAll,
} = slice.actions;

// Selectors
export const selectInitialState = initialState;
export const selectListNft = (state: RootState) => state.collectionItem.listNFTs;
export const selectPagination = (state: RootState) => state.collectionItem.pagination;
export const selectFilter = (state: RootState) => state.collectionItem.filter;
export const selectLoading = (state: RootState) => state.collectionItem.isLoading;
export const selectHasNextPage = (state: RootState) => state.collectionItem.hasNextPage;

// Reducer
export default slice.reducer;
