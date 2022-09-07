/* eslint-disable @typescript-eslint/no-unused-vars */
import tokenPaymentApi from 'apis/tokenPaymentApi';
import { ListResponseNonPaging, TokenPayment } from 'models';
import {
	startLoading,
	hasError,
	fetchListTokenPaymentSuccess,
} from 'redux/slices/tokenPaymentSlice';
import { dispatch, getState } from '../store';

export function fetchListPaymentTokenByChainId(chainId: number, MyCallBack?: Function) {
	return async () => {
		dispatch(startLoading());
		try {
			const response: ListResponseNonPaging<TokenPayment> =
				await tokenPaymentApi.getListPaymentTokenByChainId(chainId);
			dispatch(fetchListTokenPaymentSuccess(response));
		} catch (error) {
			dispatch(hasError(error));
			if (MyCallBack) MyCallBack(getState());
		}
	};
}
