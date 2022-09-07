/* eslint-disable @typescript-eslint/no-unused-vars */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, NFT, Response } from 'models';
import { RootState } from '../store';

export interface NftItemState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	NFTItem: NFT | null;
	filter: ListParams;
}

const initialState: NftItemState = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	NFTItem: null,
	filter: {
		chainId: 0,
		itemId: 0,
	},
};

export const slice = createSlice({
	name: 'nftItem',
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
		// action: PayloadAction<Response<NFT>>: lúc sau action phải thế này mới đúng
		fetchNftItemSuccess: (state, action: any) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.NFTItem = action.payload;
		},
	},
});

// Actions
export const { startLoading, hasError, fetchNftItemSuccess } = slice.actions;

// Selector
export const selectNftItem = (state: RootState) => state.nftItem.NFTItem;
export const selectLoading = (state: RootState) => state.nftItem.isLoading;
export const selectFilter = (state: RootState) => state.nftItem.filter;

// Reducer
export default slice.reducer;
