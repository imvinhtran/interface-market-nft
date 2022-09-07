import orderApi from 'apis/orderApi';
import { OrderResponseAPI, ListResponse, ListParams } from 'models';
import { getListOrderOfferSuccess, hasError, startLoading } from 'redux/slices/orderSlice';
import { dispatch, getState } from '../store';

export function fetchListOrderOffer(filter: ListParams, MyCallBack?: Function) {
	return async () => {
		dispatch(startLoading());
		try {
			const response: ListResponse<OrderResponseAPI> = await orderApi.getListOffer(filter);

			dispatch(getListOrderOfferSuccess(response));
		} catch (error) {
			dispatch(hasError(error));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}
