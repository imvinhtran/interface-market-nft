/* eslint-disable @typescript-eslint/no-unused-vars */
import { dispatch, getState } from 'redux/store';
import {
	startLoading,
	hasError,
	setListTopCollectionSuccess,
} from 'redux/slices/listTopCollectionSlice';
import { Collection, ListParams } from 'models';
import collectionApi from 'apis/collectionApi';

export function fetchListTopCollection(data: ListParams, MyCallBack?: (value: any) => void) {
	return async () => {
		dispatch(startLoading());
		try {
			// const response: Collection[] = await collectionApi.getListTopCollection(data, {});
			// dispatch(setListTopCollectionSuccess(response));
		} catch (error: any) {
			console.log(error.message);
			dispatch(hasError(error.message));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}
