/* eslint-disable @typescript-eslint/no-unused-vars */
import { ListParams, ListResponse, NFT } from 'models';
import nftsApi from 'apis/nftsApi';
import { dispatch, getState } from '../store';
import {
	startLoading,
	hasError,
	fetchAllNftsSuccess,
	fetchAllNftsFirstLoadSuccess,
	setHasNextPage,
} from 'redux/slices/allNftsSlice';
import { checkHasNextPage } from 'utils';

export function fetchAllNFTs(
	paginationParams: ListParams,
	filter: ListParams,
	isFetchFirstLoad: boolean,
	MyCallBack?: Function
) {
	return async () => {
		dispatch(startLoading());
		try {
			const response: ListResponse<any> = await nftsApi.getListTokenId(
				paginationParams,
				filter
			);

			console.log('response', response);

			const { pagination } = response;
			const check: boolean = checkHasNextPage(pagination.currentPage, pagination.totalPages);

			dispatch(setHasNextPage(check));

			if (isFetchFirstLoad) {
				dispatch(fetchAllNftsFirstLoadSuccess(response));
			} else {
				dispatch(fetchAllNftsSuccess(response));
			}
		} catch (error: any) {
			dispatch(hasError(error.message));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}
