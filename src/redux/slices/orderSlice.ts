import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ListResponse, OfferFilter, OrderResponseAPI } from 'models';
import { RootState } from 'redux/store';

export interface orderState {
	isLoading: boolean;
	isSuccess: boolean;
	errorMessage: string;
	order: OrderResponseAPI | null;
	listOrderOffer: OrderResponseAPI[];
	filter: OfferFilter;
}

const initialState: orderState = {
	isLoading: false,
	isSuccess: false,
	errorMessage: '',
	order: null,
	listOrderOffer: [],
	filter: {},
};

const slice = createSlice({
	name: 'order',
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

		getOrderSuccess(state, action: PayloadAction<any>) {
			state.isLoading = false;
			state.order = action.payload.data;
		},

		getListOrderOfferSuccess(state, action: PayloadAction<ListResponse<OrderResponseAPI>>) {
			state.isLoading = false;
			state.isSuccess = true;
			state.listOrderOffer = action.payload.data;
		},

		setFilter(state, action) {
			state.filter = action.payload;
		},
	},
});

// Actions
export const { startLoading, hasError, getOrderSuccess, getListOrderOfferSuccess, setFilter } =
	slice.actions;

//Reducer
export default slice.reducer;

//Selector
export const selectLoading = (state: RootState) => state.order.isLoading;
export const selectOrder = (state: RootState) => state.order.order;
export const selectListOrderOffer = (state: RootState) => state.order.listOrderOffer;
export const selectFilter = (state: RootState) => state.order.filter;
