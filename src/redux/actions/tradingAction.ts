import { ListParams } from 'models';
import { dispatch, getState } from '../store';
import tradingApi from 'apis/historyApi';
import {
	startLoading,
	hasError,
	fetchTradingHistorySuccess,
	fetchUserHistorySuccess,
	fetchCollectionHistorySuccess,
} from 'redux/slices/tradingSlice';
import { ItemActivity } from 'models';

export function fetchTradingHistoryByNFTsId(data: ListParams, MyCallBack?: Function) {
	return async () => {
		dispatch(startLoading());
		try {
			const response: ItemActivity[] = await tradingApi.getTradingHistoryByNFTsId(data);

			dispatch(fetchTradingHistorySuccess(response));
		} catch (error) {
			dispatch(hasError(error));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}

export function fetchUserHistory(userAddress: string, MyCallBack?: Function) {
	return async () => {
		dispatch(startLoading());
		try {
			const response = await tradingApi.getActivityHistoryByUserAddress(userAddress);
			dispatch(fetchUserHistorySuccess(response));
		} catch (error) {
			dispatch(hasError(error));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}

export function fetchCollectionHistory(collectionId: string, MyCallBack?: Function) {
	return async () => {
		dispatch(startLoading());
		try {
			const response = await tradingApi.getActivityHistoryByCollectionId(collectionId);
			dispatch(fetchCollectionHistorySuccess(response));
		} catch (error) {
			dispatch(hasError(error));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}
