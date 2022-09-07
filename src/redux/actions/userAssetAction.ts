/* eslint-disable @typescript-eslint/no-unused-vars */
import { FilterNft, ListParams, ListResponse, NFT } from 'models';
import { dispatch, getState } from 'redux/store';
import nftsApi from 'apis/nftsApi';
import {
	startLoading,
	hasError,
	fetchUserAssetSuccess,
	fetchUserAssetFirstLoadSuccess,
	setHasNextPage,
} from 'redux/slices/userAssetSlice';
import { checkHasNextPage } from 'utils';

export function fetchUserAssets(
	userAddress: string,
	chainId: number,
	paginationParams: ListParams,
	filter: FilterNft,
	isFetchFirstLoad: boolean,
	MyCallBack?: Function
) {
	return async () => {
		dispatch(startLoading());
		try {
			const tempFilter: FilterNft = { ...filter, owner: userAddress };
			const response: ListResponse<NFT> = await nftsApi.getListTokenId(paginationParams, {
				...tempFilter,
			});

			// bo filter tam thoi
			// const response: ListResponse<NFT> = await nftsApi.getListTokenId(paginationParams, {
			// 	owner: userAddress,
			// });

			const { pagination } = response;
			const check: boolean = checkHasNextPage(pagination.currentPage, pagination.totalPages);

			dispatch(setHasNextPage(check));

			if (isFetchFirstLoad) {
				dispatch(fetchUserAssetFirstLoadSuccess(response));
			} else {
				dispatch(fetchUserAssetSuccess(response));
			}
		} catch (error) {
			dispatch(hasError(error));
		} finally {
			if (MyCallBack) MyCallBack(getState());
		}
	};
}
