/* eslint-disable @typescript-eslint/no-unused-vars */
import collectionApi from 'apis/collectionApi';
import { Collection, ListParams, ListResponse, PaginationParams, Response } from 'models';

import {
	startLoading,
	hasError,
	fetchAllCollectionFirstLoadSuccess,
	fetchAllCollectionSuccess,
	setHasNextPage,
} from 'redux/slices/collectionTrendingSlice';
//utils
import { checkHasNextPage } from 'utils';
import { dispatch, getState } from '../store';

export function fetchTrendingCollection(
	pagination: ListParams,
	filter: ListParams,
	isFetchFirstLoad: boolean,
	MyCallBack?: Function
) {
	return async () => {
		dispatch(startLoading());
		try {
			const response: ListResponse<Collection> = await collectionApi.getListTopCollection(
				pagination,
				filter
			);

			const paginationResponse: PaginationParams = response.pagination;
			const check: boolean = checkHasNextPage(
				paginationResponse.currentPage,
				paginationResponse.totalPages
			);

			dispatch(setHasNextPage(check));

			if (isFetchFirstLoad) {
				dispatch(fetchAllCollectionFirstLoadSuccess(response));
			} else {
				dispatch(fetchAllCollectionSuccess(response));
			}
		} catch (error) {
			dispatch(hasError(error));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}
