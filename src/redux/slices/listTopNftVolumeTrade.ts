import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListParams, NFT } from 'models';
import { RootState } from '../store';

export interface ListTopCollectionState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	listTopNftVolumeTrade: NFT[];
	filter: ListParams;
}

const initialState: ListTopCollectionState = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	listTopNftVolumeTrade: [],
	filter: {
		limit: 10,
		days: 10,
	},
};

export const slice = createSlice({
	name: 'listTopNftVolumeTrade',
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
		setListTopNftVolumeTradeSuccess: (state, action: PayloadAction<NFT[]>) => {
			state.isLoading = false;
			state.isSuccess = true;
			state.listTopNftVolumeTrade = action.payload;
		},
	},
});

//Actions
export const { startLoading, hasError, setListTopNftVolumeTradeSuccess } = slice.actions;

//Selectors
export const selectListTopNftVolumeTrade = (state: RootState) =>
	state.listTopNftVolumeTrade.listTopNftVolumeTrade;
export const selectLoading = (state: RootState) => state.listTopNftVolumeTrade.isLoading;
export const selectFilter = (state: RootState) => state.listTopNftVolumeTrade.filter;

//Reducer
export default slice.reducer;
